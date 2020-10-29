import axios from 'axios'

const apiUrl = 'https://0660fc195d87.ngrok.io/'

async function get (endpoint) {
    return axios.get(`${apiUrl}${endpoint}`);
}

export default get