Vue.component('services',
{

    template : `<div>
                  <div class="add-option" @click="openAdd()">Add Services</div>
                  <div id="add" class="animated fadeIn" v-show="open">
                      <div class="service-info"><input type="text" class="in" v-model="serv[0]" placeholder="Name of Service"></div> 
                      <div class="service-info"><input type="text" class="in" v-model="serv[1]" placeholder="Price of Service"> </div> 
                      <br>
                      <button @click="addService" style="margin:0 auto; display:block;" name="action" class="btn waves-effect waves-light center">
                        <i class="material-icons right">send</i>
                        Add Service
                      </button>
                      <div id="closeme" @click="openAdd()">X</div>
                  </div>
          
                  
                  
                  <br><br><br><br><br><br>
                      <div class="service-main-container" v-show="!open">
                        <div class="animated zoomIn main-service" v-for="service in services">
                          <div class="service-info">Name : {{ service.name }}</div> 
                              <i class="cont-icon material-icons">settings</i>
                              <hr class="cont-sep"> 
                            <div class="service-info">Price : {{ service.price }}</div>
                              <i class="cont-icon material-icons">money</i>
                              <hr class="cont-sep">
                              <div class="service-info">Price : {{ service.discount }}</div>
                              <i class="cont-icon material-icons">discount</i>
                              <hr class="cont-sep">
                              <div @click="eliminate" id="closeme" :data-id="service.unique" style="color:white;font-size:1.9rem;margin-top:20px;">X</div>
                        </div>
                      </div>                  
               </div>`,
    data()
      {
          return {
                   
                   services : [],
                       open : false,
                       serv : []

                 }
      },
    methods :
     {
        openAdd()
         {

              this.open = !this.open;
         },
         
        addService()
         {
            if(this.serv[0].length > 0 &  this.serv[1].length != 0)
              {
        
                    this.$http.post('https://salon-management-system-598d0.firebaseapp.com/jheny-app/services.json?'+rest,
                                   {
                                        "name" : this.serv[0],
                                       "price" : this.serv[1]
                                       
                                   }).then(function(data)
                                   {
                                     this.open = !this.open;
                                     this.serv[0] = "";
                                     this.serv[1] = "";
                                     this.fetcher();
                                   });
              }
         },

        fetcher()
         {
             // Fetching Data From FireBase
             this.$http.get('https://salon-management-system-598d0.firebaseio.com/jheny-app/services.json').then(function(data)
              {
                   return data.json();
              }).then(function(data)
              {
                  let requests = [];
                  for(let key in data)
                   {
                       data[key].unique = key; // Adding the property (unique) in every object & assigning the value of objects,key
                       
                       requests.push(data[key]);
                    }
                   this.services = requests; 
                   console.log(this.services);
              });
         },
         
        eliminate(e)
         {
            let unique = e.srcElement.dataset.id;
            this.$http.delete("https://salon-management-system-598d0.firebaseio.com/jheny-app/services/"+unique+".json?"+rest).then(function(data)
             {
                 this.fetcher();
             });
         }
    
    },
   created()
    {
        this.fetcher();
    }   

});