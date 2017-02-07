//Set rootURL & env_img_path
var provURL='http://bkaas.com/api/v1_0_0/prov.php';
var rootURL;
var env_img_path;
var isProvURL = false;

var rootURL = window.localStorage.getItem('api_path');
var env_img_path = window.localStorage.getItem('img_path');
var loginURL = provURL;
//Set rootURL & env_img_path if not set already
if(rootURL != undefined && rootURL != null && rootURL != "undefined" && rootURL != "null" && env_img_path != undefined && env_img_path != null) {
	loginURL = rootURL;
}
else {	//Get User to set API Path to continue
	//loginURL = provURL;	//provURL is already set
}


//TODO add ajaxStart and ajaxStop events to show 'Loading..' screen
$( document ).ajaxStart(function() {
    //alert('ajaxStart');
    $('#loading').show();
});

$( document ).ajaxStop(function() {
    //alert('ajaxStop');
    $('#loading').hide();
});


//registration_form.html

 $(document).ready(function () {
 	if($('#regForm').length>0) {

 	
        $( window ).load(function() {  
            $('#loading').hide();//default
            $('#extraFor').hide();  //default
            $('#extraRes').hide();  //default
            
            $('a#forgot').on('click', function(e) {
                e.preventDefault();
                if ( $('#extraRes').is(':visible') ) {                    
                    $('#extraRes').hide(); 
                    $('a#pass').css('text-decoration', 'none');
                }                    
                $('a#forgot').css('text-decoration', 'underline');
                $('#extraFor').slideToggle('slow');                    
            });
            $('a#pass').on('click', function(e) {
                e.preventDefault();
                if ( $('#extraFor').is(':visible') ) {               
                    $('#extraFor').hide(); 
                    $('a#forgot').css('text-decoration', 'none');
                }                
                $('a#pass').css('text-decoration', 'underline');
                $('#extraRes').slideToggle('slow');                
            });
            //if loaded on android device, move the login panel towards top
            if(navigator.userAgent.toLowerCase().indexOf("android") > -1)
                $('.login-panel').css('margin-top', '12%');
                
            var db ;
            //Update - If there are any login credentials on the localStorage, ask User if User wants to continue
            if(window.localStorage.getItem("user_name") && window.localStorage.getItem("pwd")) {
                
                window.location = 'dashboard.html';
            }
          //end of if
                });//load


        //console.log('Validate the user');
        $.validator.setDefaults({
            submitHandler: function (form) {
                //alert('submitted'); 
                var postData = $("form").serializeArray();                
                //If form is validated to be true, trigger ajax call to register User
                rootURL = window.localStorage.getItem('api_path');
				if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
					window.localStorage.clear();
					window.location = 'login.html';
				}
                env_img_path = rootURL.replace('api/index.php', '');
                $.ajax({
                    type: 'POST',                    
                    url: rootURL+"/register",
                    data: postData,
                    //dataType: "JSON",

                    success: function(data) {
                       var obj = JSON.parse(data);
                        if(obj.error) {
                            $('#userExists').removeClass();
                            $('#userExists').css('display', 'block');
                            $('#userExists').addClass('alert alert-danger alert-warning alert-info');
                            $('#userExists').html(obj.error);                            
                        }
                        else if(obj.status == 1) {
                            $('#userExists').removeClass();
                            $('#userExists').css('display', 'block');
                            $('#userExists').addClass('alert alert-success');                            
                            $('#userExists').html('You have successfully registered. An activation link has been emailed. <a href="activate.html">Click here</a> to Activate your account.');
                            
                        }
                        else{
                            $('#userExists').removeClass();
                            $('#userExists').css('display', 'block');
                            $('#userExists').addClass('alert alert-danger alert-warning alert-info');
                            $('#userExists').html('User already exists.');

                        }
                    },                    
                    error: function(data) {                        
                        $('#userExists').removeClass('alert alert-danger alert-warning alert-info');
                            $('#userExists').html('Error in connecting');
                            $('#userExists').css('display', 'block');
                    }
                });
            
                //form.submit();
            }
        });

        $('form').validate({ 
            rules: {
                subscriber_name: {
                    required: true,
                    minlength: 5
                },
                user_name: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                pwd: {
                    required: true,
                    minlength: 6
                },
                phone: {
                    required: true,
                    minlength: 10
                },
                
            },
            messages: {
                subscriber_name: { required: "subscribername is Required"},
                user_name: { required: "Username is Required"},
                email: { required: "email is Required"},
                pwd: { required: "password is Required"},
                phone: { required: "phone number is Required"}
            }
        });
        $(function(){
        $("#regForm").validate({
                rules: {
                    subscriber_name: { required: true, minlength: 5},
                    user_name: { required: true, minlength: 5},
                    email: { required: true, minlength: 6},
                    pwd: { required: true, minlength: 6},
                    phone: { required: true, minlength: 6}
                },
                messages: {
                    subscriber_name: { required: "subscribername is Required"},
                    user_name: { required: "Username is Required"},
                    email: { required: "email is Required"},
                    pwd: { required: "password is Required"},
                    phone: { required: "phone number is Required"}
                },
                ignore:      "",
                errorClass:  'fieldError',
                onkeyup:     true,
                onblur:      true,
                errorElement:'label',
                submitHandler: function() {                        
                    alert("alert");
                }
            });
        });
        //submit form on pressing 'enter' key
        /*document.onkeydown = function () {
            if (window.event.keyCode == '13') {
                //submitForm();
                $("#loginForm").submit();               
            }
        }*/
        
        $("#register").click(function(){
            $("#regForm").submit();
            return false;
        });
        //$('#loginForm').submit();
  }//if($('#regForm').length>0)
});//ready    

