export const locService = {
  getLocs,
  getLocsByIds
}


const locs = [
  { id: 'abc', name: 'Greatplace', lat: 32.047104, lng: 34.832384, createAt: 'yestarday', updatedAt: 'today' }, 
  { id: 'abc', name: 'Neveragain', lat: 32.047201, lng: 34.832581, createAt: 'yestarday', updatedAt: 'today' }, 
]

function query() {
  return 
}

function getLocs() {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve(locs)
      }, 2000)
  })
}

function getLocsByIds(id) {
  return locs.filter(loc => loc.id === id)
}


