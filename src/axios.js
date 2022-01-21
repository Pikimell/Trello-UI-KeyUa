import axios from "axios";
import router from './router'
const api = axios.create();

api.interceptors.request.use(config => {
    let refreshToken = localStorage.getItem('userRefreshToken');
    const time = localStorage.getItem('expTime');
    const tokenLife = Number(time) - Date.now() / 1000;

    if(tokenLife < 10){
        if(refreshToken)
            this.refresh({username: '',refreshToken:refreshToken});
    }

    if(refreshToken == null)
        router.push('sign-in');

    const token = localStorage.getItem('userIdToken');
    config.headers = {"Authorization": `Bearer ${token}`};
    return config;
}, error => {
    console.log(error);
});


api.interceptors.response.use(config => {
    const token = localStorage.getItem('userIdToken');
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        };
    } else {
        const newToken = localStorage.getItem('idToken');
        config.headers = {
            Authorization: `Bearer ${newToken}`
        };
    }

    return config;
}, error => {
    console.log(error);
})

export {
    api
}