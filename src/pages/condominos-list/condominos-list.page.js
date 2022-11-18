import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import condominosService from '../../services/condominos.service';
import './condominos-list.page.css';

class CondominosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            condominos: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.getCondominos()

    }

    // Função responsável por chamar o serviço e carregar os posts.
    async getCondominos() {
        try {
            let res = await condominosService.list()
            console.log(res);
            this.setState({ condominos: res.data})
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

                <PageTop title={"Condominos"} desc={"Listagem dos condominos"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/condominos-add')}>
                        Adicionar
                    </button>
                </PageTop>
                <table className='styled-table'>
                <thead>
                               <tr>
                                <th>Id</th>
                                <th>Rg</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Inadimplente</th>
                                <th>Situação</th>
                                <th>Bloco</th>
                                <th>Unidade</th>
                                </tr>
                                </thead>
                                </table>

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.condominos.map(condominos => (
                    
                <div >
                
                    <table  className="styled-table" >
                          
            
                        <tr className='styled-table thead'>
                        <Link to={"/condominos-detail/" + condominos.id_usuario} key={condominos.id_usuario}>
                        <td>{condominos.id_usuario}</td>
                        </Link>
                               
                        <td>{condominos.rg}</td>
                        <td>{condominos.nome}</td>
                        <td>{condominos.email}</td>
                        <td>{condominos.inadimplente}</td>
                        <td>{condominos.situacao}</td>
                        <td>{condominos.bloco}</td>
                        <td>{condominos.unidade}</td>
                        </tr>
                    </table>
                               
                    </div>
                     
                ))}

            </div>
        )
    }
}
   
export default CondominosListPage;