import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const condominosService = {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/condominos"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async getOne(condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async create(data){
        const enpoint = apiUrl + "/condomino"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data, condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.patch(enpoint, data)
    },

    // Função para exluir um post específico
    async delete(condominoId){
        const enpoint = apiUrl + "/condomino/" + condominoId
        return axios.delete(enpoint)
    },


}

export default condominosService;