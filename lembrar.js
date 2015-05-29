var pns = [
{ type: 'work',   value: '212-555-1234', pref: false },
{ type: 'mobile', value: '917-555-5432', pref: true },
{ type: 'home',   value: '203-555-7890', pref: false }
];
var ems = [
{ type: 'work',   value: '212-555-1234', pref: false },
{ type: 'mobile', value: '917-555-5432', pref: true },
{ type: 'home',   value: '203-555-7890', pref: false }
];
var contacts = [
 {id: 1, displayName: "teste",  phoneNumbers :pns, emails:  },
 {id: 2, displayName: "teste 2",  phoneNumbers :pns, emails:  }
];





ractive_componentes.contacts(contacts);



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
});
