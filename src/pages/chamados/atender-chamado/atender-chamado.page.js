import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class AtenderChamado extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados 
            usuario: null,
            resposta:[],
            novaResposta:'',
            situacao:'',
            aberto: false,
            andamento:false,
            chamado: '',
            showIniciar:false,
            showFinalizar:false,
            showCancelar:false,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_chamado){
                let chamadoId = this.props.match.params.id_chamado
                this.consultarChamado(chamadoId)
            }  
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }
   
    // Função que carrega os dados do post e salva no state
    async consultarChamado(chamadoId) {
        try{
            let res = await chamadosService.consultarChamado(chamadoId)
            this.setState({ chamado: res.data[0] })
            console.log(res)

            let res2 = await chamadosService.consultarChamadoResposta(chamadoId)
            this.setState({ resposta: res2.data[0] })
            console.log(res2)
            if(this.state.chamado?.situacao ==="Em andamento"){
                this.setState({ andamento: true })
            }else{
                this.setState({ aberto: true })
                
            }
        }catch(error){
            this.setState({ redirectTo: "/error"})                                        
        } 
        
    }
    async validaIniciar() {
        if(this.state.novaResposta === ''){
            this.novaResposta.focus()        
            return
        }
        this.setState({ showIniciar: true })

    }
    async validaCancelar() {
        if(this.state.novaResposta === ''){
            this.novaResposta.focus()        
            return
        }
        this.setState({ showCancelar: true })

    }
    async validaFinalizar() {
        if(this.state.novaResposta === ''){
            this.novaResposta.focus()        
            return
        }
        this.setState({ showFinalizar: true })

    }
    async atenderChamado(chamadoId) {
        
        let data = {
            situacao : "Em andamento",
            tipo:this.state.tipo,
            resposta: this.state.novaResposta
        }

        if(!data.resposta || data.resposta === ''){
            this.novaResposta.focus()        
            return;
        }
        try{
        await chamadosService.atenderChamado(data, chamadoId)
        this.props.history.push('/chamados-list')
        }catch(error){
            this.setState({ redirectTo: "/error"})                                        
        }
    }

    async cancelarChamado(chamadoId) {
        let data = {
            situacao : "Cancelado",
            tipo:this.state.tipo,
            resposta: this.state.novaResposta
        }
        if(!data.resposta || data.resposta === ''){
            this.novaResposta.focus()        
            return;
        }
        try{
        await chamadosService.atenderChamado(data, chamadoId)
        this.props.history.push('/chamados-list')
        }catch(error){
            this.setState({ redirectTo: "/error"})                                        
        }

    }
    async finalizarChamado(chamadoId) {
        let data = {
            situacao : "Finalizado",
            resposta: this.state.novaResposta
        }
        if(!data.resposta || data.resposta === ''){
            this.novaResposta.focus()        
            return;
        }
        try{
        await chamadosService.atenderChamado(data, chamadoId)
        this.props.history.push('/chamados-list')
        }catch(error){
            this.setState({ redirectTo: "/error"})                                        
        }
    }
    render() {

        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title={"Chamado"} >  
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.chamado?.id_chamado}</p>
                        </div>
                        <div className="post-info">
                            <h4>Condômino</h4>
                            <p>{this.state.chamado?.nome}</p>
                        </div>
                        <div className="post-info">
                            <h4>Data emissão</h4>
                            <p>{this.state.chamado?.data_emissao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.chamado?.titulo}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.chamado?.descricao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.chamado?.situacao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Tipo</h4>
                            <p>{this.state.chamado?.tipo}</p>
                        </div>
                        {this.state.andamento && <div className="post-info">
                            <h4>Resposta</h4>
                            <p>{this.state.resposta?.resposta}</p>
                        </div>}
                        {this.state.finalizado && <div className="post-info">
                            <h4>Resposta</h4>
                            <p>{this.state.resposta?.resposta}</p>
                        </div>}
                    

                        <div className="post-info">
    
                        <label  htmlFor="title">Resposta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            
                            ref={(input) => { this.novaResposta = input }}
                            onChange={e => this.setState({ novaResposta: e.target.value })} />
                        </div>
                  
                    
                        {this.state.aberto && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validaCancelar()}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validaIniciar()}
                                >
                                Iniciar
                            </button>
                        
                        </div>}
                        <>

                        <Modal
                            show={this.state.showIniciar}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja iniciar o atendimento?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ showIniciar: false })}>
                                Fechar
                            </Button>
                            <Button variant="primary"  onClick={() => this.atenderChamado(this.state.chamado.id_chamado)}>Iniciar</Button>
                            </Modal.Footer>
                        </Modal>
                        </>

                        {this.state.andamento && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validaCancelar()}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validaFinalizar()}>
                                Finalizar
                            </button>
                        </div>}
                        <>
                        <Modal
                            show={this.state.showFinalizar}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja finalizar o atendimento?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ showFinalizar: false })}>
                                Fechar
                            </Button>
                            <Button variant="primary"  onClick={() => this.finalizarChamado(this.state.chamado.id_chamado)}>Finalizar</Button>
                            </Modal.Footer>
                        </Modal>
                        </>
                        <>
                        <Modal
                            show={this.state.showCancelar}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja cancelar o atendimento?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ showCancelar: false })}>
                                Fechar
                            </Button>
                            <Button variant="primary"  onClick={() => this.cancelarChamado(this.state.chamado.id_chamado)}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>
                        </>

                    </div>

                </div>
            </div>
        )
    }

}

export default AtenderChamado