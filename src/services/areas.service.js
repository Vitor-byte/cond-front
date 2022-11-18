import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const areasService = {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/areas"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async getOne(areaId){
        const enpoint = apiUrl + "/area/" + areaId
        return axios.get(enpoint)
    },
    async getHorarios(data){
        const enpoint = apiUrl + "/horarios"
        return axios.get(enpoint, data)
    },

    // Função para criar um novo post
    async create(data){
        const enpoint = apiUrl + "/area"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data, areaId){
        const enpoint = apiUrl + "/area/" + areaId
        return axios.patch(enpoint, data)
    },

    // Função para exluir um post específico
    async delete(avisoId){
        const enpoint = apiUrl + "/aviso/" + avisoId
        return axios.delete(enpoint)
    },


}

export default areasService;