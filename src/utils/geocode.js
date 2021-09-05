const request = require("request")
const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}}.json?access_token=pk.eyJ1IjoiamF5ZXNoa2FybjAyIiwiYSI6ImNrdDBhMGNpaTF0eDAydmxnaDIyYnBnaGEifQ._ixz_sIZacg2A9BV1eXBNg`
    //encodeuricomponent returns a string
    request({url:url,json:true},(error,{ body })=>{                     //in place of response... we destructured it to body to  get response.body
        if(error){  //if there is error pass it to the callback
            callback("unable to connect to location services!",undefined) 
        }else if(body.features.length === 0){
            callback("unable to find location, try another search,",undefined)
        }else{  //pass latitude nd longitude
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode