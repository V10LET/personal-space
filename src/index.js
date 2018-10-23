//---> Featured POTD Planet
fetch(POTD_URL)
.then(resp => resp.json())
.then(planetInfo => renderPOTD(planetInfo))

function renderPOTD(data) {
  potdTitle.innerHTML = data.title

  let childDiv1 = document.createElement('div')
  let childDiv2 = document.createElement('div')
  childDiv1.setAttribute('class', 'potd-child')
  childDiv2.setAttribute('class', 'potd-child')
  childDiv1.style.alignItems = 'center'
  childDiv2.style.alignItems = 'flex-start'

  childDiv1.innerHTML = `<img src=${data.hdurl} class="planet-picture" />`
  childDiv2.innerHTML = `
      <div><strong>Today's Date:</strong><span class="text-body"> ${data.date}</span></div>
      <br/>
      <div><strong>Planet Explanation:</strong><span class="text-body"> ${data.explanation}</span></div>
  `
  potdChildContainer.appendChild(childDiv1)
  potdChildContainer.appendChild(childDiv2)
}


//---> Planet search feature
searchBtn.addEventListener('click', function(event) {
    searchContainer.innerHTML = ""
    SEARCH_URL = `https://images-api.nasa.gov/search?q=${input.value}`
    fetch(SEARCH_URL)
    .then(resp=> resp.json())
    .then(json=> renderSearch(json.collection))
})


//---> Display searched planets
function renderSearch(planets) {
  console.log(planets.items)

  if (planets.items.length === 0) {
    searchContainer.innerText = `Oops! We don\'t have any photos for ${input.value} yet.`
    searchContainer.style.color = 'red'
    searchContainer.style.fontStyle = 'oblique'
  } else {
    i = 0
    planets.items.forEach(planet=> {
      planet.links.map(link=> {
        if (link.href.includes(".srt") || link.href.includes(".vtt")) {}
        else {
          searchContainer.innerHTML += `
          <div class="search-child">
            <img src="${link.href}" class="searched-picture"/>
            <br>
            <button class="save-btn" id="${input.value}${i}">Save To Favorites</button>
          </div>
          `
        }
        i++
      })
    })
  }
}
