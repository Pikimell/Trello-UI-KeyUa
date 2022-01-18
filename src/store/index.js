import Vue from "vue"
import Vuex from 'vuex'

import {authorizationModule, cardModule, cardsIndexModule, columnIndexModule, columnModule, fileModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        spinnerState: false,
        fileSpinnerState: false
    },
    mutations: {
        setSpinnerState: (state, value) => {
            state.spinnerState = value
        },
        setFileSpinnerState: (state, value) => {
            state.fileSpinnerState = value
        }
    },
    actions: {
        setSpinnerState: ({commit}, state) => {
            commit('setSpinnerState', state)
        },
        setFileSpinnerState: ({commit}, state) => {
            commit('setFileSpinnerState', state)
        }
    },
    getters: {
        spinnerState(state) {
            return state.spinnerState;
        },
        fileSpinnerState(state) {
            return state.fileSpinnerState;
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