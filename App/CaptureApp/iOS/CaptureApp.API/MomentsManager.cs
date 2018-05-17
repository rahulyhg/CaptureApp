using System;
using CaptureApp.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using System.Xml.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json.Converters;

namespace CaptureApp.API
{
	public class MomentsManager
	{
		public const String MOMENTS_FOLDER = "moments";
		private const String JSON_NAME = "moments.xml";


		private NetworkClient momentsNetworkClient;
		private IFileSystem fileSystem;
		private ILocationManager locationManager;
		private INetworkInfo networkInfo;

		public event Action Synced;

		public MomentsManager (IFileSystem filesystem,ILocationManager locationManager,INetworkInfo networkInfo)
		{
			if (filesystem == null)
				throw new ArgumentNullException ("Filesystem is null");
			if (locationManager == null)
				throw new ArgumentNullException ("LocationManager is null");
			if (networkInfo == null)
				throw new ArgumentNullException ("NetworkInfo is null");
			
			this.fileSystem = filesystem;
			this.locationManager = locationManager;
			this.networkInfo = networkInfo;
			this.momentsNetworkClient = new NetworkClient (networkInfo);
			this.Moments = new List<Moment> ();
			this.AccountManager = new AccountManager (fileSystem,networkInfo);
			Poll ();
		}

		public async void PublishMoment(Moment moment){
			this.locationManager.Update ();
			moment.Location = new MomentLocation () {
				Lat = this.locationManager.GetCurrentLocation ().Lat,
				Lng = this.locationManager.GetCurrentLocation ().Lng
			};
			moment.UserID = this.AccountManager.UserID;
			if (moment.GUID == null) {
				moment.GUID = Guid.NewGuid ().ToString ();
				moment.Date = DateTime.Now;
				fileSystem.CreateDirectory (moment.GUID);
				this.Moments.Add (moment);
			}
			if (await this.momentsNetworkClient.PostMoment (moment)) {
				moment.Synced = SyncState.Synced;
			} else {
				moment.Synced = SyncState.NotSynced;
			}
			SaveMoments ();
		}


		public async void Poll(){
			Sync ();
			await Task.Delay (10000);
			Poll ();
		}
			

		public async Task<Boolean> SyncMoment(Moment moment)
		{
			if (networkInfo.GetConnectionType () != ConnectionType.NoConnection) {
				await SyncMomentMedia (moment);
			}
			return true;
		}

		public async Task<Boolean> SyncMomentMedia(Moment moment)
		{
			if (moment.Synced == SyncState.Synchronizing)
				return false;
			List<Media> serverMedia = await momentsNetworkClient.GetMediaForMoment (moment);

			if (serverMedia != null) {
				moment.Media.RemoveAll ((media) => {
					if (serverMedia.Find ((obj) => {
						return media.GUID == obj.GUID;
					}) == null && media.Synced == SyncState.Synced) {
						DeleteMomentMedia (media, moment);
						return false;
					}
					return false;
				});
				serverMedia.RemoveAll ((obj) => {
					for (int i = moment.Media.Count - 1; i >= 0; i--) {
						if (moment.Media [i].GUID == obj.GUID)
							return true;
					}
					return false;
				});
				moment.Media.AddRange (serverMedia);
			}

			foreach (Media media in moment.Media) 
			{
				if (media.Synced == SyncState.NotSynced) {
					if (media.URL == null) 
					{
						moment.Synced = SyncState.Synchronizing;
						media.Synced = SyncState.Synchronizing;
						byte[] content = await momentsNetworkClient.GetMediaContent (media.GUID);
						if (content.Length > 0) {
							fileSystem.CreateDirectory (moment.GUID);
							String path = moment.GUID + "/" + media.GUID + (media.Type == "Image" ? ".png":".mov");
							using (Stream fileStream = fileSystem.getFileStream (path)) {
								using (BinaryWriter writer = new BinaryWriter (fileStream)) {
									writer.Write (content);
								}
								this.fileSystem.CloseFileStream (fileStream);
							}
							media.URL = path;
							media.Synced = SyncState.Synced;
							moment.Synced = SyncState.Synced;
						} else {
							media.Synced = SyncState.NotSynced;
							moment.Synced = SyncState.NotSynced;
						}
					}
					else 
					{
						moment.Synced = SyncState.Synchronizing;
						media.Synced = SyncState.Synchronizing;
						byte[] content = loadImage (media.URL);
						if (await momentsNetworkClient.PostMomentContent (content, media, moment.GUID, moment.UserID, media.Type)) {
							media.Synced = SyncState.Synced;
							moment.Synced = SyncState.Synced;
						} else {
							media.Synced = SyncState.NotSynced;
							moment.Synced = SyncState.NotSynced;
						}
					}
				}

			}
			SaveMoments ();
			return true;
		}



