import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import './areas-list.page.css';
import { Table } from 'semantic-ui-react'

class CondAreasList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            areas: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.getAreas()  
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    async getAreas() {
        try {
            let res = await areasService.list()
            console.log(res);
            this.setState({ areas: res.data})
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar.")
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

                <PageTop title={"Áreas"}>
                   
                </PageTop>

                <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Preço</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                </Table></>
              {this.state.areas.map(areas => (
                    <><Table fixed>  
                        <Table.Body>
                            <Table.Row>
                            <Link to={"/consultar-area/" + areas.id_area_comum} key={areas.id_area_comum}>

                                <Table.Cell>{areas.id_area_comum}</Table.Cell>
                                </Link>
                                <Table.Cell>{areas.nome}</Table.Cell>
                                <Table.Cell>{areas.situacao}</Table.Cell>
                                <Table.Cell>{areas.preco}</Table.Cell>

                            </Table.Row>
                        </Table.Body>
                    </Table></>
                               
                     
                ))}
            </div>
        )
    }

}

export default CondAreasList;