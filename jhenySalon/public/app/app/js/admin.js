Vue.component('admin',
{
    props : ["id"],
  
    template : `<div class="animated zoomIn">

   
                 
                     <!-------------------------------------------
                            Getting Requests From FireBase
                     -------------------------------------------->
                     <br><br><h1 style="text-align:center;background:rgba(0,0,0,0.7);color:white;padding:20px;">Pending Requests</h1>
                     <table class="pending"">
                     <thead>
                         <tr>
                             <th>Your Name</th>
                             <th>Salon Name</th>
                             <th>Contact Number</th>
                             <th>Address</th>
                             <th>Time Table</th>
                             <th>Web Link</th>
                             <th>Approve</th>
                             <th>Update</th>
                             <th>Delete</th>
                            
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(salon,index) in requests" v-if="salon.status == 'pending'">
                             <td class="salon.yourName" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                               {{ salon.yourName }} 
                                    <td v-if="salon.edit" class="yourName">
                                    <input id="yourName" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.yourName" v-bind:yourName = "yourName" >
                                    </input>
                                    </td>
                             </td>
                             <td class="salon.salonName" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                             {{ salon.salonName }} 
                                  <td v-if="salon.edit" class="salonName">
                                  <input id="salonName" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.salonName" v-bind:salonName = "salonName" >
                                  </input>
                                  </td>
                                    </td>
                                    <td class="salon.contactNumber" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                                    {{ salon.contactNumber }} 
                                          <td v-if="salon.edit" class="contactNumber">
                                          <input id="contactNumber" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.contactNumber" v-bind:contactNumber = "contactNumber" >
                                          </input>
                                          </td>
                                  </td>
                                  <td class="salon.address" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                                  {{ salon.address }} 
                                        <td v-if="salon.edit" class="address">
                                        <input id="address" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.address" v-bind:address = "address" >
                                        </input>
                                        </td>
                                </td>
                                <td class="salon.timetable" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                                {{ salon.timetable }} 
                                      <td v-if="salon.edit" class="timetable">
                                      <input  id="timetable" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.timetable" v-bind:timetable = "timetable" >
                                      </input>
                                      </td>
                              </td>
                              <td class="salon.weblink" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                              {{ salon.weblink }} 
                                    <td v-if="salon.edit" class="weblink">
                                    <input id="weblink" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.weblink" v-bind:weblink = "weblink" >
                                    </input>
                                    </td>
                            </td>
                           
                             <td>
                             <a class="approve" @click="postSalons" href="javascript:;"><i :id="index" class="btnn material-icons">cloud_upload</i></a>
                             </td> 
                             <td class="update" v-on:click="$set(salon, 'edit', !salon.edit)">
                             <a href="javascript:;"><i v-if ="!salon.edit"  class="btnn material-icons">edit</i></a>
                             <a @click="change" href="javascript:;"><i :data-id=salon.unique v-if="salon.edit"  class="btnn material-icons">save</i></a>
                             </td> 
                             <td class="delete">
                             <a @click="eliminate"  href="javascript:;"><i :data-id="salon.unique" class="btnn material-icons">delete</i></a>          
                             </td> 
                         </tr>
                     </tbody>
                 </table>     
               
                 
                 
                 <!-------------------------------------------
                 Getting Salons From FireBase
          -------------------------------------------->
          <br><br><h1 style="text-align:center;background:rgba(0,0,0,0.7);color:white;padding:20px;">Active Salons</h1>
          <table class="pending"">
          <thead>
              <tr>
                  <th>Salon Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Time Table</th>
                  <th>Web Link</th>
                  <th>Deactivate</th>
                  <th>Update</th>
                  
                 
              </tr>
          </thead>
          <tbody>
              <tr v-for="(salon,index) in salons">
              <td class="salon.salonName" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
              {{ salon.salonName }} 
                   <td v-if="salon.edit" class="salonName">
                   <input id="salonName_active" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.salonName" v-bind:salonName = "salonName" >
                   </input>
                   </td>
                     </td>
                     <td class="salon.contactNumber" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                     {{ salon.contactNumber }} 
                           <td v-if="salon.edit" class="contactNumber">
                           <input id="contactNumber_active" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.contactNumber" v-bind:contactNumber = "contactNumber" >
                           </input>
                           </td>
                   </td>
                   <td class="salon.address" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                   {{ salon.address }} 
                         <td v-if="salon.edit" class="address">
                         <input id="address_active" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.address" v-bind:address = "address" >
                         </input>
                         </td>
                 </td>
                 <td class="salon.timetable" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
                 {{ salon.timetable }} 
                       <td v-if="salon.edit" class="timetable">
                       <input  id="timetable_active" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.timetable" v-bind:timetable = "timetable" >
                       </input>
                       </td>
               </td>
               <td class="salon.weblink" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
               {{ salon.weblink }} 
                     <td v-if="salon.edit" class="weblink">
                     <input id="weblink_active" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.weblink" v-bind:weblink = "weblink" >
                     </input>
                     </td>
             </td>
            
                  <td>
                   <a class="deactivate" @click="postRequest" href="javascript:;"><i :id="index"  class="btnn material-icons">cloud_off</i></a>
                  </td> 
                  <td class="update" v-on:click="$set(salon, 'edit', !salon.edit)">
                       <a href="javascript:;"><i v-if ="!salon.edit"  class="btnn material-icons">edit</i></a>
                       <a @click="change1" href="javascript:;"><i  :data-id="index" v-if="salon.edit"  class="btnn material-icons">save</i></a>
                  </td>                               
              </tr>
          </tbody>
      </table>


              
      <!-------------------------------------------
      Getting Salons From FireBase
-------------------------------------------->
<br><br><h1 style="text-align:center;background:rgba(0,0,0,0.7);color:white;padding:20px;">Deactivated Salons</h1>
<table class="pending"">
<thead>
   <tr>
       <th>Salon Name</th>
       <th>Contact Number</th>
       <th>Address</th>
       <th>Time Table</th>
       <th>Web Link</th>
       <th>Activate</th>
       
       
      
   </tr>
</thead>
<tbody>
   <tr v-for="(salon,index) in requests" v-if="salon.status == 'deactivate'">
       <td>{{ salon.salonName }}</td>
       <td>{{ salon.contactNumber }}</td>
       <td>{{ salon.address }}</td>
       <td>{{ salon.timetable }}</td>
       <td>{{ salon.weblink }}</td> 
       <td>
        <a class="approve" @click="postSalons" href="javascript:;"><i :id="index" class="btnn material-icons">cloud_upload</i></a>
       </td> 
      
     
                                   
   </tr>
</tbody>
</table>
      
   </div>
                
                `
          
                
                ,
    data()
      {
         return {
     
           bookings : [],
             salons : "",
           requests : "",
               move : "",
                off : "",
           yourName : "", 
          salonName : "", 
      contactNumber : "",  
            address : "",
          timetable : "",
            weblink : "",
             status : "",
              keyup : ""
                          
                
               
                
                }
      },
   
    
    methods : 
     {
          postSalons(event)
           {


                 this.move = event.srcElement.id;
                 let Saloname = this.requests[this.move].salonName;
                 let del = this.requests[this.move].unique;
                 
                 const refetch = () => this.getData();
                 let confirmation1 = confirm(`Are you sure to activate ${Saloname}'s request?`);
                 if (confirmation1 == true)
                 {

                    this.$http.post('https://reservation-system-69ff9.firebaseio.com/salons.json?auth='+rest,
                    {
                         
                          "address" : this.requests[this.move].address,
                    "contactNumber" : this.requests[this.move].contactNumber,
                        "salonName" : this.requests[this.move].salonName,
                        "timetable" : this.requests[this.move].timetable,
                          "weblink" : this.requests[this.move].weblink,
                             status : 'activate'
                    }).then(function(data)
                     {
                         this.$http.delete('https://reservation-system-69ff9.firebaseio.com/salonsRequests/'+del+'.json').then(function(data){});
                         
                         setTimeout(function(){
                         
                            refetch();
                                
                            },1000);
                         

                     });
                    
                     
                 }else{
                        return false; 
                 }
              

           },
    
           postRequest(e)
           {


                 this.off = e.srcElement.id;
                 let Saloname1 = this.salons[this.off].salonName;
                 let del1 = this.salons[this.off].unique;
                 
                 const refetch1 = () => this.getData();
                 let confirmation2 = confirm(`Are you sure to deactivate ${Saloname1}'s request?`);
                 if (confirmation2 == true)
                 {

                    this.$http.post('https://reservation-system-69ff9.firebaseio.com/salonsRequests.json?auth='+rest,
                    {
                         
                          "address" : this.salons[this.off].address,
                    "contactNumber" : this.salons[this.off].contactNumber,
                        "salonName" : this.salons[this.off].salonName,
                        "timetable" : this.salons[this.off].timetable,
                          "weblink" : this.salons[this.off].weblink,
                             status : 'deactivate'
                    }).then(function(data)
                     {
                         this.$http.delete('https://reservation-system-69ff9.firebaseio.com/salons/'+del1+'.json').then(function(data){});
                         
                         setTimeout(function(){
                         
                          refetch1();
                                
                            },1000);
                         

                     });
                    
                     
                 }else{
                        return false; 
                 }
              

           },
    
           

 

            change(e)
            {
            
             let key           =   e.srcElement.dataset.id;
             let yourName      =   document.querySelector('#yourName').value;
             let address       =   document.querySelector('#address ').value;
             let contactNumber =   document.querySelector('#contactNumber').value;
             let salonName     =   document.querySelector('#salonName').value;
             let timetable     =   document.querySelector('#timetable').value;
             let weblink       =   document.querySelector('#weblink').value;
              
              let confirmation = confirm(`Are you sure to save the changes?`);
               
                 if(confirmation == true)
                  {
              
                    this.$http.patch('https://reservation-system-69ff9.firebaseio.com/salonsRequests/'+key+'.json?auth='+rest,
                    {
                    
                         yourName      :  yourName,
                         address       :  address,
                         contactNumber :  contactNumber,
                         salonName     :  salonName,
                         timetable     :  timetable,
                         weblink       :  weblink 


                      }).then(function(data)
                      {
         
                    
                        this.data();
 
   
                       });         
                            }
                          else
                            {
                              return false;
                            }                 

            },
          
                  

            change1(e)
            {
            
             let key_active           =   e.srcElement.dataset.id;
             let address_active       =   document.querySelector('#address_active').value;
             let contactNumber_active =   document.querySelector('#contactNumber_active').value;
             let salonName_active     =   document.querySelector('#salonName_active').value;
             let timetable_active     =   document.querySelector('#timetable_active').value;
             let weblink_active       =   document.querySelector('#weblink_active').value;
            
              let confirmation3 = confirm(`Are you sure to save the changes?`);
               
                 if(confirmation3 == true)
                  {
              
                    this.$http.patch('https://reservation-system-69ff9.firebaseio.com/salons/'+key_active+'.json?auth='+rest,
                    {
                    
                        
                         address       :  address_active,
                         contactNumber :  contactNumber_active,
                         salonName     :  salonName_active,
                         timetable     :  timetable_active,
                         weblink       :  weblink_active,
                         status        :  'activate'

                      }).then(function(data)
                      {
         
                    
                        this.data();
 
   
                       });         
                            }
                          else
                            {
                              return false;
                            }                 

            },
          
                  
            
          
        
           getData()
           {
                this.$http.get('https://reservation-system-69ff9.firebaseio.com/salons.json').then(function(data)
                {
                    // need to replicate this code also for salon to have keys. i can do this later not now  wait
                    this.salons = Object.values(data.body);
                      console.log(data);
                });
                
                this.$http.get('https://reservation-system-69ff9.firebaseio.com/salonsRequests.json').then(function(data)
                {
                    
                      return data.json();
                    
                }).then(function(data)
                      {
                          let requests = [];
                          for(let key in data)
                           {
                               data[key].unique = key; // Adding the property (unique) in every object & assigning the value of objects,key
                               
                               requests.push(data[key]);// doesn't have now,, hds he key below sunny. no have to be there
                           }
                           this.requests = requests; 
                       });                      
              
                
           },


           
        
                
         

           eliminate(e)
           {
               
             let unique =  e.srcElement.dataset.id;
           
              let confirmation = confirm(`Are You Sure You Want To Delete ${unique} Request?`);
              
                if(confirmation == true)
                 {
                   
                    this.$http.delete("https://reservation-system-69ff9.firebaseio.com/salonsRequests/"+unique+".json?auth="+rest).then(function(data)
                    {
                    
                        this.data();
                    });   
                 }
                else
                 {
                   return false;
                 }
             },





            
      },



   created()
      {
        
        const data = () => this.getData();
 
        setTimeout(function(){
        
         data();
        
        },2000); 
        
      },
      
 
 
  






});




        