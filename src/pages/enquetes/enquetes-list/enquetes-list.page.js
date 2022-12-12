import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';
import { Table } from 'semantic-ui-react'

class EnquetesListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            enquetes: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            this.consultarEnquetes()
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    // Função responsável por chamar o serviço e carregar os posts.
    async consultarEnquetes() {
        try {
            let res = await enquetesService.list()
            console.log(res);
            this.setState({ enquetes: res.data})
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/erro"})                                        
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

                <PageTop title={"Enquetes"} desc={""}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-enquete')}>
                        Nova enquete
                    </button>
                </PageTop>        
            <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                </Table></>
              {this.state.enquetes.map(enquetes => (
                    <><Table fixed>  
                        <Table.Body>
                            <Table.Row>
                            <Link to={"/alterar-enquete/" + enquetes.id_enquete} key={enquetes.id_enquete}>

                                <Table.Cell>{enquetes.id_enquete}</Table.Cell>
                                </Link>
                                <Table.Cell>{enquetes.titulo}</Table.Cell>
                                <Table.Cell>{enquetes.situacao}</Table.Cell>
                                <Table.Cell>{enquetes.data_emissao}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table></>
                               
                     
                ))}
            </div>
        )
    }

}

export default EnquetesListPage;