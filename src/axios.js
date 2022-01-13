import axios from "axios";

const api = axios.create();
api.interceptors.request.use(config => {
    const token = localStorage.getItem('userIdToken');
    config.headers = {"Authorization": `Bearer ${token}`}
    return config
}, error => {
    console.log(error);
});

export {
    api
}