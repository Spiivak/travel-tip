import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
    .then(() => {
        console.log('Map is ready')
        renderPlaces()
    })
    .catch(() => console.log('Error: cannot init map'))
    // renderPlaces()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs-list').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            const place = prompt('Enter your location\'s name:')
            document.querySelector('.user-pos').innerText = place
                // `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            return {pos, place}
            })
        .then(loc => locService.getEmptyLoc(loc.place, loc.pos.coords.latitude, loc.pos.coords.longitude))
        .then(loc => locService.save(loc))
        .then(renderPlaces())
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function renderPlaces() {
    let placesHTML = ''
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            if(Array.isArray(locs)) {
                locs.map(loc => {
                    placesHTML += `<li>${loc.name}</li>`
                })
            } else {
                console.error('locs is not an array', locs)
            }
            document.querySelector('.locations-table').innerHTML = placesHTML
        })
        .catch(error => console.error('Error fetching locs:', error))
}