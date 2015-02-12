'use strict'

describe('DOM', function () {
  describe('address page', function () {
    before(function () {
      if (window.__karma__) {
        $('body').append('<div class="contactFormContainer"></div>');
        $('body').append('<table><thead></thead><tbody></tbody></table>');
      }
    });

    beforeEach(function () {
      $('.contactFormContainer').hide();
      $('tbody').empty();
    });

    describe('toggleContactForm', function () {
      it('should toggle visibility of contact form', function () {
        // initially div is hidden
        $('.contactFormContainer').is(':hidden').should.be.true;

        // perform toggle function
        toggleContactForm();

        // div should no longer be hidden
        $('.contactFormContainer').is(':hidden').should.be.false;
      });
    });

    describe('addRowToTable', function(){
      it('should append new row to table', function(){
        var uuid = 'JJ123ABC456';
        var obj = {name: 'John Smith', email: 'test@test.com', twitter: 'http://www.twitter.com', photoUrl: 'http://testimage.jpg' };
        $('tr').length.should.equal(0);
        addRowToTable(uuid, obj);
        $('tr').length.should.equal(1);
      });
    });

    describe('removeBtn click', function() {
      it('should remove the tr', function() {
        // add row to table
        var uuid = 'JJ123ABC456';
        var obj = {name: 'John Smith', email: 'test@test.com', twitter: 'http://www.twitter.com', photoUrl: 'http://testimage.jpg' };
        addRowToTable(uuid, obj);
        $('tr').length.should.equal(1);

        // execute click on remove btn
        $('.removeBtn').click();

        // tr length should now be 0
        $('tr').length.should.equal(0);
      });
    });

    describe('logout click', function() {
      it('should toggle class of hidden on div with class loggedIn', function() {
        // before logout click, loggedIn div should not be hidden
        $('.loggedIn').is(':hidden').should.be.false;

        // execute click on remove btn
        $('.logoutBtn').click();

        // now should be hidden
        $('.loggedIn').is(':hidden').should.be.false;
      });
    });
  });

  // LOG IN PAGE TESTS
   describe('log in page', function () {
    before(function () {
      if (window.__karma__) {
        $('body').append('<div class="contactFormContainer"></div>');
        $('body').append(' <form><label for="logInEmail">Email:</label><input type="email" name="email" id="logInEmail" placeholder="test@example.com"/><label for="password">Password:</label><input type="password" name="password" id="password" placeholder="password"/><button class="loginBtn">Log In</button><button class="registerBtn">Register</button></form>');
      }
    });

    describe('login with authorized credentials', function() {
      it('should take to address book page', function() {
        var email = 'test@test.com',
            password = '123';
            $('#logInEmail').val(email);
            $('#password').val(parseInt(password,10));

            //var fb = new Firebase('https://addressbookcohort8.firebaseio.com');

      });
    });
  });
});
