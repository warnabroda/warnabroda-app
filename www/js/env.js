var Env = {
  url: "http://xispe-elementary:3000/warnabroda/",
  default_vars: {
  	warns: [ { id: 1, name: "Alguém lhe recomendou usar o serviço de aviso anônimo", lang_key: "pt-br", url: "http://192.168.1.181:4000/warns/1.json" }, { id: 2, name: "Eu sei que você peidou", lang_key: "pt-br", url: "http://192.168.1.181:4000/warns/2.json" } ],
  	warn_bies: [ { id: 1, label: "E-Mail", checked: false, url: "http://192.168.1.181:4000/warn_bies/1.json" }, { id: 2, label: "SMS", checked: false, url: "http://192.168.1.181:4000/warn_bies/2.json" }, { id: 3, label: "WhatsApp", checked: true, url: "http://192.168.1.181:4000/warn_bies/3.json" } ]
  }
}
