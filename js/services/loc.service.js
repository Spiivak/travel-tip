import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const LOCS_KEY = 'locsDB'

createLocs()

export const locService = {
  query,
  get,
  remove,
  save,
}


// const locs = [
//   { id: utilService.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, createAt: utilService.randomPastTime(), updatedAt: utilService.randomPastTime() },
//   { id: utilService.makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581, createAt: utilService.randomPastTime(), updatedAt: utilService.randomPastTime() },
//   { id: utilService.makeId(), name: 'WhyThisAgain', lat: 32.047201, lng: 34.832581, createAt: utilService.randomPastTime(), updatedAt: utilService.randomPastTime() },
// ]

function query() {
  return storageService.query(LOCS_KEY).then(locs => {
    return locs
  })
}

function get(locId) {
	return storageService.get(LOCS_KEY, locId)
}

function remove(locId) {
	return storageService.remove(LOCS_KEY, locId)
}

function save(loc) {
	if (loc.id) {
		return storageService.put(LOCS_KEY, loc)
	} else {
		return storageService.post(LOCS_KEY, loc)
	}
}

// function getLocsByIds(id) {
//   return locs.filter(loc => loc.id === id)
// }

function createLocs() {
  let locs = utilService.loadFromStorage(LOCS_KEY)
  if (!locs || !locs.length) {
    createDemoLocs()
  }
}

function createDemoLocs() {
  const locNames = ['Greatplace', 'Neveragain', 'WhyThisAgain']
  const locPos = [{ posX: 32.047104, posY: 34.832384 }, { posX: 32.0624713, posY: 34.7750132 }, { posX: 48.2050, posY: 16.3718 }]

  const demoLocs = locNames.map((locName, i) => {
    return createLoc(locName, locPos[i])
  })

  utilService.saveToStorage(LOCS_KEY, demoLocs)
}

function createLoc(name, locPos) {
  const loc = getEmptyLoc()
  loc.id = utilService.makeId()
  loc.name = name
  loc.lat = locPos.posX
  loc.lng = locPos.posY
  loc.createAt = utilService.randomPastTime()
  loc.updatedAt = utilService.randomPastTime()
  return loc
}

function getEmptyLoc() {
  return {
    id: '',
    name: '',
    lat: '',
    lng: '',
    createAt: '',
    updatedAt: '',
    birth: '',
  }
}