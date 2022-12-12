import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';

class IncluirEnquete extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            enquete:'',
            titulo: '',
            descricao: '',
            opcao1: '',
            opcao2: '',
            opcao3: '',
            opcao4: '',
            opcao5: '',

            redirectTo: null
        }

    }

    componentDidMount(){
    
        let userData = authService.getLoggedUser();
        console.log(userData)
        if( userData && userData[0].tipo === 'Sindico'){
            this.render()
        }else{
            authService.clearLoggedUser();

            this.props.history.replace('/login')
        }
    

    }


    async incluirEnquete(){
        
        let data = {
            titulo : this.state.titulo,
            descricao : this.state.descricao,
            opcao1:  this.state.opcao1, 
            opcao2:  this.state.opcao2, 
            opcao3:  this.state.opcao3, 
            opcao4:  this.state.opcao4, 
            opcao5:  this.state.opcao5, 
        }
        console.log(data)
 
        if(!data.titulo || data.titulo === ''){
            this.titulo.focus()        
            return;
        }

        if(!data.descricao || data.descricao === ''){
            this.descricao.focus()        
            return;
        }
        if(!data.opcao1 || data.opcao1 === ''){
            this.opcao1.focus()        
            return;
        }
        if(!data.opcao2 || data.opcao2 === ''){
            this.opcao2.focus()        
            return;
        }
        if(!data.opcao3 || data.opcao3 === ''){
            this.opcao3.focus()        
            return;
        }
        if(!data.opcao4 || data.opcao4 === ''){
            this.opcao4.focus()        
            return;
        }
        if(!data.opcao5 || data.opcao5 === ''){
            this.opcao5.focus()        
            return;
        }
        try {
             let res = await enquetesService.incluirEnquete(data)
             this.setState({ enquete: res.data[0]})
             this.props.history.push('/alterar-enquete/'+this.state.enquete.id_enquete)
          

        } catch (error) {
            this.props.history.replace('/erro')
            
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

                <PageTop title="Incluir enquete" >
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
                    <label htmlFor="title">Opções</label>
                    <div className="form-group">
        
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao1}
                            ref={(input) => { this.opcao1 = input }}
                            onChange={e => this.setState({ opcao1: e.target.value })} />
                    </div>
                    <div className="form-group">
            
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao2}
                            ref={(input) => { this.opcao2 = input }}
                            onChange={e => this.setState({ opcao2: e.target.value })} />
                    </div>
                    <div className="form-group">
                 
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao3}
                            ref={(input) => { this.opcao3 = input }}
                            onChange={e => this.setState({ opcao3: e.target.value })} />
                    </div>
                    <div className="form-group">
         
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao4}
                            ref={(input) => { this.opcao4 = input }}
                            onChange={e => this.setState({ opcao4: e.target.value })} />
                    </div>
                    <div className="form-group">
         
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao5}
                            ref={(input) => { this.opcao5 = input }}
                            onChange={e => this.setState({ opcao5: e.target.value })} />
                    </div>
                    <button className="btn btn-primary" onClick={() => this.incluirEnquete()}>
                        Incluir
                    </button>
                </form>
            </div>
        )
    }

}

export default IncluirEnquete;