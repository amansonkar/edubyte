function navigate_home() {
  window.location.href = '/blogs';
}

function navigate_auth() {
  window.location.href = '/authentication';
}

function functionName() {

}

function login_user() {
  var login = new XMLHttpRequest();
  login.open('POST', 'https://auth.beehive82.hasura-app.io/login', true);
  login.onreadystatechange = function () {
    if (login.readyState === XMLHttpRequest.DONE) {

      if (login.status === 200) {
        console.log(login.responseText);
        console.log('Login Successfully');
        window.location.href = '/';
      } else {
        console.log(login.status)
        console.log('Login failed');
        document.getElementById('error').innerHTML = 'Login Credentials are not Correct';
        document.getElementById('login_btn').value = 'Log In';
      }
    }
  };

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  login.withCredentials = true;
  login.setRequestHeader('Content-type', 'application/json');
  console.log(JSON.stringify({ username: username, password: password }));
  login.send(JSON.stringify({ username: username, password: password }));
  document.getElementById('login_btn').innerHTML = 'Logging in...';
};

function register_user() {
  var register = new XMLHttpRequest();
  register.open('POST', 'https://auth.beehive82.hasura-app.io//signup', true);
  register.onreadystatechange = function () {
    if (register.readyState === XMLHttpRequest.DONE) {

      if (register.status === 200) {
        console.log(register.responseText);
        console.log('Registered Successfully');
        window.location.href = '/authentication';
      } else {
        console.log('Registered failed');
        document.getElementById('error').innerHTML = 'Something occur wrong...Please try again';
        document.getElementById('register_btn').value = 'Register';
      }
    }
  };

  var username = document.getElementById('user').value;
  var mobile = document.getElementById('user_mobile').value;
  var email = document.getElementById('user_email').value;
  var password = document.getElementById('user_password').value;
  register.withCredentials = true;
  register.setRequestHeader('Content-type', 'application/json');
  console.log(JSON.stringify({ username: username, mobile: mobile, email: email, password: password }));
  register.send(JSON.stringify({ username: username, email: email, password: password }));
  document.getElementById('register_btn').innerHTML = 'Signing in...';
};
