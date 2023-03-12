const { URLSearchParams } = require('url');


async function getGoogleMapsURl(address){
    const baseUrl = 'https://www.google.com/maps/search/?api=1';
    const queryParams = new URLSearchParams({
        query: address,
    });
    return `${baseUrl}&${queryParams.toString()}`;
}

module.exports.getGoogleMapsURl = getGoogleMapsURl;