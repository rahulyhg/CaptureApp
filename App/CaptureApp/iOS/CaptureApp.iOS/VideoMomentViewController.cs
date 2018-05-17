using System;
using UIKit;

namespace CaptureApp.iOS
{
	public class VideoMomentViewController:UIImagePickerController
	{
		public VideoMomentViewController ()
		{
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			this.SourceType = UIImagePickerControllerSourceType.Camera;
			this.MediaTypes = UIImagePickerController.AvailableMediaTypes (UIImagePickerControllerSourceType.Camera);
			this.CameraCaptureMode = UIImagePickerControllerCameraCaptureMode.Video;
			//this.SourceType = UIImagePickerControllerSourceType.Camera;
		}
	}
}

