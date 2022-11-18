import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import './post-list.page.css';

class ChamadosUsuarioListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            chamados: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.getChamados()

    }

    // Função responsável por chamar o serviço e carregar os posts.
    async getChamados() {
        try {
            let res = await chamadosService.list()
            console.log(res);
            this.setState({ chamados: res.data})
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os condômino.")
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

                <PageTop title={"Chamados"} desc={"Listagem dos chamados"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/chamado-add')}>
                        Adicionar
                    </button>
                </PageTop>


                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados.map(chamados => (
                    <Link to={"/chamado-detail/" + chamados.id_chamado} key={chamados.id_chamado}>
                        <div className="post-card">
                           
                            <div className="post-card__text">
                                <h4>{chamados.id_chamado}</h4>
                                <p>{chamados.titulo}</p>
                                <p>{chamados.descricao}</p>
                                <p>{chamados.situacao}</p>
                                <p>{chamados.data_previsao}</p>
                                <p>{chamados.data_emissao}</p>


                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }

}

export default ChamadosUsuarioListPage;