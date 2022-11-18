import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import './chamados-list.page.css';

class ChamadosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array da API.
            chamados: [],
            usuario: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.getChamados()

    }

    // Função responsável por chamar o serviço e carregar .
    async getChamados() {
        try {
            let res = await chamadosService.list()
            console.log(res);
            this.setState({ chamados: res.data})
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os chamados.")
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
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/chamados-add')}>
                        Novo
                    </button>
                </PageTop>
                <table className='styled-table'>
                <thead>
                               <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Situação</th>
                                <th>Data de emissão</th>
                                <th>Data de previsão</th>
                                </tr>
                                </thead>
                                </table>

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados.map(chamados => (
                <div >
                
                <table  className="styled-table" >
                    <tr className='styled-table thead'>
                    <Link to={"/chamados-detail/" + chamados.id_chamado} key={chamados.id_chamado}>
                    <td>{chamados.id_chamado}</td>
                    </Link>
                           
                    <td>{chamados.titulo}</td>
                    <td>{chamados.situacao}</td>
                    <td>{chamados.data_emissao}</td>
                    <td>{chamados.data_previsoa}</td>
                    </tr>
                </table>
                           
                </div>
                 
                ))}

            </div>
        )
    }

}

export default ChamadosListPage;