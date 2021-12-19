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
        editCard: (state, {idCard, title, desc, idColumn}) => {
            for (let i = 0; i < state.cards.length; i++) {//TODO
                if (state.cards[i].idCard === idCard) {
                    state.cards[i].title = title;
                    state.cards[i].description = desc
                    state.cards[i].idColumn = idColumn
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
                idColumn: props.idColumn
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('editCard', props)
            }).catch(function (error) {
                console.log(error);
            });
        },
    },
    getters:{
        CARDS: (state) => (idCol) => {
          return state.cards.filter(x => x.idColumn === idCol)
        },

        CARDS_COL: (state) => (idCol) => {
            return state.cards.filter(card => card.idColumn === idCol);
        },
        SORT_CARDS_COL: (state) => ({idCol, indexCards}) => {
            let listIndex = (indexCards.length>0)?indexCards.filter(data => data.idIndex === idCol)[0]:[]
            let result = []//state.cards.filter(x=>x.idColumn === idCol)
            listIndex.cards.forEach(idCard => {
                let cards = state.cards.filter(card => card.idCard === idCard);
                if(cards.length){
                    result.push(cards[0])
                }
            })
            return result;
        },
        TEST_CARDS: (state) => {
            /*let indexCards = (state.INDEX_CARDS)?state.INDEX_CARDS:[]

            let listIndex = (indexCards.length>0)?indexCards.filter(data => data.idIndex === idColumn)[0].cards:[]
            let result = []//state.cards.filter(x=>x.idColumn === idCol)
            listIndex.forEach(idCard => {
                let cards = state.cards.filter(card => card.idCard === idCard);
                if(cards.length){
                    result.push(cards[0])
                }
            })*/
            return state.cards//result;
        }
    }
}

export {
    cardModule
}