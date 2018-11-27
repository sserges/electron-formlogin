var Datastore = require('nedb');
var db_user = new Datastore({ filename: './users.db', autoload: true });
var db_session = new Datastore({ filename: './sessions.db', autoload: true });
var sha256 = require('js-sha256').sha256;

var connected = false

// console.log($('#username'));

if (localStorage.getItem('connected'))
	showUserPage();



$('input[type="submit"]').on('click', function(event) {
	event.preventDefault()
	form_username = $('#username').val();
	form_password = $('#password').val();
	// console.log(username + ' ' + password);

	db_user.findOne({username: form_username, password: sha256(form_password)}, function(err, user) {
		if (err)
			console.log(err);
		try {
			console.log(user.username + ' ' + user.password);
			if (user) {
				var login_date = new Date();
				// console.log(date)
				connected = true
				localStorage.setItem('connected', true);
				localStorage.setItem('login_date', login_date);
				localStorage.setItem('username', user.username);
				localStorage.setItem('user_id', user._id);
				showUserPage();
			}
		} catch (error) {
			console.log(error);
			alert("Your username and password didn't match")
			resetForm();
		}
		
	});
});

function showUserPage() {
	$('.loginForm').css('display', 'none');
	$('.userHome').append('<p>Hello ' + localStorage.getItem('username') + '</p>');
	$('.userHome').append('<p><a id="logout" href="#" class="btn btn-primary">logout</a></p>');
	$('.userHome').append('<p><a href="#" id="age" class="btn btn-primary">Graph par age</a></p>');
	$('.userHome').append('<p><a href="#" id="genre" class="btn btn-primary">Graph par genre</a></p>');

	$('#logout').on('click', function() {
		logoutDate = new Date();
		console.log(logoutDate);
		var session = {
			user_id: localStorage.getItem('user_id'),
		 	username: localStorage.getItem('username'),
		    login_date: localStorage.getItem('login_date'),
		    logout_date: logoutDate
		}

		db_session.insert(session, function(err, newSession) {
			if (err)
				console.log(err);

			console.log(newSession._id + ' ' + newSession.username)
			resetForm();
			$('.loginForm').css('display', 'block');
			$('.userHome').css('display', 'none');
			localStorage.clear();
		});
	});

	$('#age').on('click', function() {
		$('#myChart2').css('display', 'block');
		$('#myChart').css('display', 'none');
	});

	$('#genre').on('click', function() {
		$('#myChart').css('display', 'block');
		$('#myChart2').css('display', 'none');
	});
}


function resetForm() {
	$('#username').val('');
	$('#password').val('');
}

require('./graph.js');
// db.findOne({username: 'koffi'}, function(err, doc) {
// 	console.log(doc.username + ' ' + doc.password)
// });