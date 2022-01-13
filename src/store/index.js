import Vue from "vue"
import Vuex from 'vuex'

import {columnModule,cardModule,columnIndexModule,cardsIndexModule,authorizationModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        spinnerState:false
    },
    mutations:{
        setSpinnerState: (state, value)=>{
            state.spinnerState = value
        }
    },
    actions:{
        setSpinnerState: ({commit}, state) => {
            commit('setSpinnerState', state)
        }
    },
    getters:{
        spinnerState(state){
            return state.spinnerState;
        }
    },
    modules: {
        columnModule,
        cardModule,
        columnIndexModule,
        cardsIndexModule,
        authorizationModule
    }
})