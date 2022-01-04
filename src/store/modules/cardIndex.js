import axios from "axios";
import {PATH} from "../consts";

const cardsIndexModule = {
    state:{
        cardIndexes: []
    },
    mutations:{
        loadCardIndexes: (state, cardIndex) => {
            state.cardIndexes = cardIndex
        },
        updateCardIndex: (state, idColumn) => {
            try{
                let token = localStorage.getItem('userIdToken')
                let cardsIndex = JSON.stringify({
                    cards: state.cardIndexes.
                    filter(data => data.idIndex === idColumn)[0].cards
                })
                axios.put(PATH + `/updateCardsIndexes/${idColumn}`,{
                    colIndexes: cardsIndex
                },{headers: {"Authorization": `Bearer ${token}`}})
            }catch(err){
                console.log(err)
            }
        },
        createIndexForCard: (state, idColumn) => {
            state.cardIndexes.push({
                idIndex: idColumn,
                cards: []
            })
        },
        pushCardIndexM: (state,{idColumn,idCard}) => {

            try{
                state.cardIndexes = state.cardIndexes.map(element => {
                    if(element.idIndex === idColumn)
                        element.cards.push(idCard)
                    return element
                })
            }catch (err){
                console.log(err)
            }
        },
        delCardIndexes: (state, idColumn) => {
            try{
                state.cardIndexes = state.cardIndexes.filter(card=> card.idIndex !== idColumn)
            }catch (err){
                console.log(err)
            }
        },
        removeIndexCard: (state, {idColumn, idCard}) => {
            for(let i=0;i<state.cardIndexes.length;i++){
                if(state.cardIndexes[i].idIndex === idColumn){
                    state.cardIndexes[i].cards =
                        state.cardIndexes[i].cards.
                        filter(idCard1=> idCard1 !== idCard)
                    break;
                }
            }
        },
        rewriteIndex: (state, {idColumn,cards}) => {
            for(let i=0;i<state.cardIndexes.length;i++){
                if(state.cardIndexes[i].idIndex === idColumn){
                    state.cardIndexes[i].cards = cards.map(card => {
                        return card.idCard
                    })
                    break;
                }
            }
        }
    },
    actions:{
        loadCardIndexes: ({commit}) => {
            let token = localStorage.getItem('userIdToken')
            axios.get(PATH + '/getCardIndexes',{headers: {"Authorization": `Bearer ${token}`}})
                .then(function (response) {
                    let items = response.data.Items.filter(data => data.idIndex !== "columns")
                    items = items.map((indexes) => {
                        indexes.cards = JSON.parse(indexes.colIndexes).cards
                        delete indexes.colIndexes
                        return indexes
                    })
                    commit('loadCardIndexes', items)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        createIndexForCard: ({commit}, idColumn) => {
            commit('createIndexForCard', idColumn)
            commit('updateCardIndex', idColumn)
        },
        pushCardIndex: ({commit}, data)=>{
            commit('pushCardIndexM', data)
            commit('updateCardIndex', data.idColumn)
        },
        delCardIndexes: ({commit},idColumn) => {
            let token = localStorage.getItem('userIdToken')
            axios.delete(PATH + `/deleteCardIndexes/${idColumn}`,{headers: {"Authorization": `Bearer ${token}`}})
                .then(()=>{
                        commit('delCardIndexes', idColumn)

                }).catch(function (error) {
                console.log(error);
            });
        },
        updateCardIndex: ({commit},idColumn) => {
            commit('updateCardIndex', idColumn)
        },
        removeIndexCard: ({commit}, data) => {
            commit('removeIndexCard', data)
        },
        rewriteIndex: ({commit}, data) =>{
            commit('rewriteIndex',data)
            commit('updateCardIndex', data.idColumn)
        }
    },
    getters:{
        INDEX_CARDS(state){
            return state.cardIndexes;
        }
    }
}

export {
    cardsIndexModule
}
