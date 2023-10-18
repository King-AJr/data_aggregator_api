//API's to work with https://findwork.dev/api/jobs/?location=london&search=software%engineer&sort_by=relevance
const axios = require('axios');

const getJob = async(title) => {
    const response = await axios.get(`https://findwork.dev/api/jobs/?search=${title}&sort_by=relevance`, {
        headers: {'Authorization': 'Token 8662a2608699f6225b83dc1befc5276009ab5f8d'}
    })
    return response.data.results
}

module.exports = getJob;