var Ajax = {
  get: {
    warn_bies: function() {
      $.getJSON(Env.url + "warn_bies.json", function(data) {
        ractive_componentes.warn_bies(data);
      });
    },
    warns: function() {
      $.getJSON(Env.url + "warns.json", function(data) {
        ractive_componentes.warns(data);
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
          data: JSON.stringify({warn: warn_val, email: email_val, tel: tel_val, warn_by: warn_by_val})
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
