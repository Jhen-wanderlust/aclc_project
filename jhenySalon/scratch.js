

//get all time from selection
var data2 = document.querySelectorAll('.time option')
var sub_array = [];

for (let index = 1; index < data2.length; index++) {
  const element = data2[index].value;

sub_array.push(element);

};

let data5 = sub_array.length;
let data6 = Number(data5 - 1);


//validate current time
var dt = new Date();
var ht= dt.getHours(); 
ht = ht;
console.log(ht);

//check if input date is equal to todays date 
var datesalon = document.getElementsByClassName('datepicker')[0].value;
var day = new Date(datesalon).toLocaleDateString();
console.log(day); 

   // today get current date
   var today = new Date().toLocaleDateString()
   today = today;
   localStorage.setItem("today", today);

   console.log(today)


   if (day == today){
       if (ht > sub_array[data6]){ //remove all available time 

           this.allTime = null;
         }
         else if (ht > sub_array[1] ){
           this.allTime.shift()
         }else{
           false;
         }
        

   }else{
     false;

   }







//all about get dates of today yesterday tomorrow

 var datesalon = document.getElementsByClassName('datepicker')[0].value;
 
 var day = new Date(datesalon).toLocaleDateString();
 console.log(day); // Apr 30 2000
 
 var nextDay = new Date(day);
 nextDay.setDate(day.getDate() + 1).toLocaleDateString();
 console.log(nextDay); // May 01 2000 



 var datesalon = document.getElementsByClassName('datepicker')[0].value;
 var day = new Date(datesalon).toLocaleDateString();
 console.log(day); 
 
    // today// get current date
    var today = new Date().toLocaleDateString()
    today = today;
    localStorage.setItem("today", today);

    console.log(today)
 

    if (day == today){
        if (ht > sub_array[data6]){ //remove all available time 
 
            this.allTime = null;
          }
          else if (ht > sub_array[1] ){
            this.allTime.shift()
          }else{
            false;
          }
         

    }else{
      false;

    }




var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).toLocaleDateString();

