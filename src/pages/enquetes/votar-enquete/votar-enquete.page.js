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
            vota:true,
            situacao:false,
            redirectTo: null,
            id_usuario:null,
        }

    }

    // Função executada assim que o componente carrega
    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.setState({ id_usuario:userData[0].id_usuario})
            if(this.props?.match?.params?.id_enquete){
                let id_usuario =userData[0].id_usuario
                let enqueteId = this.props.match.params.id_enquete
                this.verificaVoto(enqueteId, id_usuario)
                this.consultarEnquete(enqueteId)
            }
        }else{                                     
            this.props.history.replace('/login')
        }
    }
async verificaVoto(enqueteId, id_usuario){
        let data = {
            id_usuario: id_usuario,
            id_enquete: enqueteId,
        }
        try {
            let res = await enquetesService.verificaVoto(data)
            console.log(res.data[0])

            if(res.data[0].id_enquete = enqueteId){
                this.setState({vota: false})
            }
            

        } catch (error) {
            console.log(error)
        }
            return
    }
    // Função que recupera os dados do post caso seja uma edição
    async consultarEnquete(enqueteId){

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
    async votarEnquete(){
        let data = {
            id_usuario: this.state.id_usuario,
            id_enquete:this.state.enquete.id_enquete,
            id_opcao:this.state.opcao,
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
                
                {this.state.situacao && this.state.vota && (this.state.opcoes.map((opcoes,key) => (
                    

                    <div >
                          
                          <input id={opcoes.id_opcao}type="radio" name="opcao"value= {opcoes.id_opcao}   onChange={e => this.setState({ opcao: e.target.value })} ></input>
                        <label htmlFor={key.toString()}>{opcoes.opcao}</label>
         
                  
                               
                    </div>
                    )))}
    
                
                {(this.state.situacao && this.state.vota) && <div className="post-info">
                    <button className="btn btn-light" onClick={() => this.votarEnquete(this.state.enquete.id_enquete)}>
                        Votar
                    </button>
                </div>}
            </div>
        )
    }

}

export default VotarEnquete;