/**************************************************************************************
Logic for:
  - login button
  - register button
  - logout button
***************************************************************************************/

'use strict'

var FIREBASE_URL = 'https://addressbookcohort8.firebaseio.com';
var fb = new Firebase(FIREBASE_URL);
var usersFbUrl;


if(fb.getAuth()) {
  // if user is logged in, remove the login div from dom
  $('.login').remove();
  $('.loggedIn').toggleClass('hidden');
  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';

  // load user's contacts from the firebase database
  $.get(usersFbUrl +'/.json', function(res){
     Object.keys(res).forEach(function(uuid){
        addRowToTable(uuid,res[uuid]);
     });
  });
}


// click login button
$('body').on('click', '.loginBtn', function(event) {
  event.preventDefault();

  var email = $('#logInEmail').val();
  var password = $('#password').val();

  // authenticate email and password
  fb.authWithPassword({email: email, password: password}, function(err, auth){
    if(err){
      alert("invalid login");
    } else{
      location.reload(true);
    }
  });
});


// click register button
$('.registerBtn').on('click', function(event) {
  event.preventDefault();

  var email = $('#logInEmail').val();
  var password = $('#password').val();

  // create new user with email and password
  fb.createUser({email: email, password: password}, function(err, auth){
    if(!err){
      //log in
      fb.authWithPassword({email: email, password: password}, function(err, auth){
          location.reload(true);
      });
    } else {
      alert("User already exists");
      location.reload(true);
    }
  });

});


// click logout button
$('.logoutBtn').on('click', function() {
  console.log("clicked logout button");
  // execute unauth
  fb.unauth();
  //refresh the page
  location.reload(true);
});




/**************************************************************************************

  Logic for the contact form and address book

**************************************************************************************/

// initally page does not show contact form
$('.contactFormContainer').hide();

// onclick event for add new contact btn
$('#newContactBtn').on('click', toggleContactForm);



function toggleContactForm() {
  // reveal the contact form by making div with class=contactFormContainer unhidden
  $('.contactFormContainer').toggle();
}


// when submit btn is clicked on Contact Form
$('#newContact').on('click', function(event){
  event.preventDefault();

  // hide the contact Form container when submit is clicked
  $('.contactFormContainer').toggle();

  // collect the form data into variables
  var contactName = $('#name').val();
  var contactEmail = $('#email').val();
  var contactTwitter = $('#twitter').val();
  var contactPhoto = $('#photo_url').val();

  // clear user input on form
  $('#name').val('');
  $('#email').val('');
  $('#twitter').val('');
  $('#photo_url').val('');

  // make table row for contact list
  var $tr = $('<tr><td>' + contactName + '</td><td>' + contactEmail + '</td><td><a href="'+ contactTwitter+'">Twitter</a></td><td><img src="'+ contactPhoto+'"></td><td><button class="removeBtn round tiny alert">Remove</button><td></tr>');

  // post form data to firebase url
  var data = JSON.stringify({name: contactName, email: contactEmail, twitter: contactTwitter, photoUrl: contactPhoto});
  $.post(usersFbUrl + '/.json', data, function(res){
    // add firebase uuid as attribute to table row
    $tr.attr('data-uuid', res.name);
    $('tbody').append($tr);
  });
});


function addRowToTable(uuid, obj){
  var $tr = $('<tr><td>' + obj.name + '</td><td>'+ obj.email + '</td><td><a href="'+ obj.twitter+'">Twitter</a></td><td><img src="'+ obj.photoUrl+'"></td><td><button class="removeBtn round tiny alert">Remove</button><td></tr>');
  $tr.attr('data-uuid', uuid);
  $('tbody').append($tr);

  return $tr;
}

// remove btn on table row
$('body').on('click', '.removeBtn', function(evt){
  // remove from table
  var $tr = $(evt.target).closest('tr');
  $tr.remove();

  // remove from firebase
  var uuid = $tr.data('uuid');
  var url = usersFbUrl + '/' + uuid + '.json';
  $.ajax(url, {type: 'DELETE'});
});

