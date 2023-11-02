const axios = require('axios');

const getJob = async (title) => {
    try {
        // Use Promise.all to send both requests concurrently
        const [first_response, second_response] = await Promise.all([
            axios.get(`https://findwork.dev/api/jobs/?search=${title}&sort_by=relevance`, {
                headers: {'Authorization': process.env.FINDWORK_API_KEY }
            }),
            axios.get(`http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=29331435&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${title}&content-type=application/json`)
        ]);

        const response = [first_response.data.results, second_response.data.results];
        return response;
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
};

module.exports = getJob;
