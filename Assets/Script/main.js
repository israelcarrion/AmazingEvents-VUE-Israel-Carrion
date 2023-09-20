const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      inputSearch: "",
      filtrados: [],
      listaCheck: [],
      checkOn: []
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(( {events} ) => {
        this.events = events;
        this.filtrados = events;
        this.listaCheck = [...new Set(events.map( event => event.category ))]
    })
  },
  methods:{
    filtroCheck(eventos, checkOn) {
      if(checkOn.length == 0) {
        return eventos
      }
      return eventos.filter(evento => checkOn.includes(evento.category));
    },
    filtroSearch(eventos, inputSearch) {
      return eventos.filter( evento => evento.name.toLowerCase().includes(inputSearch.toLowerCase()) )
    },
    filtroCruzado() {
      let filtradosCheck = this.filtroCheck(this.events, this.checkOn);
      this.filtrados = this.filtroSearch(filtradosCheck, this.inputSearch);
    }
  },
}).mount("#app");


