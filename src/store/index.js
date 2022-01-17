import Vue from "vue"
import Vuex from 'vuex'

import {authorizationModule, cardModule, cardsIndexModule, columnIndexModule, columnModule, fileModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        spinnerState: false
    },
    mutations: {
        setSpinnerState: (state, value) => {
            console.log('spiner - '+value)
            state.spinnerState = value
        }
    },
    actions: {
        setSpinnerState: ({commit}, state) => {
            commit('setSpinnerState', state)
        }
    },
    getters: {
        spinnerState(state) {
            return state.spinnerState;
        }
    },
    modules: {
        columnModule,
        cardModule,
        columnIndexModule,
        cardsIndexModule,
        authorizationModule,
        fileModule
    }
})