import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import avisosService from '../../../services/avisos.service';
import './avisos-list.page.css';




class AvisosListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            avisos: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.getAvisos()

    }

    // Função responsável por chamar o serviço e carregar os posts.
    async getAvisos() {
        try {
            let res = await avisosService.list()
            console.log(res);
            this.setState({ avisos: res.data})
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os condômino.")
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

                <PageTop title={"Avisos"} desc={"Listagem dos avisos"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/avisos-add')}>
                        Adicionar
                    </button>
                </PageTop>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>data de emissão</th>
                        </tr>
                    </thead>
                </table>
                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.avisos.map(avisos => (
                    

                <div >
                
                <table  className="styled-table" >
                    <tr className='styled-table thead'>
                    <Link to={"/avisos-detail/" + avisos.id_aviso} key={avisos.id_aviso}>
                    <td>{avisos.id_aviso}</td>
                    </Link>
                           
                    <td>{avisos.titulo}</td>
                    <td>{avisos.data_emissao}</td>
                    </tr>
                </table>
                           
                </div>
                ))}

            </div>
        )
    }

}

export default AvisosListPage;