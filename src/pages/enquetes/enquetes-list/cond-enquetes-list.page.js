import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import enquetesService from '../../../services/enquetes.service';

class CondEnquetesListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            enquetes: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(userData && userData[0].tipo === 'Condomino'){
            this.consultarEnquetes()  
        }else{                                     
            this.props.history.replace('/erro')
        }
    }

    // Função responsável por chamar o serviço e carregar os posts.
    async consultarEnquetes() {
        try {
            let res = await enquetesService.list()
            console.log(res);
            this.setState({ enquetes: res.data})
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

                <PageTop title={"Enquetes"} desc={""}>
                </PageTop>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Situação</th>
                            <th>Data emissão</th>
                        </tr>
                    </thead>
                </table>
                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.enquetes.map(enquetes => (
                    

                <div >
                
                <table  className="styled-table" >
                    <tr className='styled-table thead'>
                    <Link to={"/votar-enquete/" + enquetes.id_enquete} key={enquetes.id_enquete}>
                    <td>{enquetes.id_enquete}</td>
                    </Link>
                    <td>{enquetes.titulo}</td>
                    <td>{enquetes.situacao}</td>
                    <td>{enquetes.data_emissao}</td>
                    </tr>
                </table>
                           
                </div>
                ))}

            </div>
        )
    }

}

export default CondEnquetesListPage;