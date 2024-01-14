Vue.use(VueDraggable.default);
Vue.component('whyus',

{   

       props : ["id"],

    template : `<div :class="'animated fadeInRight component whyus ' + id">

    <div class="add-option" @click="openAdd()">Add Stylist</div>

               

    <div id="add" class="animated fadeIn" v-show="open">
    <br><br><br>
 

        <div class="service-info"><input type="text"  class="in" v-model="selected" placeholder="Stylist Name" required>
        </div>
        <div class="service-info"><input type="text"  class="in" v-model="skill[1]" placeholder="Skills" required></div> 

        <br>

        <button @click="addStylist" style="margin:0 auto; display:block;" name="action" class="btn waves-effect waves-light center">
          <i class="material-icons right">send</i>
          Add Stylist
        </button>
        <div id="closeme" @click="openAdd()">X</div>


    </div>

    
    
    <br><br><br><br><br><br>
        <div class="service-main-container" v-show="!open">

    
        <div class="drag-wrapper">
        <h2 class="cat-title drag-wrapper">Available</h2>
        <h2 class="cat-title drag-wrapper">Not Available</h2>
        </div>

         <div v-drag-and-drop:options="options" class="drag-wrapper">
     
                      <ul id="grid1" >
                        <li   v-on:click.self ="avail"  v-if="styling.availability == 1" :data-status="styling.availability" class="animated zoomIn main-service" v-for="styling in staff" :data-id="styling.unique">            
                          <h1 class="cat-title">{{ styling.stylistName }} ✔️</h1>
                          <br>
                          <h2> {{ styling.name }}</h2>
                          <h2> {{ styling.timeMoved }}</h2>
                          <br> <br>
                        </li>                         
                      </ul>
                     
                      <ul id="grid2">
                        <li  v-on:click.self ="avail" v-if="styling.availability == 0" :data-status="styling.availability" class="animated zoomIn main-service" v-for="styling in staff" :data-id="styling.unique">            
                          <h1   class="cat-title">{{ styling.stylistName }}❌  </h1>
                          <br>
                          <h2> {{ styling.name }}</h2>
                          <h2> {{ styling.timeMoved }}</h2>
                          <br> <br>
                        </li>        
                      </ul>
             </div>  
             
       <br><br><br><br>                
        <!-------------------------------------------
        Getting staff From FireBase
 -------------------------------------------->
 <br><br><h1 style="text-align:center;background:rgba(0,0,0,0.7);color:white;padding:20px;">Manage Staff</h1>
 <table class="pending"">
 <thead>
     <tr>
         <th>Stylist Name</th>
         <th>Services</th>
         <th>Update</th>
         <th>Delete</th>
        
        
     </tr>
 </thead>
 <tbody>
     <tr v-for="(salon,index) in staff">
         <td class="salon.stylistName" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
         {{ salon.stylistName }}
             <td v-if="salon.edit" class="stylistName">
                <input id="stylistName" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.stylistName" v-bind:stylistName = "stylistName" required>
                </input>
                </td>
               </td>
         <td class="salon.name" v-if="!salon.edit" v-on:click="$set(salon, 'edit', !salon.edit)">
         {{ salon.name }}
              <td v-if="salon.edit" class="name">
              <input id="name" style="text-align:center;background:rgba(0,0,0,0.7);color:white;"  rows="4" cols="50" v-model="salon.name" v-bind:name = "name" required>
              </input>
              </td>
             </td>

           <td class="update" v-on:click="$set(salon, 'edit', !salon.edit)">
              <a href="javascript:;"><i v-if ="!salon.edit"  class="btnn material-icons">edit</i></a>
              <a @click="saveedit" href="javascript:;"><i :data-id=salon.unique v-if="salon.edit"  class="btnn material-icons">save</i></a>
           </td> 
           <td class="delete">
               <a @click="eliminate"  href="javascript:;"><i :data-id="salon.unique" class="btnn material-icons">delete</i></a>          
           </td>     
     </tr>
 </tbody>
</table>     

<br><br><br>  





         </div>
   </div>`,


                data() {
                  const componentInstance = this;
                  
                  return {
                     staffdata : "",
                         staff : [],
                    categories : [],
                          open : false,
                           edit: false,
                   sentSuccess : false,
                        selected: '',
                        skill : [],
                         
                    options: {
                      dropzoneSelector: 'ul',
                      draggableSelector: 'li',
                      multipleDropzonesItemsDraggingEnabled: true,
                      showDropzoneAreas: true,

                     
                       onDrop(event) {
                        //componentInstance.avail();
                       
                      

              
                       },
                       onDragstart(event) {
                        
                        event.stop();
                       },

                      onDragend(event) {
                        
                        // if you need to stop d&d
                        // event.stop();
                        console.log('drag');
                        // you can call component methods, just don't forget 
                        // that here `this` will not reference component scope,
                        // so out from this returned data object make reference
                        // to component instance
                        
              
                        // to detect if draggable element is dropped out
                        if (!event.droptarget) {
                          console.log('event is dropped out');
                          
                        }
                      }

                     


                    }
                  }
                },
                methods: {


                  closeedit(e)
                  {
          
                        e.stopPropagation();
            
                  },
                 
                  saveedit(e)
                  {
            
                       this.edit = false;
            
                       let key       =   e.srcElement.dataset.id;
                       let StName      = document.querySelector('#stylistName').value;
                       let Name      =   document.querySelector('#name').value;
          
                       let confirmation = confirm(`Are you sure to save the changes?`);
                           
                       if(confirmation == true)
                        {
                    
                          this.$http.patch('https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff/'+key+'.json?auth='+rest,
                          {
                            "stylistName": StName,
                              "name"  :  Name
                        
            
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
                    addStylist()
                     {
                       
                        if(this.selected.length > 0 &  this.skill[1].length != 0 )
                          {
                    
                                let styling = this.selected.toLowerCase().trim();             
                                this.$http.post('https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff.json?'+rest,
                                               {
                                                "stylistName" : styling,
                                                    "name" : this.skill[1],
                                                    'availability' : 0
                                               
                                               }).then(function(data)
                                               {
                                                 this.open = !this.open;
                                                 this.selected = "";
                                                 this.skill[1] = "";
                                                 this.fetcher();
                                               });
            
                                               
            
                          }
                     },
            
                    fetcher()
                     {
                         // Fetching Data From FireBase
                         this.$http.get('https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff.json').then(function(data)
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
                               this.staff = requests; 
                          });
                     },
                     
                    eliminate(e)
                     {
                        let unique = e.srcElement.dataset.id;
                        
                        let confirmation = confirm('Are You Sure You Want To Delete This Service!');
                        
                          if(confirmation == true)
                           {
                    
                                this.$http.delete("https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff/"+unique+".json?"+rest).then(function(data)
                                 {
                                     this.fetcher();
                                 });                 
                    
                           }
                          else
                           {
                             return false;
                           }
            
                     },

                     avail(e){


                      let id = e.target.dataset.id;
                      let status = (e.target.dataset.status == 0) ? 1 : 0;
                      var todaytime = new Date().toLocaleString();
                      var time_result = todaytime.toString();
                      this.$http.patch("https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff/"+id+".json?"+rest,
                      
                      {
                        'availability' : status,
                          'timeMoved'  : time_result
                        
        
                      }).then(function(data)
                      {
         
                    
                      this.fetcher();
      
      
                       });       

                     }


                },
                created()
                {
                    this.fetcher();
                 
                    
                },

               
 });

 /*
  const updateStylistt = (e) =>
  {

        let id = e.target.dataset.id;
    let status = (e.target.dataset.status == 0) ? 1 : 0;
       let url = `https://reservation-system-69ff9.firebaseio.com/jheny-salon/staff/${id}.json`;
      let data = {'availability' : status};
      
     fetch(url,      
      {
         method : 'PATCH',
           body : JSON.stringify(data),  
      }).then((response) => {  console.log(response); })

  };


  document.querySelectorAll('li.animated.zoomIn.main-service').forEach((dd) => 
  {
       dd.addEventListener('ondrag',updateStylistt);
  });
*/



   
