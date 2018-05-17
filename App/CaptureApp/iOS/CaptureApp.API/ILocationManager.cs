using System;
using CaptureApp.Data;

namespace CaptureApp.API
{
	public interface ILocationManager
	{
		MomentLocation GetCurrentLocation();
		void Update();
	}
}