//editupload.html
if($('#uploadimage').length > 0) {

        $('#id_user').val(window.localStorage.getItem('id_user'));
        $('#id_subscriber').val(window.localStorage.getItem('id_subscriber'));
        $("#uploadimage").on('submit',(function(e) {
        e.preventDefault();
        $("#message").empty();
        $('#loading').show();
        rootURL = window.localStorage.getItem('api_path');
		if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
			window.localStorage.clear();
			window.location = 'login.html';
		}
        env_img_path = rootURL.replace('api/index.php', '');
         $.ajax({
          url: rootURL+"/upload", // Url to which the request is send
          type: "POST",             // Type of request to be send, called as method
          data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
          dataType: "json",
          processData: false,
          cache: false,
          contentType: false,       // To send DOMDocument or non processed data file it is set to false
          success: function(data) {
            console.log("data");
            if(data.status) {
                        
                 $("#help #msg").html('File uploaded succesfully');
                  $("#help")
                  .removeClass(" alert-danger")
                  .addClass('alert alert-success')     
                  .css("display", "block");   
                     setTimeout(function() {                                 
                    window.location.href = "uploadlist.html";
                }, 2000);     

                   }
             else {
                 
                  $("#help #msg").html('File upload failed');
                      
                $("#help")
                .addClass("alert-danger")                          
                .css("display", "block");

              }
          },
          error: function(data) {
            //console.log(data);
            $("#help").addClass("alert-danger") 
            $("#help").css("display", "block");
            $("#help").html("Failed to upload selected file");
              
          }
          
        });
                
      }));
    var upload = getUploadType();
    upload.success(function(json) {
    upload_types = json;
  }),
  upload.complete(function(data) {       
     //Loop through each obj element and build the select list
     //$.each(media_types,function(i,data){
        //if(data.MediaGroup == media_type) {
          //$(document).find("select[name='"+sel_ele+"']").append('<option value="'+data.idMediaType+'">'+data.MediaType+'</option>'); 
          //console.log(data.MediaGroup + '==' + media_type);
          //if(media_type != 'Phone') {
            //console.log(data);
         // }
          //if(data.idMediaType == sel_val) {
            //$(document).find("select[name='"+sel_ele+"']").append('<option value="'+data.idMediaType+'" selected>'+data.MediaType+'</option>'); 
            //console.log(data.MediaGroup + ' == ' + media_type + ' && ' + data.idMediaType + ' == '+ sel_val );
          //}
         // else
         $.each(upload_types,function(i,data){
         if(data.active == 1){
            $(document).find("select[name='upload_type']").append('<option value="'+data.id_refuploadtype+'">'+data.upload_type+'</option>'); 
         }
       });//each

}); 

      }

// Function to preview image after validation
$(function() {
$("#file").change(function() 
{
          $("#message").empty(); // To remove the previous error message
             var file = this.files[0];
             var imagefile = file.type;
             var match= ["image/jpeg","image/png","image/jpg"];
      if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
   {
        $('#previewing').attr('src','noimage.png');
        $("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
         return false;
   }
       else
{
   var reader = new FileReader();
   reader.onload = imageIsLoaded;
   reader.readAsDataURL(this.files[0]);
}
});
});
function imageIsLoaded(e) 
{
    $("#file").css("color","green");
    $('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
    $('#previewing').attr('width', '250px');
    $('#previewing').attr('height', '230px');

  //file select based on category


}//console.log("select[name='"+sel_ele+"']" + " - " + media_type);
          /*if(data.MediaType == sel_val) {
            $(document).find('select.'+sel_ele).append('<option value="'+data.idMediaType+'" selected>'+data.MediaType+'</option>');
          }
          else
            $(document).find('select.'+sel_ele).append('<option value="'+data.idMediaType+'">'+data.MediaType+'</option>'); */
           //if            
  function getUploadType() {
    rootURL = window.localStorage.getItem('api_path');
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
    return $.ajax({
        url: rootURL+"/upload_type",
        type: "GET",
        dataType: "json",
        data: {
             },
        success: function( json ) {       
          //console.log(json);        
          $("#msg").html("success");

          //media_types = json; 
          //console.log('after media type ajax call success');
        //console.log(media_types);
        },   
        error: function() {
            /*alert( "Sorry, there was a problem in fetching media types" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );*/
            $("#help #msg").html("Error in fetching Upload Types");
        $("#help")
          .addClass("alert-danger")
          .css("display", "block");
        },      
        complete: function() {
            //console.log( "The renderMediaTypes() request is complete!" );
        }
    });

 };//ready

//update transaction status of an 'upload' entry


//dashboard.html
if($('#dashboard').length > 0) {
  //var rootURL = "http://192.168.0.24/abc/index.php";
    rootURL = window.localStorage.getItem('api_path');
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
 $.ajax({                                      
      url:  rootURL+"/dashboard", 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd"),
               
            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        console.log(data);
        src='<i class="fa fa-file"></i>';
      if(data.dashboard.hasOwnProperty('recently_uploaded')) {
        if(data.dashboard.recently_uploaded.length > 0) {
        $.each(data.dashboard.recently_uploaded, function(i, res) {  
          url = env_img_path+'/'+res['upload_file_pathname'];
		  var html="<tr><td width='15%' id='"+res['id_upload']+"'>"+src+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['upload_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
          $(html).appendTo("#recentlyupload");  
          
          $('#recentlyupload tr td:not(:last-child)').click(function() {
              //alert($(this).attr('id'));
                window.location = 'viewupload.html?id='+$(this).attr('id');      
          }); //click
        }); ////eacheach
      }  //if        
      else{
          $('#recentlyupload').html('No entries found');  
      }
 }

  else {
    $('#recentlyupload').html('No entries found');  
  }

      if(data.dashboard.hasOwnProperty('recently_completed')) {
        if(data.dashboard.recently_completed.length > 0) {
        $.each(data.dashboard.recently_completed, function(i, res) {  
		url = env_img_path+'/'+res['upload_file_pathname'];
          var html="<tr><td width='15%' id='"+res['id_upload']+"'>"+src+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['upload_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
          $(html).appendTo("#recentlycomplete");  
          
          $('#recentlycomplete tr td:not(:last-child)').click(function() {
              //alert($(this).attr('id'));
                window.location = 'viewupload.html?id='+$(this).attr('id');      
          }); //click
        }); ////eacheach
      }  //if        
      else{
          $('#recentlycomplete').html('No entries found');  
      }
 }

  else {
    $('#recentlycomplete').html('No entries found');  
  }
  },//success

error: function(data) {
  $("#help #msg").html("An error occured");
            $("#help")
              .addClass("alert-danger") 
              .css("display", "block");     
  }

 });//ajax
};//ready

//logo redidirect
$(".navbar-header img").click(function(){
  window.location="dashboard.html";
 });

//uploadlist.html
if($('#uploadlist').length > 0) {
  //var rootURL = "http://192.168.0.24/abc/index.php";
	rootURL = window.localStorage.getItem('api_path');	
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
	env_img_path = rootURL.replace('api/index.php', '');
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
        src='<i class="fa fa-file"></i>';
        //"<a href="+env_img_path+data.upload_file_path+" download><i class='fa fa-download'></i></a>";

        if(data.hasOwnProperty('upload_list')) {
        if(data.upload_list.length > 0) {
        $.each(data.upload_list, function(i, res) {  
		url = env_img_path+'/'+res['upload_file_pathname'];
          var html="<tr><td width='15%' id='"+res['id_upload']+"'>"+src+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['upload_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
          $(html).appendTo("#uploadlist");  
          
          $('#uploadlist tr td:not(:last-child)').click(function() {
              //alert($(this).attr('id'));
                window.location = 'viewupload.html?id='+$(this).attr('id');      
          }); //click
        }); ////eacheach
      }  //if        
      else{
          $('#uploadlist').html('No entries found');  
      }
 }

  else {
    $('#uploadlist').html('No entries found');  
  }
  },//success

error: function(data) {
  $("#help #msg").html("An error occured");
            $("#help")
              .addClass("alert-danger") 
              .css("display", "block");     
  }
 });//ajax
 }//if($('#uploadlist').length > 0)

//reviewlist.html
if($('#reviewlist').length > 0) {
  //var rootURL = "http://192.168.0.24/abc/index.php";
	rootURL = window.localStorage.getItem('api_path');
 	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
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
		src='<i class="fa fa-file"></i>';
		if(data.hasOwnProperty('data')) { 
		if(data.data.length > 0) {         
		$.each(data['data'], function(i, res) { 
		  if(res['transaction_status'] == '3')
		{
		var badge='<span class="badge" style="background-color:red;">R</span>';
	  }
	  else
	  {
		var badge='<span class="badge" style="background-color:green;">C</span>';
	  }           
	   src='<i class="icon-file"></i>';
	   url = env_img_path+'/'+res['upload_file_pathname'];
			if(res['transaction_status'] == '3')  {  //rejected
			
			  var html="<tr class='rejected'><td width='15%' class='text-center' id='"+res['id_upload']+"'>"+src+"<br>"+badge+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['processing_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
			}
			else {
			  var html="<tr><td width='15%' class='text-center' id='"+res['id_upload']+"'>"+src+"<br>"+badge+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['processing_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
			}
			$(html).appendTo("#reviewlist"); 
		  });//each

		  //on click, redirect to details page
		  $('#reviewlist tr td').click(function() {            
			if($(this).attr('id'))
			  window.location = 'viewupload.html?id='+$(this).attr('id');            
		  }); //click
		  //do not redirect when user clicks on 'Download' icon
		  /*$('#reviewlist tr td:not(:last-child)').on('click', function(event){
			event.preventDefault();
		  });*/
		}//if
		else{
		  $('#reviewlist').html('No entries found');  
	  }
	}

	else {
	$('#reviewlist').html('No entries found');  
	}
	},//success

	error: function(data) {
	$("#help #msg").html("An error occured");
			$("#help")
			  .addClass("alert-danger") 
			  .css("display", "block");     
	}
	});//ajax
 }//if($('#uploadlist').length > 0)

