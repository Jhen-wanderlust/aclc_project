Vue.component('contact',

 {

    props : ["id"],

 template : `<div :class="'animated fadeInRight component contact ' + id">

    

              <i class="material-icons-two-tone">phone</i>

              <span>0932-660-1641</span><hr class="hrhr">



              <i class="material-icons-two-tone">alternate_email</i>

              <span>jhenyangbutawan@gmail.com</span><hr class="hrhr">



              <i class="material-icons-two-tone">location_city</i>

              <span>Mandaue City, Cebu, Philippines</span><hr class="hrhr">

 

 </div>` 

 });