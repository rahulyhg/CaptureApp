
using System;
using System.Linq;
using System.Collections.Generic;

using MonoTouch.Dialog;

using Foundation;
using UIKit;
using CaptureApp.Data;
using CoreGraphics;
using System.Threading.Tasks;
using MapKit;
using CoreLocation;

namespace CaptureApp.iOS
{
	public partial class EditDialog : DialogViewController
	{
		private UICollectionView emojiCollectionView;
		private UICollectionView imagesCollectionView;
		private UICollectionView videosCollectionView;
		private Moment moment;
		private UIActivityIndicatorView indicator;

		private EntryElement titleElement;
		private EntryElement commentElement;
		private MKMapView mapView;

		public EditDialog () :base(null,true)
		{
			this.emojiCollectionView = new UICollectionView (CoreGraphics.CGRect.Empty, new LineLayout (new CGSize(320,120),false));
			this.emojiCollectionView.RegisterClassForCell (typeof(EmojiCell), "emojiCell");
			this.emojiCollectionView.BackgroundColor = UIColor.White;
			List<String> strings = new List<String> ();
			strings.AddRange(EmojiFactory.GetEmojieCodes ());
			EmojiSource source = new EmojiSource (strings);
			this.emojiCollectionView.Source = source;
			this.emojiCollectionView.Frame = new CoreGraphics.CGRect (0, 0, 320, 120);

			this.imagesCollectionView = new UICollectionView (CoreGraphics.CGRect.Empty, new LineLayout (new CGSize(120,120),false));
			this.imagesCollectionView.RegisterClassForCell (typeof(ImageCell), "imageCell");
			this.imagesCollectionView.BackgroundColor = UIColor.White;
			this.imagesCollectionView.Frame = new CoreGraphics.CGRect (0, 0, 320, 120);

			this.videosCollectionView = new UICollectionView (CoreGraphics.CGRect.Empty, new LineLayout (new CGSize(120,120),false));
			this.videosCollectionView.RegisterClassForCell (typeof(ImageCell), "imageCell");
			this.videosCollectionView.BackgroundColor = UIColor.White;
			this.videosCollectionView.Frame = new CoreGraphics.CGRect (0, 0, 320, 120);

			this.titleElement = new EntryElement ("Title", "Title", "");
			this.commentElement = new EntryElement ("Comment", "Comment", "");
			this.mapView = new MKMapView ();
			this.mapView.Layer.BorderColor = UIColor.Black.ColorWithAlpha (0.1f).CGColor;
			this.mapView.Layer.BorderWidth = 1f;
			this.mapView.Camera.Heading = 0;
			this.mapView.Camera.Pitch = 120;
			rotateCamera ();


		}

		private async void rotateCamera(){
			if (this.mapView.Camera.Heading == 0)
				this.mapView.Camera.Heading = 10;
			InvokeOnMainThread (delegate {
				this.mapView.Camera.Heading+= 0.05;	
			});
			await Task.Delay (10);
			rotateCamera ();
		}

