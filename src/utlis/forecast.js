const requiest = require('request')

const forecast = (lot, lang, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6adaa3e5f306a2de6cbf3fde2965746e&query=' + lang + ',' + lot
    requiest({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (body.error) {
            callback('Bad Request please try again', undefined)
        } else {
            console.log(body.current.observation_time)
            callback(undefined, 'It`s ' + body.current.temperature + ' Celcium Degrees outside. In a ' + body.current.observation_time + ' there is ' + body.current.weather_descriptions[0] + ' outside with wind speed of ' + body.current.wind_speed + ' mph.')
        }
    })

}

module.exports = forecast