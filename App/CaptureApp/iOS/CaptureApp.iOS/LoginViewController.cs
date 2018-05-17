
using System;

using Foundation;
using UIKit;

namespace CaptureApp.iOS
{
	public partial class LoginViewController : UIViewController
	{
		private Boolean register = false;

		public LoginViewController () : base ("LoginViewController", null)
		{
		}

		public override void DidReceiveMemoryWarning ()
		{
			// Releases the view if it doesn't have a superview.
			base.DidReceiveMemoryWarning ();
			
			// Release any cached data, images, etc that aren't in use.
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			this.RegisterButton.TouchDown += (sender, e) => {
				this.SetRegisterMode(!this.register);
			};

			this.ButtonLogin.TouchDown += async (sender, e) => {
				this.ActivityIndicator.StartAnimating();
				Boolean result = false;
				if(this.register){
					result = await AppDelegate.MomentsManager.AccountManager.Register(UsernameField.Text,PasswordField.Text);
				}
				else{
					result = await AppDelegate.MomentsManager.AccountManager.Login(UsernameField.Text,PasswordField.Text);
				}
				this.ActivityIndicator.StopAnimating();
				if(result){
					this.DismissViewController(true,null);
				}
			};

			this.PasswordField.Started += started;
			this.PasswordField.ShouldReturn += shouldReturn;

			this.ConfirmPasswordField.Started += started;
			this.ConfirmPasswordField.ShouldReturn += shouldReturn;

			this.UsernameField.Started += started;
			this.UsernameField.ShouldReturn += shouldReturn;
		}

		private void started(Object sender,EventArgs evt){
			this.ScrollView.SetContentOffset(new CoreGraphics.CGPoint(0,200),true);
		}

		private Boolean shouldReturn(UITextField textView){
			this.ScrollView.SetContentOffset(new CoreGraphics.CGPoint(0,0),true);
			textView.ResignFirstResponder();
			return true;
		}



		public void SetRegisterMode(Boolean register){
			this.register = register;
			this.RegisterButton.SetTitle(register ? "Cancel":"Register",UIControlState.Normal);
			this.ButtonLogin.SetTitle (register ? "Register" : "Login", UIControlState.Normal);
			this.ConfirmPasswordField.Hidden = !register;
		}
	}
}

