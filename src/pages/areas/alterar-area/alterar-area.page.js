import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';

class AlterarArea extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id_area_comum: '',
            nome : '',
            descricao : '',
            preco:'',
            situacao:'',
            redirectTo: null
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_area_comum){
                let areaId = this.props.match.params.id_area_comum
                this.setState({id_area_comum: areaId})
                this.getArea(areaId)
            }  
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async getArea(areaId){
        try {
            let res = await areasService.getOne(areaId)
            let area = res.data[0]
            this.setState(area)
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/erro"})                                        
        }
    }

    async enviarArea(){
        console.log("entrou")
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
           
            await areasService.alterarArea(data, this.state.id_area_comum)
        } catch (error) {
            console.log(error)
            this.setState({ redirectTo: "/erro"})                                        

        }
        window.location.reload();

    }

    render() {

        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title="Área">
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
                            ref={(input) => { this.preco = input }}
                            onChange={e => this.setState({ preco: e.target.value })} />                        
                    </div>
                    <div className="form-group">
                    <label htmlFor="inadimplente">Situação</label>
                        <select
                            type="text"
                            className="form-control"
                            id="situacao"
                            value={this.state.situacao}
                            onChange={e => this.setState({ situacao: e.target.value })}>
                            <option value="Aberta">Aberta</option>
                            <option value="Fechada">Fechada</option>
                        </select>
                    </div>
                </form>
                    <button className="btn btn-primary" onClick={() => this.enviarArea()}>
                        Salvar
                    </button>
                    
            </div>
        )
    }

}

export default AlterarArea;