import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../../components/page-top/page-top.component';
import authService from '../../../services/auth.service';
import areasService from '../../../services/areas.service';
import './areas-list.page.css';

class CondAreasList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            areas: [],
            redirectTo: null
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
    
            this.getAreas()

    }

    // Função responsável por chamar o serviço e carregar os posts.
    async getAreas() {
        try {
            let res = await areasService.list()
            console.log(res);
            this.setState({ areas: res.data})
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

                <PageTop title={"Áreas"} desc={"Listagem das áreas"}>
                   
                </PageTop>

                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                </table>
                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.areas.map(areas => (
                  <div >
                
                  <table  className="styled-table" >
                      <tr className='styled-table thead'>
                      <Link to={"/consultar-area/" + areas.id_area_comum} key={areas.id_area_comum}>
                      <td>{areas.id_area_comum}</td>
                      </Link>
                             
                      <td>{areas.nome}</td>
                      <td>{areas.preco}</td>
                      <td>{areas.situacao}</td>
                      </tr>
                  </table>
                             
                  </div>
                ))}

            </div>
        )
    }

}

export default CondAreasList;