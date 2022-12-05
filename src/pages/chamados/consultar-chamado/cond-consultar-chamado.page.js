import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';

class CondConsultarChamado extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            chamado: '',
            resposta:[],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        let userData = authService.getLoggedUser();
        console.log(userData )
        if( userData && userData[0].tipo === 'Condomino'){
            if(this.props?.match?.params?.id_chamado){
                let chamadoId = this.props.match.params.id_chamado
                this.consultarChamado(chamadoId)
            }
        }else{
            this.props.history.replace('/erro')
        }
    
            const chamadoId = this.props.match.params.id_chamado
            console.log(chamadoId);
            this.consultarChamado(chamadoId)
    }

    async consultarChamado(chamadoId) {
            let res = await chamadosService.consultarChamado(chamadoId)
            let res2 = await chamadosService.consultarChamadoResposta(chamadoId)
            console.log(res2);
            this.setState({ chamado: res.data[0] })
            this.setState({ resposta: res2.data })
         

        
    }
    render() {

        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title={"Chamado"}>
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
                            <h4>Resposta</h4>
                            <p>{this.state.resposta.map(respostas => (
               
                            <p>{respostas.resposta}</p>
                    
           
                
                             ))}
                            </p>
                        </div>
                    
                       
                    </div>

                </div>
            </div>
        )
    }

}

export default CondConsultarChamado