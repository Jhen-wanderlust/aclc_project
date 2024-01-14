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
                        <span   class="service-info"> {{ service.name }} : php {{ service.price }} with {{ service.discount }} % off <h3> Price: </h3><h1>php {{ discountedPrice(service) }} </h1></span>
                         <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'"></i>
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
                         {{ sN.name }} : php {{ sN.price }}
                         <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'"></i>
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
                         {{ sN.name }} : php {{ sN.price }}
                         <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'"></i>
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
                         {{ sN.name }} : php {{ sN.price }}
                         <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'"></i>
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
                         {{ sN.name }} : php {{ sN.price }}
                         <i :class="bk.unique" style="visibility:hidden;">{{ sN.price }}</i>
                        </span>
                      </div>
                      <i :class="bk.unique+'total sert'"></i>
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
             this.$http.get('https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointments.json?auth='+rest).then(function(data)
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
                         (v != undefined) ? sum = parseInt(sum) + parseInt(v) : false ;
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
                       this.$http.patch('https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointments/'+id+'.json?auth='+rest,
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
            
                        this.$http.delete("https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointments/"+unique+".json?"+rest).then(function(data)
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
        
        let cc = () => this.makeTotal();
        let ff = () => this.fetcher();
        
        setTimeout(function()
                  {
                      ff();
                  },2000);
        
        setTimeout(function()
                  {
                     cc();
                  },3000);                  

    }   

});