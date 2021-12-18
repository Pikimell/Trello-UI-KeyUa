import axios from "axios";
const PATH = "http://localhost:3000";
const columnModule = {
    state:{
        cols: []
    },
    mutations:{
        loadColumns: (state, columns) => {
            state.cols = columns;
        },
        pushColumn: (state, column) => {
            state.cols.push(column);
        },
        delColumn: (state, idColumn) => {
            state.cols = state.cols.filter(x=> x.idColumn !== idColumn)
        },
        editTitleCol: (state, {idColumn, title}) => {
            for (let i = 0; i < state.cols.length; i++) {//TODO
                if (state.cols[i].idColumn === idColumn) {
                    state.cols[i].title = title;
                    break;
                }
            }
        },
        sortListColumn: (state, index) => {
            let sortList = [];
            let listCol = state.cols;
                index.forEach(idCol=>{
                    let col = listCol.filter(col => col.idColumn === idCol)[0]
                    sortList.push(col)
                })
            state.cols = sortList
        }
    },
    actions:{
        loadColumns: ({commit}) => {
            console.log("\n\n\n---------loadColumns----------\n\n\n");
            axios.get(PATH + '/getColumns')
                .then(function (response) {
                    console.log("Загрузились Колоночки!")
                    let cols = response.data.Items
                    //BAD PRACTICE
                    axios.get(PATH + '/getColIndexes')
                        .then(function (response) {
                            commit('loadColumns', cols)
                            commit('sortListColumn', JSON.parse(response.data.Items[0].colIndexes).columns)
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                    //BAD PRACTICE
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        pushColumn: ({commit}, column) => {
            console.log("------------PUSH COLUMN------------")

            axios.post(PATH + '/pushColumn', {
                idColumn: column.idColumn,
                title: column.title
            }).then(function (response) {
                if (response.statusText === "OK"){
                    commit('pushColumn', column);
                }
            }).catch(function (error) {
                console.log(error);
            });

            //let index = getters.INDEX_COL.length+1;
            //commit('pushIndex', {index: index,idColumn: column.idColumn});

            /*
            axios.put(PATH + `/updateIndexes/columns`,{
                colIndexes: JSON.stringify({
                    columns: getters.INDEX_COL
                })
            }).catch(function (error) {
                console.log(error);
            });*/
            console.log("----------END PUSH COLUMN----------")
        },
        delColumn: ({commit}, idColumn) => {
            console.log("\n\n\n---------delColumn----------\n\n\n");
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
        editTitleCol: ({commit}, props) => {
            console.log("\n\n\n---------editTitleCol----------\n\n\n");
            axios.put(PATH + `/updateColumn/${props.idColumn}`,{
                title: props.title,
            }).then(function (response) {
                if (response.statusText === "OK")
                    commit('editTitleCol', props)
            }).catch(function (error) {
                console.log(error);
            });
        },
        sortListColumn: ({commit}, index)=> {
            commit('sortListColumn',index)
        }
    },
    getters:{
        COLUMNS(state) {
            return state.cols
        }
    }
}

export {
    columnModule
}