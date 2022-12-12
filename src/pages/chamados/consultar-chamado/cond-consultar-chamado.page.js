import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class CondConsultarChamado extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            chamado: '',
            resposta:[],
            situacao:false,
            aberto:false,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        let userData = authService.getLoggedUser();
        console.log(userData )
        if( userData && userData[0].tipo === 'Condomino'){
            if(this.props?.match?.params?.id_chamado){
                let chamadoId = this.props.match.params.id_chamado
                this.consultarChamado(chamadoId)
            }
        }else{
            this.setState({ redirectTo: "/login"})                                        
        }
    }

    async consultarChamado(chamadoId) {
        try{
        let res = await chamadosService.consultarChamado(chamadoId)
        let res2 = await chamadosService.consultarChamadoResposta(chamadoId)
        console.log(res2);
        this.setState({ chamado: res.data[0] })
        this.setState({ resposta: res2.data})

        
        if(this.state.chamado?.situacao ==='Em andamento' || this.state.chamado?.situacao ==='Finalizado'){
            this.setState({ situacao:  true})
        }
        if(this.state.chamado?.situacao ==='Aberto'){
            this.setState({ aberto:  true})
        }
        }catch(error){
            this.setState({ redirectTo: "/error"})                                        
        }

        
    }
    async excluirChamado(){

        try {
            let res = await chamadosService.excluir(this.state.chamado?.id_chamado)      
            console.log(res)      
            this.setState({ redirectTo: "/cond-chamados-list"})                                        
        } catch (error) {
            console.log(error)
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

                <PageTop title={"Chamado"}>
                </PageTop>

                <div className="row">
                    
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.chamado?.id_chamado}</p>
                        </div>
                        <div className="post-info">
                            <h4>Título</h4>
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
                        
                        {this.state.situacao && <div className="post-info">
                            <h4>Resposta</h4>
                            <p>{this.state.resposta.map(respostas => (
               
                            <p>{respostas.resposta}</p>
                    
           
                
                             ))}
                            </p>
                            
                        </div>}
                    <div>
                                
                    </div>
                       
                    </div>
                                 
                </div>
                {this.state.aberto && <div>
                    <button className="btn btn-primary" onClick={() => this.setState({ show: true })}>
                        Excluir
                    </button> 
                    </div>}    
                
                    <>

                    <Modal
                        show={this.state.show}
                        backdrop="static"
                        keyboard={false}
                    >
                        
                        <Modal.Body>
                        Deseja excluir o chamado?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={() => this.excluirChamado()}>Excluir</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
            </div>
        )
    }

}

export default CondConsultarChamado