import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';

class ConsultarAviso extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            aviso: null,
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            const avisoId = this.props.match.params.id_aviso
            this.getAviso(avisoId)
        }else{                                     
            this.props.history.replace('/erro')
        }       
    }

    async getAviso(avisoId) {
        
            let res = await avisosService.getOne(avisoId)
            console.log(res);
            this.setState({ aviso: res.data[0] })
            console.log(this.aviso);
        
    }

    render() {

        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title={"Aviso"}>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.aviso?.id_aviso}</p>
                        </div>
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.aviso?.data_emissao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.aviso?.titulo}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.aviso?.descricao}</p>
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }

}

export default ConsultarAviso