import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';

class IncluirEnquete extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do post vazios
        this.state = {
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
            let res = await enquetesService.getOne(avisoId)
            let aviso = res.data[0]
            this.setState(aviso)
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar aviso.")
        }
    }

    // Função responsável por salvar o post
    async incluirEnquete(){
        
        // Reunindo dados
        let data = {
            titulo : this.state.titulo,
            descricao : this.state.descricao,
            opcao: [this.state.opcao1,this.state.opcao2,
            this.state.opcao3,this.state.opcao4,this.state.opcao5]
            
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
        try {
             await enquetesService.incluirEnquete(data, this.state.id_aviso)
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
                    <label htmlFor="title">Opções</label>
                    <div className="form-group">
        
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao1}
                            ref={(input) => { this.opcao1 = input }}
                            onChange={e => this.setState({ opcao1: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
            
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao2}
                            ref={(input) => { this.opcao2 = input }}
                            onChange={e => this.setState({ opcao2: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                 
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao3}
                            ref={(input) => { this.opcao3 = input }}
                            onChange={e => this.setState({ opcao3: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
         
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao4}
                            ref={(input) => { this.opcao4 = input }}
                            onChange={e => this.setState({ opcao4: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
         
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.opcao5}
                            ref={(input) => { this.opcao5 = input }}
                            onChange={e => this.setState({ opcao5: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/avisos-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.incluirEnquete()}>
                        Salvar
                    </button>
                </form>
            </div>
        )
    }

}

export default IncluirEnquete;