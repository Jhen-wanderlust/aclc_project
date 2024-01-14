Vue.component('services',
{
       props : ["id"],
    template : `<div :class="'animated fadeInRight component ' + id">
                  <div class="add-option" @click="openAdd()">Add Services</div>

               

                  <div id="add" class="animated fadeIn" v-show="open">
                  <br><br><br>
                  <div class="row">
                  <div class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input @click="autocom" type="text"  v-model="selected" placeholder="Search Category" id="autocomplete-input" class="autocomplete" @change="switchSelect($event)">
                      
                        <label v-if="sentSuccess" id="valid" for="autocomplete-input">  {{selected}} has been selected</label>
                      </div>
                    </div>
                  </div>
                 </div>
              


                      <div class="service-info"><input type="text"  class="in" v-model="selected" placeholder="Name of Category" required>
                      </div>
                      <div class="service-info"><input type="text" class="in" v-model="serv[1]" placeholder="Name of Service" required></div> 
                      <div class="service-info"><input type="number" class="in" v-model="serv[2]" placeholder="Price of Service" required></div> 
                      <!--   <div class="service-info"><input type="number" class="in" v-model="serv[3]" placeholder="Discount"></div> -->
                      <br>
                      <button @click="addService" style="margin:0 auto; display:block;" name="action" class="btn waves-effect waves-light center">
                        <i class="material-icons right">send</i>
                        Add Service
                      </button>
                      <div id="closeme" @click="openAdd()">X</div>
                  </div>
          
                  
                  
                  <br><br><br><br><br><br>
                      <div class="service-main-container" v-show="!open">
                        <div class="animated zoomIn main-service" v-for="cat in categories">
                          <h1 @click="closeedit" class="cat-title">{{ cat }}</h1>
                      
                           <div class="service-info" v-for="service in services" v-if="cat == service.category"  v-on:click.self="$set(service, 'edit',!service.edit)" >
                         
                           {{ service.name }} : php {{ service.price }} 
                             <div v-if="service.edit"  class="name"  >
                           
                             <ul>
                                <li>
                                  <div class="focusable-test" tabindex="0"> 
                                  <input  id="Name" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="service.name"  required>
                                  </div>
                                </li>  

                                <li>
                                  <div class="focusable-test" tabindex="1" > 
                                  <input id="price" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="service.price" required>
                                  </div>
                                </li>  
                                <!--   
                                <li>
                                  <div class="focusable-test" tabindex="1" > 
                                  <input id="discount" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="service.discount" required>
                                  </div>
                                </li>  
                                -->
                             </ul>
                            
                              <button @click="saveedit" :data-id="service.unique">Save</button>
                             
                              </div>
                              <span @click="eliminate" id="closeme" :data-id="service.unique" style="
                               color: white;
                               font-size: 1.9rem;
                               margin-left: 20px;
                               padding: 20px;">X
                               </span>                             
                              <hr class="cont-sep"> 

                        
                           </div>
                        </div>
                      </div>      
                      
                      
   


               </div>`,
    data()
      {
          return {
                   
                   services : [],
                 categories : [],
                       open : false,
                        edit: false,
                sentSuccess : false,
                     selected: '',
                       serv : []
        

                 }
      },
    methods :
     {
      closeedit(e)
      {

       
            setTimeout(() => {
              this.edit = false;
            }, 1000);
            e.stopPropagation();

      },
     
      saveedit(e)
      {

           this.edit = false;

           let key       =   e.srcElement.dataset.id;
           let Name      =   document.querySelector('#Name').value;
           let price     =   document.querySelector('#price').value;
        //  let discount     =   document.querySelector('#discount').value;

           let confirmation = confirm(`Are you sure to save the changes?`);
               
           if(confirmation == true)
            {
        
              this.$http.patch('https://reservation-system-69ff9.firebaseio.com/jheny-salon/services/'+key+'.json?auth='+rest,
              {
              
                  name  :  Name,
                  price :  price
             //  discount :  discount  
                  


                }).then(function(data)
                {
   
              
                this.fetcher();


                 });         
                      }
                    else
                      {
                        return false;
                      }                 



      },

      switchSelect(event) {

          this.selected = event.target.value;
          setTimeout(() => {
            this.sentSuccess =  true;
            setTimeout(() => {
              this.sentSuccess =  false;
            }, 8000);
          }, 3000);
      },


        openAdd()
         {

              this.open = !this.open;
         },
         
        addService()
         {
           
            if(this.selected.length > 0 &  this.serv[1].length != 0  &  this.serv[2].length != 0)
              {
        
                    let cat = this.selected.toLowerCase().trim();             
                    this.$http.post('https://reservation-system-69ff9.firebaseio.com/jheny-salon/services/.json?'+rest,
                                   {
                                    "category" : cat,
                                        "name" : this.serv[1],
                                       "price" : this.serv[2]
                                 //   "discount" : this.serv[3],
                                       
                                   }).then(function(data)
                                   {
                                     this.open = !this.open;
                                     this.selected = "";
                                     this.serv[1] = "";
                                     this.serv[2] = "";
                                   //  this.serv[3] = "";
                                     this.fetcher();
                                   });

                                    setTimeout(() => {
                                      document.querySelectorAll('.service-info input')[0].value = null;
                                    }, 8000);

              }
         },

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
         },
         
        eliminate(e)
         {
            let unique = e.srcElement.dataset.id;
            
            let confirmation = confirm('Are You Sure You Want To Delete This Service!');
            
              if(confirmation == true)
               {
        
                    this.$http.delete("https://reservation-system-69ff9.firebaseio.com/jheny-salon/services/"+unique+".json?"+rest).then(function(data)
                     {
                         this.fetcher();
                     });                 
        
               }
              else
               {
                 return false;
               }

         },

        autocom(){

            
            var elems = document.querySelectorAll('.autocomplete');

            var x = document.querySelectorAll('.cat-title')
            var sub_array = [];
            var super_array = [];
            
            for (var i=0; i<x.length; i++){
            var nametext = x[i].innerHTML;
            
            sub_array.push(nametext);
            super_array.push(sub_array.slice(0));
                
             
            };

            var data = {};

            for (const key of sub_array) {
                  data[key] = null;
            }
        
            var options = {
              data: data,
            }
           

            var instances = M.Autocomplete.init(elems,options);
             console.log(instances);
            //document.querySelectorAll('.service-info input')[0].value =  selected;
            
        },
       
              
    
    },
   created()
    {
        this.fetcher();
        this.autocom();
    },
    
  

});




