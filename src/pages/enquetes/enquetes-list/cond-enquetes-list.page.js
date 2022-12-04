import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';
import { Table } from 'semantic-ui-react'

class CondEnquetesListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            enquetes: [],
            header:true,
            redirectTo: null
        }
    }

    componentDidMount() {
        
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.consultarEnquetes()  
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    async consultarEnquetes() {
        try {
            let res = await enquetesService.list()
            console.log(res);
            this.setState({ enquetes: res.data})
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

                <PageTop title={"Enquetes"} >
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
                            <Link to={"/votar-enquete/" + enquetes.id_enquete} key={enquetes.id_enquete}>

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

export default CondEnquetesListPage;