this.$http.post('https://sampledomain.firebaseio.com/jheny-salon/appointments.json',
{
           "type" : "appointment",
   "customerName" : this.customerName,
  "customerNmber" : "tel:"+this.customerNumber,
           "date" : this.date,
           "time" : time,
         "status" : "pending",
       "services" : this.selectedServices,
          "total" : total

}).then(function(data)
  {
      this.$http.post('https://sampledomain.firebaseio.com/jheny-salon/appointmentReadable.json',
                    {
                               "date" : this.date,
                               "time" : time,
                    }).then(function(data)
                      {
                          this.afterSubmit = true;
                      });
  });