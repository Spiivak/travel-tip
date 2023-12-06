export const mapService = {
  initMap,
  addMarker,
  panTo,
  getMapCenter
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi()
    .then(() => {
      console.log('google available')
      gMap = new google.maps.Map(
        document.querySelector('#map'), {
        center: { lat, lng },
        zoom: 15
      })
      gMap.addListener('click', (ev) => {
        const lngLat = {lat: ev.latLng.lat(), lng: ev.latLng.lng()}
        // gMap.center = lngLat
        panTo(lngLat.lat, lngLat.lng)
        addMarker(lngLat)
        console.log('Map Clicked:', lngLat)
        // resolve(lngLat)
      })

      console.log('Map!', gMap)
    })
}

function getMapCenter() {
  if (!gMap) {
    return null
  }

  const center = gMap.getCenter()
  return {
    lat: center.lat(),
    lng: center.lng()
  };
}


function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: prompt('Enter a name for this location')
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCxRVJWE6mPODjt1x6udWZTHAbnHWuXXTo'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}