		public async void DeleteMoment(Moment moment){
			this.Moments.Remove (moment);
			await momentsNetworkClient.DeleteMoment (moment.GUID);
			this.SaveMoments ();
		}

		public async void DeleteMomentMedia(Media media,Moment moment)
		{
			moment.Media.Remove (media);
			await momentsNetworkClient.DeleteMomentContent (media.GUID); 
			SaveMoments ();
			
		}

		public async void Sync(){
			await loadMoments ();
			if (this.AccountManager.LoggedIn) {
				foreach (Moment moment in this.Moments) {
					await SyncMoment (moment);
				}
			}
			if (this.Synced != null)
				this.Synced ();
			
		}

		public void SaveMoments(){
			this.fileSystem.DeleteFile (JSON_NAME);
			using (Stream stream = this.fileSystem.getFileStream (JSON_NAME)) {
				StreamWriter writer = new StreamWriter (stream);
				var settings = new JsonSerializerSettings();
				settings.TypeNameHandling = TypeNameHandling.Objects;
				String content = JsonConvert.SerializeObject(this.Moments, Formatting.Indented, settings);
				writer.Write (content);
				writer.Dispose ();
				this.fileSystem.CloseFileStream (stream);
			}
		}

		private async Task<Boolean> loadMoments(){
			List<Moment> serverMoments = new List<Moment> ();
			List<Moment> localMoments = new List<Moment> ();

			if (this.AccountManager.LoggedIn) {
				serverMoments = await momentsNetworkClient.GetSavedMoments (this.AccountManager.UserID);
			}
			using (Stream stream = this.fileSystem.getFileStream (JSON_NAME)) {
				StreamReader reader = new StreamReader (stream);
				String content = reader.ReadToEnd ();
				reader.Dispose ();
				localMoments = JsonConvert.DeserializeObject <List<Moment>>(content);
				if (localMoments == null)
					localMoments = new List<Moment> ();
				this.fileSystem.CloseFileStream (stream);
			}
			if (serverMoments != null) {
				foreach (Moment serverMoment in serverMoments) {
					if (localMoments.Find ((obj) => {return obj.GUID == serverMoment.GUID;}) == null) {
						localMoments.Add (serverMoment);
					}
				}
				for(int i=localMoments.Count-1;i>=0;i--) {
					var localMoment = localMoments [i];
					if (serverMoments.Find ((obj) => {return obj.GUID == localMoment.GUID;}) == null) {
						localMoments.Remove (localMoment);
					}
				}
			}


			if (localMoments != null) {
				this.Moments.RemoveAll((mom) => {
					if (localMoments.Find ((obj) => {return obj.GUID == mom.GUID;}) == null) {
						DeleteMoment (mom);
						return true;
					}
					return false;
				});
				localMoments.RemoveAll ((obj) => {
					foreach(Moment moment in this.Moments){
						if(moment.GUID == obj.GUID)
							return true;
					}
					return false;
				});
				this.Moments.AddRange (localMoments);
			}
			return true;
		}
			

		private byte[] loadImage(String url){
			using (Stream stream = this.fileSystem.getFileStream (url)) {
				byte[] bytes = Converter.readFully (stream);
				this.fileSystem.CloseFileStream (stream);
				return bytes;
			}
		}



		public AccountManager AccountManager {
			get;
			private set;
		}

		public IFileSystem FileSystem {
			get {
				return this.fileSystem;
			}
		}

		public List<Moment> Moments {
			get;
			private set;
		}

	}
}

