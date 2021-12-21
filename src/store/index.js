import Vue from "vue"
import Vuex from 'vuex'

import {columnModule,cardModule,columnIndexModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        columnModule,
        cardModule,
        indexesModule: columnIndexModule
    },
    getters: {
        SORT_COLUMNS(state){
            console.log("-------------SORT_COLUMNS-------------")

            return state.cols;
        },
    }
})