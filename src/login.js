POTD_URL = 'https://api.nasa.gov/planetary/apod?api_key=Lgs780eVrhL2V4NXuhAPVSnFzVh4Zx6vDSkxTME3'
LOCAL_URL = 'http://localhost:3000/api/v1/users'

//---> Define const and let variabless
const loginContainer = document.querySelector('#login-container')
const parentContainer = document.querySelector('#parent-container')

const potdContainer = document.querySelector('#potd-container')
const potdTitle = document.querySelector('.potd-title')
const potdChildContainer = document.querySelector('#potd-child-container')

const searchBtn = document.querySelector('.search-btn')
const input = document.querySelector('.search-bar')
const searchContainer = document.querySelector('#search-results')

const planetList = document.querySelector('.fave-planets-list')
const saveBtn = document.querySelector('.save-btn')

const profileContainer = document.querySelector('#profile-container')


//---> Render signup and/or login form when page loads
document.addEventListener('DOMContentLoaded', function() {
  parentContainer.style.display = 'none'

  loginContainer.innerHTML = `
  <form method='GET' data-remote="true">
  <label>Email</label>
  <input type="email" placeholder="Enter email here"></input>

  <label>Password</label>
  <input type="password" placeholder="Enter password here"></input>

  <button type="submit" class="login-btn">Login</button>
  <button class="sign-up-btn">New? Sign-Up Here</button>
  <div id="error" style="color: red;"></div>
  </form>
  `

  const loginBtn = document.querySelector('.login-btn')
  const signupBtn = document.querySelector('.sign-up-btn')
  const form = document.querySelector('form')

  //---> Render login and profile home page
  loginBtn.addEventListener('click', function(event) {
    event.preventDefault()
    console.log(event.target)

    fetch('http://localhost:3000/api/v1/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: form.children[1].value, password: form.children[3].value })
    })
    .then(response => response.json())
    .then(response => {
      // if there was an error
      if (response.error) {
        const error = document.querySelector('#error')
        error.innerHTML = response.error
        setTimeout(function() {
          error.innerHTML = ''
        }, 2000)
        return
      }

      // if the login was successful
      if(response.success) {
        loginContainer.style.display = 'none'
        parentContainer.style.display = 'flex'
      }

    })

  })

  function renderUserHome(users) {
    users.forEach(user=> {
        loginContainer.style.display = 'none'
        parentContainer.style.display = 'flex'
    })
  }


  //---> Render signup page
  signupBtn.addEventListener('click', function(event) {
    event.preventDefault()
    alert('rendering sign up form')
  })





})
