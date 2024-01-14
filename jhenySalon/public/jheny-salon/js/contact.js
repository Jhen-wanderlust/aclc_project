Vue.component('contact',

 {

    props : ["id"],

 template : `<div :class="'animated fadeInRight component contact ' + id">

    
 <div class="contact">

    
          <h2>Contact Us</h2>
          <i class="material-icons-two-tone">phone</i>
            <span>0932-660-1641</span><hr class="hrhr">
          <i class="material-icons-two-tone">alternate_email</i>
            <span>jhenya@gmail.com</span><hr class="hrhr">
          <i class="material-icons-two-tone">location_city</i>
            <span>Mandaue City, Cebu, Philippines</span><hr class="hrhr">

            <h2>Locate Us</h2>

            <div class="mapouter"><div class="gmap_canvas"><iframe width="555" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Mandaue%20city%20cebu&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:555px;}</style></div></div>

          </div>

 </div>` 

 });