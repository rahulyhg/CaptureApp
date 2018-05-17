using System;
using CoreGraphics;
using UIKit;
using CoreGraphics;
using Foundation;

namespace CaptureApp.iOS
{

	public class AutoResizingImage:UIImageView
	{
		protected nfloat scaleFactor = 1;
		private nfloat imgWidth=0;
		private nfloat imgHeight=0;
		protected Boolean updating = false;


		public AutoResizingImage ()
		{
			this.UserInteractionEnabled = true;
		}

		/// <summary>
		/// Start Updating. Is used for child classes. Value "updating" is set to true
		/// </summary>
		public virtual void BeginUpdate()
		{
			this.updating = true;
		}


		/// <summary>
		/// Return the current Updating State.
		/// ReadOnly
		/// </summary>
		public Boolean Updating
		{
			get{return this.updating;}
		}

		/// <summary>
		/// Start Updating. Is used for child classes. Value "updating" is set to true
		/// </summary>
		public virtual void EndUpdate()
		{
			this.updating = false;
		}


		/// <summary>
		/// Autoresizes this View in relation to the Frame so the Image fits into the Frame (not Streched)
		/// </summary>
		public  virtual void AutoResizeInFrame (CGRect frame)
		{
			nfloat posX;
			nfloat posY;
			if (this.Image == null) 
			{
				return;
			}

			if (imgWidth > imgHeight) 
			{
				this.Frame = this.CalcByWidth (frame);
			} 
			else 
			{
				this.Frame = this.CalcByHeight (frame);
			}
			posX = (frame.Width-this.Frame.Width)/2;
			posY = (frame.Height-this.Frame.Height)/2;

			posX = posX+ frame.X;
			posY = posY+frame.Y;

			this.Frame= new CGRect(posX,posY,this.Frame.Width,this.Frame.Height);

		}

		/// <summary>
		/// Calculates the new Frame in relation of Width to rect width (Scale calculation).
		/// It return the new calculated Frame which fits into the RectangleF(Param).
		/// </summary>
		protected virtual CGRect CalcByWidth (CGRect rect)
		{
			nfloat scaleFactor;
			nfloat width, height, posX, posY;
			
			CGRect newRect = CGRect.Empty;
			
			scaleFactor = rect.Width / imgWidth;	
			this.scaleFactor = scaleFactor;

			width = rect.Width;
			height = imgHeight * scaleFactor;
			posX = 0;
			posY = (rect.Height - height) / 2;

			newRect = new CGRect (posX, posY, width, height);

			if (Math.Round (height, 0) > Math.Round (rect.Height, 0)) 
			{
				return this.CalcByHeight (rect);
			}

			return newRect;
		}


		/// <summary>
		/// Calculates the new Frame in relation of Height to rect width (Scale calculation).
		/// It return the new calculated Frame which fits into the RectangleF(Param).
		/// </summary>
		protected virtual CGRect CalcByHeight (CGRect rect)
		{
			nfloat scaleFactor;
			nfloat width, height, posX, posY;
			
			CGRect newRect = CGRect.Empty;
			
			scaleFactor = rect.Height / imgHeight;
			this.scaleFactor = scaleFactor;

			width = imgWidth * scaleFactor;
			height = rect.Height;
			posX = (rect.Width - width) / 2;
			posY = 0;

			newRect = new CGRect (posX, posY, width, height);

			if (Math.Round (width, 0) > Math.Round (rect.Width, 0)) 
			{
				return CalcByWidth (rect);
			}
			return newRect;
		} 



		/// <summary>
		/// Return the current Scale of the Image
		/// ReadOnly
		/// </summary>
		public nfloat ImageScale 
		{
			get{ return this.scaleFactor;}
		}


		protected UIImage getUIImage()
		{
			UIImage image = null;
			this.InvokeOnMainThread(delegate() 
			{
				image = base.Image;
			});
			return image;
		}

		protected void setUIImage(UIImage image)
		{
			this.InvokeOnMainThread(delegate() {
				base.Image = image;
				if(image != null)
				{
					this.imgWidth = image.Size.Width;
					this.imgHeight = image.Size.Height;
				}
			});
		}

		/// <summary>
		/// Overriding the Image Property for setting imgWidth and imgHeight.
		/// </summary>
		public override UIImage Image 
		{
			get {return this.getUIImage();}
			set {this.setUIImage(value);}
		}
	}



}

