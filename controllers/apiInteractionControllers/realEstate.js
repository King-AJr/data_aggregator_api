//https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=82009&propertytype=RELIGIOUS&page=1&pagesize=100
//apikey: 2b1e86b638620bf2404521e6e9e1b19e
//accept: Application/json
const axios = require('axios')



const getListings = async(type, postalCode, city) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete',
            params: {
              input: `${postalCode} ${city}`,
              limit: '10'
            },
            headers: {
              'X-RapidAPI-Key': 'aa1d29dd65msh8c55570e6976a0bp131462jsn9daa0b4f2ed5',
              'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
            }
          };
        const [first_response, second_response] = await Promise.all([
            await(axios.get(
                `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=${postalCode}&propertytype=${type}&page=1&pagesize=10`,
                {
                  headers: {
                    apikey: "2b1e86b638620bf2404521e6e9e1b19e",
                    accept: "Application/json",
                  },
                  validateStatus: function (status) {
                    return status >= 200 && status < 401; // Don't throw an error for status codes in the range 200-399
                  },
                }
              )),
            await(axios.request(options))
        ])
        if (first_response.data) {
            const response = [first_response.data.property, second_response.data];
            return response;
        } else {
            const response = [second_response];
            return response;
        }
        
    } catch (error) {
      // Handle errors here
      if (error.response) {
          // Server responded with a status code outside the range of 2xx
          console.error('Error response from server:', error.response.status, error.response.data);
      } else if (error.request) {
          // The request was made but no response was received (e.g., no internet connection)
          console.error('No response received. Is your computer connected to the internet?');
      } else {
          // An error occurred during the request setup (e.g., invalid request config)
          console.error('Error:', error.message);
      }
      throw error; // Rethrow the error to propagate it to the caller if needed
  }
}


module.exports = getListings;