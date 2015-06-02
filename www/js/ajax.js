var Ajax = {
  get: {
    warn_bies: function() {
      $.getJSON(Env.url + "warn_bies.json").done(function(data) {
        ractive_componentes.warn_bies(data);
      }).fail(function() {
        console.log( "error" );
      });
    },
    warns: function() {
      var language = $( "input[name='language']:checked" ).val();
      $.getJSON(Env.url + "warns.json", {lang_key: language}).done(function(data) {
        ractive_componentes.warns(data);
      }).fail(function() {
        console.log( "error" );
      });
    }
  },
  post: {
    warn: function() {
      $( "#warnForm" ).submit(function( event ) {
        event.preventDefault();

        var $form = $( this ),
          warn_val = $form.find( "#warn" ).val(),
          email_val = $form.find( "#email" ).val(),
          tel_val = $form.find( "#tel" ).val(),
          warn_by_val = $form.find( '#select[name="warn_by"] option:selected' ).val();

        $.ajax({
          url:  Env.url + "warns.json",
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({authenticity_token: "t2oO5K+SXC3PuPNX2hgXbwbP/4nATIJicWF1gvQEQks=", warn: warn_val, email: email_val, tel: tel_val, warn_by: warn_by_val})
        });
      });
    }
  },
  initialize: function() {
    this.get.warn_bies();
    this.get.warns();
    this.post.warn();
  }
}
