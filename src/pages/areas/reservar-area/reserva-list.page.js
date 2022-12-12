import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import { Table } from 'semantic-ui-react'

class ReservaList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        
            reservas: [],
            redirectTo: null
        }
    }
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.consultarReservas( userData[0].id_usuario)
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async consultarReservas(usuarioId) {
        
        console.log("teste");


        try {
            console.log("teste");
            let res = await areasService.consutarReservas(usuarioId)
            this.setState({ reservas: res.data })
            console.log(res)
        } catch (error) {
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

            <PageTop title={"Minhas reservas"}>
            </PageTop>
            <>  <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Área</Table.HeaderCell>
                            <Table.HeaderCell>Situação</Table.HeaderCell>
                            <Table.HeaderCell>Preço</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                </Table></>
            {
            this.state.reservas.map(reservas => (
                <><Table fixed>
                    <Table.Body>
                        <Table.Row>
                        <Link to={"/consultar-reserva/" + reservas.id_reserva} key={reservas.id_reserva}>

                            <Table.Cell>{reservas.id_reserva}</Table.Cell>
                            </Link>
                            <Table.Cell>{reservas.nome}</Table.Cell>
                            <Table.Cell>{reservas.situacao}</Table.Cell>
                            <Table.Cell>{reservas.preco}</Table.Cell>
                            
                        </Table.Row>


                    </Table.Body>
                </Table></>
                           
                 
            ))}
        </div>
        
        )
    }

}

export default ReservaList