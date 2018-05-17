using System;
using CaptureApp.Data;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;

namespace CaptureApp.API
{
	public class AccountManager
	{
		private const String ACCOUNT_FILE = "login.json";
		private IFileSystem filesystem;
		private User user;
		private NetworkClient client;

		public AccountManager (IFileSystem filesystem,INetworkInfo networkInfo)
		{
			if (filesystem == null)
				throw new ArgumentNullException ("Filesystem is null");
			this.filesystem = filesystem;
			this.user = new User ();
			this.client = new NetworkClient(networkInfo);
			loadLogin ();
			/*this.user = new User (){ Username = "User", UserID = "0" };
			LoggedIn = true;*/
		}

		public async Task<Boolean> Login(String username,String password){
			User user = await client.Login (username.ToLower(), password.ToLower());
			LoggedIn = user != null;
			this.user = user;
			if (LoggedIn) {
				NetworkClient.API_KEY = user.UserID;
				saveLogin ();
			}
			
			return user != null;
		}

		public async Task<Boolean> Register(String username,String password){
			User user = new User (){ Username = username.ToLower(), Password = password.ToLower() };
			if (await client.RegisterUser (user)) {
				this.user = user;
				LoggedIn = true;
				NetworkClient.API_KEY = user.UserID;
				saveLogin ();
				return true;
			} else
				return false;
		}

		private void saveLogin()
		{
			filesystem.DeleteFile (ACCOUNT_FILE);
			using (var stream = filesystem.getFileStream (ACCOUNT_FILE)) {
				StreamWriter writer = new StreamWriter (stream);
				var settings = new JsonSerializerSettings();
				settings.TypeNameHandling = TypeNameHandling.Objects;
				String content = JsonConvert.SerializeObject(user, Formatting.Indented, settings);
				writer.Write (content);
				writer.Dispose ();
				filesystem.CloseFileStream (stream);
			}
		}

		private void loadLogin(){
			using (var stream = filesystem.getFileStream (ACCOUNT_FILE)) {
				StreamReader reader = new StreamReader (stream);
				String content = reader.ReadToEnd ();
				reader.Dispose ();
				user = JsonConvert.DeserializeObject<User> (content);
				if (user != null && !String.IsNullOrEmpty (user.UserID)) {
					LoggedIn = true;
					NetworkClient.API_KEY = user.UserID;
				}
				this.filesystem.CloseFileStream (stream);
			}
		}

		public void Logout(){
			LoggedIn = false;
			this.user = new User ();
			saveLogin ();
		}

		public Boolean LoggedIn {
			get;
			private set;
		}

		public String UserID{
			get
			{
				return this.user.UserID;
			}
		}
	}
}

