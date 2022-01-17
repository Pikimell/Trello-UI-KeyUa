import {api} from "../../axios";
import {PATH} from "../consts";

const fileModule = {
    state: {
        files: []
    },
    mutations: {
        loadFiles(state, data){
            state.files = data;
        }
    },
    actions:{
        downloadFile({commit}, filename) {
            console.log(commit)
            api.post(`${PATH}/getFile`, {filename}).then(response => {
                let fileURL = response.data;
                let fileLink = document.createElement("a");
                fileLink.href = fileURL;

                const fileName = 'file.' + 'format';//TODO

                fileLink.setAttribute("download", fileName);
                document.body.appendChild(fileLink);

                fileLink.click();
                fileLink.remove();
            })
        },
        loadFiles: async({commit}) => {
            api.get(`${PATH}/getFiles`).then((response)=>{
                commit('loadFiles', response.data.Items);
            })
        }
    },
    getters: {

    }
}

export {
    fileModule
}
