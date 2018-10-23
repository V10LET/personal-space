//---> Render profile section of selected favorite photo
fetch(LOCAL_URL)
.then(resp=> resp.json())
.then(json=> renderSidebar(json))
.then(function() {
  document.addEventListener('click', function(event) {
    if (event.target.id.includes('view') && event.target.className === "sidebar-btn") {

      // adds active class to button
      event.target.setAttribute('class', 'sidebar-btn active')
      profileContainer.style.display = 'flex'

      // gets uri for database fetch
      let uri = event.target.id
      let path = uri.replace('view', '')

      fetch(LOCAL_URL + '/' + path)
      .then(resp=> resp.json())
      .then(json=> {
        console.log(json)
        renderProfile(json)
      })
    } else if (event.target.id.includes('view') && event.target.className === "sidebar-btn active") {

      // removes active class to button
      event.target.setAttribute('class', 'sidebar-btn')
      profileContainer.style.display = 'none'

      // render POTD
      potdContainer.style.display = 'flex'

    }
  })
})


//---> Render profile section of selected favorite photo
function renderProfile(planet) {
  potdContainer.style.display = 'none'
  profileContainer.innerHTML = ''
  profileContainer.innerHTML += `
  <h1>Name: ${planet.title}</h1>
  <img src="${planet.image}" class="profile-picture"/>
  <h3>Add Notes:</h3>
  <textarea></textarea>
  <button class="notes-btn">Submit Notes</button>
  `
}










//---> DELETE STUFF
// let deleteBtn = document.createElement('button')
// deleteBtn.setAttribute('id', `delete${fave.id}`)
//
// deleteBtn.innerText = 'delete'
// deleteBtn.style.marginLeft = '10px'

// fetch(LOCAL_URL + '/' + path, {method: "DELETE"})
// .then(() => fetch(LOCAL_URL))
// .then(resp=> resp.json())
// .then(json=> {
//   let planetList = document.querySelector('.fave-planets-list')
//   planetList.innerHTML = ''
//   renderSidebar(json)
// })


//---> INDIVIDUAL PLANET INFO
// let listItem = document.createElement('li')
// // listItem.innerHTML = fave.title
//
// let viewBtn = document.createElement('button')
// viewBtn.setAttribute('id', `view${fave.id}`)
// viewBtn.innerText = `${fave.title}`
//
// // let a = document.createElement('a')
// // a.setAttribute('href', fave.image)
//
// let img = document.createElement('img')
// img.setAttribute('class', 'sidebar-img')
// img.setAttribute('src', fave.image)
//
// // a.appendChild(listItem)
// listItem.appendChild(viewBtn)
// listItem.appendChild(img)
// planetList.appendChild(listItem)
