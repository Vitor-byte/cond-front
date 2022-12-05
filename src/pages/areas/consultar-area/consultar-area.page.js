import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class ConsultarArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            situacao: false,
            horario: false,
            areas: null,
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            if(this.props?.match?.params?.id_area_comum){
                let areaId = this.props.match.params.id_area_comum
                this.getArea(areaId)
            }  
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    async getArea(areasId) {
        let res = await areasService.getOne(areasId)
        console.log(res);
        this.setState({ areas: res.data[0] }) 
        if(res.data[0].situacao === "Aberta"){
            this.setState({ situacao: true })        
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
                        
                        {this.state.situacao && <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.history.push('/reservar-area/' + this.state.areas.id_area_comum)}>
                                Reservar
                            </button>
                        </div>}
                    </div>

                </div>
            </div>
        )
    }

}

export default ConsultarArea