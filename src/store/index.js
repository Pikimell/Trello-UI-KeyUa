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
        setSpinnerState: async (state, value) => {
            state.spinnerState = value;
            setTimeout(()=>{
                state.spinnerState = false;
            },10000);
        },
        setFileSpinnerState: async (state, value) => {
            state.fileSpinnerState = value;
            setTimeout(()=>{
                state.fileSpinnerState = false;
            },10000);
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