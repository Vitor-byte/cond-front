import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import './post-edit.page.css'

class ReservasEditPage extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do post vazios
        this.state = {
            id_area_comum: null,
            nome : '',
            descricao : '',
            preco:'',
            situacao:'',
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
    
        // Verificando se id foi passado nos parâmetros da url
        if(this.props?.match?.params?.id_area_comum){
            console.log();
            let areaId = this.props.match.params.id_area_comum
            console.log(areaId);
            this.getArea(areaId)
        }
    }

    // Função que recupera os dados do post caso seja uma edição
    async getAr(areaId){
        try {
            let res = await areasService.getOne(areaId)
            let area = res.data[0]
            this.setState(area)
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
        }
    }

    // Função responsável por salvar o post
    async sendPost(){
        console.log("entrou")
        // Reunindo dados
        let data = {
            nome : this.state.nome,
            descricao : this.state.descricao,
            preco : this.state.preco,
            situacao: this.state.situacao
        }

        // Realizando verificações
        //if(!data.title || data.title === ''){
          //  alert("Título é obrigatório!")
           // return;
      //  }
     
        try {
            // Caso seja uma edição, chamar o "edit" do serviço
            if(this.state.id_area_comum){
                await areasService.edit(data, this.state.id_area_comum)
                alert("Condômino editado com sucesso!")
            }
            // Caso seja uma adição, chamar o "create" do serviço
            else{
                await areasService.create(data)
                alert("Condômino criado com sucesso!")
            }
            this.props.history.push('/areas-list')
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

        let title = this.state.id_area_comum ? 'Editar Área' : 'Nova Área';
        let desc = this.state.id_area_comum ? 'Editar informações de uma área' : 'Formulário de criação de área';

        return (
            <div className="container">

                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/areas-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.sendPost()}>
                        Salvar
                    </button>
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.nome}
                            onChange={e => this.setState({ nome: e.target.value })} />
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
                    <div className="form-group">
                        <label htmlFor="title">Preço</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.preco}
                            onChange={e => this.setState({ preco: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Situação</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.situacao}
                            onChange={e => this.setState({ situacao: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        
                    </div>
                </form>
            </div>
        )
    }

}

export default ReservasEditPage;