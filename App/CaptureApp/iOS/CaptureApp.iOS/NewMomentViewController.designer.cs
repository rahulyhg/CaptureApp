// WARNING
//
// This file has been generated automatically by Xamarin Studio to store outlets and
// actions made in the UI designer. If it is removed, they will be lost.
// Manual changes to this file may not be handled correctly.
//
using Foundation;
using System.CodeDom.Compiler;

namespace CaptureApp.iOS
{
	[Register ("NewMomentViewController")]
	partial class NewMomentViewController
	{
		[Outlet]
		UIKit.UIButton CaptureButton { get; set; }

		[Outlet]
		UIKit.UIButton TakeEmojiButton { get; set; }

		[Outlet]
		UIKit.UIButton TakeNoteButton { get; set; }

		[Outlet]
		UIKit.UIButton TakePictureButton { get; set; }

		[Outlet]
		UIKit.UIButton TakeVideoButton { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (CaptureButton != null) {
				CaptureButton.Dispose ();
				CaptureButton = null;
			}

			if (TakeEmojiButton != null) {
				TakeEmojiButton.Dispose ();
				TakeEmojiButton = null;
			}

			if (TakeNoteButton != null) {
				TakeNoteButton.Dispose ();
				TakeNoteButton = null;
			}

			if (TakePictureButton != null) {
				TakePictureButton.Dispose ();
				TakePictureButton = null;
			}

			if (TakeVideoButton != null) {
				TakeVideoButton.Dispose ();
				TakeVideoButton = null;
			}
		}
	}
}
