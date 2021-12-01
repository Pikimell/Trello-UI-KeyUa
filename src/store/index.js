import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)


export default  new Vuex.Store({
    state:{
        cols: []
    },
    mutations:{
        pushColumn: (state, column)=>{
            state.cols.push(column);
        },
        pushCard:(state,card,idColumn)=>{
            let indexCol = 

            state.cols.push(column);
        }
    },
    actions:{

    },
    getters:{

    }
})