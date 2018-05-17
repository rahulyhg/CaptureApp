using System;
using System.IO;

namespace CaptureApp.API
{
	public interface IFileSystem
	{
		Stream getFileStream (String path);
		void CloseFileStream(Stream stream);
		Boolean DeleteFile(String path);
		Boolean CreateDirectory(String dir);
	}


}

