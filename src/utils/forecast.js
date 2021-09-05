const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0998792b86a4e05bca3888726d5ac0eb&query=${latitude},${longitude}`
    request({url:url,json:true},(error,{ body })=>{     //in place of response... we destructured it to body to get response.body
        if(error){
            callback("unable to connect to weather services",undefined)
        }
        else if(body.error){
            callback("unable to find location")
        }
        else{
            callback(undefined,`${body.current.weather_description[0]}. It is currently ${body.current.temperature} deg celsius. And it feels like ${body.current.feelslike}`)
        }
    })

}

module.exports = forecast