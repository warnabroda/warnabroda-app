var Ajax = {
  get: {
    contact_types: function() {
      $.getJSON(Env.url + "contact_types").done(function(data) {
        ractive_componentes.contact_types(data);
      }).fail(function() {
        ractive_componentes.warn_bies(Env.default_vars.warn_bies);
        console.log( "error" );
      });
    },
    warns: function() {
      var language = $( "input[name='language']:checked" ).val();
      $.getJSON(Env.url + "messages/" + language).done(function(data) {
        ractive_componentes.warns(data);
      }).fail(function() {
        ractive_componentes.warns(Env.default_vars.warns);
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
    this.get.contact_types();
    this.get.warns();
    this.post.warn();
  }
}
