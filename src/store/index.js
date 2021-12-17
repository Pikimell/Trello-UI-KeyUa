import Vue from "vue"
import Vuex from 'vuex'

const axios = require('axios');
const PATH = "http://localhost:3000";


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        cols: [],
        cards: [],
        colIndexes: []
    },
    mutations: {
        loadColumns: (state, columns) => {
            state.cols = columns;
        },
        loadColumnIndexes: (state, colIndex) => {
            state.colIndexes = colIndex;
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
            console.log('delete '+ idColumn)
            //state.cols = state.cols.filter(col => col.idColumn !== 0)
            //console.log(state.colIndexes.filter(idColumn => idColumn !== 0))
            //state.colIndexes.filter(idColumn => idColumn!== idColumn)
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
        editTitleCol: (state, {idColumn, title}) => {
            for (let i = 0; i < state.cols.length; i++) {//TODO
                if (state.cols[i].idColumn === idColumn) {
                    state.cols[i].title = title;
                    break;
                }
            }
        },
        indexingColumns: (state, columns) => {
            let listIndex = [];
            columns.forEach(x=>listIndex.push(x.idColumn))
            state.colIndexes = listIndex
            axios.put(PATH + `/updateIndexes/columns`,{
                colIndexes: JSON.stringify({
                    column: listIndex
                })
            }).catch(function (error) {
                console.log(error);
            });
        },
        pushIndex: (state, {index,idColumn}) => {
            state.colIndexes.push(idColumn)//TODO
            console.log(index)//delete after correction
            // state.colIndexes = state.colIndexes.splice(index, 0, idColumn);TODO
        }
    },
    actions: {
        loadColumns: ({commit}) => {
            axios.get(PATH + '/getColumns')
                .then(function (response) {
                    commit('loadColumns', response.data.Items)
                })
                .catch(function (error) {
                    console.log(error);
                })

            axios.get(PATH + '/getColIndexes')
                .then(function (response) {
                    commit('loadColumnIndexes', JSON.parse(response.data.Items[0].colIndexes).column)
                })
                .catch(function (error) {
                    console.log(error);
                })


        },
        loadCards: ({commit}) => {
            axios.get(PATH + '/getCards')
                .then(function (response) {
                    commit('loadCards', response.data.Items)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        indexingColumns: ({commit}, data) => {
            commit('indexingColumns',data)
        },
        pushColumn: ({commit,getters}, column) => {
            console.log(commit)
            console.log(getters)
            console.clear()
            console.log(column)
            axios.post(PATH + '/pushColumn', {
                idColumn: column.idColumn,
                title: column.title
            }).then(function (response) {
                if (response.statusText === "OK"){
                    commit('pushColumn', column);
                }
            }).catch(function (error) {
                console.log(error);
            });/*

            let index =  getters.INDEX_COL.length+1;
            commit('pushIndex', {index: index,idColumn: column.idColumn});

            axios.put(PATH + `/updateIndexes/columns`,{
                colIndexes: JSON.stringify({
                    column: getters.INDEX_COL
                })
            }).catch(function (error) {
                console.log(error);
            });*/
        },
        pushCard: ({commit}, card) => {
            axios.post(PATH + '/pushCard', {
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
            axios.delete(PATH + `/deleteColumn/${idColumn}`)
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
            axios.delete(PATH + `/deleteCard/${idCard}`).then(function (response) {
                if (response.statusText === "OK")
                    commit('delCard', idCard)
            }).catch(function (error) {
                console.log(error);
            });

        },
        updateCard: ({commit}, props) => {
            axios.put(PATH + `/updateCard/${props.idCard}`,{
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
        editTitleCol: ({commit}, props) => {
            axios.put(PATH + `/updateColumn/${props.idColumn}`,{
                title: props.title,
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('editTitleCol', props)
            }).catch(function (error) {
                console.log(error);
            });
        },
    },
    getters: {
        COLUMNS(state) {
            return state.cols
        },
        SORT_COLUMNS(state){
            let sortedList = [];
            state.colIndexes.forEach(idCol=>{
                let selectCol = state.cols.filter(col => col.idColumn === idCol)[0]
                sortedList.push(selectCol)
            })
            return sortedList;
        },
        CARDS(state) {
            return state.cards;
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
        },
        INDEX_COL(state){
            return state.colIndexes;
        }
    },
    modules: {}
})