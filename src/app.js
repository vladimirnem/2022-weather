const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode.js')
const forecast = require('./utlis/forecast.js')


const app = express()
const port = 3000

//Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vladimir Nemtsov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Vladimir Nemtsov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'So this is help service',
        title: 'Help',
        name: 'Vladimir Nemtsov'
    })
})




app.get('/', (req, res) => {
    res.send('Hello Server Express!')
})


app.get('/weather', (req, res) => {
    if (!req.query.addres) {
        return res.send({
            error: "Adress Should provide"
        })
    }

    geocode(req.query.addres, (error, { latitude, longtitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(longtitude, latitude, (error, forecastData) => {
                if (error) {
                    res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.addres
                })
            })

        })
        // res.send({
        //     address: req.query.addres,
        //     location: 'Philadelhia',
        //     forecast: 45
        // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term"
        })
    } else {

        console.log(req.query)
        res.send({
            product: []
        })
    }
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article didnt find',
        name: 'Vladimir Nemtsov'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'There is probles  with page not Found',
        name: 'Vladimir Nemtsov'
    })
})



app.listen(port, () => {
    console.log('Serving is up on port ' + port)
})