//archivelist.html
if($('#archivelist').length > 0) {
	//var rootURL = "http://192.168.0.24/abc/index.php";
	rootURL = window.localStorage.getItem('api_path');
  	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
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
		src='<i class="fa fa-file"></i>';
		if(data.hasOwnProperty('archive_list')) {
		if(data.archive_list.length > 0) {
		$.each(data.archive_list, function(i, res) { 
		  url = env_img_path+'/'+res['upload_file_pathname'];		
		  var html="<tr><td width='15%' id='"+res['id_upload']+"'>"+src+"</td><td width='*' id='"+res['id_upload']+"'>"+res['upload_type']+"</td><td width='*' id='"+res['id_upload']+"'>"+res['description']+"<br>"+res['archive_timestamp']+"</td><td width='*' id='"+res['id_upload']+"'><a onclick=showHelp('"+url+"') href='#'><i class='fa fa-eye'></i></a></td></tr>";
		  $(html).appendTo("#archivelist");  
		  
		  $('#archivelist tr td:not(:last-child)').click(function() {
			  //alert($(this).attr('id'));
				window.location = 'viewupload.html?id='+$(this).attr('id');      
		  }); //click
		}); ////eacheach
	  }  //if        
	  else{
		  $('#archivelist').html('No entries found');  
	  }
	}

	else {
	$('#archivelist').html('No entries found');  
	}
	},//success

	error: function(data) {
	$("#help #msg").html("No entries found");
			$("#help")
			  .addClass("alert-danger") 
			  .css("display", "block");     
	}
	});//ajax
 }//if($('#uploadlist').length > 0)


//Return value of the provided query string parameter
        function GetParameterValues(param) {    
            var currentUrl = window.location.href;
            //alert(currentUrl);
            var res = currentUrl.charAt(currentUrl.length-1);
            var url;
            if(res == '#') {    //remove # if there is any at the end of the URL        
                currentUrl = currentUrl.substring(0, currentUrl.length-1);      
                url = window.location.href.slice(currentUrl.indexOf('?') + 1).split('&');  
            }
            else
                url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  

            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            }//for
        } //end of GetParameterValues(param)

        $(document).ajaxError(function(e, jqxhr, settings, exception) {  
            if (jqxhr.readyState == 0 || jqxhr.status == 0) {  
                return; //Skip this error  
            }  
        }); 



//viewupload
if($('#viewupload').length > 0) {

  //1. Load data
    var id = GetParameterValues('id');
    rootURL = window.localStorage.getItem('api_path');
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
    $.ajax({                                      
		url:  rootURL+"/view_upload/"+id,
		data: {
				user_name: window.localStorage.getItem("user_name"), 
				pwd: window.localStorage.getItem("pwd"),              
				id_subscriber: window.localStorage.getItem("id_subscriber"),
				id_user: window.localStorage.getItem("id_user"),
			   
		},
		dataType : "json",                //data format      
		success: function(data)          //on recieve of reply
		{
		console.log(data);
		//$("#status").html(data.file_view[0]['status']);
		src='<i class="fa fa-file"></i>';

		if(data.hasOwnProperty('file_view')) {  
		console.log(parseInt(data.file_view['File Type']));
		//if(parseInt(data.file_view['File Type']) > 0) {        
		  var html = '';
		  $.each(data['file_view'], function(key, value) {					
			if(key == 'File') {
				url = env_img_path+'/'+value;
				ext=value.substring(value.lastIndexOf("."));
			  if(ext == '.pdf' || ext == '.PDF'){
				src='<i class="fa fa-file-pdf-o"></i>';
			  }
			  else if(ext == '.jpg' || ext== '.jpeg' || ext== '.JPEG' || ext== '.png' || ext== '.PNG'){
				src='<i class="fa fa-picture-o"></i>';
			  }
			  else if(ext == '.docx' || ext== '.DOCX'){
				src='<i class="fa fa-file-word-o"></i>';
			  }
			  else {
				src='<i class="fa fa-eye"></i>';                   
			  }
			  html += '<tr><td>File</td><td><a href=# onclick=showHelp(url)>'+src+'</a></td></tr>';
			}                                
			/*else if(key == 'File') 
			  html += '<tr><td>'+key+'</td><td><a href="'+env_img_path+value+'" download>'+src+'</a></td></tr>';*/
		   else if(key == 'Status' && (value == 'New' || value == 'Archive')){//New
				html += '<tr><td>'+key+'</td><td>'+value+'</td></tr>';
				$('#commentsTable').remove();
			}                
			else {
			  if(key == 'Comments')
				$('#comments').html(value);
			  else
				html += '<tr><td>'+key+'</td><td>'+value+'</td></tr>';
			}
		  }); //each
		  $(html).appendTo("#viewupload"); 
		}//if
		else 
		{
		$('#viewupload').html('An error occured while fetching data');  
		}
		},//success

		error: function(data) {
		  $("#help #msg").html("An error occured");
					$("#help")
					  .addClass("alert-danger") 
					  .css("display", "block");     
		  }
    });//ajax

     //2. Accept
     $("#accept").click(function() {            
       update_status(id, 'Archive');
      });
     //3. Reject
     $("#reject").click(function() {            
       update_status(id, 'Rejected');
      });
 };//ready

