import axios from "axios";
import {PATH} from "../consts";
import router from "../../router";

const authorizationModule = {
    state: {
        userInfo: [],
        userIdToken: []
    },
    mutations: {
        addUserInfo(state, data) {
            state.userInfo[0] = data;
            state.userIdToken[0] = data.idToken.jwtToken;
        }
    },
    actions: {
        async signIn({commit}, params) {
            try {
                axios.post(PATH + '/signIn', JSON.stringify(params))
                    .then(async res => {
                        commit('addUserInfo', res.data);
                        localStorage.setItem('userIdToken', res.data.idToken.jwtToken)
                        router.push('trello_page')
                    })
            } catch (err) {
                console.log(err);
            }
        },
        async refresh({commit}, params) {
            axios.post(PATH + '/refreshToken', JSON.stringify(params))
                .then(async res => {
                    commit('addUserInfo', res.data);
                    localStorage.setItem('userIdToken', res.data.idToken.jwtToken)
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