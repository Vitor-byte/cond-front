import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "https://condominio-back.herokuapp.com"

const avisosService = {

    // Função para listar os posts 
    async consultarAbertos(){
        const enpoint = apiUrl + "/chamados/abertos"
        return axios.get(enpoint)
    },
    async consultarAbertos(){
        const enpoint = apiUrl + "/chamados/abertos"
        return axios.get(enpoint)
    },
    async consultarEmAndamento(){
        const enpoint = apiUrl + "/chamados/andamento"
        return axios.get(enpoint)
    },
    async consultarFinalizados(){
        const enpoint = apiUrl + "/chamados/finalizados"
        return axios.get(enpoint)
    },
    async consultarChamado(chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.get(enpoint)
    },
    async consultarChamadoUsuario(chamadoId){
        const enpoint = apiUrl + "/chamado/usuario/" + chamadoId
        return axios.get(enpoint)
    },
    async consultarChamadoResposta(chamadoId){
        const enpoint = apiUrl + "/chamado/resposta/" + chamadoId
        return axios.get(enpoint)
    },
    async incluirChamado(data){
        const enpoint = apiUrl + "/chamado"
        return axios.post(enpoint, data)
    },
    async atenderChamado(data, chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.patch(enpoint, data)
    },
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
    async excluir(chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.delete(enpoint)
    },


}

export default avisosService;