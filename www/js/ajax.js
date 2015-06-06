var Ajax = {
  get: {
    contact_types: function() {
      $.getJSON(Env.url + "contact_types").done(function(data) {
        ractive_componentes.contact_types(data);
      }).fail(function() {
        ractive_componentes.contact_types(Env.default_vars.warn_bies);
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
          warn_by_val = $form.find( '#select[name="warn_by"] option:selected' ).val(),
          language = $( "input[name='language']:checked" ).val();

          var params = JSON.stringify({browser: "Android",
                                contact: tel_val ? email_val : tel_val,
                                created_date: "2015-06-05T20:56:10.271Z",
                                device: "Android",
                                enableName: false,
                                id_contact_type: warn_by_val,
                                id_message: warn_val,
                                ip: "187.94.99.90",
                                lang_key: "pt-br",
                                operating_system: "linux",
                                raw: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36",
                                timezone: "180",
                                warning_resp: {}});
          var first_cb = function(data) {
            alert(data);
          };

          var done_cb = function(data) {
            alert(data);
          };
          $.post(Env.url + "warnings", params, first_cb).done(done_cb);

      });
    }
  },
  initialize: function() {
    this.get.contact_types();
    this.get.warns();
    this.post.warn();
  }
}
