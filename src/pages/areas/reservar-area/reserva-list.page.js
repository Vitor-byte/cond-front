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

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            this.consultarReservas(18)
    }

    // Função que exclui o post, chamada ao clicar no botão "Excluir"
    async consultarReservas(usuarioId) {
        
        console.log("teste");


        try {
            console.log("teste");
            let res = await areasService.consutarReservas(usuarioId)
            this.setState({ reservas: res.data })
            console.log(res)
        } catch (error) {
            
            console.log(error.response.data);
           
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

            <PageTop title={"Minhas reservas"} desc={"Listagem das reservas"}>
            </PageTop>
            

            {/* Percorrendo o array de posts do state e renderizando cada um
            dentro de um link que leva para a página de detalhes do post específico */}
            {
            this.state.reservas.map(reservas => (
                <><Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Nome</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                            <Table.HeaderCell>Horário</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                        <Link to={"/cancelar-reserva/" + reservas.id_reserva} key={reservas.id_reserva}>

                            <Table.Cell>{reservas.id_reserva}</Table.Cell>
                            </Link>
                            <Table.Cell>{reservas.nome}</Table.Cell>
                            <Table.Cell>{reservas.data}</Table.Cell>
                            <Table.Cell>{reservas.horario_inicial+"-"+reservas.horario_final}</Table.Cell>
                            
                        </Table.Row>


                    </Table.Body>
                </Table></>
                           
                 
            ))}
        </div>
        
        )
    }

}

export default ReservaList