//update transaction status of an 'upload' entry
function update_status(id,status) {

  if(id == 0 || status != null) {
    rootURL = window.localStorage.getItem('api_path');
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
    $.ajax({                                  
      method: "post",
      url:  rootURL+"/update_upload/"+id, 
                       //the script to call to get data          
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd"),              
                id_subscriber: window.localStorage.getItem("id_subscriber"),
                id_user: window.localStorage.getItem("id_user"),
                id_upload: id,
                transaction_status: status,
                comments: $('#comments').val(),

            },
      dataType : "json",                //data format      
      success: function(data)          //on recieve of reply
      {
        if(data.status) {
          if(status == 'Archive')
            window.location = 'archivelist.html';
          else
            window.location = 'reviewlist.html';
        }
        else {
    $('#viewupload').html('Something went wrong');  
  }
  },//success

error: function(data) {
  $("#help #msg").html("An error occured");
            $("#help")
              .addClass("alert-danger") 
              .css("display", "block");     
  }
    });//ajax
  }
}
//signout
$("#signout").click(function(e){
    e.preventDefault();
    /*window.localStorage.removeItem("activeProfile");
    window.localStorage.removeItem("isParentProfile");
    window.localStorage.removeItem("profileTitle");*/
    //window.localStorage.removeItem("idSubscriber");
    //window.localStorage.removeItem("loggedIn");
    //window.localStorage.clear();  
    //if(confirm('Are you sure you want to Signout?'))  {   
        var store_api_path = window.localStorage.getItem('api_path');
        var store_img_path = window.localStorage.getItem('img_path');
        window.localStorage.clear();
        //set api_path back
        window.localStorage.setItem('api_path', store_api_path);
        window.localStorage.setItem('img_path', store_img_path);
        $(location).attr('href',"login.html");
    //}
});

//serch
$("#search").keyup(function () {
    var value = this.value.toLowerCase().trim();

    $("table tr").each(function (index) {
     index = index+1; //work around as first row is always displayed even if the search criteria doesn't match
     console.log(index);
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var not_found = (id.indexOf(value) == -1);
            $(this).closest('tr').toggle(!not_found);
            return not_found;
        });
    });
});

//forgotpassword
if($('#forgotpwd').length > 0){
        //declaration local to file          
        
        $("#forgotpwd").validate({
                rules: {
                    email: { required: true, minlength: 6}                    
                },
                messages: {
                    email: { required: "Email is Required"}                    
                },
                ignore:      "",
                errorClass:  'fieldError',
                onkeyup:     true,
                onblur:      true,
                errorElement:'label',
                submitHandler: function (form) { 
                    //alert('submitHandler');               
                    //If form is validated to be true, trigger ajax call to login
                    rootURL = window.localStorage.getItem('api_path');
					if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
						window.localStorage.clear();
						window.location = 'login.html';
					}
                    env_img_path = rootURL.replace('api/index.php', '');
                    $.ajax({                      
                      url: rootURL+"/forgot_pwd_email",    //Local
                      type: "POST",
                      dataType: "JSON",
                      data: {
                                email: $('#email').val()                                
                            },              
                      success: function(data){
                                console.log('success');
                                console.log(data);
                                if(Object.keys(data.status)) {
                                    if(data.status) {
                                        $('#verificationError').remove();
                                        $('#successMsg').css('display', 'block');
                                        $('#successMsg').html('An email been sent to given email please <a href="resetpassword.html">Click here</a> to reset your password.');                    
                                    }
                                    else {
                                        $('#successMsg').remove();
                    $('#verificationError').css('display', 'block');
                                        $('#verificationError').html(data.message);                   
                                    }
                                }                                
                      },
                      error: function(data){
                        $('#forgotpwd').html('An error occured');
                        console.log(data);
                        $('#verificationError').css('display', 'block');
                        $('#verificationError').html(data.message);
                        //alert('An Error occured');
                        //alert(JSON.stringify(data));
                      },
                  });                
                //form.submit();
                }
            });

        //submit form on pressing 'enter' key
        document.onkeydown = function () {
            if (window.event.keyCode == '13') {
                //submitForm();
                $("#forgotpwd").submit();               
            }
        }
        
        $("#submit").click(function(){
            $("#forgotpwd").submit();
            return false;
        });
        //$('#loginForm').submit();
    

    }


//reset

