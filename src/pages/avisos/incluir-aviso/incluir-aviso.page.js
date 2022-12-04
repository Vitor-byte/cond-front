import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';

class IncluirAviso extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id_aviso: null,
            titulo : '',
            descricao : '',
            redirectTo: null
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_aviso){
                console.log();
                let avisoId = this.props.match.params.id_aviso
                console.log(avisoId);
                this.getAviso(avisoId)
            }  
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    async getAviso(avisoId){
        try {
            let res = await avisosService.getOne(avisoId)
            let aviso = res.data[0]
            this.setState(aviso)
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar aviso.")
        }
    }

    async incluirAviso(){
        
        let data = {
            titulo : this.state.titulo,
            descricao : this.state.descricao,
        }

 
        if(!data.titulo || data.titulo === ''){
            this.titulo.focus()        
            return;
        }

        if(!data.descricao || data.descricao === ''){
            this.descricao.focus()        
            return;
            }
        try {
            let res = await avisosService.incluirAviso(data)
            this.props.history.push('/alterar-aviso/'+res.data[0].id_aviso)
        } catch (error) {
            console.log(error)
            
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

                <PageTop title="Incluir aviso" >
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.titulo}
                            ref={(input) => { this.titulo = input }}
                            onChange={e => this.setState({ titulo: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.descricao}
                            ref={(input) => { this.descricao = input }}
                            onChange={e => this.setState({ descricao: e.target.value })} />
                    </div>
                    
                    <button className="btn btn-primary" onClick={() => this.incluirAviso()}>
                        Incluir
                    </button>
                </form>
            </div>
        )
    }

}

export default IncluirAviso;