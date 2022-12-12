import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import { Table } from 'semantic-ui-react'
import './chamados-list.page.css';

class ChamadosListPage extends React.Component {

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
        if(userData && userData[0].tipo === 'Sindico'){
            this.chamadoAbertos()
        }else{  
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async chamadoAbertos() {
        this.setState({aberto: true, emAndamento:false, finalizado:false})
        try {
            
            let res = await chamadosService.consultarAbertos()
            console.log(res);
            this.setState({ chamados: res.data})
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/error"})                                        
        }
    }
    async chamadoEmAndamento() {
        this.setState({aberto: false, emAndamento:true, finalizado:false})
        try {
            let res = await chamadosService.consultarEmAndamento()
            console.log(res);
            this.setState({ chamados: res.data})
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/error"})                                        
        }
    }
    async chamadosFinalizados() {
        this.setState({aberto: false, emAndamento:false, finalizado:true})

        try {

            let res = await chamadosService.consultarFinalizados()
            console.log(res);
            this.setState({ chamados: res.data})
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

                <PageTop title={"Chamados"}>
                </PageTop>
                <button className="btn-chamado" onClick={() => this.chamadoAbertos()}>
                        Aberto
                </button>
                <button className="btn-chamado" onClick={() => this.chamadoEmAndamento()}>
                        Em andamento
                </button>
                <button className="btn-chamado" onClick={() => this.chamadosFinalizados()}>
                        Finalizado
                </button> 
                
                {(this.state.aberto &&
                    <div>
                       <Table fixed >
                        <Table.Header >
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        </Table>
                       
                       

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados.map(chamados => (
                    <Table fixed>  
                    <Table.Body>
                        <Table.Row>
                        <Link to={"/atender-chamado/" + chamados.id_chamado} key={chamados.id_chamado}>

                            <Table.Cell>{chamados.id_chamado}</Table.Cell>
                            </Link>
                            <Table.Cell>{chamados.titulo}</Table.Cell>
                            <Table.Cell>{chamados.situacao}</Table.Cell>
                            <Table.Cell>{chamados.data_emissao}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            
                 
                ))}
                    </div>
                )}    
                {(this.state.emAndamento &&
                    <div>
                       <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        </Table>
                       
                       

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados.map(chamados => (
                    <Table fixed>  
                    <Table.Body>
                        <Table.Row>
                        <Link to={"/atender-chamado/" + chamados.id_chamado} key={chamados.id_chamado}>

                            <Table.Cell>{chamados.id_chamado}</Table.Cell>
                            </Link>
                            <Table.Cell>{chamados.titulo}</Table.Cell>
                            <Table.Cell>{chamados.situacao}</Table.Cell>
                            <Table.Cell>{chamados.data_emissao}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            
                 
                ))}
                    </div>
                )} 
                
               
                {(this.state.finalizado &&
                    <div>
                       <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Situação</Table.HeaderCell>
                                <Table.HeaderCell>Data emissão</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        </Table>
                       
                       

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados.map(chamados => (
                    <Table fixed>  
                    <Table.Body>
                        <Table.Row>
                        <Link to={"/consultar-chamado/" + chamados.id_chamado} key={chamados.id_chamado}>

                            <Table.Cell>{chamados.id_chamado}</Table.Cell>
                            </Link>
                            <Table.Cell>{chamados.titulo}</Table.Cell>
                            <Table.Cell>{chamados.situacao}</Table.Cell>
                            <Table.Cell>{chamados.data_emissao}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            
                 
                ))}
                    </div>
                )} 
            
        
            </div>
        )
    }

}

export default ChamadosListPage;