if($('#reset_form').length > 0){
            //1. Verify inputs and identify which action user has selected
            var act = GetParameterValues('action') ;
            /*if(act == 'key'){   //Parent account password reset
                $('.panel-heading').html('<span data-str="reset_pwd">Reset Password</span>');
            }
            else if(act == 'pro_key'){   //Profile Password reset
                $('.panel-heading').html('<span data-str="email">Reset Profile Password</span>');                
            }*/

            //2. Validate Form
            $("form#reset_form").validate({
               rules: {
                    reset_key: { 
                        required: true, 
                        minlength: 6,
                        maxlength: 6
                    },
                    new_pwd: {
                        required: true,
                        minlength: 6
                    },
                    re_new_pwd: {
                        required: true,
                        minlength: 6,
                        equalTo: "#new_pwd"
                    }                   
                },
                messages: {
                    reset_key: { required: "Reset Key is Required" },
                    new_pwd: { required: "New Password is Required" },
                    re_new_pwd: { required: "Re-type New Password is Required" }
                },
                ignore: "",
                errorClass: 'fieldError',
                onkeyup: true,
                onblur: true,
                errorElement: 'label',
                submitHandler: function() {
                    var vCode = $('#reset_key').val();
                    if ($.trim(vCode).length == 0) {
                        $('#reset_key').html('Please enter your Reset code sent to your registered Email ID');            
                    }
                    else {
                        rootURL = window.localStorage.getItem('api_path');
						if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
							window.localStorage.clear();
							window.location = 'login.html';
						}
                        env_img_path = rootURL.replace('api/index.php', '');
                        $.ajax({
                            type: 'POST',
                            url: rootURL+'/reset_forgot_pwd',
                            data: {
                                act: GetParameterValues('action'),
                                reset_key: vCode,
                                new_pwd: $('#new_pwd').val(),
                                re_new_pwd: $('#re_new_pwd').val()
                            },
                            dataType: "JSON",
                            crossDomain: true,
                             success: function(data){
                                console.log('success');
                                console.log(data);
                                if(Object.keys(data.status)) {
                                    if(data.status) {
                                        $('#verificationError').remove();
                                        $('#successMsg').css('display', 'block');
                                        $('#successMsg').html('Your password has been reset successfully. Please <a href="login.html">Click here</a> to login your account.');                    
                                    }
                                    else {
                                        $('#successMsg').remove();
                                        $('#verificationError').css('display', 'block');
                                        $('#verificationError').html(data.message);                   
                                    }
                                }                                
                      },
       error: function(xhRequest, ErrorText, thrownError) {
                                $('#reset_key').html('An error occured. Please try again');
                                data = $.parseJSON(xhRequest.responseText);
                                ajaxResult = data.status;
                                $('#reset_key').val(''); 
                                $('#help').html('An error occured. Please try again.');
                                $('#help').css('display', 'block');
                                //console.log(data);                                
                                console.log( "Error: ");
                                console.log(JSON.stringify(errorThrown));
                                console.log( "status: ");
                                console.log(JSON.stringify(status) ); 
                                //alert(rootURL+'/val_reg');
                                //alert(JSON.stringify(data));
                            },
                            complete: function(xhRequest, ErrorText, thrownError) {
                                data = $.parseJSON(xhRequest.responseText);                                
                                if(xhRequest.status == 200)
                                //if(ajaxResult == true) {
                                    if(Object.keys(data).length > 0) {
                                        if(data.status == true) { //account activated, show login link
                                            $('#reset_key').val('');    //empty the textbox 
                                            $('#help').css('display', 'block');
                                            $('#help').addClass('alert alert-success'); 
                                            $('#help').html('Your password has been reset successfully. Please <a href="login.html">Click here</a> to login your account.');
                                                                                
                                        }
                                        else {  //activation code does not match, show message
                                            $('#reset_key').val(''); 
                                            $('#help').css('display', 'block');
                                            $('#help').addClass('alert alert-danger alert-warning alert-info');
                                            $('#help').html(data['message']);
                                            //input_email = $('input[name="email"').val();
                                            /*if(param_referrer != undefined && parseInt(param_referrer) > 0) {
                                                $(location).attr('href','register_form.html?referrer='+param_referrer+'&email='+input_email);
                                            }
                                            else
                                                $(location).attr('href','register_form.html?email='+input_email);*/
                                        }
                                    //$('#help').prop('display', 'block');
                                    }
                                    else {
                                        $('#reset_key').val(''); 
                                        $('#help').html('Please try again');                                         
                                        $('#help').css('display', 'block');
                                    }
                                        
                                }                                
                        });
                    }//end of else          
                        
                }//submitHander function
             });//validate()
                        
        };//length()
        

if($('#activation_form').length > 0){
            //Validate Form
            $("#activation_form").validate({
               rules: {
                    activation_code: { required: true, minlength: 6, maxlength: 6}                    
                },
                messages: {
                    activation_code: { required: "Activation Code is Required"}                    
                },
                submitHandler: function() {                    
                    var vCode = $('#activation_code').val();
                    if ($.trim(vCode).length == 0) {
                        $("#activation_code").html('Please enter your verification code sent to your registered Email ID');            
                    }
                    else {
                        rootURL = window.localStorage.getItem('api_path');
						if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
							window.localStorage.clear();
							window.location = 'login.html';
						}
                        env_img_path = rootURL.replace('api/index.php', '');
                        $.ajax({
                            type: 'POST',
                            url: rootURL+'/activate',
                            data: {
                                activation_code: vCode                        
                            },
                            //dataType: "JSON",
                            crossDomain: true,
                            success: function(data) {
                                console.log(data);
                                //userexists();    
                                ajaxResult = true;                                
                            },                    
                            error: function(xhRequest, ErrorText, thrownError) {
                                //alert('An error occured. Please try again');
                                $('#activation_code').val(''); 
                                $('#help').html('An error occured. Please try again.');
                                $('#help').css('display', 'block');
                                //console.log(data);
                                ajaxResult = false;
                                console.log( "Error: ");
                                console.log(JSON.stringify(errorThrown));
                                console.log( "status: ");
                                console.log(JSON.stringify(status) ); 
                                //alert(rootURL+'/val_reg');
                                //alert(JSON.stringify(data));
                            },
                            complete: function(xhRequest, ErrorText, thrownError) {
                                //data = $.parseJSON(xhRequest.responseText);
                                data = xhRequest.responseText;
                                if(xhRequest.status == 200)
                                //if(ajaxResult == true) {
                                    if(Object.keys(data).length > 0) {
                                        if(data.status == true) { //account activated, show login link
                                            $('#activation_code').val('');    //empty the textbox 
                                            $('#help').html(data);
                                            $('#help').css('display', 'block');                                    
                                        }
                                        else {  //activation code does not match, show message
                                            $('#activation_code').val(''); 
                                            $('#help').html(data);
                                            $('#help').css('display', 'block');
                                            //input_email = $('input[name="email"').val();
                                            /*if(param_referrer != undefined && parseInt(param_referrer) > 0) {
                                                $(location).attr('href','register_form.html?referrer='+param_referrer+'&email='+input_email);
                                            }
                                            else
                                                $(location).attr('href','register_form.html?email='+input_email);*/
                                        }
                                    //$('#help').prop('display', 'block');
                                    }
                                    else {
                                        $('#activation_code').val(''); 
                                        $('#help').html('Please try again');                                         
                                        $('#help').css('display', 'block');
                                    }
                                        
                                }
                                /*else {
                                    if(data.status) { //user exists, show div#help
                                            $('#help').css('display', 'block');
                                    }
                                    else
                                        alert('Please try again');
                                }
                            }*/
                        });
                    }//end of else          
                        
                }
             });
                        
        };

        //Return value of the provided query string parameter
       /* function GetParameterValues(param) {    
            var currentUrl = window.location.href;
            //alert(currentUrl);
            var res = currentUrl.charAt(currentUrl.length-1);
            var url;
            if(res == '#') {    //remove # if there is any at the end of the URL        
                currentUrl = currentUrl.substring(0, currentUrl.length-1);      
                url = window.location.href.slice(currentUrl.indexOf('?') + 1).split('&');  
            }
            else
                url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  

            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            }//for
        } //end of GetParameterValues(param)

        $(document).ajaxError(function(e, jqxhr, settings, exception) {  
            if (jqxhr.readyState == 0 || jqxhr.status == 0) {  
                return; //Skip this error  
            }  
        }); 
        */

        //TODO add ajaxStart and ajaxStop events to show 'Loading..' screen
