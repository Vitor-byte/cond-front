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
    // Função para recuperar dados de um post específico
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
    // Função para criar um novo post
    async incluirChamado(data){
        const enpoint = apiUrl + "/chamado"
        return axios.post(enpoint, data)
    },
    async atenderChamado(data, chamadoId){
        const enpoint = apiUrl + "/chamado/" + chamadoId
        return axios.patch(enpoint, data)
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