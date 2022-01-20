import {api} from "../../axios";
import axios from 'axios'
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

                const fileName = `${filename}`.substring(13);

                fileLink.setAttribute("download", fileName);
                document.body.appendChild(fileLink);

                fileLink.click();
                fileLink.remove();
            }).catch(err => {
                console.log(err);
            })
        },
        async uploadFile({commit}, data) {
            let file = {
                name: `${Date.now()}${data.id_file}`,
                type: data.file.type,
                idCard: data.idCard,
            }
            let params = {file};
            data.id_file = file.name;

            api.post(`${PATH}/getUploadUrl`, params)
                .then(response => {
                    let uploadUrl = response.data.url;
                    axios.put(uploadUrl, data.file)
                        .then(() => {
                            api.post(`${PATH}/pushFile`, {
                                id_file: file.name,
                                idCard: data.idCard
                            }).then(() => {
                                commit('uploadFile', data)
                                return 'ok';
                            })
                        }).catch(err => {
                        console.log(err);
                        return 'err';
                    });
                }).catch(err => {
                console.log(err);
                return 'err';
            })

        },
        deleteFile({commit}, id_file) {
            api.delete(PATH + `/deleteFile/${id_file}`).then(() => {
                commit('deleteFile', id_file);
            })
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
