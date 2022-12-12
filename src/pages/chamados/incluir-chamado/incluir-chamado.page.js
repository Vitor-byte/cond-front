import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';

class incluirChamado extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id_usuario:'',
            chamado: '',
            titulo : '',
            descricao : '',
            tipo:'',
            redirectTo: null
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.setState({ id_usuario: userData[0].id_usuario})
            this.render()
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }
   
    async incluirChamado(){
        
        let data = {
            titulo : this.state.titulo,
            descricao: this.state.descricao,
            tipo: this.state.tipo,
            id_usuario: this.state.id_usuario,
        }

        if(!data.titulo || data.titulo === ''){
            this.titulo.focus()        
            return
        }

        if(!data.descricao || data.descricao === ''){
            this.descricao.focus()        
            return
        }
        if(data.tipo === 'Selecione'){
            this.tipo.focus()        
            return
        }
        try {
            let res = await chamadosService.incluirChamado(data)
            this.props.history.push('/cond-consultar-chamado/'+ res.data[0].id_chamado)

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

                <PageTop title={'Incluir chamado'}>
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

                    <div className="form-group">
                    <label htmlFor="inadimplente">Tipo</label>
                        <select
                            type="text"
                            className="form-control"
                            id="situacao"
                            value={this.state.tipo}
                            ref={(input) => { this.tipo = input }}
                            onChange={e => this.setState({ tipo: e.target.value })}>
                        <option value="Selecione" selected>Selecione</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Reclamação">Reclamação</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={() => this.incluirChamado()}>
                        Incluir
                    </button>
                </form>
            </div>
        )
    }

}

export default incluirChamado;