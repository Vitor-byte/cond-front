import axios from 'axios';

const apiUrl = "https://condominio-back.herokuapp.com"

const condominosService = {

    async list(){
        const enpoint = apiUrl + "/condominos"
        return axios.get(enpoint)
    },

    async getOne(condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.get(enpoint)
    },

    async create(data){
        const enpoint = apiUrl + "/condomino"
        return axios.post(enpoint, data)
    },

    async edit(data, condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.patch(enpoint, data)
    },

    async excluir(condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.delete(enpoint)
    },


}

export default condominosService;