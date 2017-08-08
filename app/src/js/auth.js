function login_user() {
  document.getElementById('login_btn').innerHTML = 'Logging in...';
  var username;
  var login = new XMLHttpRequest();

  login.onreadystatechange = function () {
    if (login.readyState === XMLHttpRequest.DONE) {
      if (login.status === 200) {

        //window.location.href = '/';
        Cookies.set('hasura_username', username);
        Cookies.set('edubyte', login.responseText);
        console.log(Cookies.get('edubyte'));
        alert('Login Successfully');
        window.location.href = '/#top';
      } else {

        console.log('Login failed');
        document.getElementById('error').innerHTML = 'Login Credentials are not Correct';
        document.getElementById('login_btn').value = 'Log In';
      }
    }
  }

  username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  login.open('POST', 'https://auth.antecedent20.hasura-app.io/login', false);
  login.withCredentials = true;
  login.setRequestHeader('Content-type', 'application/json');
  console.log(JSON.stringify({ username: username, password: password }));
  login.send(JSON.stringify({ username: username, password: password }));
};

function register_user() {
  var register = new XMLHttpRequest();
  register.onreadystatechange = function () {
    if (register.readyState === XMLHttpRequest.DONE) {
      if (register.status === 200) {
        alert('Registered Successfully')
        console.log(register.responseText);
        window.location.reload();
      } else {
        console.log('Register failed');
        document.getElementById('error').innerHTML = 'Something occur wrong...Please try again';
        document.getElementById('register_btn').value = 'Register';
      }
    }
  }

  var username = document.getElementById('user').value;
  var mobile = document.getElementById('user_mobile').value;
  var email = document.getElementById('user_email').value;
  var password = document.getElementById('user_password').value;
  register.open('POST', 'https://auth.antecedent20.hasura-app.io/signup', false);
  register.withCredentials = true;
  register.setRequestHeader('Content-type', 'application/json');
  register.send(JSON.stringify({ username: username, mobile: mobile, email: email, password: password }));
  document.getElementById('register_btn').innerHTML = 'Signing in...';
};
