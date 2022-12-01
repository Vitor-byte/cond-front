import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class ConsultarArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            horario: false,
            // Atributo para armazenar os dados do post
            areas: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            // Recuperando os id do post na url
            const areaId = this.props.match.params.id_area_comum
            // Chamando a função que carrega os dados do post
            console.log(areaId);
            this.getArea(areaId)
    }

    // Função que carrega os dados do post e salva no state
    async getArea(areasId) {
        
            let res = await areasService.getOne(areasId)
            console.log(res);
            this.setState({ areas: res.data[0] })
            console.log(this.areas);
        
    }

    // Função que exclui o post, chamada ao clicar no botão "Excluir"
    async deletePost(areasId) {
        
        if (!window.confirm("Deseja realmente excluir este aviso?")) return;

        try {
            await areasService.delete(areasId)
            alert("Aviso excluído com sucesso")
            this.props.history.replace('/areas-list')
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

                <PageTop title={"Areas"} desc={"cadastro de area"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.areas?.id_area_comum}</p>
                        </div>
                        <div className="post-info">
                            <h4>Nome</h4>
                            <p>{this.state.areas?.nome}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.areas?.descricao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Preço</h4>
                            <p>{this.state.areas?.preco}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.areas?.situacao}</p>
                        </div>
                        
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.history.push('/reservar-area/' + this.state.areas.id_area_comum)}>
                                Reservar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default ConsultarArea