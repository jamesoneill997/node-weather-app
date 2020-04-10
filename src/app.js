//npm or source packages
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//self-made packages
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//define paths for express config
const publicPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')



//setup engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath));


app.get('/',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: "James O'Neill"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help Section',
        name: "James O'Neill"

    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Section',
        name: "James O'Neill"
    })
})
app.get('/weather', (req,res)=>{

    if (!req.query.address) {
            return res.send({
                error: 'Please provide an address.'
            })
    }
    
    else{
        geocode(req.query.address, (error, {latitude:lat, longitude:long}={})=>{
            if(error){
                return res.send({error:'Place does not exist, please check the spelling and try again'})
            }else{
            forecast(long, lat, (error, response)=>{
                if(error){
                    return res.send({error:'Error fetching location.'})
                }
                else{
                    const results ={
                        address: req.query.address,
                        temp : response.temperature+' degrees celcius',
                        conditions : response.weather_descriptions
                    }
                    return res.send(results)
                }
            })}
        })
    }
    


})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title: 404,
        error:'Help article not found.'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title: 404,
        error:'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server running on port '+port)
})