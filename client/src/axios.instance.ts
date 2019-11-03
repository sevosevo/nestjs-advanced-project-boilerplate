import axios from 'axios';

const setAxiosAuth = (token: string) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = 'bearer '+token;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAxiosAuth;