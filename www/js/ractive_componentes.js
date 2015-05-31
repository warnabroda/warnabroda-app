var ractive_componentes = {
  warns: function(warns){
    var ractive = new Ractive({
      el: "#output_warn",
      template: '#template_warns',
      data: { warns_list: warns },
      oncomplete: function () {
        $("select").selectmenu().selectmenu("refresh");
      }
    });
  },

  warn_bies: function(warn_bies) {
    var ractive = new Ractive({
      el: "#output_warn_bies",
      template: '#template_warn_bies',
      data: { warn_bies_list: warn_bies },
      oncomplete: function () {
        $("input[type='radio']").checkboxradio().checkboxradio("refresh");
      }
    });
  },

  contacts:  function(contacts) {
    var ractive = new Ractive({
      el: "#output_contacts",
      template: '#template_li_contacts',
      data: { contacts_list: contacts },
      oncomplete: function () {
        $('#con').listview();
      }
    });

    ractive.on( 'activate', function ( event ) {
      $( "#tel" ).val($(event.node).attr("tel"));
      $("[data-role=panel]").panel("close");
      var tab = $('a[href="index.html#tab1"]');
      tab.trigger("click");
      tab.addClass("ui-btn-active");
    });
  },

  emails: function(contacts) {
    var ractive = new Ractive({
      el: "#output_emails",
      template: '#template_emails',
      data: { contacts_list: contacts }
    });
  }
};
