import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class IncluirArea extends React.Component {

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
    // Função que recupera os dados do post caso seja uma edição
    async getArea(areaId){
        try {
            let res = await areasService.getOne(areaId)
            let area = res.data[0]
            this.setState(area)
        } catch (error) {
            console.log(error);
         
        }
    }

    // Função responsável por salvar o post
    async enviarArea(){
    
        // Reunindo dados
        let data = {
            nome : this.state.nome,
            descricao : this.state.descricao,
            preco : this.state.preco,
            situacao: this.state.situacao
        }

       
        if(!data.nome || data.nome === ''){
           this.nome.focus() 
           return;
        }
     
        if(!data.descricao || data.descricao === ''){
            this.descricao.focus() 
            return;
         }
     
         if(!data.preco || data.preco === ''){
            this.preco.focus() 
            return;
         }
         if(!data.situacao || data.situacao === ''){
            this.situacao.focus() 
            return;
         }
      
        try {
            // Caso seja uma edição, chamar o "edit" do serviço
            if(this.state.id_area_comum){
                await areasService.edit(data, this.state.id_area_comum)
                alert("Área editado com sucesso!")
            }
            // Caso seja uma adição, chamar o "create" do serviço
            else{
                await areasService.create(data)
                alert("Área criado com sucesso!")
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
                    <button className="btn btn-primary" onClick={() => this.enviarArea()}>
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
                            ref={(input) => { this.nome = input }}
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
                            ref={(input) => { this.descricao = input }}
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
                            ref={(input) => { this.preco = input }}
                            onChange={e => this.setState({ preco: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        
                    </div>
                    <div className="form-group">
                    <label htmlFor="inadimplente">Situação
                    </label>
                    <select
                    type="text"
                    className="form-control"
                    id="situacao"
                    value={this.state.situacao}
                    onChange={e => this.setState({ situacao: e.target.value })}
                    >
                    <option value="Aberta">Aberta</option>
                    <option value="Fechada">Fechada</option>
                    </select>
                    </div>
                
                </form>
            </div>
        )
    }

}

export default IncluirArea;