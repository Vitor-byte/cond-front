import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
class AtenderChamado extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados 
            usuario: null,
            resposta:'',
            situacao:'',
            nsituacao:'',
            aberto: false,
            andamento:false,
            chamado: '',
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            // Recuperando os id na url
            const chamadoId = this.props.match.params.id_chamado
            // Chamando a função que carrega os dados 
            console.log(chamadoId);
            this.consultarChamado(chamadoId)
    }

    // Função que carrega os dados do post e salva no state
    async consultarChamado(chamadoId) {
        
            let res = await chamadosService.consultarChamado(chamadoId)
            this.setState({ chamado: res.data[0] })
            let res2 = await chamadosService.consultarChamadoResposta(chamadoId)
            this.setState({ resposta: res.data[0] })
            console.log(res2)
            if(this.state.chamado.situacao ==="Em andamento"){
                this.setState({ andamento: true })
            }else{
                this.setState({ aberto: true })
                
            }
            
        
    }

    async atenderChamado(chamadoId) {
        let data = {
            situacao : "Em andamento",
            resp: this.state.resp
        }
    
            await chamadosService.edit(data, chamadoId)
            this.props.history.push('/chamados-list')
    }
    async finalizarChamado(chamadoId) {
        let data = {
            situacao : "Finalizado",
            resposta: this.state.chamado.resposta
        }
        await chamadosService.edit(data, chamadoId)
        this.props.history.push('/chamados-list')
    }
    render() {

        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title={"Chamado"} desc={"Cadastro do chamado"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Cancelar
                    </button>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.chamado?.id_chamado}</p>
                        </div>
                        <div className="post-info">
                            <h4>Titulo</h4>
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
                            <h4>Resposta</h4>
                            <p>{this.state.chamado?.resposta}</p>
                        </div>
                        <div className="form-group">

                            
                        <label htmlFor="title">Resposta</label>
                        
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            
                            ref={(input) => { this.nresposta = input }}
                            onChange={e => this.setState({ nresposta: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    
                        {this.state.aberto && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.atenderChamado(this.state.chamado.id_chamado)}>
                                Atender
                            </button>
                        
                        </div>}
                        {this.state.andamento && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.atenderChamado(this.state.chamado.id_chamado)}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.finalizarChamado(this.state.chamado.id_chamado)}>
                                Finalizar
                            </button>
                        </div>}
                    </div>

                </div>
            </div>
        )
    }

}

export default AtenderChamado