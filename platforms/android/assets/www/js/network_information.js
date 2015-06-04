var network_information = {

  checkConnection: function() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      alert('Connection type: ' + states[networkState]);
  },

  onOnline: function() {
      // Handle the online event
      // alert("online");
  },

  onOffline: function() {
      // Handle the offline event
      // alert("Offline");
  },

  initialize: function() {
    document.addEventListener("online", this.onOnline, false);
    document.addEventListener("offline", this.onOffline, false);
  }

};
