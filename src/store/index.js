import Vue from "vue"
import Vuex from 'vuex'

const axios = require('axios');
const ENDPOINT = "http://localhost:3000";


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        cols: [],
        cards: []
    },
    mutations: {
        loadColumns: (state, columns) => {
            state.cols = columns;
        },
        loadCards: (state, cards) => {
            state.cards = cards;
        },
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
                return card.idCard === idCard
            }

            let index = state.cards.findIndex(isPrime);
            state.cards.splice(index, 1)
        },
        editTitleCard: (state, {idCard, title}) => {
            for (let i = 0; i < state.cards.length; i++) {//TODO
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].title = title;
                    break;
                }
            }
        },
        editTitleCol: (state, {idColumn, title}) => {
            for (let i = 0; i < state.cols.length; i++) {//TODO
                if (state.cols[i].idColumn === idColumn) {
                    state.cols[i].title = title;
                    break;
                }
            }
        },
        editDescCard: (state, {idCard, desc}) => {
            for (let i = 0; i < state.cards.length; i++) {//TODO
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].description = desc;
                    break;
                }
            }
        }
    },
    actions: {
        loadColumns: ({commit}) => {
            axios.get(ENDPOINT + '/getColumns')
                .then(function (response) {
                    commit('loadColumns', response.data.Items.reverse())
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        },
        loadCards: ({commit}) => {
            axios.get(ENDPOINT + '/getCards')
                .then(function (response) {
                    commit('loadCards', response.data.Items.reverse())
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        },


        pushColumn: ({commit}, column) => {
            axios.post(ENDPOINT + '/pushColumn', {
                idColumn: column.idColumn,
                title: column.title
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('pushColumn', column);
            }).catch(function (error) {
                console.log(error);
            });

        },
        pushCard: ({commit}, card) => {
            axios.post(ENDPOINT + '/pushCard', {
                idCard: card.idCard,
                idColumn: card.idColumn,
                title: card.title,
                description: card.description
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('pushCard', card)
            }).catch(function (error) {
                console.log(error);
            });
        },
        delColumn: ({commit}, idColumn) => {
            axios.delete(ENDPOINT + `/deleteColumn/${idColumn}`).then(function (response) {
                if (response.statusText === "OK") {
                    commit('delColumn', idColumn)

                    //TODO delete cards of columns
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        delCard: ({commit}, idCard) => {
            axios.delete(ENDPOINT + `/deleteCard/${idCard}`).then(function (response) {
                if (response.statusText === "OK")
                    commit('delCard', idCard)
            }).catch(function (error) {
                console.log(error);
            });

        },
        editTitleCard: ({commit}, props) => {
            commit('editTitleCard', props)
        },
        editTitleCol: ({commit}, props) => {
            axios.put(ENDPOINT + `/updateColumn/${props.idColumn}`, {
                title: props.title
            }).then(response => {
                console.log(response);
                commit('editTitleColumn', props)
            }).catch(error => {
                console.log(error);
            });
            commit('editTitleCol', props)
        },
        editDescCard: ({commit}, props) => {
            commit('editDescCard', props)
        }
    },
    getters: {
        COLUMNS(state) {
            return state.cols;
        },
        CARDS(state) {
            return state.cards;
        }
    },
    modules: {}
})