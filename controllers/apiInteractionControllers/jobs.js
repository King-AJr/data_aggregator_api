//API's to work with https://findwork.dev/api/jobs/?location=london&search=software%engineer&sort_by=relevance
//http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=29331435&app_key=d9041f8698f72c47fce205f0717f8a4e&results_per_page=20
//&what=Data analyst&salary_min=45000&content-type=application/json
const axios = require('axios');


const getJob = async (title) => {
    const [first_response, second_response] = await Promise.all([
        axios.get(`https://findwork.dev/api/jobs/?search=${title}&sort_by=relevance`, {
            headers: {'Authorization': 'Token 8662a2608699f6225b83dc1befc5276009ab5f8d'}
        }),
        axios.get(`http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=29331435&app_key=d9041f8698f72c47fce205f0717f8a4e&results_per_page=20&what=${title}&content-type=application/json`)
    ]);

    const response = [first_response.data.results, second_response.data.results];
    return response;
};

module.exports = getJob;
