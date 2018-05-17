using System;

namespace CaptureApp.Data
{
	public class Media
	{
		private SyncState synced;
		public event Action SyncedChanged;


		public Media ()
		{
		}

		public String URL
		{
			get;
			set;
		}

		public SyncState Synced
		{
			get{
				return this.synced;
			}
			set{
				this.synced = value;
				if (this.SyncedChanged != null)
					SyncedChanged ();
			}
		}

		public String GUID
		{
			get;
			set;
		}

		public String Type
		{
			get;
			set;
		}


	}
}

