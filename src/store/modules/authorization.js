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
                localStorage.setItem('userRefreshToken', data.refreshToken)
                localStorage.setItem('expTime', data.idToken.payload.exp)
                localStorage.setItem('userEmail', data.idToken.payload.email)
            } catch (err) {
                console.log(err)
            }
        }
    },
    actions: {
        async signIn({commit}, params) {
            try {
                axios.post(PATH + '/signIn', JSON.stringify(params))
                    .then(async res => {
                        commit('addUserInfo', res.data);
                        router.push('trello_page')
                    })
            } catch (err) {
                console.log(err);
            }
        },
        async refresh({commit}, params) {
            try {
                axios.post(PATH + '/refreshToken', JSON.stringify(params))
                    .then(async res => {
                        console.log(res.data)
                        commit('addUserInfo', res.data);
                    })
            } catch (err) {
                console.log(err)
            }
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