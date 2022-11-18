import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import condominosService from '../../services/condominos.service';
import './condominos-edit.page.css'

class CondominosEditPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id: null,
            nome : '',
            email : '',
            senha : '',
            rg : '',
            situacao:'',
            inadimplente:'',
            bloco : '',
            unidade: '',
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
      
            if(this.props?.match?.params?.id_usuario){
                let condominoId = this.props.match.params.id_usuario
                console.log(condominoId)
                this.getCondominos(condominoId)
            }
      
    }

    // Função que recupera os dados do post caso seja uma edição
    async getCondominos(condominoId){
        try {
            let res = await condominosService.getOne(condominoId)
            let condomino = res.data[0]
            console.log(condomino)
            this.setState(condomino)
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
        }
    }

    // Função responsável por salvar o post
    async enviarCondomino(){
        
        // Reunindo dados
        let data = {
            nome : this.state.nome,
            email : this.state.email,
            senha : this.state.senha,
            inadimplente: this.state.inadimplente,
            situacao:this.state.situacao,
            rg : this.state.rg,
            unidade : this.state.unidade,
            bloco : this.state.bloco,
        }

        // Realizando verificações
        //if(!data.title || data.title === ''){
          //  alert("Título é obrigatório!")
           // return;
      //  }
     
        try {
            // Caso seja uma edição, chamar o "edit" do serviço
            if(this.state.id_usuario){
                await condominosService.edit(data, this.state.id_usuario)
                alert("Condômino editado com sucesso!")
            }
            // Caso seja uma adição, chamar o "create" do serviço
            else{
                await condominosService.create(data)
                alert("Condômino criado com sucesso!")
                this.props.history.push('/condominos-list')

            }
            this.props.history.push('/condominos-list')
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

        let title = this.state.id_usuario? 'Editar Condomino' : 'Novo Condômino';
        let desc = this.state.id_usuario ? 'Editar informações de um post' : 'Formulário de criação de Condômino';

        return (
            <div className="container">

                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/condominos-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.enviarCondomino()}>
                        Salvar
                    </button>
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                        <label htmlFor="rg">Rg</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rg"
                            value={this.state.rg}
                            onChange={e => this.setState({ rg: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            value={this.state.nome}
                            onChange={e => this.setState({ nome: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="text"
                            className="form-control"
                            id="senha"
                            value={this.state.senha}
                            onChange={e => this.setState({ senha: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="inadimplente">Inadimplenete</label>
                    <select
                    type="text"
                    className="form-control"
                    id="inadimplente"
                    value={this.state.inadimplente}
                    onChange={e => this.setState({ inadimplente: e.target.value })}
                    >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <input
                            type="text"
                            className="form-control"
                            id="situacao"
                            value={this.state.situacao}
                            onChange={e => this.setState({ situacao: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="bloco">Bloco</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bloco"
                            value={this.state.bloco}
                            onChange={e => this.setState({ bloco: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="unidade">Unidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="unidade"
                            value={this.state.unidade}
                            onChange={e => this.setState({ unidade: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
            </div>
        )
    }

}

export default CondominosEditPage;