import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';
import { Table } from 'semantic-ui-react'

class AvisosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            avisos: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            this.getAvisos()
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    async getAvisos() {
        try {
            let res = await avisosService.list()
            console.log(res);
            this.setState({ avisos: res.data})
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

                <PageTop title={"Avisos"} >
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-aviso')}>
                        Novo aviso
                    </button>
                </PageTop>
                
                <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Descrição</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                </Table></>
              {this.state.avisos.map(avisos => (
                    <><Table fixed>  
                        <Table.Body>
                            <Table.Row>
                            <Link to={"/alterar-aviso/" + avisos.id_aviso} key={avisos.id_aviso}>

                                <Table.Cell>{avisos.id_aviso}</Table.Cell>
                                </Link>
                                <Table.Cell>{avisos.titulo}</Table.Cell>
                                <Table.Cell>{avisos.descricao}</Table.Cell>
                                <Table.Cell>{avisos.data_emissao}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table></>
                               
                     
                ))}
              
            </div>
        )
    }

}

export default AvisosListPage;