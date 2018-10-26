POTD_URL = 'https://api.nasa.gov/planetary/apod?api_key=Lgs780eVrhL2V4NXuhAPVSnFzVh4Zx6vDSkxTME3'
USER_URL = 'http://localhost:3000/api/v1/users/'
PLANET_URL = 'http://localhost:3000/api/v1/planets/'
LIKES_URL = 'http://localhost:3000/api/v1/likes/'

//---> Define const and let variabless
const startingContainer = document.querySelector('#starting-container')
const parentContainer = document.querySelector('#parent-container')
const searchContainer = document.querySelector('#search-container')
const planetContainer = document.querySelector('#planet-container')

const profileBtn = document.querySelector('#profile-btn')
const potdBtn = document.querySelector('#potd-btn')
const searchBtn = document.querySelector('#search-btn')

const sidebarDropdown = document.querySelector('#sidebar-dropdown')

const potdContainer = document.querySelector('#potd-container')
const potdTitle = document.querySelector('.potd-title')
const potdParentContainer = document.querySelector('#potd-parent-container')
const potdChild1 = document.querySelector('.potd-child-1')
const potdChild2 = document.querySelector('.potd-child-2')
const potdPicture = document.querySelector('.potd-picture')

const planetSearchBtn = document.querySelector('.planet-search-btn')
const input = document.querySelector('.search-bar')
const searchResultsContainer = document.querySelector('#search-results')

const profileContainer = document.querySelector('#profile-container')

window.state = {
  planetData: {},
}

