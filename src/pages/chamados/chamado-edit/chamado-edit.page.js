import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import './chamados-edit.page.css'

class ChamadosEditPage extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do chamado vazios
        this.state = {
            chamado: null,
            id_chamado: null,
            titulo : '',
            descricao : '',
            resolucao:'',
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
    
        // Verificando se id foi passado nos parâmetros da url
        if(this.props?.match?.params?.id_chamado){
            console.log();
            let chamadoId = this.props.match.params.id_chamado
            console.log(chamadoId);
            this.getChamado(chamadoId)
        }
    }
    async getChamado(chamadoId){
        console.log(chamadoId);

        try {
            let res = await chamadosService.getOne(chamadoId)
            let chamado = res.data[0]
            console.log(chamado);
            this.setState({ chamado: res.data[0] })
   
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar o chamado.")
        }
    }
   
    async finalizarChamado(chamadoId){
        let data = {
            id_chamado :chamadoId,
            resolucao: this.state.resolucao,
        }

        try {
            console.log("entrou");

            let res = await chamadosService.finalizar( data, chamadoId)
            let chamado = res.data[0]
            this.setState(chamado)
            console.log(chamado)

            alert("Chamado finalizado.")
            this.props.history.replace('/chamados-list')
        } catch (error) {
            console.log(error);
            alert("Não foi possível finalizar o chamado."+error)
        }
    }
    async cancelarChamado(chamadoId){
        let data = {
            id_chamado : chamadoId,
            resolucao: this.state.resolucao,
        }

        try {
            console.log("entrou");

            let res = await chamadosService.cancelar( data, chamadoId)
            let chamado = res.data[0]
            this.setState(chamado)
            console.log(chamado)

            alert("Chamado cancelado.")
            this.props.history.replace('/chamados-list')
        } catch (error) {
            console.log(error);
            alert("Não foi possível cancelar o chamado."+error)
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

                <PageTop title={'Atender Chamado'}>
                    <button className="btn btn-light"  onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                  
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.chamado?.id_chamado}</p>
                        </div>
                        <div className="post-info">
                            <h4>Titulo</h4>
                            <p>{this.state.chamado?.titulo}</p>
                        </div>
                        <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.chamado?.descricao}</p>
                        </div>
                        <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.chamado?.situacao}</p>
                        </div>
                  
                    <div className="form-group">
                        <label htmlFor="title">Resolução</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.resolucao}
                            onChange={e => this.setState({ resolucao: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    
                    </div>
                    <button className="btn btn-primary" onClick={() => this.cancelarChamado( this.state.chamado.id_chamado)}>
                        Cancelar
                    </button>
                
                    <button className="btn btn-primary" onClick={() => this.finalizarChamado( this.state.chamado.id_chamado)}>
                        Finalizar
                    </button>
                </form>
            </div>
        )
    }

}

export default ChamadosEditPage;