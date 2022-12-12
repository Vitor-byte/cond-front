import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import condominosService from '../../../services/condominos.service';
import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AlterarCondomino extends React.Component {
    
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
            showErro:false,
            show:false,
            fechar:false,
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
        
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_usuario){
                let condominoId = this.props.match.params.id_usuario
                console.log(condominoId)
                this.consultarCondomino(condominoId)
            }
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async consultarCondomino(condominoId){
        try {
            let res = await condominosService.getOne(condominoId)
            let condomino = res.data[0]
            this.setState(condomino)
        } catch (error) {
            this.setState({ redirectTo: "/error"})                                        
        }
    }
    async consultarCondomino(condominoId){
        try {
            let res = await condominosService.getOne(condominoId)
            let condomino = res.data[0]
            this.setState(condomino)
        } catch (error) {
            this.setState({ redirectTo: "/error"})                                        
        }
    }
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
        console.log(data)
        // Realizando verificações
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

        try {
            let res = await condominosService.edit(data, this.state.id_usuario)      
            console.log(res)      
        } catch (error) {
            console.log(error)
            this.setState({ redirectTo: "/error"})                                        

        }

    }
    async excluirCondomino(){
        
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
        
        try {
            let res = await condominosService.excluir(this.state.id_usuario)      
            console.log(res)      
        } catch (error) {
            console.log(error)
            this.setState({ show: false})                                        
            this.setState({ showErro: true})                                        

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

                <PageTop title="Condômino" >
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="text"
                            className="form-control"
                            id="senha"
                            value={this.state.senha}
                            ref={(input) => { this.senha = input }}
                            onChange={e => this.setState({ senha: e.target.value })} />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="inadimplente">Inadimplenete</label>
                    <select
                    type="text"
                    className="form-control"
                    id="inadimplente"
                    value={this.state.inadimplente}
                    ref={(input) => { this.inadimplente = input }}
                    onChange={e => this.setState({ inadimplente: e.target.value })}
                    >
                        
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="situacao">Situação</label>
                    <select
                    type="text"
                    className="form-control"
                    id="situacao"
                    value={this.state.situacao}
                    ref={(input) => { this.situacao = input }}
                    onChange={e => this.setState({ situacao: e.target.value })}
                    >
                       
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
                    </div>
                </form>
                <button type="button" class="btn btn-primary"onClick={() => this.setState({ show: true })}>
                    Excluir
                    </button>
                    <button type="button" class="btn btn-primary" onClick={() => this.state.enviarCondomino()}>
                    Salvar
                    </button>
                    <>

                        <Modal
                            show={this.state.show}
                            backdrop="static"
                            keyboard={false}
                        >
                            
                            <Modal.Body>
                            Deseja excluir o condômino?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={() => this.excluirCondomino()}>Excluir</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    <>
                        

                        <Modal
                            show={this.state.showErro}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                            Não é possivel excluir esse condômino!
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ showErro: false })}>
                                Fechar
                            </Button>
                           
                            </Modal.Footer>
                        </Modal>
                    </>
                

                  
            </div>
        )
    }

}

export default AlterarCondomino;