import axios from "axios";
import {PATH} from "../consts";
import router from "../../router";

const authorizationModule = {
    state: {
        userInfo: {},
        userIdToken: ''
    },
    mutations: {
        addUserInfo(state, data) {
            try {
                state.userInfo = data;
                state.userIdToken = data.idToken.jwtToken;
                localStorage.setItem('userIdToken', data.idToken.jwtToken)
                localStorage.setItem('userRefreshToken', data.refreshToken.token)
                localStorage.setItem('expTime', data.idToken.payload.exp)
                localStorage.setItem('userEmail', data.idToken.payload.email)
            } catch (err) {
                console.log(err)
            }
        },
        addUserInfoRefresh(state, data) {
            try {
                state.userInfo = data;
                state.userIdToken = data.idToken.jwtToken;
                localStorage.setItem('userIdToken', data.idToken.jwtToken)
                localStorage.setItem('userRefreshToken', data.refreshToken)
                localStorage.setItem('expTime', data.idToken.payload.exp)
                localStorage.setItem('userEmail', data.idToken.payload.email)
            } catch (err) {
                console.log(err)
            }
        },
        clearInfo(state){
            state.userInfo = [];
            state.userIdToken = '';
            localStorage.setItem('userIdToken', '')
            localStorage.setItem('userRefreshToken', '')
            localStorage.setItem('expTime', '')
            localStorage.setItem('userEmail', '')
        }
    },
    actions: {
        async signIn({commit}, params) {
                axios.post(PATH + '/signIn', JSON.stringify(params))
                    .then(async res => {
                        commit('addUserInfo', res.data);
                        await router.push('trello_page')
                    }).catch(err => {
                        alert('Invalid password!');
                        console.log(err)
                })
        },
        async refresh({commit}, params) {
                axios.post(PATH + '/refreshToken', JSON.stringify(params))
                    .then(async res => {
                        commit('addUserInfoRefresh', res.data);
                        return true;
                    }).catch(err => {
                        console.log(err)
                    return false;
                })
        }
    },
    getters: {
        userInfo: (state) => {
            return state.userInfo;
        },
        userIdToken: (state) => {
            return state.userIdToken;
        },
    }
}


export {
    authorizationModule
}