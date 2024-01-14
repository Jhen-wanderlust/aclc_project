Vue.component('salons',
{
       props : ['id'],
    template : `<div :class="'animated fadeInLeft component '+id">
                   
                  <button @click="showOptions"  class="btn waves-effect waves-light right" name="action">
                   <i class="material-icons right">send</i>
                    Add Your Salone Here
                   </button>
                   <br>
                   <div class="input-field col s6">
                   <i class="material-icons prefix search">search</i>
                   <textarea id="icon_prefix2" class="materialize-textarea" @keyup="searchResult" v-model="search"></textarea>
                   <label for="icon_prefix2" class="salons-search">Search Salons By Name , City or Town</label>
                   </div>
                     <div class="input-field col s6" v-if="showAddSalonOption">
                       <input v-model="salonName" placeholder="Salon Name" id="salonname" type="text" class="validate salon-input">
                     </div>
                     <div class="input-field col s6" v-if="showAddSalonOption">
                       <input v-model="contactNumber" placeholder="Contact Number" id="phone" type="text" class="validate salon-input">
                     </div>                     
                     <div class="input-field col s6" v-if="showAddSalonOption">
                       <input v-model="address" placeholder="Complete Addresses : Street Name , Building No , City Name & Province" id="address" type="text" class="validate salon-input">
                     </div>   
                     <div class="input-field col s6" v-if="showAddSalonOption">
                       <input v-model="timetable" placeholder="Time Table es : 09:00 AM - 05:00 PM" id="timetable" type="text" class="validate salon-input">
                     </div>                                                                                    
                     <button @click="postSalons" class="btn waves-effect waves-light" name="action" v-if="showAddSalonOption">
                     <i class="material-icons right">send</i>
                      Submit Request
                     </button>
                     <h1  v-if="sentSuccessfully">We Have Received Your Request Successfully!</h1>                     
                    
                     <!-------------------------------------------
                                Getting Salons From FireBase
                     -------------------------------------------->
                     <br><br>
                     <table class="pending">
                     <thead>
                         <tr>
                             
                             <th @click="searchResult">Salon Name</th>
                             <th>Contact Number</th>
                             <th>Address</th>
                             <th>Time Table</th>
                             <th>Navigate With Google Maps</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="salon in filteredSalons">
                         
                             <td>{{ salon.salonName }}</td>
                             <td>{{ salon.contactNumber }}</td>
                             <td>{{ salon.address }}</td>
                             <td>{{ salon.timetable }}</td>
                             <td><a target="_blank" :href="'http://google.com/maps/search/?api=1&query='+salon.address">
                                   <i style="color:white;font-size:4rem;" class="material-icons">directions</i><br> Get Directions
                                 </a>
                             </td>
                         </tr>
                              
                     </tbody>
                 </table>

                 
                </div>`,
    data()
      {
         return {

                  showAddSalonOption : false,
                     
                           salonName : "", 
                       contactNumber : "",  
                             address : "",
                           timetable : "",
                    sentSuccessfully : false,
                              salons : [],
                      filteredSalons : [],
                              search : ""

                }
      },
    
    methods : 
      {
          showOptions()
           {
               this.showAddSalonOption = !this.showAddSalonOption;
              
           },
          
          postSalons()
           {

            this.$http.post('https://reservation-system-69ff9.firebaseio.com/salons.json',
             {
            
                 'salonName' : this.salonName,
             'contactNumber' : this.contactNumber,
                   'address' : this.address,
                 'timetable' : this.timetable,
                  'status'   : 'pending'
             }).then(function(data)
              {
                    this.sentSuccessfully = true;
                    this.showAddSalonOption = false;

                  
              });

           },


           
           getSalons()
           {
                this.$http.get('https://reservation-system-69ff9.firebaseio.com/salons.json').then(function(data)
                {
                      this.salons = Object.values(data.body);
                });
           },
           searchResult()
            {
                this.filteredSalons = this.salons.filter((item)  => 
                                        {
                                           if(item.address.toUpperCase().match(this.search.toUpperCase()) || item.salonName.toUpperCase().match(this.search.toUpperCase()))
                                            {
                                              return true;
                                            }
                                        });
                                
                console.log(this.filteredSalons);      
            }    
      },
   created()
      {
        this.getSalons();  
    
      
      }

});