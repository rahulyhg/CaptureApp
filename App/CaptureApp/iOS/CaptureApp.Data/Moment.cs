using System;
using System.Xml.Serialization;
using System.Collections.Generic;

namespace CaptureApp.Data
{
	public class Moment{

		private SyncState synced;

		public event Action SyncedChanged;

		public Moment(){
			this.Media = new List<Media> ();
			this.Emojis = new List<string> ();
			this.Location = new MomentLocation ();
		}

		public String GUID 
		{
			get;
			set;
		}

		public String Title {
			get;
			set;
		}

		public String Comment{
			get;
			set;
		}

		public List<Media> Media {
			get;
			set;
		}
			

		public List<String> Emojis 
		{
			get;
			set;
		}

		public MomentLocation Location
		{
			get;
			set;
		}
			
		public String UserID{
			get;
			set;
		}

		public DateTime Date 
		{
			get;
			set;
		}


		public MomentState State {
			get;
			set;
		}

		public SyncState Synced
		{
			get {
				return this.synced;
			}
			set{
				this.synced = value;
				if (SyncedChanged != null)
					SyncedChanged ();
			}

		}
	}


}

