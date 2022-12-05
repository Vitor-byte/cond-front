import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';
import { Table } from 'semantic-ui-react'

class AlterarEnquete extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            enquete: '',
            resultado:[],
            situacao:false,
            redirectTo: null
        }

    }
    componentDidMount(){
        let userData = authService.getLoggedUser();
        console.log(userData)
        if( userData && userData[0].tipo === 'Sindico'){
            if(this.props?.match?.params?.id_enquete){
                let enqueteId = this.props.match.params.id_enquete
                this.consultarEnquete(enqueteId)
            }
        }else{
            this.props.history.replace('/erro')
        }
    
    }
    async consultarEnquete(enqueteId){
        try {
            let res = await enquetesService.consultarEnquete(enqueteId)
            let res2 = await enquetesService.consultarOpcoes(enqueteId)
            console.log(res2);
            this.setState({enquete: res.data[0]})
        } catch (error) {
            console.log(error);
        }
        let res3 = await enquetesService.consultarResultado(enqueteId)
        this.setState({resultado: res3.data})

        if(this.state.enquete.situacao ==="Aberta"){
            this.setState({situacao: true})
        
        }
    }
    async finalizarEnquete(enqueteId){
        try {
            let res = await enquetesService.finalizarEnquete(enqueteId)
            let enquete = res.data[0]
            this.setState(enquete)
        } catch (error) {
            console.log(error);
        }
        window.location.reload();


    }
    async cancelarEnquete(enqueteId){
        try {
            let res = await enquetesService.cancelarEnquete(enqueteId)
            console.log(res);


        } catch (error) {
            console.log(error);
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

                <PageTop title="Enquete" >
                </PageTop>
                <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.enquete?.id_enquete}</p>
                </div>
                <div className="post-info">
                            <h4>Data emissão</h4>
                            <p>{this.state.enquete?.data_emissao}</p>
                </div>
                <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.enquete?.situacao}</p>
                </div>
                <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.enquete?.titulo}</p>
                </div>
                <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.enquete?.descricao}</p>
                </div>
                <><Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Opção</Table.HeaderCell>
                                <Table.HeaderCell>Quantidade</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                </Table></>
              {this.state.resultado.map(resultado => (
                    <><Table fixed>  
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{resultado.opcao}</Table.Cell>
                                <Table.Cell>{resultado.count}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table></>
                               
                     
                ))}
                
                
                {this.state.situacao && <div className="post-info">
                    <button className="btn btn-light" onClick={() => this.cancelarEnquete(this.state.enquete.id_enquete)}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.finalizarEnquete(this.state.enquete.id_enquete)}>
                        Finalizar
                    </button>
                </div>}
            </div>
        )
    }

}

export default AlterarEnquete;