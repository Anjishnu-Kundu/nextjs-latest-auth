import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://140.82.1.20:3000',
});

export default axiosInstance;
