import Vue from "vue"
import Vuex from 'vuex'

import {columnModule,cardModule,indexesModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        columnModule,
        cardModule,
        indexesModule
    },
    getters: {
        SORT_COLUMNS(state){
            console.log("-------------SORT_COLUMNS-------------")

            return state.cols;
        },
    }
})