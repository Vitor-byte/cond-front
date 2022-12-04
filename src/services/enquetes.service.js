import axios from 'axios';

const apiUrl = "https://condominio-back.herokuapp.com"

const enquetesService = {

    async list(){
        const enpoint = apiUrl + "/enquetes"
        return axios.get(enpoint)
    },

    async verificaVoto(data){
        const enpoint = apiUrl + "/enquete/verifica" 
        return axios.post(enpoint,data)
    },
    async consultarResultado(enqueteId){
        const enpoint = apiUrl + "/enquete/resultado/" + enqueteId
        return axios.get(enpoint)
    },
    async consultarEnquete(enqueteId){
        const enpoint = apiUrl + "/enquete/" + enqueteId
        return axios.get(enpoint)
    },
    async consultarOpcoes(enqueteId){
        const enpoint = apiUrl + "/enquete/opcoes/" + enqueteId
        return axios.get(enpoint)
    },
    async incluirEnquete(data){
        const enpoint = apiUrl + "/enquete"
        return axios.post(enpoint, data)
    },
    async votarEnquete(data){
        const enpoint = apiUrl + "/enquete/votar"
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

}

export default enquetesService;