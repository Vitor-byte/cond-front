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
            condominos: [],
            redirectTo: null
        }
    }

    componentDidMount() {
      
        let userData = authService.getLoggedUser();
        console.log(userData)
        if(userData && userData[0].tipo === 'Sindico'){
            this.getCondominos()
        }else{
            this.setState({ redirectTo: "/login"})                                        
        }
    
    }
    async getCondominos() {
        try {
            let res = await condominosService.list()
            console.log(res);
            this.setState({ condominos: res.data})
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/error"})                                        
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

                <PageTop title={"Condôminos"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-condomino')}>
                        Novo condômino
                    </button>
                </PageTop>
                
                <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Inadimplenete</Table.HeaderCell>

                            </Table.Row>
                </Table.Header>
                </Table>
              
            
                {this.state.condominos.map(condominos => (
                    <>
                    <Table fixed>

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