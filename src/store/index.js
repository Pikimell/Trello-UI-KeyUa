import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        cols: [],
        cards: []
    },
    mutations: {
        pushColumn: (state, column) => {
            state.cols.push(column);
        },
        pushCard: (state, card) => {
            state.cards.push(card);
        },
        delColumn: (state, idColumn) => {
            function isPrime(column) {
                return column.idColumn === idColumn
            }
            let index = state.cols.findIndex(isPrime);
            state.cols.splice(index, 1)
        },
        delCard: (state, idCard) => {
            function isPrime(card) {
                return card.idColumn === idCard
            }
            let index = state.cards.findIndex(isPrime);
            state.cards.splice(index, 1)
        },
        editTitleCard:(state, {idCard, title})=>{
            for(let i =0;i<state.cards.length;i++){//TODO
                if(state.cards[i].idCard === idCard){
                    state.cards[i].title = title;
                    break;
                }
            }
        },
        editTitleCol:(state, {idColumn, title})=>{
            for(let i =0;i<state.cols.length;i++){//TODO
                if(state.cols[i].idColumn === idColumn){
                    state.cols[i].title = title;
                    break;
                }
            }
        },
        editDescCard:(state, {idCard, desc})=>{
            for(let i =0;i<state.cards.length;i++){//TODO
                if(state.cards[i].idCard === idCard){
                    state.cards[i].description = desc;
                    break;
                }
            }
        }
    },
    actions: {
        pushColumn: ({commit}, column) => {
            commit('pushColumn',column)
        },
        pushCard: ({commit}, card) => {
            commit('pushCard',card)
        },
        delColumn: ({commit}, idColumn) => {
            commit('delColumn',idColumn)
        },
        delCard: ({commit}, idCard) => {
            commit('delCard', idCard)
        },
        editTitleCard:({commit}, props)=>{
            commit('editTitleCard', props)
        },
        editTitleCol:({commit}, props)=>{
            commit('editTitleCol',props)
        },
        editDescCard:({commit}, props)=>{
            commit('editDescCard', props)
        }
    },
    getters: {
        COLUMNS(state){
            return state.cols;
        },
        CARDS(state){
            return state.cards;
        }
    },
    modules: {}
})