using System;
using UIKit;
using Foundation;
using CoreGraphics;
using System.IO;
using MediaPlayer;
using CaptureApp.Data;
using AVFoundation;
using CoreMedia;

namespace CaptureApp.iOS
{
	public class ImageCell : UICollectionViewCell
	{
		private UIImageView imageView;
		private Media media;
		[Export ("initWithFrame:")]
		public ImageCell (CGRect frame) : base (frame)
		{
			this.imageView = new UIImageView ();
			this.imageView.Layer.BorderColor = UIColor.Black.ColorWithAlpha (0.1f).CGColor;
			this.imageView.Layer.BorderWidth = 1f;
			this.ContentView.Add(imageView);
			//this.ContentView.BackgroundColor = UIColor.LightGray;
		}

		public void Config(Media media){
			if (this.media != null)
				this.media.SyncedChanged -= syncedChanged;
			media.SyncedChanged += syncedChanged;
			this.media = media;
			syncedChanged ();
		}
			
		private void syncedChanged(){
			if (media == null || media.URL == null)
				return;
			if (media.URL.Substring (media.URL.Length - 3, 3) == "png") {
				using (Stream stream = AppDelegate.MomentsManager.FileSystem.getFileStream (media.URL)) {
					NSData data = NSData.FromStream (stream);
					this.imageView.Image = UIImage.LoadFromData (data);
					AppDelegate.MomentsManager.FileSystem.CloseFileStream (stream);
				}
			} 
			else 
			{
				var nsurl = NSUrl.FromFilename ((Environment.GetFolderPath (Environment.SpecialFolder.MyDocuments) +"/"+ media.URL));

				AVAsset asset = AVAsset.FromUrl(nsurl);
				AVAssetImageGenerator generator = new AVAssetImageGenerator (asset);
				generator.AppliesPreferredTrackTransform = true;
				NSError err = null;
				CMTime outTime = new CMTime ();
				CMTime requestedTime = new CMTime (2, 1);  // To create thumbnail image
				using(var imgRef = generator.CopyCGImageAtTime(requestedTime,out outTime,out err)){
					this.imageView.Image = UIImage.FromImage (imgRef);
				}
			}
		}

		public override void LayoutSubviews ()
		{
			base.LayoutSubviews ();
			this.imageView.Bounds = new CGRect (0, 0, this.Bounds.Width * 0.8f, this.Bounds.Height * 0.8f);
			this.imageView.Center = new CGPoint (this.Bounds.Width / 2, this.Bounds.Height / 2);
		}


	}
}

