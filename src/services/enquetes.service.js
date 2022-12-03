import axios from 'axios';

const apiUrl = "https://condominio-back.herokuapp.com"

const enquetesService = {

    async list(){
        const enpoint = apiUrl + "/enquetes"
        return axios.get(enpoint)
    },
    async consultarEnquete(avisoId){
        const enpoint = apiUrl + "/enquete/" + avisoId
        return axios.get(enpoint)
    },
    async consultarOpcoes(avisoId){
        const enpoint = apiUrl + "/enquete/" + avisoId
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

    async edit(data, condominoId){
        const enpoint = apiUrl + "/aviso/" + condominoId
        return axios.patch(enpoint, data)
    },
    async delete(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.delete(enpoint)
    },


}

export default enquetesService;