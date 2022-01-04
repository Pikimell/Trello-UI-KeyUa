import axios from "axios";
import {PATH} from "../consts";



const authorizationModule = {
    state:{
       userInfo:[],
       userIdToken:[]
    },
    mutations:{
        addUserInfo(state, data){
            state.userInfo[0] = data;
        }
    },
    actions:{
        async signIn({commit},params){
            axios.post(PATH+'/signIn',JSON.stringify(params))
                .then(async res => {
                    commit('addUserInfo',res.data);
                    localStorage.setItem('userIdToken', res.data.token.idToken)
                })
        }
    },
    getters:{

    }
}


export {
    authorizationModule
}