const { createApp } = Vue;

createApp({
  data() {
    return {
        events: [],
        pastEvents: [],
        tablaDos: [],
        tablaTres: [],
        listaCheckUp: [],
        listaCheckPast:[],
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(( {events, currentDate} ) => {
        this.events = events;
        this.pastEvents = events.filter( evento => evento.date < currentDate );
        console.log(this.pastEvents)
        eventosUpcoming = events.filter( evento => evento.date >= currentDate );
        this.listaCheckUp = [...new Set( eventosUpcoming.map( event => event.category ) )]
        this.tablaDos = this.segundaTabla(this.listaCheckUp, eventosUpcoming)
        this.listaCheckPast = [...new Set( this.pastEvents.map( event => event.category ) )]
        this.tablaTres = this.tercerTabla(this.listaCheckPast, this.pastEvents);
    })
    .catch( err => console.log(err) )
  },
  methods:{
    porcentajeMayor(eventos){
        let porcentMayor = 1; 
        let eventoMayor; 
        eventos.forEach( evento => {
            let calculo = (evento.assistance*100)/evento.capacity
            if(calculo > porcentMayor){
                porcentMayor = calculo;
                eventoMayor = evento.name;
            }
        });
        return `${eventoMayor} ${porcentMayor.toFixed(1)}%`
    },
    porcentajeMenor(eventos){
        let porcentMayor = 100; 
        let eventoMayor; 
        eventos.forEach( evento => {
            let calculo = (evento.assistance*100)/evento.capacity
            if(calculo < porcentMayor){
                porcentMayor = calculo;
                eventoMayor = evento.name;
            }
        });
        return `${eventoMayor} ${porcentMayor.toFixed(1)}%`
    },
    capacidadMax(eventos){
        let maxCapacidad = 1;
        let eventoMaxCapacidad;
        eventos.forEach( evento => {
            if(evento.capacity > maxCapacidad){
                maxCapacidad = evento.capacity;
                eventoMaxCapacidad = evento.name;
            }
        });
        return `${eventoMaxCapacidad} ${maxCapacidad}`;
    },
    segundaTabla(categorias, eventos){
        let tabla = [];
        categorias.forEach(categoria => {
            let eventoPorCat = eventos.filter(evento => evento.category == categoria)
            let ganancia = 0;
            let porcentaje = 0;
            eventoPorCat.forEach(e => {
                    ganancia += (e.estimate * e.price)
                    porcentaje += (e.estimate * 100 / e.capacity)/(eventoPorCat.length)
            })
            if(ganancia !== 0 && porcentaje !== 0){
                tabla.push(
                    {
                        categoria: categoria,
                        ganancia: `$${ganancia.toLocaleString()}`,
                        porcentaje: `${porcentaje.toFixed(2)} %`
                    }
                ) 
            }
        });
        return tabla;
    },
    tercerTabla(categorias, eventos){
        let tabla = [];
        categorias.forEach(categoria => {
            let eventoPorCat = eventos.filter(evento => evento.category == categoria)
            let ganancia = 0;
            let porcentaje = 0;
            eventoPorCat.forEach(e => {
                    ganancia += (e.assistance * e.price)
                    porcentaje += (e.assistance * 100 / e.capacity)/(eventoPorCat.length)
            })
            if(ganancia !== 0 && porcentaje !== 0){
                tabla.push(
                    {
                        categoria: categoria,
                        ganancia: `$${ganancia.toLocaleString()}`,
                        porcentaje: `${porcentaje.toFixed(2)} %`
                    }
                ) 
            }
        });
        console.log(tabla)
        return tabla;
    },
  },
  computed:{
    
  }
}).mount("#app");