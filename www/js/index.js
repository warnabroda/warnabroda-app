function alertCarrier() {
  var succ = function (data) {
    alert(data['carrierName']);
    alert(data['countryCode']);
    alert(data['mcc']);
    alert(data['mnc']);
  };
  var err = function () {
    alert('Error!');
  };
  window.plugins.carrier.getCarrierInfo(succ, err)
};


var onDeviceReady = function() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name", "addresses", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
};

// onSuccess: Get a snapshot of the current contacts
//
var onSuccess = function(contacts) {
  ractive_componentes.contacts(contacts);
};
// onError: Failed to get the contacts
//
var onError = function(contactError) {
  console.log(contactError);
};

var app = {

  initialize: function() {
    $(document).off('pageshow').on('pageshow', '#main-page', this.bindEvents);
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener('deviceready', alertCarrier, false);

    forms();
    ractive_componentes.warns(warns);
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
     $('.ui-btn-active').click();
  }
};


var forms = function() {
  $( "#warnForm" ).submit(function( event ) {
    // Stop form from submitting normally
    event.preventDefault();

    // Get some values from elements on the page:
    var $form = $( this ),
      warn_val = $form.find( "#warn" ).val(),
      email_val = $form.find( "#email" ).val(),
      tel_val = $form.find( "#tel" ).val(),
      warn_by_val = $form.find( '#select[name="warn_by"] option:selected' ).val(),

      url = $form.attr( "action" );

    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({warn: warn_val, email: email_val, tel: tel_val, warn_by: warn_by_val})
    });
  });
};
