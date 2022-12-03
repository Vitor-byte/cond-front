import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';

class VotarEnquete extends React.Component {

    constructor(props){
        super(props)

        // State iniciado com atributos do post vazios
        this.state = {
            enquete:'',
            opcoes:[],
            opcao:'',
            situacao:false,
            redirectTo: null
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
    
        // Verificando se id foi passado nos parâmetros da url
        if(this.props?.match?.params?.id_enquete){
            console.log();
            let enqueteId = this.props.match.params.id_enquete
            console.log(enqueteId);
            this.consultarEnquete(enqueteId)
        }
    }

    // Função que recupera os dados do post caso seja uma edição
    async consultarEnquete(enqueteId){
        console.log(enqueteId);

        try {
            let res = await enquetesService.consultarEnquete(enqueteId)
            let res2 = await enquetesService.consultarOpcoes(enqueteId)
            console.log(res);
            this.setState({enquete: res.data[0]})
            this.setState({opcoes: res2.data})
            console.log(this.state.enquete);

        } catch (error) {
            console.log(error);
        }
            
        if(this.state.enquete.situacao ==="Aberta"){
            this.setState({situacao: true})
        
        }
    }
    async votarEnquete(enqueteId){
        let data = {
            id_usuario: this.state.enquete.id_usuario,
            id_enquete:this.state.enquete.id_enquete,
           
        }
        try {
            let res = await enquetesService.votarEnquete(data)
            console.log(res);

        } catch (error) {
            console.log(error);
        }
            
        if(this.state.enquete.situacao ==="Aberta"){
            this.setState({situacao: true})
        
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

                <PageTop title="Enquete" >
                </PageTop>
                <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.enquete.id_enquete}</p>
                </div>
                <div className="post-info">
                            <h4>Data emissão</h4>
                            <p>{this.state.enquete.data_emissao}</p>
                </div>
                <div className="post-info">
                            <h4>Situação</h4>
                            <p>{this.state.enquete.situacao}</p>
                </div>
                <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.enquete.titulo}</p>
                </div>
                <div className="post-info">
                            <h4>Descrição</h4>
                            <p>{this.state.enquete.descricao}</p>
                </div>
                {this.state.opcoes.map((opcoes,key) => (
                    

                    <div >
                          
                          <input id={opcoes.id_opcao}type="radio" name="opcao"value= {opcoes.opcao}   onChange={e => this.setState({ opcao: e.target.value })} ></input>
                        <label htmlFor={key.toString()}>{opcoes.opcao}</label>
         
                  
                               
                    </div>
                    ))}
    
                
                {this.state.situacao && <div className="post-info">
                    <button className="btn btn-light" onClick={() => this.votarEnquete(this.state.enquete.id_enquete)}>
                        Votar
                    </button>
                </div>}
            </div>
        )
    }

}

export default VotarEnquete;