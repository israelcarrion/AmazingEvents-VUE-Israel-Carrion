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
    .then(( {events, currentDate} ) => {
        this.events = events.filter( evento => evento.date >= currentDate );
        this.listaCheck = [...new Set( this.events.map( event => event.category ) )]
        this.filtrados = this.events;
    })
    .catch( err => console.log(err) )
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
    },
  },
  computed:{
    
  }
}).mount("#app");