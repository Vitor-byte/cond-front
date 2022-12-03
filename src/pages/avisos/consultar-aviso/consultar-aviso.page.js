import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';

class ConsultarAviso extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados do post
            aviso: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            // Recuperando os id do post na url
            const avisoId = this.props.match.params.id_aviso
            // Chamando a função que carrega os dados do post
            console.log(avisoId);
            this.getAviso(avisoId)
    }

    // Função que carrega os dados do post e salva no state
    async getAviso(avisoId) {
        
            let res = await avisosService.getOne(avisoId)
            console.log(res);
            this.setState({ aviso: res.data[0] })
            console.log(this.aviso);
        
    }

    // Função que exclui o post, chamada ao clicar no botão "Excluir"
    async deletePost(avisoId) {
        
        if (!window.confirm("Deseja realmente excluir este aviso?")) return;

        try {
            await avisosService.delete(avisoId)
            alert("Aviso excluído com sucesso")
            this.props.history.replace('/avisos-list')
        } catch (error) {
            console.log(error);
            alert("Não foi excluir o aviso.")
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

                <PageTop title={"Aviso"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.aviso?.id_aviso}</p>
                        </div>
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.aviso?.data_emissao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.aviso?.titulo}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.aviso?.descricao}</p>
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }

}

export default ConsultarAviso