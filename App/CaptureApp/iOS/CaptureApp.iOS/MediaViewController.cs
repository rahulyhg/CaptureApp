using System;
using UIKit;
using CaptureApp.Data;
using System.IO;
using Foundation;
using AVFoundation;
using MediaPlayer;

namespace CaptureApp.iOS
{
	public class MediaViewController:UIViewController
	{
		private AutoResizingImage autoResizingImage;
		private MPMoviePlayerController moviePlayer;
		private Media media;
		private Moment moment;

		public MediaViewController ()
		{
			this.autoResizingImage = new AutoResizingImage ();
		}

		public void Config(Media media,Moment moment)
		{
			this.media = media;
			this.moment = moment;
			if (media.Type == "Image") {
				using (Stream stream = AppDelegate.MomentsManager.FileSystem.getFileStream (media.URL)) {
					NSData data = NSData.FromStream (stream);
					this.autoResizingImage.Image = UIImage.LoadFromData (data);
					AppDelegate.MomentsManager.FileSystem.CloseFileStream (stream);
				}
			} 
			
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			if (media.Type == "Image") {
				this.View.Add (this.autoResizingImage);
				this.View.BackgroundColor = UIColor.White;
				this.Title = "Image";
			} else {
				this.Title = "Video";
				try
				{
					var nsurl = NSUrl.FromFilename ((Environment.GetFolderPath (Environment.SpecialFolder.MyDocuments) +"/"+ media.URL));
					//Set already instantiated MPMoviePlayerController to playback from Movies/file.m4v
					moviePlayer = new MPMoviePlayerController(nsurl);

					//enable AirPlay
					moviePlayer.AllowsAirPlay = true;

					//Add the MPMoviePlayerController View
					this.View.AddSubview(moviePlayer.View);

					//set the view to be full screen and show animated
					moviePlayer.SetFullscreen(false, true);

					//Disable the pinch-to-zoom gesture
					moviePlayer.ControlStyle = MPMovieControlStyle.Embedded;

					//MPMoviePlayer must be set to PrepareToPlay before playback
					moviePlayer.PrepareToPlay();

					//Play Movie
					moviePlayer.Play();
				}
				catch
				{
					Console.WriteLine("There was a problem playing back Video");
				}
			}

		}

		public override void ViewDidLayoutSubviews ()
		{
			base.ViewDidLayoutSubviews ();
			this.autoResizingImage.AutoResizeInFrame (this.View.Bounds);
			if(moviePlayer != null)
				this.moviePlayer.View.Frame = new CoreGraphics.CGRect (0, 0, this.View.Bounds.Width, this.View.Bounds.Height - 44);
		}

		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
			UIBarButtonItem deleteItem = new UIBarButtonItem (UIBarButtonSystemItem.Trash, delegate {
				UIAlertView alert = new UIAlertView("Delete Media","Are you sure you want to delete this media?",null,"Yes","No");
				alert.Clicked += (sender, e) => {
					if(e.ButtonIndex == 0){
						AppDelegate.MomentsManager.DeleteMomentMedia(this.media,this.moment);
						this.NavigationController.PopViewController(true);
					}
				};
				alert.Show();

			});
			this.NavigationController.SetToolbarHidden (false, true);
			UIBarButtonItem shareItem = new UIBarButtonItem (UIBarButtonSystemItem.Action, delegate {
				
			});
			this.SetToolbarItems (new UIBarButtonItem[]{
				shareItem,
				new UIBarButtonItem(UIBarButtonSystemItem.FlexibleSpace), 
				deleteItem
			},true);
			if (media.Type == "Video") {
				
			}
		}

		public override void ViewWillDisappear (bool animated)
		{
			base.ViewWillDisappear (animated);
			this.NavigationController.SetToolbarHidden (true, true);
			if(moviePlayer != null)
				this.moviePlayer.Pause ();
		}
	}
}

