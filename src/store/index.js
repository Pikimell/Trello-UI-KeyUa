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
        editCard: (state, {idCard, title,desc}) => {
            for (let i = 0; i < state.cards.length; i++) {//TODO
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].title = title;
                    state.cards[i].description = desc
                    break;
                }
            }
        },
        indexingColumns: (state, {idColumn, newIndex}) => {
            function isPrime(column) {return column.idColumn === idColumn}
            let index = state.cols.findIndex(isPrime);
            if(index!==-1){
                state.cols[index].indexColumn = newIndex;
            }
        }
    },
    actions: {
        loadColumns: ({commit}) => {
            axios.get(ENDPOINT + '/getColumns')
                .then(function (response) {
                    commit('loadColumns', response.data.Items.sort( (a, b) => {
                        if (a.indexColumn > b.indexColumn) {
                            return 1;
                        }
                        if (a.indexColumn < b.indexColumn) {
                            return -1;
                        }
                        return 0;
                    }))
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

        indexingColumns: ({commit}, data) => {
            axios.put(ENDPOINT + `/updateColIndex/${data.idColumn}`,{
                indexColumn: data.newIndex
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('indexingColumns', data)
            }).catch(function (error) {
                console.log(error);
            });
        },

        pushColumn: ({commit}, column) => {
            axios.post(ENDPOINT + '/pushColumn', {
                idColumn: column.idColumn,
                title: column.title,
                indexColumn: column.indexColumn
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
                description: card.description,
                indexCard: card.indexCard
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('pushCard', card)
            }).catch(function (error) {
                console.log(error);
            });
        },
        delColumn: ({commit}, idColumn) => {
            axios.delete(ENDPOINT + `/deleteColumn/${idColumn}`)
                .then(function (response) {
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
        updateCard: ({commit}, props) => {
            axios.put(ENDPOINT + `/updateCard/${props.idCard}`,{
                idCard: props.idCard,
                title: props.title,
                description: props.desc,
                indexCard: props.indexCard
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('editCard', props)
            }).catch(function (error) {
                console.log(error);
            });
        },

    },
    getters: {
        COLUMNS(state) {
            return state.cols
        },
        CARDS(state) {
            return state.cards;
        },
        COLUMNS_SORT(state){
            return state.cols.sort((left,right) => {
                if (left.indexColumn > right.indexColumn) {
                    return 1;
                }
                if (left.indexColumn < right.indexColumn) {
                    return -1;
                }
                return 0;
            })
        },
        CARDS_COL: (state) => ({idCol, sorted}) => {
            let result = state.cards.filter(x=>x.idColumn === idCol)
            if(sorted) result = result.sort((a, b) => {
                if (a.indexCard > b.indexCard) {
                    return 1;
                }
                if (a.indexCard < b.indexCard) {
                    return -1;
                }
                return 0;
            })
            return result;

        }
    },
    modules: {}
})