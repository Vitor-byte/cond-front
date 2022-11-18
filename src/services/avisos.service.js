import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const avisosService = {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/avisos"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async getOne(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async create(data){
        const enpoint = apiUrl + "/aviso"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data, condominoId){
        const enpoint = apiUrl + "/aviso/" + condominoId
        return axios.patch(enpoint, data)
    },

    // Função para exluir um post específico
    async delete(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.delete(enpoint)
    },


}

export default avisosService;