import axios from "axios";
const api = axios.create();

api.interceptors.request.use(config => {
    const token = localStorage.getItem('userIdToken');
    config.headers = {"Authorization": `Bearer ${token}`};
    return config;
}, error => {
    console.log(error);
});

api.interceptors.response.use(config => {
    const token = localStorage.getItem('userIdToken');
    const time = localStorage.getItem('expTime');
    const tokenLife = Number(time) - Date.now()/1000;

    if (tokenLife <= 1000 || token == null) {
        //refresh();
    }

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
    console.log(error)
})

export {
    api
}