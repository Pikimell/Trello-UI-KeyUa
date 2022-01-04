import axios from "axios";
import {PATH} from "../consts";

const cardModule = {
    state: {
        cards: []
    },
    mutations: {
        loadCards: (state, cards) => {
            state.cards = cards;
        },
        pushCard: (state, card) => {
            state.cards.push(card);
        },
        delCard: (state, idCard) => {
            function isPrime(card) {
                return card.idCard === idCard
            }

            let index = state.cards.findIndex(isPrime);
            state.cards.splice(index, 1)
        },
        editCard: (state, {idCard, title, desc, idColumn}) => {
            for (let i = 0; i < state.cards.length; i++) {
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].title = title;
                    state.cards[i].description = desc
                    state.cards[i].idColumn = idColumn
                    break;
                }
            }
        },
    },
    actions: {
        loadCards: ({commit}) => {
            let token = localStorage.getItem('userIdToken')
            axios.get(PATH + '/getCards',{headers: {"Authorization": `Bearer ${token}`}})
                .then(function (response) {
                    commit('loadCards', response.data.Items)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        pushCard: async ({commit}, card) => {
            let token = localStorage.getItem('userIdToken')
            await axios.post(PATH + '/pushCard', {
                idCard: card.idCard,
                idColumn: card.idColumn,
                title: card.title,
                description: card.description,
                indexCard: card.indexCard
            },{headers: {"Authorization": `Bearer ${token}`}})
                .then(()=>{
                    commit('pushCard', card)
                return "Ok"
            }).catch(function (error) {
                console.log(error);
                return "error"
            });
        },
        delCard: ({commit}, idCard) => {
            let token = localStorage.getItem('userIdToken')
            axios.delete(PATH + `/deleteCard/${idCard}`,{headers: {"Authorization": `Bearer ${token}`}})
                .then(()=>{
                    commit('delCard', idCard)
            }).catch(function (error) {
                console.log(error);
            });

        },
        updateCard: ({commit}, props) => {
            let token = localStorage.getItem('userIdToken')
            axios.put(PATH + `/updateCard/${props.idCard}`, {
                idCard: props.idCard,
                title: props.title,
                description: props.desc,
                idColumn: props.idColumn
            },{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
                    commit('editCard', props)
            }).catch(function (error) {
                console.log(error);
            });
        },
    },
    getters: {
        CARDS_COL: (state) => (idCol) => {
            return state.cards.filter(card => card.idColumn === idCol);
        },
        SORTED_CARDS_COL: (state) => ({idCol, indexCards}) => {
            let listIndex = (indexCards.length > 0) ? indexCards.filter(data => data.idIndex === idCol)[0] : []
            let result = []
            listIndex.cards.forEach(idCard => {
                let cards = state.cards.filter(card => card.idCard === idCard);
                if (cards.length) {
                    result.push(cards[0])
                }
            })
            return result;
        }
    }
}

export {
    cardModule
}