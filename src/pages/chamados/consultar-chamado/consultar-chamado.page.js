import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';

class ConsultarChamado extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            chamado: '',
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            const chamadoId = this.props.match.params.id_chamado
            console.log(chamadoId);
            this.consultarChamado(chamadoId)
    }

    async consultarChamado(chamadoId) {
        
            let res = await chamadosService.consultarChamadoResposta(chamadoId)
            console.log(res);
            this.setState({ chamado: res.data[0] })
            console.log(this.chamado);
        
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
                    
                       
                    </div>

                </div>
            </div>
        )
    }

}

export default ConsultarChamado