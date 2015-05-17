function onDeviceReady() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name", "addresses", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

// onSuccess: Get a snapshot of the current contacts
//
function onSuccess(contacts) {
    // display the address information for all contacts
    for (var i = 0; i < contacts.length; i++) {
      //var html = contacts[i].displayName + "</br>";
        //for (var j = 0; j < contacts[i].addresses.length; j++) {
            //var html = ("Pref: "           + contacts[i].addresses[j].pref          + "\n" +
            //      "Type: "           + contacts[i].addresses[j].type          + "\n" +
            //      "Formatted: "      + contacts[i].addresses[j].formatted     + "\n" +
            //      "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
            //      "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
            //      "Region: "         + contacts[i].addresses[j].region        + "\n" +
            //      "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
            //      "Country: "        + contacts[i].addresses[j].country);
            //alert(html);
        //}
        var html = ("Formatted: "    + contacts[i].name.formatted       + "</br>" +
                    "Family Name: "  + contacts[i].name.familyName      + "</br>" +
                    "Given Name: "   + contacts[i].name.givenName       + "</br>" +
                    "Middle Name: "  + contacts[i].name.middleName      + "</br>" +
                    "Suffix: "       + contacts[i].name.honorificSuffix + "</br>" +
                    "Prefix: "       + contacts[i].name.honorificSuffix);
        $( "#con" ).append( html );
    }
};
// onError: Failed to get the contacts
//
function onError(contactError) {
    $( "#con" ).append( contactError + "</br>" );
}


var app = {

  initialize: function() {
      $(document).off('pageshow').on('pageshow', '#main-page', this.bindEvents);
      //$(document).delegate('#page_name', 'pageshow', function () {
      //    var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
      //    $(this).height($(window).height()).find('[data-role="content"]').height(the_height);
      //});

      // Wait for device API libraries to load
      //
      document.addEventListener("deviceready", onDeviceReady, false);
      // device APIs are available
      //
  },

  hideAllDivs: function() {
      $("#div_email").hide();
  },

  selectChange: function() {
      $("input[type='radio']").bind( "change", function(event, ui) {
        if( $('input[name=warn_by]:checked').val() === "0" ) {
            $("#div_email").show();
            $("#div_tel").hide();
        } else {
            $("#div_email").hide();
            $("#div_tel").show();
        }
      });
  },

  bindEvents: function() {
     app.hideAllDivs();
     app.selectChange();
  }
};
