using System;
using CaptureApp.API;
using CoreLocation;
using CaptureApp.Data;

namespace CaptureApp.iOS
{
	public class IOSLocationManager:ILocationManager
	{
		private CLLocationManager locationManager;
		private MomentLocation location;

		public IOSLocationManager ()
		{
			this.location = new MomentLocation (){ Lat = 0, Lng = 0 };
			locationManager = new CLLocationManager();
			locationManager.LocationsUpdated += (sender, e) => 
			{
				this.location = new MomentLocation () {Lat = this.locationManager.Location.Coordinate.Latitude,
					Lng = this.locationManager.Location.Coordinate.Longitude
				};
			};
			locationManager.RequestAlwaysAuthorization ();
			locationManager.RequestWhenInUseAuthorization ();
			locationManager.DesiredAccuracy = 5;
			locationManager.StartUpdatingLocation ();
		}

		#region ILocationManager implementation

		public MomentLocation GetCurrentLocation ()
		{
			return this.location;
		}

		public CLLocationManager LocationManager {
			get {
				return this.locationManager;
			}
		}


		public void Update ()
		{
			try{
				this.location = new MomentLocation () {Lat = this.locationManager.Location.Coordinate.Latitude,
					Lng = this.locationManager.Location.Coordinate.Longitude
				};
			}
			catch(Exception ex){
				Console.WriteLine (ex);
			}
		}
		#endregion
	}
}

