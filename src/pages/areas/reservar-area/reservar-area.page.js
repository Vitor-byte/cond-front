import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class ReservarArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados do post]
            opcao:"",
            data:"",
            horarios: [],
            areas: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        
            // Recuperando os id do post na url
            const areaId = this.props.match.params.id_area_comum
            // Chamando a função que carrega os dados do post
            console.log(areaId);
            this.getArea(areaId)
    }

    // Função que carrega os dados do post e salva no state
    async getArea(areasId) {
        
            let res = await areasService.getOne(areasId)
            console.log(res);
            this.setState({ areas: res.data[0] })
            console.log(this.areas);
        
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
            alert("Não foi possível carregar post.")
        }
    }
    async reservarArea() {
        let data = {
            id_usuario:"18", 
            id_area_comum:this.state.areas.id_area_comum, 
            data: this.state.data,
            horario_inicial: this.state.opcao.substring(0,8), 
            horario_final: this.state.opcao.substring(9,17)
        
        }
        console.log(data.horario_final)
        console.log(data.horario_inicial)
        try{
      
            let res = await areasService.reservarArea(data)
    
            console.log(res);
        } catch (error) {
            console.log(error.response.data);
            alert("Não foi possível carregar post.")
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

                <PageTop title={"Areas"} desc={"cadastro de area"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
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
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>  this.reservarArea(this.state.opcao)}>
                                Reservar
                     </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
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
                </div>

                </div>
            </div>
        )
    }

}

export default ReservarArea