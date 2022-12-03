import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'
import condominosService from '../../../services/condominos.service';
import authService from '../../../services/auth.service';

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
      
        let userData = authService.getLoggedUser();
        console.log(userData)
        if(!userData){
            this.setState({redirectTo : "/login"})
        
        }else{
            this.getCondominos()
        }
    
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
                    <button className="button" onClick={() => this.props.history.push('/incluir-condomino')}>
                        Novo Condômino
                    </button>
                </PageTop>
                

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {
                
                
                
                this.state.condominos.map(condominos => (
                    <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Inadimplenete</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                            <Link to={"/alterar-condomino/" + condominos.id_usuario} key={condominos.id_usuario}>

                                <Table.Cell>{condominos.id_usuario}</Table.Cell>
                                </Link>
                                <Table.Cell>{condominos.nome}</Table.Cell>
                                <Table.Cell>{condominos.situacao}</Table.Cell>
                                <Table.Cell>{condominos.inadimplente}</Table.Cell>
                            </Table.Row>


                        </Table.Body>
                    </Table></>
                               
                     
                ))}
            </div>
            
        )
    }
}
   
export default CondominosListPage;