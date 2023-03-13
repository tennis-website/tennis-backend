const { URLSearchParams } = require('url');


async function getGoogleMapsURl(address){
    try{
        const baseUrl = 'https://www.google.com/maps/search/?api=1';
        const queryParams = new URLSearchParams({
            query: address,
        });
        return `${baseUrl}&${queryParams.toString()}`;
    }
    catch{
        console.log("ERROR URL"+ err.message)
        return "ERROR"
    }
}

module.exports.getGoogleMapsURl = getGoogleMapsURl;