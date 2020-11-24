import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-71b29.firebaseio.com/'
});

export default instance;