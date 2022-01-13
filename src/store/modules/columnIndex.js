import {api} from "../../axios";
import {PATH} from "../consts";

const columnIndexModule = {
    state:{
        colIndexes: []
    },
    mutations:{
        loadColumnIndexes: (state, colIndex) => {
            state.colIndexes = colIndex;
        },
        indexingColumns: async(state, columns) => {
            let listIndex = [];
            columns.forEach(x=>listIndex.push(x.idColumn))
            state.colIndexes = listIndex
            api.put(PATH + `/updateIndexes/columns`,{
                colIndexes: JSON.stringify({
                    columns: listIndex
                })
            })
                .catch(function (error) {
                console.log(error);
            });
        },
        pushIndex: (state, idColumn) => {
            state.colIndexes.push(idColumn)
        },
        delIndexes: (state, idColumn) => {
            state.colIndexes = state.colIndexes.filter(x=> x !== idColumn)
        },
        refreshInDB: async(state) => {
            api.put(PATH + `/updateIndexes/columns`,{
                colIndexes: JSON.stringify({
                    columns: state.colIndexes
                })
            })
                .catch(function (error) {
                console.log(error);
            });
        }
    },
    actions:{
        loadColumnIndexes: async({commit}) => {
            api.get(PATH + '/getColIndexes')
                .then(function (response) {
                    commit('loadColumnIndexes', JSON.parse(response.data.Items[0].colIndexes).columns)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        indexingColumns: async({commit}, data) => {
            commit('indexingColumns',data)
        },
        pushIndex: async({commit}, idColumn) => {
            commit('pushIndex',idColumn)
            commit('refreshInDB',idColumn)
        },
        delIndexes: async({commit},idColumn) => {
            commit('delIndexes',idColumn)
            commit('refreshInDB',idColumn)
        }
    },
    getters:{
        INDEX_COL(state){
            return state.colIndexes;
        }
    }
}

export {
    columnIndexModule
}
