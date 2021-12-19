import axios from "axios";
const PATH = "http://localhost:3000";

const cardsIndexModule = {
    state:{
        cardIndexes: []
    },
    mutations:{
        loadCardIndexes: (state, cardIndex) => {
            state.cardIndexes = cardIndex
            console.log("Индексы карточек были загруэжены!")
        },
        updateCardIndex: (state, idColumn) => {
            console.log("Изменения индексов карточек отправлены в БД!")
            try{
                let cardsIndex = JSON.stringify({
                    cards: state.cardIndexes.
                    filter(data => data.idIndex === idColumn)[0].cards
                })
                axios.put(PATH + `/updateCardsIndexes/${idColumn}`,{
                    colIndexes: cardsIndex
                }).catch(function (error) {
                    console.log(error);
                });
            }catch(err){
                console.log(err)
            }
        },
        createIndexForCard: (state, idColumn) => {
            console.log("Инициализация массива индексов карточек!")
            state.cardIndexes.push({
                idIndex: idColumn,
                cards: []
            })
        },
        pushCardIndexM: (state,{idColumn,idCard}) => {
            console.log("Был добавлен индекс карточки!")

            try{
                state.cardIndexes = state.cardIndexes.map(data => {
                    if(data.idIndex === idColumn)
                        data.cards.push(idCard)
                    return data
                })
            }catch{
                console.log("pushIndexCard ERROR")
            }

        },
        delCardIndexes: (state, idColumn) => {
            console.log("Были удалены индексы карточек!")
            try{
                state.cardIndexes = state.cardIndexes.filter(x=> x.idIndex !== idColumn)
            }catch{
                console.log("delCardIndexes ERROR")
            }
        },
        removeIndexCard: (state, {idColumn, idCard}) => {
            for(let i=0;i<state.cardIndexes.length;i++){
                if(state.cardIndexes[i].idIndex === idColumn){
                    console.log(state.cardIndexes[i])
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
            axios.get(PATH + '/getCardIndexes')
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
            console.log("Удаление индексов каточек!")
            axios.delete(PATH + `/deleteCardIndexes/${idColumn}`)
                .then(function (response) {
                    if (response.statusText === "OK") {
                        commit('delCardIndexes', idColumn)
                    }
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
