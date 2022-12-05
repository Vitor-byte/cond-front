import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import { Table } from 'semantic-ui-react'

class CondChamadosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array da API.
            aberto: true,
            emAndamento:false,
            finalizado:false,
            chamados: [],
            usuario: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.consultarChamados(userData[0].id_usuario)
        }else{
            
            this.props.history.replace('/')

            
        }


    }

    async consultarChamados(id_usuario) {
        this.setState({aberto: true, emAndamento:false, finalizado:false})
        try {
            console.log("TESTE");

            let res = await chamadosService.consultarChamadoUsuario(id_usuario)
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

                <PageTop title={"Meus chamados"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-chamado')}>
                        Novo chamado
                    </button>
                </PageTop>
                
                   
                    
                <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                </Table></>
              {this.state.chamados.map(chamados => (
                    <><Table fixed>  
                        <Table.Body>
                            <Table.Row>
                            <Link to={"/cond-consultar-chamado/" + chamados.id_chamado} key={chamados.id_chamado}>

                                <Table.Cell>{chamados.id_chamado}</Table.Cell>
                                </Link>
                                <Table.Cell>{chamados.titulo}</Table.Cell>
                                <Table.Cell>{chamados.situacao}</Table.Cell>
                                <Table.Cell>{chamados.data_emissao}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table></>
                               
                     
                ))}
             </div>
           
        )
    }

}

export default CondChamadosListPage;