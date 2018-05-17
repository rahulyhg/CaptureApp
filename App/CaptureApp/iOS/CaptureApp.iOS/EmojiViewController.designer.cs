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
	[Register ("EmojiViewController")]
	partial class EmojiViewController
	{
		[Outlet]
		UIKit.UICollectionView CollectionView { get; set; }

		[Outlet]
		UIKit.UITextField CommentTextField { get; set; }

		[Outlet]
		UIKit.UIButton CreateButton { get; set; }

		[Outlet]
		UIKit.UIScrollView ScrollView { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (CollectionView != null) {
				CollectionView.Dispose ();
				CollectionView = null;
			}

			if (CommentTextField != null) {
				CommentTextField.Dispose ();
				CommentTextField = null;
			}

			if (CreateButton != null) {
				CreateButton.Dispose ();
				CreateButton = null;
			}

			if (ScrollView != null) {
				ScrollView.Dispose ();
				ScrollView = null;
			}
		}
	}
}
