import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const avisosService = {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/chamados"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async getOne(chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async create(data){
        const enpoint = apiUrl + "/chamado"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data, chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.patch(enpoint, data)
    },
    async cancelar(data, chamadoId){
        const enpoint = apiUrl + "/chamado/cancelar/" + chamadoId
        return axios.patch(enpoint, data)
    },
    async finalizar(data, chamadoId){
        const enpoint = apiUrl + "/chamado/finalizar/" + chamadoId
        return axios.patch(enpoint, data)
    },
    // Função para exluir um post específico
    async delete(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.delete(enpoint)
    },


}

export default avisosService;