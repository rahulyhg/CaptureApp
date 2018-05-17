using System;
using CaptureApp.Data;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using System.IO;
using System.Collections.Generic;


//TODO HASH PASSWORDS!
using Newtonsoft.Json.Linq;
using System.Net;


namespace CaptureApp.API
{
	public class NetworkClient
	{
		private const String BASE_URL = "http://alexwerff.de/captureApp/api/index.php";

		private INetworkInfo networkInfo;
		public static  String API_KEY = "";

		public NetworkClient (INetworkInfo networkInfo)
		{
			if (networkInfo == null)
				throw new ArgumentNullException ("NetworkInfo is null");
			this.networkInfo = networkInfo;
		}



		public async Task<List<Moment>> GetSavedMoments(String userID)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return null;
			}
			try{
				var client = new HttpClient ();
				client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

				String url = String.Format ("{0}/{1}/{2}", BASE_URL, "getMomentsForUser",userID);
				HttpResponseMessage response = await client.GetAsync (url);
				String result = await response.Content.ReadAsStringAsync ();
				var list = JsonConvert.DeserializeObject<List<Moment>> (result);
				if (list != null) {
					foreach (Moment moment in list) {
						moment.UserID = userID; //TODO HACKAROUND

						/*moment.Images.AddRange (mediaList.FindAll((obj) => obj.Type == "Image"));
						moment.Videos.AddRange (mediaList.FindAll((obj) => obj.Type == "Video"));*/
					}
					return list;
				}
			}
			catch(Exception Ex){
				return null;
			}
			return null;
		}


		public async Task<List<Media>> GetMediaForMoment(Moment moment){
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);
			String url = String.Format ("{0}/{1}/{2}", BASE_URL, "getMomentMedia", moment.GUID);
			HttpResponseMessage response = await client.GetAsync (url);
			String result = await response.Content.ReadAsStringAsync ();
			if (!String.IsNullOrEmpty (result)) {
				var mediaList = JsonConvert.DeserializeObject<List<Media>> (result);
				return mediaList;
			}
			return null;
		}

		public async Task<byte[]> GetMediaContent(String uid)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return new byte[]{};
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}", BASE_URL, "getMomentMediaContent",uid);
			HttpResponseMessage response = await client.GetAsync (url);
			var result = await response.Content.ReadAsByteArrayAsync ();
			return result;
		}

		/// <summary>
		/// Posts the moment.
		/// </summary>
		/// <returns>ID of the Moment</returns>
		/// <param name="moment">Moment.</param>
		public async Task<Boolean> PostMoment(Moment moment)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return false;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}", BASE_URL, "postMoment");
			string message = JsonConvert.SerializeObject(moment);
			using (HttpContent content = new StringContent (message, System.Text.Encoding.UTF8)) {
				HttpResponseMessage response = await client.PostAsync (url, content);
				return response.StatusCode == HttpStatusCode.OK;
			}
		}

		public async Task<Boolean> PostMomentContent(byte[] encodedContent,Media media,String momentID,String userID,String type)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return false;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}/{3}/{4}/{5}", BASE_URL, "postMomentContent",media.GUID,momentID,userID,type);
			using (HttpContent content = new ByteArrayContent(encodedContent)) {
				HttpResponseMessage response = await client.PostAsync (url, content);
				return response.StatusCode == HttpStatusCode.OK;
			}
		}

		public async Task<Boolean> DeleteMoment(String momentUID){
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return false;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}", BASE_URL, "deleteMoment",momentUID);
			HttpResponseMessage response = await client.PostAsync (url, new StringContent (""));
			return response.StatusCode == HttpStatusCode.OK;
		}

		public async Task<Boolean> DeleteMomentContent(String mediaUID){
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return false;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}", BASE_URL, "deleteMomentContent",mediaUID);
			HttpResponseMessage response = await client.PostAsync (url, new StringContent (""));
			return response.StatusCode == HttpStatusCode.OK;
		}

		public async Task<Boolean> RegisterUser(User user)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return false;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}/{3}", BASE_URL, "registerUser",user.Username,user.Password);
			string message = JsonConvert.SerializeObject(user);
			using (HttpContent content = new StringContent(message,System.Text.Encoding.Unicode)) {
				HttpResponseMessage response = await client.PostAsync (url, content);
				String result = await response.Content.ReadAsStringAsync ();
				user.UserID = result;
				API_KEY = user.UserID;
				return response.StatusCode == HttpStatusCode.OK;
			}
		}

		public async Task<User> Login(String username,String password)
		{
			if (this.networkInfo.GetConnectionType () == ConnectionType.NoConnection) {
				return null;
			}
			var client = new HttpClient ();
			client.DefaultRequestHeaders.Add ("Softrocket-Api-Key", API_KEY);

			String url = String.Format ("{0}/{1}/{2}/{3}", BASE_URL, "login",username,password);
			HttpResponseMessage response = await client.GetAsync (url);
			String result = await response.Content.ReadAsStringAsync ();
			result = result.Replace ("USER_ID", "USERID");
			var user = JsonConvert.DeserializeObject<User> (result);
			API_KEY = user.UserID;
			return user;
		}



		public static Boolean ResultIsInvalidAPIKey(String result){
			return result == "API-KEY not valid.";

		}



	}
}

