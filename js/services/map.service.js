export const mapService = {
  initMap,
  addMarker,
  panTo
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi()
      .then(() => {
          console.log('google available')
          gMap = new google.maps.Map(
              document.querySelector('.map'), {
              center: { lat, lng },
              zoom: 15
          })

          gMap.addListener('click', (ev) => {
            // Prompt the user to enter a place name
            const name = prompt('Place name?', 'New Place')
    
            // Get the latitude and longitude from the click event
            const newLat = ev.latLng.lat()
            const newLng = ev.latLng.lng()
    
            // Add the new place to storage
            addPlace(name, newLat, newLng, gMap.getZoom())
    
            // Update the displayed list of places
            renderPlaces()
            renderMarkers()
        })

          console.log('Map!', gMap)
      })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
      position: loc,
      map: gMap,
      title: 'Hello World!'
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCnTQeNJibL0E_f682upH3bf7kPauklGlY'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
      elGoogleApi.onload = resolve
      elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}