$( document ).ajaxStart(function() {
    //alert('ajaxStart');
    $('#loading').show();
});

$( document ).ajaxStop(function() {
    //alert('ajaxStop');
    $('#loading').hide();
});
if($('#passwordResetForm').length > 0){
            //Validate Form
            $("#passwordResetForm").validate({
               rules: {
          current_pwd: { required: true, minlength: 6},
          new_pwd: { required: true, minlength: 6},
          re_new_pwd: { required: true, minlength: 6, equalTo: "#new_pwd"}
      },
      messages: {
          current_pwd: { required: "Current Password is Required"},
          new_pwd: { required: "New Password is Required"},
          re_new_pwd: { required: "Re-type New Password is Required"}
      },
      ignore:      "",
      errorClass:  'fieldError',
      onkeyup:     true,
      onblur:      true,
      errorElement:'label',
                submitHandler: function() {                    
                    var vCode = $('#current_pwd').val();
                    if ($.trim(vCode).length == 0) {
                        $("#current_pwd").html('Please enter your current password');            
                    }
                    else {
                        rootURL = window.localStorage.getItem('api_path');
						if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
							window.localStorage.clear();
							window.location = 'login.html';
						}
                        env_img_path = rootURL.replace('api/index.php', '');
                        $.ajax({
                            type: 'POST',
                            url: rootURL+'/reset_pwd',
                            data: {
                                id_subscriber: window.localStorage.getItem('id_subscriber'),
                                current_pwd: $('#current_pwd').val(), 
                                new_pwd: $('#new_pwd').val(),
                                re_new_pwd: $('#re_new_pwd').val()                        
                            },
                            dataType: "JSON",
                            crossDomain: true,
                            success: function(data) {
                                console.log(data);
                                //userexists();    
                                if(Object.keys(data.status)) {
                                    if(data.status) {
                                        $('#headsup').remove();
									    var store_api_path = window.localStorage.getItem('api_path');
										var store_img_path = window.localStorage.getItem('img_path');
										window.localStorage.clear();
										//set api_path back
										window.localStorage.setItem('api_path', store_api_path);
										window.localStorage.setItem('img_path', store_img_path);                                      
                                      
                                        $('#verificationError').remove();
                                        $('#successMsg').css('display', 'block');
                                        $('#successMsg').addClass('alert alert-success'); 
                                        setTimeout(function() {                                 
                                            window.location.href = "login.html";
                                            }, 2000); 

                                        $('#successMsg').html('Your password has been reset successfully.');                                  
                                    }
                                    else {
                                        $('#successMsg').remove();
                                        $('#headsup').remove();
                                        $('#verificationError').css('display', 'block');
                                        $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
                                        $('#verificationError').html(data['message']);                  
                                    }
                                }                                         
                            },                    
                            error: function(xhRequest, ErrorText, thrownError) {
                                //alert('An error occured. Please try again');
                                $('#headsup').remove();
                                $('#current_pwd').val('');
                                $('#verificationError').addClass('alert alert-danger alert-warning alert-info');								
                                $('#verificationError').html('An error occured. Please try again.');
                                $('#verificationError').css('display', 'block');
                                //console.log(data);
                                ajaxResult = false;
                                console.log( "Error: ");
                                console.log(JSON.stringify(thrownError));
                                console.log( "status: ");
                                console.log(JSON.stringify(status) ); 
                                //alert(rootURL+'/val_reg');
                                //alert(JSON.stringify(data));
                            },
                            complete: function(xhRequest, ErrorText, thrownError) {
                                //data = $.parseJSON(xhRequest.responseText);
                                
                                data = xhRequest.responseText;
                                if(xhRequest.status == 200)
                                //if(ajaxResult == true) {
                                    if(Object.keys(data).length > 0) {
                                        if(data.status == true) { //account activated, show login link
                                            window.localStorage.clear();
                                            $('#headsup').remove();
                                            //$(location).attr('href',"login.html");
                                            //$('#current_pwd').val('');    //empty the textbox 
                                            $('#successMsg').css('display', 'block');
                                            $('#successMsg').addClass('alert alert-success'); 
                                            $('#successMsg').html('Your password has been reset successfully.');
                                            setTimeout(function() {                                 
                                              window.location.href = "login.html";
                                            }, 2000);     
                                        }
                                        else {  //activation code does not match, show message
                                            //$('#current_pwd').val(''); 
                                            $('#headsup').remove();
                                             $('#verificationError').css('display', 'block');
                                            $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
                                            $('#verificationError').html(data['message']);
                                            //input_email = $('input[name="email"').val();
                                            /*if(param_referrer != undefined && parseInt(param_referrer) > 0) {
                                                $(location).attr('href','register_form.html?referrer='+param_referrer+'&email='+input_email);
                                            }
                                            else
                                                $(location).attr('href','register_form.html?email='+input_email);*/
                                        }
                                    //$('#help').prop('display', 'block');
                                    }
                                    else {
                                        //$('#current_pwd').val(''); 
                                        $('#headsup').remove();
                                        $('#verificationError').css('display', 'block');
                                            $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
                                            $('#verificationError').html(data['message']);
                                    }
                                        
                                }
                                /*else {
                                    if(data.status) { //user exists, show div#help
                                            $('#help').css('display', 'block');
                                    }
                                    else
                                        alert('Please try again');
                                }
                            }*/
                        });
                    }//end of else          
                        
                }
             });
                        
        };

		//Reports.html