//---> Render character choice when page loads
document.addEventListener('DOMContentLoaded', function() {
  parentContainer.style.display = 'none'
  const select = document.querySelector('select')
  const enterBtn = document.querySelector('.enter-btn')

  // display characters in dropdown
  fetch(USER_URL)
  .then(r=> r.json())
  .then(users=> {
    users.forEach(user=> {
      select.innerHTML += `
      <option value="${user.name}" id="${user.id}">${user.name}</option>
      `
    })
  })

  // render homepage with profile and sidebar
  enterBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let selectedUser = event.target.parentNode.children[0].value

    fetch(USER_URL)
    .then(r=> r.json())
    .then(users=> {
      users.forEach(user=> {
        if (user.name === selectedUser) {
          profileBtn.setAttribute('value', user.id)
          potdBtn.setAttribute('value', user.id)
          searchBtn.setAttribute('value', user.id)
          renderProfile(user)
          renderSideBar(user)
          return
        }
      })
    })

  })

  // render selected user profile
  function renderProfile(user) {
    startingContainer.style.display = 'none'
    parentContainer.style.display = 'flex'

    planetContainer.style.display = 'none'
    searchContainer.style.display = 'none'
    potdContainer.style.display = 'none'

    profileContainer.style.display = 'flex'

    let name = document.querySelector('.profile-name')
    let pic = document.querySelector('.profile-picture')
    let bio = document.querySelector('.profile-bio')
    let profileChild2 = document.querySelector('.profile-child-2')

    pic.style.backgroundImage = `url("${user.image_url}")`
    name.innerHTML = ''
    name.innerText = user.name
    bio.innerText = user.bio
    profileChild2.innerHTML = ''

    fetch(LIKES_URL)
    .then(r=> r.json())
    .then(likes=> {
      likes.forEach(like=> {
        if (user.id === like.user_id) {
          fetch(PLANET_URL)
          .then(r=> r.json())
          .then(planets=> {
            planets.forEach(planet=> {
              if(planet.id === like.planet_id) {
                profileChild2.innerHTML += `
                <div class="profile-images" style="background-image: url('${planet.image_url}')"></div>
                `
              }
            })
          })
        }
      })
    })

  }

  // render sidebar info connected to selected user
  function renderSideBar(user) {
    sidebarDropdown.innerHTML = ''
    sidebarDropdown.innerHTML += `<option value="Saved Universe" selected>Saved Searches</option>`
    let intro = document.querySelector('.sidebar-intro')
    intro.innerText = user.name

    let pic = document.querySelector('.sidebar-picture')
    pic.style.backgroundImage = `url("${user.image_url}")`
    pic.setAttribute('id', user.id)

    let button = document.querySelector('#profile-btn')
    button.setAttribute('class', 'active')
    let status = document.querySelector('#profile-btn').className

    fetch(LIKES_URL)
    .then(r=> r.json())
    .then(likes=> {
      likes.forEach(like=> {
        if (user.id === like.user_id) {
          fetch(PLANET_URL)
          .then(r=> r.json())
          .then(planets=> {
            planets.forEach(planet=> {
              if(planet.id === like.planet_id) {
                sidebarDropdown.innerHTML += `
                <option id="${planet.id}">${planet.name}</option>
                `
              }
            })
          })
        }
      })
    })

    activeTab(status, button)
  }

  // highlight acive tab
  function activeTab(activeStatus, sectionBtn) {
    if (activeStatus === 'active') {
      sectionBtn.setAttribute('class', 'active')
      sectionBtn.style.backgroundColor = 'rgba(0,0,0,.7)'
      return
    }
  }

  // deactivate inactive tab
  function deactivateTab(sectionBtn) {
      sectionBtn.setAttribute('class', '')
      sectionBtn.style.backgroundColor = 'rgba(0,0,0,0)'
    }

  // render potd when sidebar button is clicked
  potdBtn.addEventListener('click', function(event) {
    deactivateTab(profileBtn)
    deactivateTab(searchBtn)

    if (event.target.id === 'potd-btn' && event.target.className === '') {
      potdBtn.setAttribute('class', 'active')
      activeTab(event.target.className, potdBtn)

      planetContainer.style.display = 'none'
      searchContainer.style.display = 'none'
      profileContainer.style.display = 'none'
      potdContainer.style.display = 'flex'

      fetch(POTD_URL)
      .then(r=> r.json())
      .then(potd=> {renderPOTD(potd)})
      return
    }
    else if (event.target.className === 'active') {
      potdBtn.setAttribute('class', '')
      deactivateTab(potdBtn)
      profileContainer.style.display = 'flex'
      profileContainer.setAttribute('class', 'active')
      activeTab(profileContainer.className, profileBtn)
      potdContainer.style.display = 'none'
      planetContainer.style.display = 'none'
      return
    }
  })

  // render planet of the day section
  function renderPOTD(data) {
    potdPicture.setAttribute('src', data.hdurl)
    potdChild2.innerHTML = `
    <div class="potd-title">${data.title}</div><br>
    <div class="text-body"> ${data.explanation}</div>
    `
  }

  // render profile when sidebar button is clicked
  profileBtn.addEventListener('click', function(event) {
    deactivateTab(potdBtn)
    deactivateTab(searchBtn)

    if (event.target.id === 'profile-btn' && event.target.className === '') {
      profileBtn.setAttribute('class', 'active')
      let selectedUser = event.target.parentNode.children[0].value
      activeTab(event.target.className, profileBtn)

      planetContainer.style.display = 'none'
      searchContainer.style.display = 'none'
      potdContainer.style.display = 'none'
      profileContainer.style.display = 'flex'

      fetch(USER_URL)
      .then(r=> r.json())
      .then(users=> {
        users.forEach(user=> {
          console.log(user)
          // if (user.name === selectedUser) {
          //   renderProfile(user)
          //   renderSideBar(user)
          //   return
          // }
        })
      })
      return
    }
  })

  // render planet search section
  searchBtn.addEventListener('click', function(event) {
    deactivateTab(profileBtn)
    deactivateTab(potdBtn)

    if (event.target.id === 'search-btn' && event.target.className === '') {
      searchBtn.setAttribute('class', 'active')
      activeTab(event.target.className, searchBtn)

      planetContainer.style.display = 'none'
      potdContainer.style.display = 'none'
      profileContainer.style.display = 'none'
      searchContainer.style.display = 'flex'

      renderSearchContainer()
      return
    }
    else if (event.target.className === 'active') {
      searchBtn.setAttribute('class', '')
      searchContainer.style.display = 'none'
      planetContainer.style.display = 'none'
      deactivateTab(searchBtn)

      profileContainer.style.display = 'flex'
      profileContainer.setAttribute('class', 'active')
      activeTab(profileContainer.className, profileBtn)
      let theUserId = document.querySelector('.sidebar-picture').id

      fetch(USER_URL)
      .then(r=> r.json())
      .then(users=> {
        users.forEach(user=> {
          if (user.name === Number(theUserId)) {
            renderProfile(user)
            renderSideBar(user)
          }
        })
      })

      return
    }
  })

  // planet search feature
  function renderSearchContainer() {
    planetSearchBtn.addEventListener('click', function(event) {
      let invalidInput = input.value.replace(/ /g, '')
      let validInput = input.value.replace(/ /g, '-')

      SEARCH_URL = `https://images-api.nasa.gov/search?q=${validInput}`
      searchResultsContainer.innerHTML = ""
      if (invalidInput === '') {
        searchResultsContainer.innerText = `Please enter a valid input.`
        searchResultsContainer.style.color = 'red'
        searchResultsContainer.style.fontStyle = 'oblique'
      } else {
        fetch(SEARCH_URL)
        .then(resp=> resp.json())
        .then(json=> renderSearch(json.collection))
      }
    })
  }


  // render searched-for planet
  function renderSearch(planets) {
    if (planets.items.length === 0) {
      searchResultsContainer.innerText = `Oops! We don\'t have any photos for ${input.value} yet.`
      searchResultsContainer.style.color = 'red'
      searchResultsContainer.style.fontStyle = 'oblique'
    } else {
      planets.items.forEach(planet=> {
        let parentDiv = document.createElement('div')
        parentDiv.setAttribute('class', 'search-child')

        planet.links.map(link=> {
          if (link.href.includes(".srt") || link.href.includes(".vtt")) {}
          else {
            let imageDiv = document.createElement('div')
            imageDiv.setAttribute('class', 'search-image')
            imageDiv.style.backgroundImage = `url('${link.href}')`

            searchResultsContainer.appendChild(parentDiv)
            parentDiv.appendChild(imageDiv)
          }
        })

        planet.data.map(data=> {
          let saveBtn = document.createElement('button')
          saveBtn.setAttribute('class', 'save-btn')
          saveBtn.setAttribute('value', data.title)
          window.state.planetData[ data.nasa_id ] = data
          saveBtn.innerHTML = `<img class='add-image' data-nasa-id="${data.nasa_id}" src="https://image.flaticon.com/icons/svg/149/149688.svg">`

          parentDiv.appendChild(saveBtn)
        })
      })
    }
  }

  // add planet to planet database and rerender sidebar with new save
  let saveBtns = document.querySelectorAll('.save-btn')
  document.addEventListener('click', function(event) {
    let imgUrl = event.target.parentNode.parentNode.children[0].style.backgroundImage
    let url = imgUrl.slice(5, imgUrl.length - 2)

    if (event.target.className === 'add-image') {
      let userId = event.target.offsetParent.children[1].children[0].children[0].id
      console.log(event.target.alt)
      console.log(event.target.parentNode.value)
      console.log(url)

      let nasaID = event.target.dataset.nasaId
      let notes = window.state.planetData[nasaID].description

      fetch(PLANET_URL, {
        method: 'POST',
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify({name: event.target.parentNode.value, image_url: url, notes: notes})
      }).then(r=> r.json())
      .then(r=> fetchLike(r))
      .then(resp=> rerenderSidebar())

      function fetchLike(data) {
        fetch(LIKES_URL, {
          method: 'post',
          headers:  {'Content-Type': 'application/json'},
          body: JSON.stringify({planet_id: data.id, user_id: userId})
        })
      }

      return
    }
  })

  // rerender the sidebar

  function rerenderSidebar() {
    let theUserId = document.querySelector('.sidebar-picture').id
    fetch(USER_URL)
    .then(r=> r.json())
    .then(users=> {
      users.forEach(user=> {
        if(user.id === Number(theUserId)) {
          renderSideBar(user)
          deactivateTab(profileBtn)
        }
      })
    })
  }

  // render planet profile section when change dropdown selection
  sidebarDropdown.addEventListener('change', function(event) {
    fetch(PLANET_URL)
    .then(r=> r.json())
    .then(planets=> renderPlanetProfile(planets))
  })

  // render planet profile section function
  function renderPlanetProfile(planets) {
    let editIcon = document.querySelector('.edit-icon')
    const options = sidebarDropdown.children
    let planetId = options[sidebarDropdown.selectedIndex].id

    planets.forEach(planet=> {
      if (planet.id === Number(planetId)) {

        searchContainer.style.display = 'none'
        profileContainer.style.display = 'none'
        potdContainer.style.display = 'none'
        planetContainer.style.display = 'flex'

        const planetName = document.querySelector('.planet-name')
        const planetImg = document.querySelector('.planet-picture')
        const planetDescription = document.querySelector('.planet-description')

        planetName.innerText = planet.name
        planetImg.setAttribute('src', planet.image_url)
        planetDescription.innerText = planet.notes
        editIcon.setAttribute('alt', planet.id)
      }
    })
  }

  // render edit planet profile page
  let preEditSection = document.querySelector('#planet-preedit-section')
  let editSection = document.querySelector('#planet-edit-section')
  let editIcon = document.querySelector('.edit-icon')
  let editForm = document.querySelector('.planet-edit-form')
  let nameInput = editForm.children[1]
  let descInput = editForm.children[3]

  editIcon.addEventListener('click', function(event) {
    console.log('awww snap!')
    let planetName = document.querySelector('.planet-name')
    let planetDesc = document.querySelector('.planet-description')

    preEditSection.style.display = 'none'
    editSection.style.display = 'block'

    nameInput.value = planetName.innerText
    descInput.value = planetDesc.innerText
  })

  // patch request planet edits
  const editBtn = document.querySelector('.form-submit-btn')
  editBtn.addEventListener('click', function(event) {
    event.preventDefault()
    fetch(PLANET_URL + editIcon.alt, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: nameInput.value, notes: descInput.value})
    })
    .then(r=> r.json())
    .then(r=> {
      preEditSection.style.display = 'block'
      editSection.style.display = 'none'
      fetch(PLANET_URL)
      .then(r=> r.json())
      .then(planets=> renderPlanetProfile(planets))
    })
  })

  // delete request for selected planet
  let deleteIcon = document.querySelector('.delete-icon')
  deleteIcon.addEventListener('click', function(event) {
    let confirm = prompt('To confirm delete, type \'DELETE\' below.')
    if (confirm === 'DELETE') {
      fetch(PLANET_URL + editIcon.alt, {method: 'delete'})
      .then(r=> {
        planetContainer.style.display = 'none'
        profileContainer.style.display = 'flex'
        let theUserId = document.querySelector('.sidebar-picture').id

        fetch(USER_URL + theUserId)
        .then(r=> r.json())
        .then(user=> {
          renderProfile(user)
          renderSideBar(user)
            })
        })
        return
    } else {
      alert('Your image is still saved.')
    }
  })

  // render profile edit form
  let profileEditBtn = document.querySelector('.profile-edit-icon')
  let profileChild1 = document.querySelector('.profile-child-1')
  let profileEditSection = document.querySelector('#profile-edit-section')
  let profileEditForm = document.querySelector('.profile-edit-form')
  let name = document.querySelector('.profile-name')
  let pic = document.querySelector('.profile-picture')
  let bio = document.querySelector('.profile-bio')
  let userNameInput = profileEditForm.children[1]
  let userBioInput = profileEditForm.children[3]
  let userPicInput = profileEditForm.children[4]

  profileEditBtn.addEventListener('click', function(event) {
    profileChild1.style.display = 'none'
    profileEditSection.style.display = 'block'

    let img = pic.style.backgroundImage
    let url = img.slice(5, img.length - 2)

    userNameInput.value = name.innerText
    userBioInput.value = bio.innerText
    userPicInput.value = url
  })

  let profileSubmitBtn = document.querySelector('.profile-submit-btn')
  profileSubmitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let userId = profileEditSection.offsetParent.children[1].children[0].children[0].id
    fetch(USER_URL + Number(userId), {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: userNameInput.value, bio: userBioInput.value, image_url: userPicInput.value})
    })
    .then(r=> r.json())
    .then(r=> {
      console.log(r)
      profileChild1.style.display = 'block'
      profileEditSection.style.display = 'none'
      fetch(USER_URL)
      .then(r=> r.json())
      .then(users=> {
        users.forEach(user=> {
          if(user.id === Number(userId)) {
            renderProfile(user)
            renderSideBar(user)
          }
        })
      })
    })
  })
})
