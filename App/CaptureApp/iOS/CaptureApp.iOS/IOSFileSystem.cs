using System;
using CaptureApp.API;
using System.IO;
using System.Collections.Generic;

namespace CaptureApp.iOS
{
	public class IOSFileSystem:IFileSystem
	{
		private List<Stream> streams;

		public IOSFileSystem ()
		{
			this.streams = new List<Stream> ();
		}

		#region IFileSystem implementation

		public void CloseFileStream (Stream stream)
		{
			this.streams.Remove (stream);
			stream.Close ();
			stream.Dispose ();
		}

		public Stream getFileStream (string path)
		{
			String iosPath = getAppFolder () + "/" + path;
			//TODO Check File Sharing. Prepare for multiple access.
			try{
				FileStream fileStream = new FileStream (iosPath, FileMode.Open); 
				this.streams.Add (fileStream);
				return fileStream;
			}
			catch (Exception ex){
				Console.WriteLine (ex);
				FileStream fileStream = new FileStream (iosPath, FileMode.OpenOrCreate); 
				this.streams.Add (fileStream);
				return fileStream;
			}

		}

		public bool DeleteFile (string path)
		{
			String iosPath = getAppFolder () + "/" + path;
			File.Delete (iosPath);
			return true;
		}

		public bool CreateDirectory (string dir)
		{
			String iosDir = getAppFolder () + "/" + dir;
			Directory.CreateDirectory (iosDir);
			return true;
		}
			
		#endregion

		protected string getAppFolder ()
		{
			return Environment.GetFolderPath (Environment.SpecialFolder.MyDocuments);
		}


	}
}