if($('#viewreports').length > 0) {
  var rtype = GetParameterValues('rtype');
  var date_range = GetParameterValues('range');
  console.log(date_range);
  var title = '';
  if((rtype != undefined ) && (date_range != undefined)) {

      //Display report title
      switch (rtype) { 
        case '1': 
          title = 'Expense Report';
          break;
        case '2': 
          title = 'Income Report';  
          break;
        case '3': 
          title = 'Liability Report';
          break;    
        case '4': 
          title = 'Asset Report';
          break;
        case '5':
          title = 'Equity Report';
          break;
        default:
          title = '';
      }
      //get date range      
      switch (date_range) { 
        case 'curmonth': 
          title += ' - Current Month';
          break;
        case 'prevmonth': 
          title += ' - Previous Month';
          break;
        case 'q1': 
          title += ' - First Quarter';
          break;    
        case 'q2': 
          title += ' - Second Quarter';
          break;
        case 'q3': 
          title += ' - Third Quarter';
          break;
        case 'q4': 
          title += ' - Fourth Quarter';
          break;
        default:          
          title = '';
      }

      //set title
      $('#reportTitle').html(title);
  
    //var rootURL = "http://192.168.0.24/abc/index.php";
    rootURL = window.localStorage.getItem('api_path');
	if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
		window.localStorage.clear();
		window.location = 'login.html';
	}
    env_img_path = rootURL.replace('api/index.php', '');
     $.ajax({                                      
          url:  rootURL+"/reports", 
          type: 'get',                  //the script to call to get data          
          data: {
              user_name: window.localStorage.getItem("user_name"), 
              pwd: window.localStorage.getItem("pwd"),              
              id_subscriber: window.localStorage.getItem("id_subscriber"),
              id_user: window.localStorage.getItem("id_user"),
              rtype: rtype,
              range: date_range               
          },
          dataType : "json", 
                        //data format      
          success: function(data)         //on recieve of reply
          {
            //console.log(data);
            //console.log(data.viewreports);
            if(data.hasOwnProperty('viewreports')) {
            if(data.viewreports.length > 0) {
              $.each(data.viewreports, function(i, res) {            
                var html="<tr><td width='15%'>"+res['count']+"</td><td width='*'>"+res['coa']+"</td><td width='*' class='amount' align='right' >"+res['amount']+"</td></tr>";          
                $(html).appendTo("#view_reports");  
            }); ////eacheach
              var result = [];
              $('#view_reports tr').each(function(){
                $('td.amount', this).each(function(index, val){
                  if(!result[index]) result[index] = 0;
                  result[index] += parseInt($(val).text());
                });
              });
              
              $('#view_reports').append('<tr></tr>');
              $(result).each(function(){
              $('#view_reports tr').last().append('<td colspan="3" align="right">Total: '+this+'</td>')
              });
            }  //if        
            else{
				//$('#excel').remove();
                $('#view_reports').html('No entries found');  
            }
          }
          else{
			  //$('#excel').remove();
                $('#view_reports').html('No entries found');  
            }
          },
          error: function(data) {
            $("#help #msg").html("An error occured");
                      $("#help")
                        .addClass("alert-danger") 
                        .css("display", "block");     
            }

     });//ajax
 }
  else {
    $('#reportTitle').html('insufficient data provided');//show error - insufficient data
  }
}

if($('#reportspage').length > 0) {

  $('#range').on('change.datechange', function() {
    $("#datechange").toggle($(this).val() == 'custom_date');
  }).trigger('change.datechange');

    $('#id_user').val(window.localStorage.getItem('id_user'));
    $('#id_subscriber').val(window.localStorage.getItem('id_subscriber'));
    $("#excel").on('click',(function(e) {
			//$("#message").empty();
			$('#loading').show();
		rootURL = window.localStorage.getItem('api_path');
		if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
			window.localStorage.clear();
			window.location = 'login.html';
		}
		env_img_path = rootURL.replace('api/index.php', '');
		$.ajax({
			  url: rootURL+'/export_email', // Url to which the request is send
			  type: "POST",             // Type of request to be send, called as method
			  data: {
						user_name: window.localStorage.getItem("user_name"), 
						pwd: window.localStorage.getItem("pwd"),              
						id_subscriber: window.localStorage.getItem("id_subscriber"),
						id_user: window.localStorage.getItem("id_user"),
					     rtype:$('#rtype').val(),
					     range:$('#range').val(),
						 startDate:$('#startDate').val(),
						 endDate:$('#endDate').val()
           
					   
			  }, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			  dataType: "json",
			  
			  success: function(data) {
				console.log(data);
				if(data.status) {
					$("#help").removeClass();					
					 $("#help").addClass("alert fade in alert-success")  ;   
					 $("#help").css("display", "block");                        
					 $("#message").html(data.message);
					setTimeout(function() {						
						}, 5000);     
					return true;
				}
				else {
					$("#help").removeClass();
					  $("#help").addClass("alert fade in alert-danger");                          
					  $("#help").css("display", "block");
					  $("#message").html(data.message);				   
				  }
			  },
			  error: function(data) {
				console.log(data);
				$("#help").removeClass();
				$("#help").addClass("alert fade in alert-danger"); 
				$("#help").css("display", "block");
				//$("#help #msg").html("An error occured");
				$("#message").html(data.message);				  
			  }
			  
		});//ajax
			
    }));//$("#excel").on('click'
}


//getting profile values
if($('#getprofile').length > 0){
	
rootURL = window.localStorage.getItem('api_path');
if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
	window.localStorage.clear();
	window.location = 'login.html';
}
env_img_path = rootURL.replace('api/index.php', '');
$.ajax({                      
	url: rootURL+"/get_profile",    //Local
	type: "GET",
	dataType: "JSON",
	data: {
			user_name: window.localStorage.getItem("user_name"), 
			pwd: window.localStorage.getItem("pwd"),              
			id_subscriber: window.localStorage.getItem("id_subscriber"),
			id_user: window.localStorage.getItem("id_user"),
			//email: $('#email').val(),
			//phone: $('#phone').val()
		},              
	success: function(data){
			if(data.hasOwnProperty('profile')) {
			if(data.profile.length > 0) {
			$.each(data.profile, function(i, res) {            
			  $('#username').val(res['user_name']);
			  $('#email').val(res['email']);
			  $('#phone').val(res['phone']);
			  $('#id_user').val(res['id_user']);
			  $('#id_subscriber').val(res['id_subscriber']);
			}); ////eacheach
		  }  //if        
		  else{
			  //$('#get_profile').html('error while loading the data'); 
			  $('#verificationError').css('display', 'block');
			  $('#verificationError').html(data.message);
			  $('#verificationError').html('error while loading the data'); 
		  }
	 }

	  else {
			  $('#verificationError').css('display', 'block');
			  $('#verificationError').html(data.message);
			  $('#verificationError').html('error while loading your data'); 
	  }                 
	},//success
	error: function(data){
		//console.log(data);
		$('#verificationError').css('display', 'block');
		$('#verificationError').html(data.message);
		$('#verificationError').html('An error occured');

		//alert('An Error occured');
		//alert(JSON.stringify(data));
	}
});//ajax                

    $('form').validate({
                rules: {
                    email: { required: true, minlength: 6}                    
                },
                messages: {

                    email: { required: "Email is Required"}                    
                },
                ignore:      "",
                errorClass:  'fieldError',
                onkeyup:     true,
                onblur:      true,
                errorElement:'label',
                submitHandler: function (form) { 
rootURL = window.localStorage.getItem('api_path');
if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
	window.localStorage.clear();
	window.location = 'login.html';
}
env_img_path = rootURL.replace('api/index.php', '');
      $.ajax({
          type: 'POST',
          url: rootURL+'/edit_profile',
          data: {
              id_subscriber: window.localStorage.getItem('id_subscriber'),
              id_user: window.localStorage.getItem('id_user'),
              email: $('#email').val(), 
              phone: $('#phone').val()                                
          },
          dataType: "JSON",
          crossDomain: true,
          success: function(data) {
              console.log(data);
              //userexists();    
              if(Object.keys(data.status)) {
                  
                    //$(location).attr('href',"login.html");
                    
                      $('#verificationError').remove();
                      $('#successMsg').css('display', 'block');
                      $('#successMsg').addClass('alert alert-success'); 
                      $('#successMsg').html('Your information saved successfully.');                                  
                      }
                  else {
                      $('#successMsg').remove();
                      $('#headsup').remove();
                      $('#verificationError').css('display', 'block');
                      $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
                      $('#verificationError').html(data['Data not saved please try again']);                  
                  }
              },                                        
                              
          error: function(data) {
              //alert('An error occured. Please try again');
              ('#verificationError').addClass('alert alert-danger alert-warning alert-info');
              $('#verificationError').html('An error occured. Please try again.');
              $('#verificationError').css('display', 'block');
              //console.log(data);
              ajaxResult = false;
              console.log( "Error: ");
              console.log(JSON.stringify(thrownError));
              console.log( "status: ");
              console.log(JSON.stringify(status) ); 
              //alert(rootURL+'/val_reg');
              //alert(JSON.stringify(data));
          },
        });//ajax
        },//submit handler
        });//form
 
        $("#submit").click(function(){
            //alert('submit');
              $("#getprofile").submit();
              //alert('Update');
            return false;
        });
      }
	  
	  //Load Subscriber Preference
