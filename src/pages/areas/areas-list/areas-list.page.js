import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import './areas-list.page.css';
import { Table } from 'semantic-ui-react'

class AreasListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            areas: [],
            redirectTo: null
        }
    }
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            this.getAreas()    
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async getAreas() {
        try {
            let res = await areasService.list()
            console.log(res);
            this.setState({ areas: res.data})
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

                <PageTop title={"Áreas"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-area')}>
                        Nova área
                    </button>
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
                            <Link to={"/alterar-area/" + areas.id_area_comum} key={areas.id_area_comum}>

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

export default AreasListPage;