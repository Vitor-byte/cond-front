import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class IncluirArea extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id_area_comum: null,
            nome : '',
            descricao : '',
            preco:'',
            situacao:'',
            redirectTo: null
        }

    }
    componentDidMount(){
    
        let userData = authService.getLoggedUser();
        console.log(userData)
        if( userData && userData[0].tipo === 'Sindico'){
            this.render()
        }else{
            this.setState({ redirectTo: "/login"})                                        
        }
    

    }
    async enviarArea(){
    
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
        
      
        try{
        let res = await areasService.create(data, this.state.id_area_comum)
        this.props.history.push('/alterar-area/'+res.data[0].id_area_comum)
        } catch (error) {
            console.log(error)
            this.setState({ redirectTo: "/erro"})                                         
            
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

                <PageTop title="Incluir área" >
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
                        <label htmlFor="title">Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            id="title"
                            value={this.state.preco}
                            onChange={e => this.setState({ preco: e.target.value })} />
                        
                    </div>
                    <div className="form-group">
                    <label htmlFor="inadimplente">Situação
                    </label>
                    <select
                    type="text"
                    className="form-control"
                    id="situacao"
                    value={this.state.situacao}
                    ref={(select) => { this.situacao = select }}
                    onChange={e => this.setState({ situacao: e.target.value })}
                    >
                    <option value="Aberta">Aberta</option>
                    <option value="Fechada">Fechada</option>
                    </select>
                    </div>
                
                </form>
                    <button className="btn btn-primary" onClick={() => this.enviarArea()}>
                        Incluir
                    </button>
            </div>
        )
    }

}

export default IncluirArea;