import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const enquetesService = {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/enquetes"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async consultarEnquete(avisoId){
        const enpoint = apiUrl + "/enquete/" + avisoId
        return axios.get(enpoint)
    },
    async consultarOpcoes(avisoId){
        const enpoint = apiUrl + "/enquete/" + avisoId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async incluirEnquete(data){
        const enpoint = apiUrl + "/enquete"
        return axios.post(enpoint, data)
    },
    async cancelarEnquete(enqueteId){
        const enpoint = apiUrl + "/enquete/cancelar/" + enqueteId
        return axios.patch(enpoint)
    },
    async finalizarEnquete(enqueteId){
        const enpoint = apiUrl + "/enquete/finalizar/" + enqueteId
        return axios.patch(enpoint)
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

export default enquetesService;