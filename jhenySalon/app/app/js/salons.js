Vue.component('salons',
{
       props : ['id'],
    template : `<div :class="'animated zoomIn component '+id">
                   
                  <button @click="showOptions" class="btn waves-effect waves-light right" name="action">
                   <i class="material-icons right">send</i>
                    Add Your Salone Here
                   </button>
                   <br>
                   <div class="input-field col s6" v-if="!showAddSalonOption">
                   <i class="material-icons prefix search">search</i>
                   <textarea id="icon_prefix2" class="materialize-textarea" @keyup="searchResult" v-model="search"></textarea>
                   <label for="icon_prefix2" class="salons-search">Search Salons By Name , City or Town</label>
                   </div>
                   <div class="input-field col s6" v-if="showAddSalonOption">
                   <input v-model="yourName" placeholder="Your Name" id="yourname" type="text" class="validate salon-input" required>
                    </div>
                     <div class="input-field col s6 animated fadeInDown" v-if="showAddSalonOption">
                       <input v-model="salonName" placeholder="Salon Name" id="salonname" type="text" class="validate salon-input" required>
                     </div>
                     <div class="input-field col s6 animated fadeInDown" v-if="showAddSalonOption">
                       <input v-model="contactNumber" placeholder="Contact Number eg: 0923-465-6678" id="phone" type="tel"  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"  class="validate salon-input" required>
                     </div>                     
                     <div class="input-field col s6 animated fadeInDown" v-if="showAddSalonOption">
                       <input v-model="address" placeholder="Complete Address es : Street Name , Building No , City Name & Province" id="address" type="text" class="validate salon-input" required>
                     </div>   
                     <div class="input-field col s6 animated fadeInDown" v-if="showAddSalonOption">
                     <h5 class="service-info">Time Table from : </h5>
                       <input v-model="timetable" placeholder="Time Table from : 09:00 AM - 05:00 PM" id="timetable" type="time" class="validate salon-input" required>
                     <h5 class="service-info">Time Table to   : </h5> 
                       <input v-model="timetable1" placeholder="Time Table to : 09:00 AM - 05:00 PM" id="timetable1" type="time" class="validate salon-input" required>
                     </div>     
                     <div class="input-field col s6 animated fadeInDown" v-if="showAddSalonOption">
                       <input v-model="weblink" placeholder="Your Booking System or Website Link es : https://www.jheny-salon.com" id="weblink" type="url"  class="validate salon-input" required>
                     </div>                          
                      <h1 class="animated fadeInDown" v-if="showAddSalonOption"><a style="
                        font-family: auto;
                        cursor: pointer;
                        color: black;
                        background: white;
                        padding: 10px;
                        font-size: 2rem;" @click="terms">Terms & Conditions</a></h1>    
                     <button @click="postSalons" class="btn waves-effect waves-light animated fadeInDown" name="action" v-if="showAddSalonOption">
                     <i class="material-icons right">send</i>
                      Submit Request
                     </button>
                     <h1 class="sent" v-if="sentSuccessfully">We Have Received Your Request Successfully!</h1>                     
                     
                     <!-------------------------------------------
                                Getting Salons From FireBase
                     -------------------------------------------->
                     <br><br>
                     <table class="pending" v-if="!showAddSalonOption & this.search != ''">
                     <thead>
                         <tr>
                             
                             <th @click="searchResult">Salon Name</th>
                             <th>Contact Number</th>
                             <th>Address</th>
                             <th>Time Table</th>
                             <th>Book Now</th>
                             <th>Navigate With Google Maps</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="salon in filteredSalons">
                            
                             <td>{{ salon.salonName }}</td>
                             <td>{{ salon.contactNumber }}</td>
                             <td>{{ salon.address }}</td>
                             <td>{{ salon.timetable }}</td>
                             <td><a target="_blank" :href="salon.weblink">
                                   <i style="color:white;font-size:4rem;" class="material-icons">web</i><br> Book Now
                                 </a>
                             </td>                             
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
                           yourName :  "", 
                           salonName : "", 
                       contactNumber : "",  
                             address : "",
                           timetable : "",
                          timetable1 : "",
                             weblink : "https://",
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
          
           terms(){

            swal("When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control.");


           },

          postSalons()
           {

            
            if(this.salonName != "" & this.contactNumber != "" & this.address != "" & this.timetable != "" & this.timetable1 != ""  & this.weblink != "")
            {


                this.$http.post('https://reservation-system-69ff9.firebaseio.com/salonsRequests.json',
                 {
                      'yourName' : this.yourName,
                     'salonName' : this.salonName,
                 'contactNumber' : this.contactNumber,
                       'address' : this.address,
                     'timetable' : this.timetable + "am" +"-"+this.timetable1 + "pm",
                       'weblink' : this.weblink,
                      'status'   : 'pending'
                 }).then(function(data)
                  {
                        this.sentSuccessfully = true;
                        setTimeout(() => {
                          this.sentSuccessfully =  false;
                        }, 6000);
                        this.showAddSalonOption = false;
                  });
            }
          else
           {
               alert('Please Provide All Information');
           }

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
                                            }; 
                                        });
                                
            }    
      },
   created()
      {
        this.getSalons();

       

      }

});