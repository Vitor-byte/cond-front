import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import './chamados-detail.page.css';

class ChamadosDetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados 
            usuario: null,
            situacao:null,
            chamado: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            // Recuperando os id na url
            const chamadoId = this.props.match.params.id_chamado
            // Chamando a função que carrega os dados 
            console.log(chamadoId);
            this.getChamado(chamadoId)
    }

    // Função que carrega os dados do post e salva no state
    async getChamado(chamadoId) {
        
            let res = await chamadosService.getOne(chamadoId)
            console.log(res);
            this.setState({ chamado: res.data[0] })
            console.log(this.chamado);
        
    }

    async atenderChamado(chamadoId) {
        let data = {
            situacao : "Em andamento"
        }
    
            await chamadosService.edit(data, chamadoId)
            this.props.history.push('/chamados-edit/' + this.state.chamado.id_chamado)
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
                            <h4>Resolução</h4>
                            <p>{this.state.chamado?.resolucao}</p>
                        </div>
                    
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.atenderChamado(this.state.chamado.id_chamado)}>
                                Atender
                            </button>
                        
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default ChamadosDetailPage