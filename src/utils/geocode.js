const request = require('postman-request')

const geocode = (address, callback) => {
try {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFtZXNvbmVpbGw5OTciLCJhIjoiY2s4bmR4cnN5MHAxcjNlcDhoeHYwZGJqNCJ9.mruQR6vx83Fes6tevycXCg&limit=1'

    request({url, json:true}, (error, {body})=>{
        const {features} = body
        if(error){
            callback('There was an error connecting with the server, please check your connection and try again.', undefined)
        }

        else if(!features[0]){
            callback('Place does not exist, please check the spelling and try again.', undefined)
        }

        else{
            callback(undefined, { 
                longitude:features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }        
    })}
    catch (TypeError) {
        callback('Place does not exist, please check the spelling and try again.', undefined)
    }

}

module.exports = geocode