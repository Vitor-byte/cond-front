import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class AlterarAviso extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id_aviso: '',
            titulo : '',
            descricao : '',
            show:false,
            redirectTo: null
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_aviso){
                let avisoId = this.props.match.params.id_aviso
                this.getAviso(avisoId)
            }  
        }else{                                     
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async getAviso(avisoId){
        try {
            let res = await avisosService.getOne(avisoId)
            let aviso = res.data[0]
            this.setState(aviso)
        } catch (error) {
            console.log(error);
            this.setState({ redirectTo: "/erro"})                                        

        }
    }
    async alterarAviso(){
        let data = {
            titulo : this.state.titulo,
            descricao : this.state.descricao,
        }


 
        if(!data.titulo || data.titulo === ''){
            this.titulo.focus()        
            return;
        }

        if(!data.descricao || data.descricao === ''){
            this.descricao.focus()        
            return;
            }
        try {
           
            await avisosService.alterarAviso(data,this.state.id_aviso)
        } catch (error) {
            console.log(error)
            
        }
        window.location.reload();

    }
    async excluirAviso(){
        
        try {
            await avisosService.excluirAviso(this.state.id_aviso)
            this.props.history.push('/avisos-list')
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

                <PageTop title="Aviso" >
                </PageTop>
                <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.id_aviso}</p>
                        </div>
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
                    
                </form>
                <button className="btn btn-primary" onClick={() => this.setState({ show: true })}>
                        Excluir
                    </button>
                    <button className="btn btn-primary" onClick={() => this.alterarAviso()}>
                        Salvar
                    </button>
                    

                    <>

                    <Modal
                        show={this.state.show}
                        backdrop="static"
                        keyboard={false}
                    >
                        
                        <Modal.Body>
                        Deseja excluir o aviso?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={() => this.excluirAviso()}>Excluir</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    
            </div>
        )
    }

}

export default AlterarAviso;