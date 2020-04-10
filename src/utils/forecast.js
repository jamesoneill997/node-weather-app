const request = require('postman-request')

const forecast = (lat, long,  callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=ce0b23fbf27bb7c4c228450c89c79945&query=' + long + ',' + lat + '&units=m'
    request({url, json:true}, (error, {body})=>{
        const {err} = body
        if(error){
            callback('Error connecting with weather service.', undefined)
        }
        else if(err){
            callback(err.info, undefined)
        }
        else{
            callback(undefined, body)
        }
    })

}

module.exports = forecast 