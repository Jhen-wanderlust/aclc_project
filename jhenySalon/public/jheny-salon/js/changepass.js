Vue.component('changepass',
{
  props : ["id"],
    template : `<div :class="'animated fadeInRight component ' + id">
               
                <div class="add-option">Set Password</div>
                <br><br>
                <div id="add" class="animated fadeIn">
                    <div class="service-info">

                     <input type="text" class="in" v-model="currentPassword" placeholder="Old Password"  required>
                    
                    </div> 
                    <div class="service-info">
                    
                     <input type="password" class="in" v-model="newPassword" placeholder="New Password" required>

                    </div> 

                    <br>
                    <button  @click="onChangePasswordPress" id="change" style="margin:0 auto; display:block;" name="action" class="btn waves-effect waves-light center">
                      <i class="material-icons right">send</i>
                      Change Password 
                    </button>
                  
                </div>
                
               </div>`,
 
               data()
               {
                  return {
                     
                      currentPassword: "",
                      newPassword: ""
         
                         }
               },
             
             methods : 
               {
                reauthenticate(currentPassword){
                  var user = firebase.auth().currentUser;
                  var cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPassword);
                  return user.reauthenticateWithCredential(cred);
                },
                      // Changes user's password...
                      onChangePasswordPress(){

                        this.reauthenticate(this.currentPassword).then(() => {
                          const user = firebase.auth().currentUser;

                          user.updatePassword(this.newPassword).then(() => {
                            // Update successful.
                            alert("Updated password is:"+" "+this.newPassword)
                          }).catch((error) => {
                            // An error ocurred
                           
                            var errorCode = error.code;
                            var errorMessage = error.message;
                                 alert(errorMessage);
                               console.log(errorCode);
                            console.log(errorMessage);
                                 
                            // ...
                          });
                        });
                      
                      }
                       
                    },
                   
                  
            
            created()
               {
              this.reauthenticate();
              this.onChangePasswordPress();
               
               }
         
         });


