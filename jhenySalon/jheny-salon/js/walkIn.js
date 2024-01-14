Vue.component('walkin',
 {
    props : ["id"],
 template : `<div :class="'animated fadeInRight component walkin ' + id">
              <h1 v-show="afterSubmit" class="animated bounceIn">We Have Received Your Request Successfully !</h1>
              <a  v-show="afterSubmit" @click="reset()" class="waves-effect waves-light btn">Book Another Appointment</a>
              <span class="notifications first-noti animated shake">Please, Select A Date Before Selecting Time</span>
              <span class="notifications second-noti animated shake">Please, Select A Date Before Submitting Request</span>
              <span class="notifications third-noti animated shake">Please, Select Time Before Submitting Request</span>
              <span class="notifications last-noti animated shake">Please, Write Your Name Before Submitting Request</span>
              <span class="notifications number-noti animated shake">Please, Write Your Contact Number Before Submitting Request</span>
              <span class="notifications fulllast-noti animated shake">Please, Select At Least One Service</span>

<!--Services-->


              <h1 v-if="!afterSubmit" style="margin-top:200px;" class="animated bounceIn select-services">Select Services</h1>
              <div v-if="!afterSubmit" class="service-main-container">
                <div class="animated zoomIn main-service" v-for="cat in categories">
                  <h1 class="cat-title">{{ cat }}</h1>
                   <div class="service-info" v-for="(service,index) in services" v-if="cat == service.category">
                      <label>
                        <input v-model="totalPay" :value=discountedPrice(service)  @click="getService(service.unique)" type="checkbox" class="filled-in">
                        <span   class="service-info"> {{ service.name }} : php {{ service.price }} with {{ service.discount }} % off <h3> Price: </h3><h1>php {{ discountedPrice(service) }} </h1></span>
                        
                      </label>
                        <input v-model="selectedServices" :value="service.name"  type="checkbox" class="filled-in" :id="service.unique">
                      <hr class="cont-sep"> 
                   </div> 
                </div>
              </div> 
              <br><br>  
                             
<hr v-if="!afterSubmit" class="cont-sep"> 
<!--Services-->

              <div v-show="!afterSubmit">
              <span v-show="!afterSubmit" class="total-pay">{{ totalPay | somma }}</span> 
                <form v-on:submit.prevent>
                  <div class="input-field col s6">
                   <input id="last_name" type="text" class="validate" v-model="customerName" required>
                   <label for="last_name" class="customerinfo">Your Name</label>
                  </div>
                  <div class="input-field col s6">
                  <input id="phone"  type="text" class="validate" v-model="customerNumber" required>
                  <label for="phone" class="customerinfo">Your Contact Number</label>
                 </div>


                 <input @click="changeDate" type="text" class="datepicker" v-model.lazy="Schedule" placeholder="Pick A Date" required>

                 <div class="select-time"  @click="[checkDate($event), pasttime($event)]">See Available Time:</div>
                 <select  class="browser-default time" v-show="dateSelected == 'selected'">
                  <option value="">Select Time</option>
                  <option v-check v-for="time in allTime" :value="time">{{ time }}</option>
                 </select>
                 <hr>

                 <button @click="post" class="btn waves-effect waves-light" type="submit" name="action">
                 <i class="material-icons right">send</i>
                 Submit
                 </button>
                </form>
              </div>
    

 
 </div>`,


  data()
   {
       return {


      




             afterSubmit : false,
                 Schedule: "",
            customerName : "",
          customerNumber : "",
            dateSelected : 'notselected',
                    date : '',
              bookedTime : [],
                 allTime : [9,10,11,12,13,14,15,16,17],
          validationName : false,
        validationNumber : false,
          validationDate : false,
          validationTime : false,
       validationService : false,
                services : [],
              categories : [],
                totalPay : [],
        selectedServices : []
        
             }
   },
  
  methods :
    {
      discountedPrice(service) {
        return service.price - (service.price *(service.discount)/100)
        
      },
      
             checkDate()
                 {
                   let date = document.getElementsByClassName('datepicker')[0].value;
                   this.date = date;
                    if(this.date)
                     {
                       this.dateSelected = 'selected';
                       // Fetching All Existing Bookings To Check The Available Time
                       this.$http.get('https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointmentReadable.json').then(function(data)
                         {
                               this.bookedTime = [];
                               let savedData = Object.values(data.body);
                               for(let x = 0; x < savedData.length; x++)
                                  {
                  
                       // If The Date Is Same In The Existing Bookings Then Store All Booked Hours For That Date In bookedTime Array
                                      if(savedData[x].date == this.date)
                                        {
                                          this.bookedTime.push(parseInt(savedData[x].time));
                                        }
                                  }
                         }); 


                         document.querySelectorAll('.select-time')[0].innerHTML = "See Available Time: ";


                     }
                     else
                     {
                       this.notification('first-noti');
                     }

                 },
                 
            changeDate()
                 {
                    this.dateSelected = "notselected";
                 },
                 
             post()
               {

                 let time = document.getElementsByClassName('time')[0].value;
                 this.checkDate();

                 (!this.date) ? this.notification('second-noti') : this.validationDate = true;
                 (!time) ? this.notification('third-noti') : this.validationTime = true;
                 (!this.customerName) ? this.notification('last-noti') : this.validationName = true;
                 (!this.customerNumber) ? this.notification('number-noti') : this.validationNumber = true;
                 (this.selectedServices.length < 1) ? this.notification('fulllast-noti') : this.validationService = true;

                  if(this.validationDate == true & this.validationName == true & this.validationTime == true & this.validationService == true & this.validationNumber == true)
                    {
                        
                        
                          
                        
                      this.$http.post('https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointments.json',
                      {
                                 "type" : "walkin",
                         "customerName" : this.customerName,
                        "customerNmber" : this.customerNumber,
                                 "date" : this.date,
                                 "time" : time,
                               "status" : "pending",
                             "services" : this.selectedServices

                      }).then(function(data)
                        {
                            this.$http.post('https://reservation-system-69ff9.firebaseio.com/jheny-salon/appointmentReadable.json',
                                          {
                                                     "date" : this.date,
                                                     "time" : time,
                                          }).then(function(data)
                                            {
                                                this.afterSubmit = true;
                                            });
                        });
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
            notification(element)
                 {
                   document.getElementsByClassName(element)[0].style.display = "block";

                     setTimeout(function()
                       {
                         document.getElementsByClassName(element)[0].style.display = "none";
                       },5000)

                 },
            getService(val)
                 {
                     document.getElementById(val).click();


                   
                 },
            reset()
                 {

                 let yes=   confirm("Book another appointment?");

                 if (yes == true){
                
                  this.afterSubmit = false;
                  this.customerName = "";
                this.customerNumber = "";
                      this.Schedule = '',
                          this.date = '',
                  this.dateSelected = 'notselected';
                    this.bookedTime = [];
                       this.allTime = [9,10,11,12,13,14,15,16,17];
                this.validationName = false;
              this.validationNumber = false;
                this.validationDate = false;
                this.validationTime = false;
             this.validationService = false;
                      this.totalPay = [];
              this.selectedServices = [] ; 

                 }else{

                  window.location.reload();
                 }
                   
                
                 },
                 




                 pasttime(){
            
                    //validate current time
                  
                          //check if input date is equal to todays date 
                    var datesalon = document.getElementsByClassName('datepicker')[0].value;
                    var day = new Date(datesalon).toLocaleDateString();
                    console.log(day); 

                 // today get current date
                      var today = new Date().toLocaleDateString();
                      console.log(today);

                      if (day ==  today){
                        

                        let num = [9,10,11,12,13,14,15,16,17];
                        var dt = new Date();
                        var ht= dt.getHours(); 
                        var nht= Number(ht);
                        console.log(nht);

                        let timeleft = [];
                        for (let i = 0; i < num.length; i++) {
                            if (num[i] > nht) {
                                timeleft.push(num[i]);

                                setTimeout(() => {
                                            
                                 
                                  var sub_array1 = [];

                                  for (var i=0; i< timeleft.length; i++){
                                  var nametext = timeleft[i];  

                                      sub_array1.push(nametext);
                                      
                                  };

                                  var options = {
                                      timeString: sub_array1,
                                    }
                                   
                                    var string = JSON.stringify(options);
                                    var newString = string.replace('{"timeString":[','');
                                    var elemString = newString.replace(']}','');

                                    document.querySelectorAll('.select-time')[0].innerHTML = "See Available Time for: "+ elemString + "... Thank You!";
                                 
                                 }, 1000);
    
                            }else if (nht >= 17){
                              document.querySelectorAll('.select-time')[0].innerHTML = "No Available Time ";
                            }else{
                              false;
                            }

                        }
 
                      }else{
                        document.querySelectorAll('.select-time')[0].innerHTML = "See Available Time: ";
                      }

                 },

    },
   created()
    {
        this.fetcher();
    }       


 });


// I'll Create A Custom Directive To Filter The Hours
Vue.directive('check',
{
  update(el,binding,vnode)
    {
            let time = parseInt(el.innerHTML);
           let check = vnode.context.bookedTime.includes(time); // This Will Return Boolean True or False
      let realString = el.innerHTML.replace(" Not Available","");
        
        if(check)
          {
             el.disabled = true;
             el.style.color = "red";
             el.innerHTML = realString + " Not Available";

          }
        else 
          {
            el.disabled = false;
            el.style.color = "green";
            el.style.fontSize = "1.2rem";      
            el.innerHTML = realString;
          }  
    }
    
});

Vue.filter('somma',function(val)
          {
            return val.reduce(function(a, b){ return parseInt(a) + parseInt(b); }, 0);              
          });


          



 document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  // I Want To Limit The Date, So The Customers Cannot Select A Past Day
  var instances = M.Datepicker.init(elems, {minDate : new Date()});

  

});






