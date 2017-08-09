function login_user() {
  document.getElementById('login_btn').innerHTML = 'Logging in...';
  var login = new XMLHttpRequest();

  login.onreadystatechange = function () {
    if (login.readyState === XMLHttpRequest.DONE) {
      if (login.status === 200) {

        //window.location.href = '/';
        Cookies.set('edubyte', login.responseText);
        Cookies.set('hasura_username', username);
        console.log(Cookies.get('edubyte'));
        alert('Login Successfully');
        window.location.href = 'https://app.antecedent20.hasura-app.io';
      } else {

        console.log('Login failed');
        document.getElementById('error').innerHTML = 'Login Credentials are not Correct';
        document.getElementById('login_btn').value = 'Log In';
      }
    }
  }

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  login.open('POST', 'https://auth.antecedent20.hasura-app.io/login', false);
  login.withCredentials = false;
  login.setRequestHeader('Content-type', 'application/json');
  console.log(JSON.stringify({ username: username, password: password }));
  login.send(JSON.stringify({ username: username, password: password }));
};

function register_user() {
  var name;
  var register = new XMLHttpRequest();
  register.onreadystatechange = function () {
    if (register.readyState === XMLHttpRequest.DONE) {
      if (register.status === 200) {
        console.log(register.responseText);
        var list = JSON.parse(register.responseText);
        add_user_profile(list,name);
        window.location.reload();
      } else {
        console.log('Register failed');
        document.getElementById('error').innerHTML = 'Something occur wrong...Please try again';
        document.getElementById('register_btn').value = 'Register';
      }
    }
  }

  var name = document.getElementById('name').value;
  var username = document.getElementById('user').value;
  var mobile = document.getElementById('user_mobile').value;
  var email = document.getElementById('user_email').value;
  var password = document.getElementById('user_password').value;
  register.open('POST', 'https://auth.antecedent20.hasura-app.io/signup', false);
  register.withCredentials = false;
  register.setRequestHeader('Content-type', 'application/json');
  register.send(JSON.stringify({ username: username, mobile: mobile, email: email, password: password }));
  document.getElementById('register_btn').innerHTML = 'Signing in...';
};

function add_user_profile(list,name) {
  var update = new XMLHttpRequest();
  update.onreadystatechange = function () {
    if (update.readyState === XMLHttpRequest.DONE) {
      if (update.status === 200) {
        alert('Registered Successfully');
        console.log(update.responseText);
      } else {
        console.log('Update failed');
        document.getElementById('error').innerHTML = 'Something occur wrong...Please try again';
        document.getElementById('register_btn').value = 'Register';
        alert("register with different email and mobile");
      }
    }
  }
  var bearer = "Bearer ";
  bearer += list.auth_token;
  update.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', false);
  update.withCredentials = true;
  update.setRequestHeader('Content-type', 'application/json');
  update.setRequestHeader('Authorization', bearer);
  update.send(JSON.stringify(
    {
      "type": "insert",
      "args": {
        "table": "user_profile",
        "objects": [{
          "id": list.hasura_id,
          "name": name
        }]
      }
    }
  ));
}