		public override void ViewDidDisappear (bool animated)
		{
			base.ViewDidDisappear (animated);
			if (this.moment == null)
				return;
			this.moment.Title = this.titleElement.Value;
			this.moment.Comment = this.commentElement.Value;
			if (emojiCollectionView.VisibleCells.Length > 0) {
				String emoji = ((EmojiCell)this.emojiCollectionView.VisibleCells [0]).Text;
				if (this.moment.Emojis.Count > 0)
					this.moment.Emojis [0] = emoji;
				else
					this.moment.Emojis.Add (emoji);
			}
			if (this.moment != null) {
				this.moment.State = (this.moment.State == MomentState.New &&
					this.moment.Media.Count > 0)  ? MomentState.InProgress : MomentState.New;
				AppDelegate.MomentsManager.SaveMoments ();
				AppDelegate.MomentsManager.SyncMoment (this.moment);
			}
		}
		public override void ViewWillDisappear (bool animated)
		{
			base.ViewWillDisappear (animated);
			this.NavigationController.SetToolbarHidden (true, true);
		}

		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
			UIBarButtonItem deleteItem = new UIBarButtonItem (UIBarButtonSystemItem.Trash, delegate {
				UIAlertView alert = new UIAlertView("Delete Moment","Are you sure you want to delete this moment?",null,"Yes","No");
				alert.Clicked += (sender, e) => {
					if(e.ButtonIndex == 0){
						AppDelegate.MomentsManager.DeleteMoment(this.moment);
						this.moment = null;
						this.NavigationController.PopViewController(true);
					}
				};
				alert.Show();

			});
			this.NavigationController.SetToolbarHidden (false, true);
			this.SetToolbarItems (new UIBarButtonItem[]{new UIBarButtonItem(UIBarButtonSystemItem.FlexibleSpace), deleteItem},true);
			List<String> emojis = new List<string> ();
			emojis.AddRange (EmojiFactory.GetEmojieCodes ());
			if (this.moment.Emojis.Count > 0) {
				int index = emojis.IndexOf (this.moment.Emojis [0]);
				emojiCollectionView.ScrollToItem (NSIndexPath.FromRowSection (index, 0), UICollectionViewScrollPosition.CenteredHorizontally, false);
			}

			this.indicator = new UIActivityIndicatorView (new CGRect (0, 0, 30, 30));
			this.indicator.Color = this.NavigationController.NavigationBar.TintColor;
			this.indicator.HidesWhenStopped = true;

			this.NavigationItem.RightBarButtonItem = new UIBarButtonItem (this.indicator);
			syncedChanged ();
			if (this.moment != null) {
				AppDelegate.MomentsManager.SyncMoment (this.moment);
				this.imagesCollectionView.ReloadData ();
				this.videosCollectionView.ReloadData ();
			}
			this.mapView.Frame = new CGRect (0, 0, this.TableView.Bounds.Width, 120);
			this.Reload ();

			AppDelegate.MomentsManager.Synced -= momentsSynced;
			AppDelegate.MomentsManager.Synced += momentsSynced;
		}

		private void momentsSynced(){
			Reload();
		}

		public void Config(Moment moment){
			if (this.moment != null)
				this.moment.SyncedChanged -= syncedChanged;
			this.moment = moment;
			this.moment.SyncedChanged += syncedChanged;

			BooleanElement boolElement = new BooleanElement ("Mark as Finished", this.moment.State == MomentState.Finished);
			boolElement.ValueChanged += (sender, e) => {
				if(boolElement.Value)
					this.moment.State = MomentState.Finished;
				else
					this.moment.State = MomentState.InProgress;
			};

			this.titleElement.Value = moment.Title;
			this.commentElement.Value = moment.Comment;
			Root = new RootElement ("Edit") {
				new Section ("") {
					new BasicViewElement(this.mapView,120),
					this.titleElement,
					this.commentElement,
					new StringElement("Erstellt:",moment.Date.ToString("H:mm:ss dd.MM.yy"))
				},

				new Section ("Images") {
					new BasicViewElement(imagesCollectionView,120),
					new StringElement("New Image",delegate {
						var imagePicker = new PictureMomentViewController();
						imagePicker.Config(moment);
						var sheet = PictureMomentViewController.GetActionSheet(imagePicker,this.NavigationController,false);
						sheet.ShowInView(this.TableView);
						imagePicker.Finished += async(Moment obj) => {
							Reload();
							await Task.Delay(3000);
							AppDelegate.MomentsManager.SaveMoments();
							await AppDelegate.MomentsManager.SyncMoment (this.moment);
						};
					})

				},
				new Section ("Videos") {
					new BasicViewElement(videosCollectionView,120),
					new StringElement("New Video",delegate {
						var imagePicker = new PictureMomentViewController();
						imagePicker.Config(moment);
						var sheet = PictureMomentViewController.GetActionSheet(imagePicker,this.NavigationController,true);
						sheet.ShowInView(this.TableView);
						imagePicker.Finished += (Moment obj) => {
							Reload();
							AppDelegate.MomentsManager.SaveMoments();
							AppDelegate.MomentsManager.SyncMoment (this.moment);
						};
					})
				},
				new Section ("Emojis") {
					new BasicViewElement(emojiCollectionView,120)
				},
			};
			Reload ();
		}

