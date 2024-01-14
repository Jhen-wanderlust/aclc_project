Vue.component('adminorders',
{
       props : ["id"],
    template : `<div :class="'animated fadeInRight component ' + id">

                  <h1 class="service-cats">Pending Requests</h1>
                  <div class="mosque-main-container">     
                    <div class="animated zoomIn main-mosque" v-for="bk in bookings" v-if="bk.status == 'pending' && bk.type == 'appointment'">
                      <div class="contratto-info">Name : {{ bk.customerName }}</div>
                      <span class="material-icons cont-icon">account_circle</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Date : {{ bk.date }}</div>
                      <span class="material-icons cont-icon">today</span>
                      <hr class="cont-sep">
                      <div :class="bk.status +' contratto-info'">status : {{ bk.status }}</div>
                      <span :class="bk.status +' material-icons cont-icon'">rule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Time : {{ bk.time }}</div>
                      <span class="material-icons cont-icon">schedule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Contact Number : {{ bk.customerNmber }}</div>
                      <span class="material-icons cont-icon">call</span>                      
                      <hr class="cont-sep">
                      <div class="contratto-info servi" v-for="serv in bk.services">
                        <span v-for="sN in services" v-if="serv == sN.name">
                         {{ sN.name }} : php {{ sN.price }}  with {{ sN.discount }} % off
                       
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'">{{ bk.total }} </i>
                    
                      <hr class="cont-sep">
                      <label @click="changeStatus(bk.unique,'approved')" class="toapprove status-options">Approve</label>
                      <label @click="changeStatus(bk.unique,'cancelled')" class="tocancel status-options">Cancel</label>
                    </div>  
                  </div>  

<!--Approved Requests-->
                  
                  <br><br>
                  <h1 class="service-cats">Approved Requests</h1>
                  <div class="mosque-main-container">     
                    <div class="animated zoomIn main-mosque" v-for="bk in bookings" v-if="bk.status == 'approved'">
                      <div class="contratto-info">Name : {{ bk.customerName }}</div>
                      <span class="material-icons cont-icon">account_circle</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Date : {{ bk.date }}</div>
                      <span class="material-icons cont-icon">today</span>
                      <hr class="cont-sep">
                      <div :class="bk.status +' contratto-info'">status : {{ bk.status }}</div>                      
                      <span :class="bk.status +' material-icons cont-icon'">rule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Time : {{ bk.time }}</div>
                      <span class="material-icons cont-icon">schedule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Contact Number : {{ bk.customerNmber }}</div>
                      <span class="material-icons cont-icon">call</span>                        
                      <hr class="cont-sep">
                      <div class="contratto-info servi" v-for="serv in bk.services">
                        <span v-for="sN in services" v-if="serv == sN.name">
                        {{ sN.name }} : php {{ sN.price }}  with {{ sN.discount }} % off
                        <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'">{{ bk.total }} </i>
                      <hr class="cont-sep">
                      <label @click="changeStatus(bk.unique,'archived')" class="toarchive status-options">Archive</label>
                     
                    </div>  
                  </div>
                  
 <!--Walk-In-->
                  
                  <br><br>
                  <h1 class="service-cats">Walk-In</h1>
                  <div class="mosque-main-container">     
                    <div class="animated zoomIn main-mosque" v-for="bk in bookings" v-if="bk.status == 'pending' && bk.type == 'walkin'">
                      <div class="contratto-info">Name : {{ bk.customerName }}</div>
                      <span class="material-icons cont-icon">account_circle</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Date : {{ bk.date }}</div>
                      <span class="material-icons cont-icon">today</span>
                      <hr class="cont-sep">
                      <div :class="bk.status +' contratto-info'">status : {{ bk.status }}</div>                      
                      <span :class="bk.status +' material-icons cont-icon'">rule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Time : {{ bk.time }}</div>
                      <span class="material-icons cont-icon">schedule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Contact Number : {{ bk.customerNmber }}</div>
                      <span class="material-icons cont-icon">call</span>                        
                      <hr class="cont-sep">
                      <div class="contratto-info servi" v-for="serv in bk.services">
                        <span v-for="sN in services" v-if="serv == sN.name">
                        {{ sN.name }} : php {{ sN.price }}  with {{ sN.discount }} % off
                        <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'">{{ bk.total }} </i>
                      <hr class="cont-sep">
                      <label @click="changeStatus(bk.unique,'archived')" class="toarchive status-options">Archive</label>
                     
                    </div>  
                  </div>
                  
                  
<!--Archived Requests-->
                  
                  <br><br>
                  <h1 class="service-cats">Archived Requests</h1>
                  <div class="mosque-main-container">     
                    <div class="animated zoomIn main-mosque" v-for="bk in bookings" v-if="bk.status == 'archived'">
                      <div class="contratto-info">Name : {{ bk.customerName }}</div>
                      <span class="material-icons cont-icon">account_circle</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Date : {{ bk.date }}</div>
                      <span class="material-icons cont-icon">today</span>
                      <hr class="cont-sep">
                      <div :class="bk.status +' contratto-info'">status : {{ bk.status }}</div>
                      <span :class="bk.status +' material-icons cont-icon'">rule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Time : {{ bk.time }}</div>
                      <span class="material-icons cont-icon">schedule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Contact Number : {{ bk.customerNmber }}</div>
                      <span class="material-icons cont-icon">call</span>                        
                      <hr class="cont-sep">
                      <div class="contratto-info servi" v-for="serv in bk.services">
                        <span v-for="sN in services" v-if="serv == sN.name">
                        {{ sN.name }} : php {{ sN.price }}  with {{ sN.discount }} % off
                        <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'">{{ bk.total }} </i>
                    </div>  
                  </div> 
                  <br><br>
                  
<!--Cancelled Requests-->
                  
                  <h1 class="service-cats">Cancelled Requests</h1>
                  <div class="mosque-main-container">     
                    <div class="animated zoomIn main-mosque" v-for="bk in bookings" v-if="bk.status == 'cancelled'">
                      <div class="contratto-info">Name : {{ bk.customerName }}</div>
                      <span class="material-icons cont-icon">account_circle</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Date : {{ bk.date }}</div>
                      <span class="material-icons cont-icon">today</span>
                      <hr class="cont-sep">
                      <div :class="bk.status +' contratto-info'">status : {{ bk.status }}</div>
                      <span :class="bk.status +' material-icons cont-icon'">rule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Time : {{ bk.time }}</div>
                      <span class="material-icons cont-icon">schedule</span>
                      <hr class="cont-sep">
                      <div class="contratto-info">Contact Number : {{ bk.customerNmber }}</div>
                      <span class="material-icons cont-icon">call</span>                        
                      <hr class="cont-sep">
                      <div class="contratto-info servi" v-for="serv in bk.services">
                        <span v-for="sN in services" v-if="serv == sN.name">
                        {{ sN.name }} : php {{ sN.price }}  with {{ sN.discount }} % off 
                        <i :class="bk.unique" style="visibility:hidden;"> {{ sN.price }} </i>
                        </span>
                    
                      </div>
                      <i :class="bk.unique+'total sert'">{{ bk.total }} </i>
                      <hr class="cont-sep">
                      <label @click="eliminate" :data-id="bk.unique" class="tocancel status-options">Delete</label>
                    </div>  
                  </div>                   
                  

               </div>`,
    data()
      {
          return {
                     
                       bookings : [],
                       services : [],
                   statusUpdate : ""
                 }
      },
    methods :
     {

 

        fetcher()
         {
             // Fetching Data From FireBase
             this.$http.get('https://salon-management-system-598d0.firebaseapp.com/jheny-app/appointments.json?'+rest).then(function(data)
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
                   this.bookings = requests; 
                   
                  
                   
              });
         },
        Sfetcher()
         {
             // Fetching Data From FireBase
             this.$http.get('https://salon-management-system-598d0.firebaseapp.com/jheny-app/services.json').then(function(data)
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
              });
         },
        makeTotal()
         {
             for(let x in this.bookings)
             {
                 let unique = this.bookings[x].unique;
                 
                 let ele = document.getElementsByClassName(unique);
                 let sum = 0; 
                  
                  
                   for(let y in ele)
                     {
                         var v = document.getElementsByClassName(unique)[y].innerHTML;
                         var newP =  v - (v *(sN.discount)/100)
                         (newP != undefined) ? sum = parseInt(sum) + parseInt(newP ) : false ;
                     }
 
                    document.getElementsByClassName(unique+"total")[0].innerHTML = sum;
                  
             }
         },
        changeStatus(id,status)
             {
               let confirmation = confirm(`Are You Sure You Want To Change The Status To ${status} Of This Request`);
                
                  if(confirmation == true)
                   {
                       let ff = () => this.fetcher();
                       this.$http.patch('https://salon-management-system-598d0.firebaseapp.com/jheny-app/appointments/'+id+'.json?'+rest,
                             {
                                 "status" : status
                             }).then(function(data)
                                      {
                                          ff();
                                      });            
                   }
                  else
                   {
                     return false;
                   }                 

             },
             
     
             
             eliminate(e)
             {
                let unique = e.srcElement.dataset.id;
                
                let confirmation = confirm('Are You Sure You Want To Delete This Record?');
                
                  if(confirmation == true)
                   {
            
                        this.$http.delete("https://salon-management-system-598d0.firebaseapp.com/jheny-app/appointments/"+unique+".json?"+rest).then(function(data)
                         {
                             this.fetcher();
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
        
        this.Sfetcher();
        
       
        let ff = () => this.fetcher();
        
        setTimeout(function()
                  {
                      ff();
                  },2000);
        
    
    }   

});