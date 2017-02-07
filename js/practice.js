//uploadlist
$(document).ready(function () {
  //var rootURL = "http://192.168.0.24/abc/index.php";
 $.ajax({                                      
      url:  rootURL+"/upload_list", 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd")   
            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        console.log(data);
        src='<i class="icon-file"></i>';
      if(data.uploadlist.hasOwnProperty('uploaded_new')) {

        $.each(data.uploadlist.uploaded_new, function(i, res) {
        var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['upload_timestamp']+"</td></tr>";
                $(html).appendTo("#uploadlist"); 

          $("#uploadlist tr ").click(function() {
              //alert($(this).attr('id'));
                window.location = 'uploadlist.html?id='+$(this).attr('id'); 

                $.each(data.uploadlist.uploaded_new, function(i, res) {
                  var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['description']+"</td><td><input type='textarea' rows='10' cols='45' id='textarea'/>"+res['description']+"</td></tr>";
                $(html).appendTo("#uploadlist"); 
               

     
            }); 
                }); 


        });//each
      }//if
      else{
        console.log("failed");
      }

 }//success
 });//ajax
 });//ready



//view_upload
$(document).ready(function () {
  //var rootURL = "http://192.168.0.24/abc/index.php";
 $.ajax({                                      
      url:  rootURL+"/view_upload/64", 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd"),
               
            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        console.log(data);
        src='<i class="icon-file"></i>';
        
      if(data.dashboard.hasOwnProperty('recently_uploaded')) {

        $.each(data.dashboard.recently_uploaded, function(i, res) {
        var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['upload_timestamp']+"</td></tr>";
                $(html).appendTo("#viewupload"); 


          $("#recentlyupload tr").click(function() {
              //alert($(this).attr('id'));
                window.location = 'viewupload.html?id='+$(this).attr('id'); 

                $.each(data.dashboard.recently_uploaded, function(i, res) {
                  var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['description']+"</td><td><input type='textarea' rows='10' cols='45' id='textarea'/>"+res['description']+"</td></tr>";
                $(html).appendTo("#viewupload"); 
               

     
            }); 
                }); 


        });//each
      }//if


  //if        
 }//success
 });//ajax
 });//ready


//archievelist
$(document).ready(function () {
  //var rootURL = "http://192.168.0.24/abc/index.php";
 $.ajax({                                      
      url:  rootURL+"/archive_list", 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd")   
            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        console.log(data);
        src='<i class="icon-file"></i>';
      if(data.archivelist.hasOwnProperty('uploaded_new')) {

        $.each(data.archivelist.uploaded_new, function(i, res) {
        var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['upload_timestamp']+"</td></tr>";
                $(html).appendTo("#archivelist"); 

          $("#archivelist tr ").click(function() {
              //alert($(this).attr('id'));
                window.location = 'archivelist.html?id='+$(this).attr('id'); 

                $.each(data.archivelist.uploaded_new, function(i, res) {
                  var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['description']+"</td><td><input type='textarea' rows='10' cols='45' id='textarea'/>"+res['description']+"</td></tr>";
                $(html).appendTo("#archivelist"); 
               

     
            }); //each.click
          }); //click
        });//each
      }//if
      else{
        console.log("failed");
      }

 }//success
 });//ajax
 });//ready


$(document).ready(function () {
  //var rootURL = "http://192.168.0.24/abc/index.php";
 $.ajax({                                      
      url:  rootURL+"/review_list", 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd")   
            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        console.log(data);
        src='<i class="icon-file"></i>';
      if(data.reviewlist.hasOwnProperty('uploaded_new')) {

        $.each(data.reviewlist.uploaded_new, function(i, res) {
        var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['upload_timestamp']+"</td></tr>";
                $(html).appendTo("#reviewlist"); 

          $("#reviewlist tr ").click(function() {
              //alert($(this).attr('id'));
                window.location = 'reviewlist.html?id='+$(this).attr('id'); 

                $.each(data.uploadlist.uploaded_new, function(i, res) {
                  var html="<tr id='"+res['id_upload']+"'><td width='15%' class='text-center'>"+src+"</td><td width='*'>"+res['upload_type']+"</td><td width='*'>"+res['description']+"</td><td><input type='textarea' rows='10' cols='45' id='textarea'/>"+res['description']+"</td></tr>";
                $(html).appendTo("#reviewlist"); 
               

     
            }); //each.click
          }); //click
        });//each
      }//if
      else{
        console.log("failed");
      }

 }//success
 });//ajax
 });//ready
