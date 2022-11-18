import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import condominosService from '../../services/condominos.service';
import './condominos-detail.page.css';

class CondominosDetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            condomino: null,
            redirectTo: null
        }
    }

    componentDidMount() {
        
            // Recuperando os id na url
            const condominoId = this.props.match.params.id_usuario
            // Chamando a função que carrega os dados 
            this.getCondomino(condominoId)
      
    }

    // Função que carrega os dados e salva no state
    async getCondomino(condominoId) {
        
            let res = await condominosService.getOne(condominoId)
            console.log(res);
            this.setState({ condomino: res.data[0] })
        
    }

    // Função que exclui o post, chamada ao clicar no botão "Excluir"
    async excluirCondomino(condominoId) {
        
        try {
            await condominosService.delete(condominoId)
            alert("Condomino excluído com sucesso")
            this.props.history.replace('/condominos-list')
        } catch (error) {
            console.log(error);
            alert("Não foi possivel excluir.")
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

                <PageTop title={"Condômino"} desc={"Cadastro do Condômino"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.condomino?.id_usuario}</p>
                        </div>
                        <div className="post-info">
                            <h4>Rg</h4>
                            <p>{this.state.condomino?.rg}</p>
                        </div>
                        <div className="post-info">
                            <h4>Nome</h4>
                            <p>{this.state.condomino?.nome}</p>
                        </div>
                        <div className="post-info">
                            <h4>Email</h4>
                            <p>{this.state.condomino?.email}</p>
                        </div>
                        <div className="post-info">
                            <h4>Inadimplenete</h4>
                            <p>{this.state.condomino?.inadimplente}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.condomino?.situacao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Bloco</h4>
                            <p>{this.state.condomino?.bloco}</p>
                        </div>
                        <div className="post-info">
                            <h4>Unidade</h4>
                            <p>{this.state.condomino?.unidade}</p>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.excluirCondomino(this.state.condomino.id_usuario)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.history.push('/condominos-edit/' + this.state.condomino.id_usuario)}>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default CondominosDetailPage