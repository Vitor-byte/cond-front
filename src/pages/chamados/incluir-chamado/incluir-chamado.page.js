import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';

class incluirChamado extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do chamado vazios
        this.state = {
            id_usuario:4,
            chamado: '',
            titulo : '',
            descricao : '',
            tipo:'',
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
    
        // Verificando se id foi passado nos parâmetros da url
        if(this.props?.match?.params?.id_chamado){
            console.log();
            let chamadoId = this.props.match.params.id_chamado
            console.log(chamadoId);
            this.getChamado(chamadoId)
        }
    }
    async getChamado(chamadoId){
        console.log(chamadoId);

        try {
            let res = await chamadosService.getOne(chamadoId)
            let chamado = res.data[0]
            console.log(chamado);
            this.setState({ chamado: res.data[0] })
   
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar o chamado.")
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
            let chamado = res.data[0]
            this.setState(chamado)
            console.log(chamado)
            this.props.history.replace('/chamados-list')
        } catch (error) {
            console.log(error);
            alert("Não foi possível cancelar o chamado."+error)
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
                    <button className="btn btn-light"  onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                  
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
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
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
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
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
                    <button className="btn btn-primary" onClick={() => this.incluirChamado( this.state.chamado)}>
                        Incluir
                    </button>
                </form>
            </div>
        )
    }

}

export default incluirChamado;