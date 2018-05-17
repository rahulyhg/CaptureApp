using System;
using UIKit;
using CaptureApp.API;
using CaptureApp.Data;
using System.IO;
using CoreGraphics;
using MobileCoreServices;

namespace CaptureApp.iOS
{
	public class PictureMomentViewController:UIImagePickerController
	{
		private UIButton libraryButton;
		private UIBarButtonItem libItem;
		private Moment moment;

		public event Action SourceTypeChanged;

		public event Action<Moment> Finished;

		public PictureMomentViewController ()
		{
			
		}


		public static UIActionSheet GetActionSheet(PictureMomentViewController controller,UINavigationController nav,Boolean video){
			controller.VideoMode = video;
			controller.NavigationBar.TintColor = nav.NavigationBar.TintColor;
			var sheet = new UIActionSheet("Choose Source");
			sheet.AddButton("Camera");
			sheet.AddButton("Library");
			sheet.AddButton("Cancel");
			sheet.DestructiveButtonIndex = 2;
			sheet.Clicked += (send, evt) => {
				if(evt.ButtonIndex == 0){
					controller.SourceType = UIImagePickerControllerSourceType.Camera;
					controller.MediaTypes = UIImagePickerController.AvailableMediaTypes (UIImagePickerControllerSourceType.Camera);
					if(video)
						controller.CameraCaptureMode = UIImagePickerControllerCameraCaptureMode.Video;
					else
						controller.CameraCaptureMode = UIImagePickerControllerCameraCaptureMode.Photo;
					nav.PresentViewController(controller,true,null);
				}
				else if(evt.ButtonIndex == 1){
					controller.MediaTypes = UIImagePickerController.AvailableMediaTypes (UIImagePickerControllerSourceType.SavedPhotosAlbum);
					controller.SourceType = UIImagePickerControllerSourceType.SavedPhotosAlbum;
					nav.PresentViewController(controller,true,null);
				}


			};
			return sheet;
		}



		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
			if (this.SourceType != UIImagePickerControllerSourceType.Camera) {
				//this.NavigationBar.TopItem.SetLeftBarButtonItem (this.libItem, true);
			}
		}



		public override UIViewController PopViewController (bool animated)
		{

			var result = base.PopViewController (animated);
			if (this.SourceType != UIImagePickerControllerSourceType.Camera) {
				//this.NavigationBar.TopItem.SetLeftBarButtonItem (this.libItem, true);
			}
			return result;
		}


		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			this.libraryButton = new UIButton(){Frame = new CoreGraphics.CGRect(this.View.Bounds.Width-115,50,100,40)};
			this.libraryButton.Layer.CornerRadius = 6f;
			this.libraryButton.BackgroundColor = UIColor.Black.ColorWithAlpha (0.2f);
			this.libraryButton.SetTitle ("Library", UIControlState.Normal);
			this.libraryButton.TouchDown += (sender, e) => {
				this.SourceType = UIImagePickerControllerSourceType.PhotoLibrary;
				if(this.SourceTypeChanged != null)
					this.SourceTypeChanged();
			};
			this.libItem = new UIBarButtonItem (UIBarButtonSystemItem.Camera, delegate {
				this.SourceType = UIImagePickerControllerSourceType.Camera;
				if(this.SourceTypeChanged != null)
					this.SourceTypeChanged();
			});
			/*if(this.SourceType == UIImagePickerControllerSourceType.Camera)
				this.CameraOverlayView.Add (this.libraryButton);*/
			this.FinishedPickingMedia += finishedPickingMedia;
			this.Canceled += (sender, e) => {
				this.DismissViewController(true,null);
			};
		}

		public void Config(Moment moment)
		{
			this.moment = moment;
		}

		private void finishedPickingMedia(Object sender, UIImagePickerMediaPickedEventArgs e){
			this.moment = this.moment == null ? new Moment (){ Title = "Image", Comment = "Not Edited" } : this.moment;
			String uid = Guid.NewGuid ().ToString ();
			this.VideoMode = e.MediaType == "public.movie";
			String path = String.Format ("{0}/{1}.{2}", moment.GUID,uid,VideoMode ? "mov" :"png");
			AppDelegate.MomentsManager.FileSystem.CreateDirectory (moment.GUID);
			if (VideoMode) { 
				moment.Media.Add (new Media(){Synced = SyncState.NotSynced,URL=path,GUID = uid,Type="Video"});
				using(FileStream stream = new FileStream(e.MediaUrl.Path,FileMode.Open))
				{
					using (Stream filestream = AppDelegate.MomentsManager.FileSystem.getFileStream (path)) 
					{
						stream.CopyTo (filestream);
						AppDelegate.MomentsManager.FileSystem.CloseFileStream (filestream);
					}

				}
			} else {
				
				using (Stream filestream = AppDelegate.MomentsManager.FileSystem.getFileStream (path)) 
				{
					using (BinaryWriter writer = new BinaryWriter (filestream)) {
						writer.Write (e.OriginalImage.AsPNG ().ToArray ());
					}
					AppDelegate.MomentsManager.FileSystem.CloseFileStream (filestream);
				}
				moment.Media.Add (new Media(){Synced = SyncState.NotSynced,URL=path,GUID = uid,Type="Image"});

			}
			


			this.DismissViewController (true, delegate {
				if(this.Finished != null)
					this.Finished(moment);
				moment = null;
			});

		}

		// crop the image, without resizing
		private UIImage CropImage(UIImage sourceImage, int crop_x, int crop_y, int width, int height)
		{
			var imgSize = sourceImage.Size;
			UIGraphics.BeginImageContext(new CGSize(width, height));
			var context = UIGraphics.GetCurrentContext();
			var clippedRect = new CGRect(0, 0, width, height);
			context.ClipToRect(clippedRect);
			var drawRect = new CGRect(-crop_x, -crop_y, imgSize.Width, imgSize.Height);
			sourceImage.Draw(drawRect);
			var modifiedImage = UIGraphics.GetImageFromCurrentImageContext();
			UIGraphics.EndImageContext();
			return modifiedImage;
		}


		public Boolean VideoMode
		{
			get;
			set;
		}
	}
}

