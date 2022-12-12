import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class ReservarArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id_usuario:"",
            opcao:"",
            data:"",
            horarios: [],
            areas: null,
            redirectTo: null
        }
    }

    componentDidMount() {
           
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            if(this.props?.match?.params?.id_area_comum){
                this.setState({ id_usuario: userData[0].id_usuario})
                let areaId = this.props.match.params.id_area_comum
                this.getArea(areaId)
            }  
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async getArea(areasId) {
        try{
            let res = await areasService.getOne(areasId)
            console.log(res);
            this.setState({ areas: res.data[0] })
            console.log(this.areas);
            if(res.data[0].situacao === "Fechada"){
                this.props.history.replace('/erro')
            }    
        }catch (error){
            this.setState({ redirectTo: "/erro"})                                        

        }
        
    }
    async validar() {
        if(this.state.opcao === ''){
            this.data.focus()  
            return      
        }
    this.setState({ show: true })  
        
    }
    async consultarHorarios() {
       let data =  this.state.data
       if(!data || data === ''){
        this.data.focus()        
        return
       }
        try{
            let res = await areasService.consultarHorarios( data)
            this.setState({ horarios: res.data})
            console.log(this.state.horarios);
        } catch (error) {
            console.log(error.response.data);
            this.setState({ redirectTo: "/erro"})                                        
        }
    }
    async reservarArea() {
        let data = {
            id_usuario:this.state.id_usuario , 
            id_area_comum:this.state.areas.id_area_comum, 
            data: this.state.data,
            horario_inicial: this.state.opcao.substring(0,8), 
            horario_final: this.state.opcao.substring(9,17)
        
        }
        console.log(data)
        console.log(data.horario_inicial)
        try{
      
            let res = await areasService.reservarArea(data)
            this.props.history.push('/consultar-reserva/'+res.data[0].id_reserva)
            console.log(res);
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

                <PageTop title={"Área"}>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.areas?.id_area_comum}</p>
                        </div>
                        <div className="post-info">
                            <h4>Nome</h4>
                            <p>{this.state.areas?.nome}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.areas?.descricao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Preço</h4>
                            <p>{this.state.areas?.preco}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.areas?.situacao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Selcione uma data:</h4>
                            <input 
                            id="date"
                            type="date" 
                            value={this.state.data}
                            ref={(input) => { this.data = input }}
                            onChange={e => this.setState({ data: e.target.value })}
                            ></input>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>  this.validar(this.state.opcao)}>
                                Reservar
                     </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>  this.consultarHorarios(this.state.data)}>
                                Consultar Horarios
                            </button>
                           
                        </div>
                        <h4>Horários disponíveis:</h4>

                        <form onSubmit={e => e.preventDefault()}>
                      {
                      
                      this.state.horarios.map((horario,key) => (
                      
                    <div>
                        
                            
                        <input id={horario}type="radio" name="opcao"value= {horario}   onChange={e => this.setState({ opcao: e.target.value })} ></input>
                        <label htmlFor={key.toString()}>{horario}</label>
         
                      
                    </div>
                    
                    ))}
                     
                    </form>
                    <>

                        <Modal
                            show={this.state.show}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja reservar a área?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={() =>  this.reservarArea(this.state.opcao)}>Reservar</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </div>

                </div>
            </div>
        )
    }

}

export default ReservarArea