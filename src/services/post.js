import axios from 'axios'

const apiUrl = 'https://0660fc195d87.ngrok.io/'

async function post (endpoint, model) {
    return axios.post(`${apiUrl}${endpoint}`,  model);
}

async function postCustom (endpoint) {
    return axios.post(`${apiUrl}${endpoint}`);
}

export default post
export { postCustom };