if($('#preference_tab').length > 0){
	
rootURL = window.localStorage.getItem('api_path');
if(rootURL == undefined || rootURL == null || rootURL == "undefined" || rootURL == "null") {
	window.localStorage.clear();
	window.location = 'login.html';
}
env_img_path = rootURL.replace('api/index.php', '');
    //1. Load available currency
    var currency = getCurrency();
    currency.success(function(json) {
      currency_types = json;
      $.each(currency_types,function(i,data){
        if(data.active == 1){
          $(document).find("select[name='currency']").append('<option value="'+data.id_refcurrency+'">'+data.currency_name+'</option>'); 
        }
      });//each
    })    
    //2. Load preference        
    $.ajax({                      
      url: rootURL+"/preference",    //Local
      type: "GET",
      dataType: "JSON",
      data: {
                user_name: window.localStorage.getItem("user_name"), 
                pwd: window.localStorage.getItem("pwd"),              
                id_subscriber: window.localStorage.getItem("id_subscriber"),
                id_user: window.localStorage.getItem("id_user"),
                //email: $('#email').val(),
                //phone: $('#phone').val()
            },              
      success: function(data){
        if(data.hasOwnProperty('profile')) {
          if(data.profile.length > 0) {
            $.each(data.profile, function(i, res) {            
              $('#subscriber').val(res['subscriber_name']);          
              $('#currency').val(res['currency']);
              $('#physical_year').val(res['physical_year']);		  
            }); //each
          }  //if        
          else{
            //$('#get_profile').html('error while loading the data'); 
            $('#verificationError').css('display', 'block');
            $('#verificationError').html(data.message);
            $('#verificationError').html('error while loading the data'); 
          }
        }
        else {
            $('#verificationError').css('display', 'block');
            $('#verificationError').html(data.message);
            $('#verificationError').html('error while loading your data'); 
        }                 
      },//success
      error: function(data){
        //console.log(data);
        $('#verificationError').css('display', 'block');
        $('#verificationError').html(data.message);
        $('#verificationError').html('An error occured');

        //alert('An Error occured');
        //alert(JSON.stringify(data));
      }
    });//ajax


//3. On Submit, update Preference
$("#preference_tab").submit(function(e){
e.preventDefault();

  $.ajax({                      
    url: rootURL+"/update_currency",    //Local
    type: "POST",
    dataType: "JSON",
    data: {
              user_name: window.localStorage.getItem("user_name"), 
              pwd: window.localStorage.getItem("pwd"),              
              id_subscriber: window.localStorage.getItem("id_subscriber"),
              id_user: window.localStorage.getItem("id_user"),
              currency: $('#currency').val()
    },            
    success: function(data){
    if(Object.keys(data.status)) {

      //$(location).attr('href',"login.html");

      $('#verificationError').remove();
      $('#successMsg').css('display', 'block');
      $('#successMsg').addClass('alert alert-success'); 
      $('#successMsg').html('Your Currency updated successfully.');                                  
      }
      else {
      $('#successMsg').remove();
      $('#headsup').remove();
      $('#verificationError').css('display', 'block');
      $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
      $('#verificationError').html(data['Data not saved please try again']);                  
      }
    },                                        
            
    error: function(data) {
      //alert('An error occured. Please try again');
      $('#verificationError').addClass('alert alert-danger alert-warning alert-info');
      $('#verificationError').html('An error occured. Please try again.');
      $('#verificationError').css('display', 'block');
      //console.log(data);
      ajaxResult = false;
      console.log( "Error: ");
      console.log(JSON.stringify(data));              
      //alert(rootURL+'/val_reg');
      //alert(JSON.stringify(data));
      }
  });//ajax
                        
                        
  });//on submit click
}//if($('#preference_tab').length > 0)


function getCurrency() {
  return $.ajax({
    url: rootURL+"/currency",
    type: "GET",
    dataType: "json",
    data: {
         },
    success: function( json ) {       
      //console.log(json);        
      $("#msg").html("success");

      //media_types = json; 
      //console.log('after media type ajax call success');
    //console.log(media_types);
    },   
    error: function() {
        /*alert( "Sorry, there was a problem in fetching media types" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );*/
        $("#help #msg").html("Error in fetching Currency Types");
    $("#help")
      .addClass("alert-danger")
      .css("display", "block");
    },      
    complete: function() {
        //console.log( "The renderMediaTypes() request is complete!" );
    }
  });

}//getcurrency              

function showHelp(url) {

    var target = "_blank";

    var options = "location=yes,hidden=yes";

    inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

    inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

    inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

}

function loadStartCallBack() {

    $('#status-message').text("loading please wait ...");

}

function loadStopCallBack() {

    if (inAppBrowserRef != undefined) {

        inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });

        $('#status-message').text("");

        inAppBrowserRef.show();
    }

}

function loadErrorCallBack(params) {

    $('#status-message').text("");

    var scriptErrorMesssage =
       "alert('Sorry we cannot open that page. Message from the server is : "
       + params.message + "');"

    inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

    inAppBrowserRef.close();

    inAppBrowserRef = undefined;

}

function executeScriptCallBack(params) {

    if (params[0] == null) {

        $('#status-message').text(
           "Sorry we couldn't open that page. Message from the server is : '"
           + params.message + "'");
    }

}