		public void Reload(){

			ImagesSource imgSource = new ImagesSource (moment.Media.FindAll((obj) => {return obj.Type == "Image";}));
			this.imagesCollectionView.Source = imgSource;
			imgSource.MediaSelected += (media) => 
			{
				MediaViewController viewController = new MediaViewController();
				viewController.Config(media,this.moment);
				this.NavigationController.PushViewController(viewController,true);
			};

			ImagesSource videoSource = new ImagesSource (moment.Media.FindAll((obj) => {return obj.Type == "Video";}));
			this.videosCollectionView.Source = videoSource;
			videoSource.MediaSelected += (media) => 
			{
				MediaViewController viewController = new MediaViewController();
				viewController.Config(media,this.moment);
				this.NavigationController.PushViewController(viewController,true);
			};

			this.mapView.RemoveAnnotations (this.mapView.Annotations);
			this.mapView.AddAnnotation (new MKPointAnnotation () {
				Coordinate = new CoreLocation.CLLocationCoordinate2D (this.moment.Location.Lat,this.moment.Location.Lng)
			});
			mapView.SetCenterCoordinate (new CoreLocation.CLLocationCoordinate2D (this.moment.Location.Lat,this.moment.Location.Lng), true);
			mapView.Camera.Altitude = 500;
		}


		private void syncedChanged()
		{
			if (indicator != null) {
				if (moment.Synced == SyncState.Synchronizing)
					indicator.StartAnimating ();
				else
					indicator.StopAnimating ();
			}
		}



		private class EmojiSource:UICollectionViewSource{

			private List<String> urls;

			public EmojiSource(List<String> urls){
				this.urls = urls;
			}

			public override UICollectionViewCell GetCell (UICollectionView collectionView, Foundation.NSIndexPath indexPath)
			{
				var emojiCell = (EmojiCell)collectionView.DequeueReusableCell ("emojiCell", indexPath);
				emojiCell.Config (this.urls [indexPath.Row],50);
				return emojiCell;
			}

			public override nint NumberOfSections (UICollectionView collectionView)
			{
				return 1;
			}

			public override nint GetItemsCount (UICollectionView collectionView, nint section)
			{
				return this.urls.Count;
			}
		}

		private class ImagesSource:UICollectionViewSource{

			private List<Media> images;

			public event Action<Media> MediaSelected;

			public ImagesSource(List<Media> images){
				this.images = images;
			}

			public override UICollectionViewCell GetCell (UICollectionView collectionView, Foundation.NSIndexPath indexPath)
			{
				var imageCell = (ImageCell)collectionView.DequeueReusableCell ("imageCell", indexPath);
				imageCell.Config (this.images [indexPath.Row]);

				return imageCell;
			}

			public override nint NumberOfSections (UICollectionView collectionView)
			{
				return 1;
			}

			public override void ItemSelected (UICollectionView collectionView, NSIndexPath indexPath)
			{
				if (this.MediaSelected != null)
					this.MediaSelected (this.images [indexPath.Row]);
			}

			public override nint GetItemsCount (UICollectionView collectionView, nint section)
			{
				return this.images.Count;
			}
		}


		private class BasicViewElement:UIViewElement,IElementSizing{

			private nfloat height;

			public BasicViewElement(UIView view,nfloat height):base("",view,false){
				this.height = height;
			}

			public override UITableViewCell GetCell (UITableView tv)
			{
				this.View.Frame = new CoreGraphics.CGRect(0,0,tv.Bounds.Width,height);
				return base.GetCell (tv);
			}

			nfloat IElementSizing.GetHeight(UITableView tableview, NSIndexPath path) 
			{ 
				return height;
			} 
		}
	}
}
