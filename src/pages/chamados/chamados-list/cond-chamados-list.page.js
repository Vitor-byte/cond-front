import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import chamadosService from '../../../services/chamados.service';

class CondChamadosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array da API.
            aberto: true,
            emAndamento:false,
            finalizado:false,
            chamados: [],
            usuario: null,
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.consultarChamados(4)

    }

    async consultarChamados(id_usuario) {
        this.setState({aberto: true, emAndamento:false, finalizado:false})
        try {
            
            let res = await chamadosService.consultarChamadoUsuario(id_usuario)
            console.log(res);
            this.setState({ chamados: res.data})
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os chamados.")
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

                <PageTop title={"Meus chamados"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/incluir-chamado')}>
                        Novo chamado
                    </button>
                </PageTop>
                
                    <div>
                        <table className='styled-table'>
                <thead>
                               <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Situação</th>
                                <th>Data de emissão</th>
                                </tr>
                                </thead>
                                </table>

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.chamados && this.state.chamados.map(chamados => (
                
              
               
                
                <table  className="styled-table" >
                    <tr >
                    <Link to={"consultar-chamado/" + chamados.id_chamado} key={chamados.id_chamado}>
                    <td>{chamados.id_chamado}</td>
                    </Link>
                           
                    <td>{chamados.titulo}</td>
                    <td>{chamados.situacao}</td>
                    <td>{chamados.data_emissao}</td>
                    </tr>
                </table>
            
                 
                ))}
             </div>
                
            
        
            </div>
        )
    }

}

export default CondChamadosListPage;