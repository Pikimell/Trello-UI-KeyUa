import axios from "axios";
const PATH = "http://localhost:3000";
const cardModule = {
    state:{
        cards: []
    },
    mutations:{
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
        editCard: (state, {idCard, title,desc}) => {
            for (let i = 0; i < state.cards.length; i++) {//TODO
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].title = title;
                    state.cards[i].description = desc
                    break;
                }
            }
        },
    },
    actions:{
        loadCards: ({commit}) => {
            console.log("\n\n\n---------loadCards----------\n\n\n");
            axios.get(PATH + '/getCards')
                .then(function (response) {
                    commit('loadCards', response.data.Items)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        pushCard: ({commit}, card) => {
            console.log("\n\n\n---------pushCard----------\n\n\n");
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
        delCard: ({commit}, idCard) => {
            console.log("\n\n\n---------delCard----------\n\n\n");
            axios.delete(PATH + `/deleteCard/${idCard}`).then(function (response) {
                if (response.statusText === "OK")
                    commit('delCard', idCard)
            }).catch(function (error) {
                console.log(error);
            });

        },
        updateCard: ({commit}, props) => {
            console.log("\n\n\n---------updateCard----------\n\n\n");
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
    },
    getters:{
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
    }
}

export {
    cardModule
}