const { createApp } = Vue;

createApp({
  data() {
    return {
      event: [],
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(( {events} ) => {
      let idEvento = new URLSearchParams(location.search).get("parameter");
      this.event = events.find( evento => evento._id == idEvento);
    })
    .catch( err => console.log(err) )
  },
}).mount("#app");