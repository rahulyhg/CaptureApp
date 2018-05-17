using System;
using UIKit;
using Foundation;
using CoreGraphics;

namespace CaptureApp.iOS
{
	public class EmojiCell : UICollectionViewCell
	{
		private UILabel label;
		[Export ("initWithFrame:")]
		public EmojiCell (CGRect frame) : base (frame)
		{
			this.label = new UILabel(){TextAlignment= UITextAlignment.Center};
			this.ContentView.Add(label);

			this.label.AdjustsFontSizeToFitWidth = true;
			this.ContentView.BackgroundColor = UIColor.White;
		}

		public void Config(String text,int fontSize){
			this.label.Text = text;
			this.label.Font = UIFont.SystemFontOfSize(fontSize);
		}

		public String Text{
			get{
				return this.label.Text;
			}
		}

		public override void LayoutSubviews ()
		{
			base.LayoutSubviews ();
			this.label.Frame = this.ContentView.Bounds;
		}


	}
}

