var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');

var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var signUpArray;

// const theName = document.getElementById('signupName')
// const email = document.getElementById('signupEmail')
// const password = document.getElementById('signupPassword')
// const form =  document.getElementById('form');

// form.addEventListener('submit', e=>{
//   e.preventDefault();

//   validateInputs();
// })

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidName = (theName) => {
  const reName = /^(?=.{6,}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/;
  return reName.test(String(signupName).toLowerCase());
};
const isValidEmail = (email) => {
  const reEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
  return reEmail.test(String(signupEmail).toLowerCase());
};
const isValidPassword = (password) => {
  const rePass = /^(?=.\d)(?=.[a-zA-Z]).{4,8}$/;
  return rePass.test(String(signupPassword).toLowerCase());
};

const validateInputs = () => {
  const theNameValue = signupName.value.trim();
  const emailValue = signupEmail.value.trim();
  const passwordValue = signupPassword.value.trim();

  if (theNameValue === '') {
    setError(signupName, 'Name is required');
  } else if (!isValidName(theNameValue)) {
    setError(signupName, 'Provide a valid Name');
  } else {
    setSuccess(signupName);
  }

  if (emailValue === '') {
    setError(signupEmail, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(signupEmail, 'Provide a valid Email Address');
  } else {
    setSuccess(signupEmail);
  }

  if (passwordValue === '') {
    setError(signupPassword, 'Password is required');
  } else if (!isValidPassword(passwordValue)) {
    setError(signupPassword, 'Provide a valid Email Address');
  } else {
    setSuccess(signupPassword);
  }
};

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
    // document.getElementById('exist').innerHTML =
    //   '<span class="existIdDanger"> All inputs are required </span>';

    // return false;
    return validateInputs();
  }
  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (signUpArray.length == 0 && setSuccess() == true) {
    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById(
      'exist'
    ).innerHTML = `<span class="existIdSuccess">sucsess</span>`;
    return true;
    // return validateInputs();
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
