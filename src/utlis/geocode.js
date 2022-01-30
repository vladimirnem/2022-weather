const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlkbmlnaHQxMjUxIiwiYSI6ImNreWVuNDdtdDBoNzYycHFobWN0NmpvOXYifQ.moGRxt-Bns9HQqumNe1IKg'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Bad Request for Location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longtitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode