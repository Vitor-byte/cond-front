import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import './reservar-area.page.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class CancelarReserva extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            situacao:false,
            reserva: "",
            show:false,
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            if(this.props?.match?.params?.id_reserva){
                let reservaId = this.props.match.params.id_reserva
                this.consultarReserva(reservaId)
            }  
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
           
    }

    async consultarReserva(reservaId) {
        
        try{
            let res = await areasService.consutarReserva(reservaId)
            console.log(res);
            this.setState({ reserva: res.data[0]})
            if(this.state.reserva.situacao === "Reservada"){
                this.setState({ situacao: true})            
            }
            console.log(this.state.reserva.data.split('-').reverse().join('/'))
            console.log(res);
        }catch(error){
            this.setState({ redirectTo: "/erro"})                                        

        }
        
    }

    async cancelarReserva(reservaId) {
        try {
            let res = await areasService.cancelarReserva(reservaId)
            window.location.reload();

        } catch (error) {
            console.log(error.response.data);
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

                <PageTop title={"Reserva"} >
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.reserva?.id_reserva}</p>
                        </div>
                        <div className="post-info">
                            <h4>Área</h4>
                            <p>{this.state.reserva?.nome}</p>
                        </div>
                        <div className="post-info">
                            <h4>Data</h4>
                            <p>{this.state.reserva?.data}</p>
                        </div>
                        <div className="post-info">
                            <h4>Horário</h4>
                            <p>{this.state.reserva?.horario_inicial+this.state.reserva?.horario_final}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.reserva?.situacao}</p>
                        </div>
                        
                        {this.state.situacao && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.setState({ show: true })}>
                                Cancelar
                            </button>
                        </div>}
                        <>

                        <Modal
                            show={this.state.show}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja cancelar a reserva?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                                Fechar
                            </Button>
                            <Button variant="primary"onClick={() => this.cancelarReserva(this.state.reserva?.id_reserva)}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    </div>

                </div>
            </div>
        )
    }

}

export default CancelarReserva