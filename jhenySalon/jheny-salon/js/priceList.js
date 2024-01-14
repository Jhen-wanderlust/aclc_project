Vue.component('pricelist',
 {
    props : ["id"],
    template : `<div :class="'animated fadeInRight component pricelist ' + id">
                      
                      <div style="margin-top:150px;" class="service-main-container">
                        <div class="animated zoomIn main-service" v-for="cat in categories">
                          <h1 class="cat-title">{{ cat }}</h1>
                           <div class="service-info" v-for="service in services" v-if="cat == service.category">
                             {{ service.name }} : php {{ service.price }}
                              <hr class="cont-sep"> 
                           </div> 
                        </div>
                      </div>                  
           
                </div>`,
    data()
      {
          return {
                   services : [],
                   categories : []
                 }
      },
    methods :
     {
        fetcher()
         {
             // Fetching Data From FireBase
             this.$http.get('https://reservation-system-69ff9.firebaseio.com/jheny-salon/services.json').then(function(data)
              {
                   return data.json();
              }).then(function(data)
              {
                    let requests = [];
                  for(let key in data)
                   {
                       data[key].unique = key; // Adding the property (unique) in every object & assigning the value of objects,key
                       
                       requests.push(data[key]);
                     (this.categories.includes(data[key].category)) ? false : this.categories.push(data[key].category);
                   }
                   this.services = requests; 
              });
         }
     
    },
   created()
    {
        this.fetcher();
    }   

});