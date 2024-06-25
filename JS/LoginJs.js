var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');

var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var error = document.getElementsByClassName('error');

var signUpArray;

var nameRegex =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
var emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
var passwordRegex = /\w{8,}/;

var usersList;

var username = localStorage.getItem('recordUsername');

if (username) {
  // not equal null
  document.getElementById('username').innerHTML = 'welcome ' + username;
}

// lw el user da5al 3ndy
if (localStorage.getItem('users') == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem('users'));
}

// lw el user 3ndo account
function hasAccount() {
  if (localStorage.getItem('users') == null) {
    return false;
  }
}

function signUp() {
  if (isEmpty() == false) {
    document.getElementById('exist').innerHTML =
      '<span class="existIdDanger"> All inputs are required </span>';
    return false;
  }

  // validate name format
  if (nameRegex.test(signupName.value)) {
    console.log('signupName');
  } else {
    document.getElementById('errorn').innerHTML = 'enter valid name';
    return true;
  }

  // validate email format
  if (emailRegex.test(signupEmail.value)) {
    console.log('signupEmail ');
  } else {
    document.getElementById('errore').innerHTML = 'enter valid email';
    document.getElementById('errorn').innerHTML = '';

    return true;
  }

  // validate password format
  if (passwordRegex.test(signupPassword.value)) {
    console.log('ssignupPasswordii');
  } else {
    document.getElementById('errorp').innerHTML = 'enter valid pass';
    document.getElementById('errore').innerHTML = '';

    return true;
  }

  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (signUpArray.length == 0) {
    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    return true;
  }
  if (isEmailExist() == false) {
    document.getElementById(
      'exist'
    ).innerHTML = `<span class="existIdDanger">Email already exist</span>`;
  } else {
    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    location.href = '/login.html';
    document.getElementById(
      'exist'
    ).innerHTML = `<span class="existIdSuccess">sucsess</span>`;
    document.getElementById('errorn').innerHTML = '';
    document.getElementById('errore').innerHTML = '';
    document.getElementById('errorp').innerHTML = '';
  }
}

function isEmailExist() {
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function isEmpty() {
  if (
    signupName.value == '' ||
    signupEmail.value == '' ||
    signupPassword.value == ''
  ) {
    return false;
  } else {
    return true;
  }
}

function login() {
  if (hasAccount() == false) {
    document.getElementById(
      'incorrect'
    ).innerHTML = `<span class="existIdDanger ">You dont have account please Sign up </span>`;
    return false;
  }
  if (isLoginEmpty() == false) {
    document.getElementById(
      'incorrect'
    ).innerHTML = `<span class="existIdDanger ">You dont have account please Sign up </span>`;
    return false;
  }
  var password = signinPassword.value;
  var email = signinEmail.value;
  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem('recordUsername', signUpArray[i].name);
      location.href = '/index.html';
      document.getElementById(
        'incorrect'
      ).innerHTML = `<span class="existIdSuccess">Success</span>`;
    } else {
      document.getElementById(
        'incorrect'
      ).innerHTML = `<span class="existIdDanger">incorrect email or password</span>`;
    }
  }
}

function isLoginEmpty() {
  if (signinPassword.value == '' || signinEmail.value == '') {
    return false;
  } else {
    return true;
  }
}

function logout() {
  localStorage.removeItem('recordUsername');
}
