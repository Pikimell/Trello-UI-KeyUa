import Vue from "vue"
import Vuex from 'vuex'

import {columnModule,cardModule,columnIndexModule,cardsIndexModule,authorizationModule} from "./modules";

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        columnModule,
        cardModule,
        columnIndexModule,
        cardsIndexModule,
        authorizationModule
    }
})