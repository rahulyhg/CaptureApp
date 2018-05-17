// This file has been autogenerated from a class added in the UI designer.

using System;

using Foundation;
using UIKit;
using CaptureApp.Data;

namespace CaptureApp.iOS
{
	public partial class NewMomentViewController : UIViewController
	{
		private PictureMomentViewController pictureMomentController;

		public NewMomentViewController (IntPtr handle) : base (handle)
		{
			this.Title = "New Moment";
			this.pictureMomentController = new PictureMomentViewController ();
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();


			this.TakePictureButton.TouchDown += (sender, e) => {
				var sheet = PictureMomentViewController.GetActionSheet(pictureMomentController,this.NavigationController,false);
				sheet.ShowFromTabBar(this.TabBarController.TabBar);
			};

			this.TakeVideoButton.TouchDown += (sender, e) => {
				var sheet = PictureMomentViewController.GetActionSheet(pictureMomentController,this.NavigationController,true);
				sheet.ShowFromTabBar(this.TabBarController.TabBar);
			};

			this.pictureMomentController.Finished += (moment) => {
				AppDelegate.MomentsManager.PublishMoment(moment);
				UIAlertView alert = new UIAlertView("Add Content","Do you want to edit your moment now?",null,"Yes","No");
				alert.Clicked += (s, evt) => {
					if(evt.ButtonIndex == 0){
						var edit = new EditDialog();
						edit.Config(moment);
						this.NavigationController.PushViewController(edit,true);
					}
				};
				alert.Show();
			};



			this.TakeEmojiButton.Layer.CornerRadius = 3f;
			this.TakePictureButton.Layer.CornerRadius = 3f;
			this.TakeVideoButton.Layer.CornerRadius = 3f;
			//this.TabBarItem = new UITabBarItem ("New Moment", UIImage.FromFile ("images/plus.png"), 0);


			this.CaptureButton.TouchDown += (sender, e) => {
				Moment moment = new Moment();
				moment.Title = "New Moment";
				moment.Comment ="No Content";
				AppDelegate.MomentsManager.PublishMoment(moment);
				UIAlertView alert = new UIAlertView("Add Content","Do you want to edit your moment now?",null,"Yes","No");
				alert.Clicked += (s, evt) => {
					if(evt.ButtonIndex == 0){
						var edit = new EditDialog();
						edit.Config(moment);
						this.NavigationController.PushViewController(edit,true);
					}
				};
				alert.Show();
			};
		}

		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
			this.TabBarController.NavigationItem.Title = "Capture";
			this.TabBarController.NavigationItem.TitleView = null;
			UIBarButtonItem logoutItem = new UIBarButtonItem ("Logout", UIBarButtonItemStyle.Plain, delegate {
				AppDelegate.MomentsManager.AccountManager.Logout();
				LoginViewController loginViewController = new LoginViewController ();
				this.NavigationController.PresentViewController (loginViewController, true, null);
			});
			this.NavigationController.NavigationBar.TopItem.RightBarButtonItem = logoutItem;
		}

		public override void ViewWillDisappear (bool animated)
		{
			base.ViewWillDisappear (animated);
			this.NavigationController.NavigationBar.TopItem.RightBarButtonItem = null;
		}


		public override void ViewDidLayoutSubviews ()
		{
			base.ViewDidLayoutSubviews ();
			this.CaptureButton.Layer.CornerRadius = this.CaptureButton.Bounds.Height / 2;
			this.CaptureButton.Center = new CoreGraphics.CGPoint (this.View.Bounds.Width / 2, this.CaptureButton.Center.Y);
		}
	}
}
