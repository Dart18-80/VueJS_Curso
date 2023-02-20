import axios from 'axios';

const clientsApi = axios.create({
    baseURL: 'http://localhost:3001/'
});

export default clientsApi;