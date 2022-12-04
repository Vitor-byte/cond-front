import axios from 'axios';

const apiUrl = "https://condominio-back.herokuapp.com"

const avisosService = {

    async list(){
        const enpoint = apiUrl + "/avisos"
        return axios.get(enpoint)
    },

    async getOne(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.get(enpoint)
    },

    async incluirAviso(data){
        const enpoint = apiUrl + "/aviso"
        return axios.post(enpoint, data)
    },

    async alterarAviso(data, condominoId){
        const enpoint = apiUrl + "/aviso/" + condominoId
        return axios.patch(enpoint, data)
    },

    async excluirAviso(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.delete(enpoint)
    },


}

export default avisosService;