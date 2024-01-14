/**************************************
      ON INSERT FORM SUBMIT
**************************************/
;

 if(isset($_POST['register']))
 {

   $table = "users";
   $s = 'location:../index.php?notification=Registration Completed';
   $f = 'location:../index.php?notification=Registration Not Completed';

/* UPLOAD */
   
       $target_dir = "../uploads/";
       $changename = $_POST['first_name'].$_POST['last_name'];       
      $target_file = $target_dir . $changename . basename($_FILES["dp"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
         $uploadOk = 1;

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" )
      {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
      }            
    

    if ($uploadOk == 0)
      {
       echo "Sorry, your file was not uploaded.";
      }
    else
      {
        move_uploaded_file($_FILES["dp"]["tmp_name"], $target_file);

        $all_fields = array(
            
                            "email"   => $_POST["email"],
                         "password"   => MD5($_POST['password']),
                           "status"   => "0",
                       "first_name"   => $_POST['first_name'],
                        "last_name"   => $_POST['last_name'],
                              "tel"   => $_POST['password'],
                              "image" => $target_file
                            
                            );  


        $obj->insert($table,$all_fields,$s,$f);                       
                               
                            
      }


     