import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import condominosService from '../../../services/condominos.service';
import authService from '../../../services/auth.service';


class IncluirCondomino extends React.Component {

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
            redirectTo: null,
            condomino:'',
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            this.setState({ id_usuario: userData[0].id_usuario})
            this.render()
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    // Função responsável por salvar o post
    async incluirCondomino(){
        
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

        console.log(data)
        if(!data.rg || data.rg === ''){
            this.rg.focus()        
            return
        }
        if(!data.nome || data.nome === ''){
            this.nome.focus();        
            return
        }
        if(!data.email || data.email === ''){
            this.email.focus();        
            return
        }
        if(!data.senha || data.senha === ''){
            this.senha.focus();        
            return
        }
        if(!data.bloco || data.bloco === ''){
            this.bloco.focus();        
            return
        }
        if(!data.unidade || data.unidade === ''){
            this.unidade.focus();        
            return
        }
        try{

        
        let res = await condominosService.create(data)
        this.setState({ condomino: res.data[0]})
        this.props.history.push('/alterar-condomino/'+this.state.condomino.id_usuario)
        }catch(error){
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

                <PageTop title="Incluir condômino" >
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                        <label htmlFor="rg">Rg</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rg"
                            value={this.state.rg}
                            ref={(input) => { this.rg = input }}
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
                            ref={(input) => { this.nome = input }}
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
                            ref={(input) => { this.email = input }}
                            onChange={e => this.setState({ email: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            value={this.state.senha}
                            ref={(input) => { this.senha = input }}
                            onChange={e => this.setState({ senha: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="inadimplente">Inadimplenete</label>
                    <select
                    type="text"
                    className="form-control"
                  
                    value={this.state.inadimplente}
                    onChange={e => this.setState({ inadimplente: e.target.value })}
                    >
                    <option value="Selecione" selected>Selecione</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                    </div>


                    <div className="form-group">
                    <label htmlFor="situacao">Situação
                    </label>
                    <select
                    type="text"
                    className="form-control"
                    id="situacao"
                    value={this.state.situacao}
                    onChange={e => this.setState({ situacao: e.target.value })}
                    >
                        <option value="Selecione" selected>Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bloco">Bloco</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bloco"
                            value={this.state.bloco}
                            ref={(input) => { this.bloco = input }}
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
                            ref={(input) => { this.unidade = input }}
                            onChange={e => this.setState({ unidade: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
               
                    <button className="btn btn-primary" onClick={() => this.incluirCondomino()}>
                        Incluir
                    </button>
            </div>
        )
    }

}

export default IncluirCondomino;