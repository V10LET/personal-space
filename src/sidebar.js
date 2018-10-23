fetch(LOCAL_URL)
.then(resp => resp.json())
.then(users => {console.log(users)})

//---> Function that creates favorite item for sidebar
function addSidebarElement(fave) {
  planetList.innerHTML += `
    <div class="list-item">
    <button id="view${fave.id}" class="sidebar-btn">${fave.title}</button>
    </div>
  `
}


//---> Render favorite photos in sidebar
function renderSidebar(favorites) {
  favorites.forEach(fave=> {
    addSidebarElement(fave)
  })
}


//---> Save favorited photos to db.json
document.addEventListener('click' , function(event) {
  event.preventDefault()

  if (event.target.className === 'save-btn') {
    let data = {
      id: event.target.id,
      title: event.target.id,
      image: event.target.parentNode.children[0].src,
      notes: ''
    }

    fetch(LOCAL_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json", Accept: "application/json"}
      }).then(function() {
      fetch(LOCAL_URL)
      .then(resp => resp.json())
      .then(favorites => {
        planetList.innerHTML = ''
        favorites.forEach(fave=> {addSidebarElement(fave)})
      })
    })
  }
})
