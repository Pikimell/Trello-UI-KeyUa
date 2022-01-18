import {api} from "../../axios";
import {PATH} from "../consts";

const fileModule = {
    state: {
        files: []
    },
    mutations: {
        loadFiles(state, data) {
            state.files = data;
        },
        uploadFile(state, data) {
            let file = {
                id_file: data.id_file,
                idCard: data.idCard
            }
            state.files.push(file)
        },
        deleteFile(state, id_file) {
            state.files = state.files.filter(x => x.id_file !== id_file)
        }
    },
    actions: {
        downloadFile(context, filename) {
            api.get(`${PATH}/getFile/${filename}`).then(response => {
                let fileURL = response.data.uploadURL;
                let fileLink = document.createElement("a");
                fileLink.href = fileURL;

                const fileName = 'file.' + 'format';//TODO

                fileLink.setAttribute("download", fileName);
                document.body.appendChild(fileLink);

                fileLink.click();
                fileLink.remove();
            }).catch(err => {
                console.log(err);
            })
        },
        uploadFile({commit}, data) {
            console.log(data.file);
            api.post(`${PATH}/pushFile`, {file: data.file, idCard: data.idCard, name:data.file.name,type:data.file.type})
                .then((response) => {
                    console.log(response)
                    commit('uploadFile', data)
                }).catch(err => {
                console.log(err);
            })

        },
        deleteFile({commit}, id_file) {
            //if ok TODO
            commit('deleteFile', id_file);
        },
        loadFiles: async ({commit}) => {
            api.get(`${PATH}/getFiles`).then((response) => {
                commit('loadFiles', response.data.Items);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    getters: {
        FILES: (state) => {
            return state.files;
        }
    }
}

export {
    fileModule
}
