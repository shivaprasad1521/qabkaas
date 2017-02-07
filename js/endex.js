/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        //if (isIOS() || isAndroid()) {
        /*if (isAndroid()) {          
          $("#footer").remove();    //hide footer menu in Android
        } else if(isIOS()) {        
          $("#slidemenu").remove();    //hide slidemenu on the left in Android
          $(".navbar-toggle").attr("href","home.html"); //set target to Home page
        }
        else {  //Default view is Android View
            $("#footer").remove();    //hide footer menu in Android
        }*/
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //TODO Attach FastClick
        
        /*if(navigator.notification) {    //Override default native alert with native alert on device without breaking on browser
            window.alert = function(message) {
                navigator.notification.alert(
                    "message",  //message
                    null,       //callback
                    "MySaaya",  //title
                    "Ok"        //button name
                    );
        };*/


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

function isIOS() {
  return navigator.userAgent.match(/(iPad|iPhone|iPod)/i) != null;
}


/*
$(document).ready(function () {

    /*$('#slide-nav').affix({
      offset: {
        top: 245
      }
    });* /



    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '80%';
    var menuneg = '-100%';
    var slideneg = '-80%';


    $("#slide-nav").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');


    });


    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');            
        }


    });

    //when the User clicks on a Contact(contacts.html), redirect to view_contact.html?id={x}
    $("table#contacts tr").click(function() {      
      window.location = 'view_contact.html?id='+$(this).attr('id');      
    });
    //when the User clicks on a Location(locations.html), redirect to view_location.html?id={x}
    $("table#locations tr").click(function() {      
      window.location = 'view_location.html?id='+$(this).attr('id');      
    });
    //when the User clicks on a Location(locations.html), redirect to view_location.html?id={x}
    $("table#inventory tr").click(function() {      
      window.location = 'view_inventory_item.html?id='+$(this).attr('id');      
    });

    //Search form in the navbar
    $('#search_xs #q').focus(function() {
        $('#brand').css("display", "none");
        $('#search_xs #q').css("z-index", "9999");
        $('#search_xs #q').css("width", "180px");            
    });
    $('#search_xs #q').blur(function() {
        $('#search_xs #q').css("width", "30px");
        $('#brand').css("display", "block");
    });
    $('#search_form #q').focus(function() {
        $('#brand').css("display", "none");
        $('#search_form #q').css("z-index", "9999");
        $('#search_form #q').css("width", "150px");            
    });
    $('#search_form #q').blur(function() {
        $('#search_form #q').css("width", "30px");
        $('#brand').css("display", "block");
    });

});
*/
$(document).ready(function () {


    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));
  
    $('#slide-nav.navbar-default').after($('<div id="navbar-height-col"></div>'));  

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '15%';
    var menuneg = '-100%';
    var slideneg = '-15%';


    //if (isAndroid()) {
    if( !(isAndroid() || isIOS()) ) {//if not both, show slide-nav
    $("#slide-nav").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');


    });


    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }


    });
}//end if (isAndroid())



});