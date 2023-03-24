import axios from 'axios';


const api = axios.create({
    baseURL: 'http://teste-frontend.saperx.com.br/api'
})

export default api