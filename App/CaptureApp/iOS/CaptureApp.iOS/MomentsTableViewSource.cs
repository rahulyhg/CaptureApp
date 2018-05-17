using System;
using UIKit;
using System.Collections.Generic;
using CaptureApp.Data;
using System.IO;
using Foundation;
using System.Linq;
using AVFoundation;
using CoreMedia;

namespace CaptureApp.iOS
{
	public class MomentsTableViewSource:UITableViewSource
	{
		private List<Moment> moments;

		public event Action<Moment> MomentDeleted;
		public event Action<Moment> MomentSelected;

		public MomentsTableViewSource ()
		{
			this.moments = new List<Moment> ();
			var groupedMoments = this.moments.GroupBy ((arg) => arg.Date.DayOfYear).ToList();

		}

		public void Config(List<Moment> moments){
			this.moments = moments;
		}

		#region implemented abstract members of UITableViewSource

		public override UITableViewCell GetCell (UITableView tableView, Foundation.NSIndexPath indexPath)
		{
			MomentsCell cell = (MomentsCell)tableView.DequeueReusableCell ("MomentCell");
			if (cell == null) {
				cell = new MomentsCell ();
				cell.SelectedBackgroundView = new UIView ();
				cell.SelectedBackgroundView.BackgroundColor = tableView.TintColor;
			}
			cell.Config (this.moments [indexPath.Row]);
			return cell;
		}

		public override nfloat GetHeightForRow (UITableView tableView, Foundation.NSIndexPath indexPath)
		{
			return 60;
		}

		public override nint RowsInSection (UITableView tableview, nint section)
		{
			return this.moments.Count;
		}

		public override void RowSelected (UITableView tableView, Foundation.NSIndexPath indexPath)
		{
			if (this.MomentSelected != null) {
				this.MomentSelected (this.moments [indexPath.Row]);
			}
		}


		public override void CommitEditingStyle (UITableView tableView, UITableViewCellEditingStyle editingStyle, Foundation.NSIndexPath indexPath)
		{
			if (this.MomentDeleted != null)
				this.MomentDeleted (this.moments [indexPath.Row]);
		}

		public override UITableViewCellEditingStyle EditingStyleForRow (UITableView tableView, Foundation.NSIndexPath indexPath)
		{
			return UITableViewCellEditingStyle.Delete;
		}

		#endregion


		public class MomentsCell:UITableViewCell{

			private Moment moment;
			private UILabel icon;

			public MomentsCell():base(UITableViewCellStyle.Subtitle,"MomentCell"){
				icon = new UILabel();
				icon.Font = UIFont.SystemFontOfSize(45);
				this.ContentView.Add(icon);
				this.Accessory = UITableViewCellAccessory.DisclosureIndicator;
				this.ImageView.Layer.BorderColor = UIColor.Black.ColorWithAlpha(0.1f).CGColor;
				this.ImageView.Layer.BorderWidth = 1;
			}

			public void Config(Moment moment){
				this.moment = moment;			
				this.TextLabel.Text = moment.Comment;
				this.DetailTextLabel.Text = moment.Title;
				if (moment.Media.Count > 0) {
					this.icon.Hidden = true;
					NSData data = null;
					this.ImageView.Layer.MasksToBounds = true;
					if (moment.Media [0].Type == "Image") {
						try {
							using (Stream imageStream = AppDelegate.MomentsManager.FileSystem.getFileStream (moment.Media [0].URL)) {
								data = NSData.FromStream (imageStream);
								AppDelegate.MomentsManager.FileSystem.CloseFileStream (imageStream);
							}
							this.ImageView.Image = UIImage.LoadFromData (data);
						} catch (Exception ex) {
							Console.WriteLine (ex);
						}
					} else {
						var nsurl = NSUrl.FromFilename ((Environment.GetFolderPath (Environment.SpecialFolder.MyDocuments) +"/"+ moment.Media [0].URL));
						AVAsset asset = AVAsset.FromUrl(nsurl);
						AVAssetImageGenerator generator = new AVAssetImageGenerator (asset);
						generator.AppliesPreferredTrackTransform = true;
						NSError err = null;
						CMTime outTime = new CMTime ();
						CMTime requestedTime = new CMTime (2, 1);  // To create thumbnail image
						using(var imgRef = generator.CopyCGImageAtTime(requestedTime,out outTime,out err)){
							this.ImageView.Image = UIImage.FromImage (imgRef);
						}

					}
				} else
					this.ImageView.Image = null;

			}

			public override void SetSelected (bool selected, bool animated)
			{
				base.SetSelected (selected, animated);
				this.DetailTextLabel.TextColor = selected ? UIColor.White : UIColor.DarkGray;
				this.TextLabel.TextColor = selected ? UIColor.White : UIColor.DarkGray;
			}

			public override void SetHighlighted (bool highlighted, bool animated)
			{
				base.SetHighlighted (highlighted, animated);
				this.DetailTextLabel.TextColor = highlighted ? UIColor.White : UIColor.DarkGray;
				this.TextLabel.TextColor = highlighted ? UIColor.White : UIColor.DarkGray;
			}

			public override void LayoutSubviews ()
			{
				base.LayoutSubviews ();
				/*this.icon.Frame = new CoreGraphics.CGRect (20, 10, this.Bounds.Height - 10, this.Bounds.Height - 10);

				this.DetailTextLabel.Frame = new CoreGraphics.CGRect (icon.Frame.Right + 20,
					DetailTextLabel.Frame.Y, DetailTextLabel.Frame.Width, DetailTextLabel.Frame.Height);
				this.TextLabel.Frame = new CoreGraphics.CGRect (icon.Frame.Right + 20,
					TextLabel.Frame.Y, TextLabel.Frame.Width, TextLabel.Frame.Height);*/
				
				

				this.ImageView.Bounds = new CoreGraphics.CGRect(0,0,this.Bounds.Height * 0.8f,this.Bounds.Height * 0.8f);
				this.ImageView.Layer.CornerRadius = this.ImageView.Bounds.Height / 2;
				this.SelectedBackgroundView.Frame = this.Bounds;
				this.ImageView.Center = new CoreGraphics.CGPoint (this.Bounds.Height / 2+10, this.Bounds.Height / 2);
				DetailTextLabel.Frame = new CoreGraphics.CGRect (this.ImageView.Frame.Right + 10,
					DetailTextLabel.Frame.Top, DetailTextLabel.Frame.Width, DetailTextLabel.Frame.Height);
				TextLabel.Frame = new CoreGraphics.CGRect (this.ImageView.Frame.Right + 10,
					TextLabel.Frame.Top, TextLabel.Frame.Width, TextLabel.Frame.Height);
			}
		}
	}
}

