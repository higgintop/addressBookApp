(function() {


  $(function init() {
  	// initally page does not show contact form
  	$('.contactFormContainer').hide();

  	// onclick event for add new contact btn
    $('#newContactBtn').on('click', revealContactForm);

    // load all contacts in the firebase database
    $.get('https://addressbookc8.firebaseio.com/addressList.json', function(res){
    	Object.keys(res).forEach(function(uuid){
          addRowToTable(uuid,res[uuid]);
        });
    });

  }); // init

  function revealContactForm() {
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
    var $tr = $('<tr><td>' + contactName + '</td><td>' + contactEmail + '</td><td>'+ contactTwitter+'</td><td><img src="'+ contactPhoto+'"></td><td><button class="removeBtn">Remove</button><td></tr>');

    // post form data to firebase url
    var url = 'https://addressbookc8.firebaseio.com/addressList.json';
    var data = JSON.stringify({name: contactName, email: contactEmail, twitter: contactTwitter, photoUrl: contactPhoto});
    $.post(url, data, function(res){
    	// add firebase uuid as attribute to table row
    	$tr.attr('data-uuid', res.name);
    	$('tbody').append($tr);
    });

  });


  function addRowToTable(uuid, obj){
    var $tr = $('<tr><td>' + obj.name + '</td><td>'+ obj.email + '</td><td>'+ obj.twitter+'</td><td><img src="'+ obj.photoUrl+'"></td><td><button class="removeBtn">Remove</button><td></tr>');
    $tr.attr('data-uuid', uuid);
    $('tbody').append($tr);
  }

  // remove btn on table row
  $('tbody').on('click', '.removeBtn', function(evt){
  	// remove from table
  	var $tr = $(evt.target).closest('tr');
  	$tr.remove();

  	// remove from firebase
  	var uuid = $tr.data('uuid');
  	var url = 'https://addressbookc8.firebaseio.com/addressList/' + uuid + '.json';
  	$.ajax(url, {type: 'DELETE'});
  });

})();