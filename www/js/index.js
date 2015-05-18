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
    var con = $( "#con" );
    for (var i = 0; i < contacts.length; i++) {
      if(contacts[i].phoneNumbers != null) {
        con.append( "<li><a href='#'' id='con_" + contacts[i].id + "'>"    + contacts[i].name.formatted     + " | " + contacts[i].phoneNumbers[0] + " | " + contacts[i].phoneNumbers.size );
      }
    }
    con.listview( "refresh" );
};
// onError: Failed to get the contacts
//
function onError(contactError) {
    $( "#con" ).append( contactError + "</br>" );
}


var app = {

  initialize: function() {
    height_content();
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

    forms();
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


var height_content = function() {
  var screen = $.mobile.getScreenHeight();
  var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight();
  var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();
  /* content div has padding of 1em = 16px (32px top+bottom). This step
  can be skipped by subtracting 32px from content var directly. */
  var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
  var content = screen - header - footer - contentCurrent;
  $(".ui-content").height(content);
}

