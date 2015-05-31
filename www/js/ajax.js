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

  },
  initialize: function() {
    this.get.warn_bies();
    this.get.warns();
  }
}
