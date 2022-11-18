import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';
import './avisos-edit.page.css'

class AvisoEditPage extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do post vazios
        this.state = {
            id_aviso: null,
            titulo : '',
            descricao : '',
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
    
        // Verificando se id foi passado nos parâmetros da url
        if(this.props?.match?.params?.id_aviso){
            console.log();
            let avisoId = this.props.match.params.id_aviso
            console.log(avisoId);
            this.getAviso(avisoId)
        }
    }

    // Função que recupera os dados do post caso seja uma edição
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

    // Função responsável por salvar o post
    async sendPost(){
        
        // Reunindo dados
        let data = {
            titulo : this.state.titulo,
            descricao : this.state.descricao,
        }

        // Realizando verificações
        //if(!data.title || data.title === ''){
          //  alert("Título é obrigatório!")
           // return;
      //  }
     
        try {
            // Caso seja uma edição, chamar o "edit" do serviço
            if(this.state.id_aviso){
                await avisosService.edit(data, this.state.id_aviso)
                alert("Aviso editado com sucesso!")
            }
            // Caso seja uma adição, chamar o "create" do serviço
            else{
                await avisosService.create(data)
                alert("Aviso criado com sucesso!")
            }
            this.props.history.push('/avisos-list')
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

        let title = this.state.id_aviso ? 'Editar Aviso' : 'Novo Aviso';
        let desc = this.state.id_aviso ? 'Editar informações de um aviso' : 'Formulário de criação de aviso';

        return (
            <div className="container">

                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/avisos-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.sendPost()}>
                        Salvar
                    </button>
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.titulo}
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
                            onChange={e => this.setState({ descricao: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
            </div>
        )
    }

}

export default AvisoEditPage;