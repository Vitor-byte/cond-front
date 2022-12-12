import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import AlterarCondomino from './pages/condominos/alterar-condomino/alterar-condomino.page';
import authService from './services/auth.service';
import CondominosListPage from './pages/condominos/condominos-list/condominos-list.page';
import IncluirCondomino from './pages/condominos/incluir-condomino/incluir-condomino.page';

import AvisosListPage from './pages/avisos/avisos-list/avisos-list.page';
import AlterarAviso from './pages/avisos/alterar-aviso/alterar-aviso.page';
import IncluirAviso from './pages/avisos/incluir-aviso/incluir-aviso.page';
import ConsultarAviso from './pages/avisos/consultar-aviso/consultar-aviso.page';


import ChamadosListPage from './pages/chamados/chamados-list/chamados-list.page';
import IncluirChamado from './pages/chamados/incluir-chamado/incluir-chamado.page';
import ChamadosDetailPage from './pages/chamados/consultar-chamado/consultar-chamado.page';
import ConsultarChamado from './pages/chamados/consultar-chamado/consultar-chamado.page';
import CondConsultarChamado from './pages/chamados/consultar-chamado/cond-consultar-chamado.page';



import ReservasListPage from './pages/areas/reservar-area/reserva-list.page';
import CancelarReserva from './pages/areas/reservar-area/cancelar-reserva.page';
import CondAreasList from './pages/areas/areas-list/cond-areas-list.page';
import AreasListPage from './pages/areas/areas-list/areas-list.page';
import IncluirArea from './pages/areas/incluir-area/incluir-area.page';
import ConsultarArea from './pages/areas/consultar-area/consultar-area.page';
import AlterarArea from './pages/areas/alterar-area/alterar-area.page';
import AtenderChamado from './pages/chamados/atender-chamado/atender-chamado.page';
import ReservarArea from './pages/areas/reservar-area/reservar-area.page';
import CondChamadosListPage from './pages/chamados/chamados-list/cond-chamados-list.page';
import CondAvisosListPage from './pages/avisos/avisos-list/cond-avisos-list.page';

import IncluirEnquete from './pages/enquetes/incluir-enquete/incluir-enquete.page';
import EnquetesListPage from './pages/enquetes/enquetes-list/enquetes-list.page';
import AlterarEnquete from './pages/enquetes/alterar-enquete/alterar-enquete.page';
import CondEnquetesListPage from './pages/enquetes/enquetes-list/cond-enquetes-list.page';
import VotarEnquete from './pages/enquetes/votar-enquete/votar-enquete.page';
import ErrorPage from './pages/home/erro404.page';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData : null,
      cond:false,
      sind:null,
    }
  }

  componentDidMount(){
    this.loadUserData()
  }
  
  loadUserData(){
    let userData = authService.getLoggedUser()
    if(userData){
     this.setState({ userData : userData })
     if(userData[0].tipo === 'Condomino'){
      this.setState({ cond : true })
 
   }
   if(userData[0].tipo === 'Sindico'){
    this.setState({ sind : true })

 }
  }
   
  }

  logout(){
    authService.clearLoggedUser();
    window.location.reload();
    this.props.history.push('/login')
  }
  render() {
    return (
      <BrowserRouter>
           <div>
            {(this.state.userData) ? (
                 <nav className="navbar navbar-expand-lg navbar-light bg-light"  >
                 <Link to="/" className="navbar-brand">Condôminio</Link>
                 <button className="navbar-toggler"
                   type="button"
                   data-toggle="collapse"
                   data-target="#navbarMenu"
                   aria-controls="navbarMenu">
                   <span className="navbar-toggler-icon"></span>
                 </button>
                 {this.state.cond && 
                   <div className="collapse navbar-collapse" id="navbarMenu">
                   <div className="navbar-nav">
                     <Link to="/" className="nav-item nav-link">Home</Link>
                     <Link to="/cond-areas-list" className="nav-item nav-link">Áreas</Link>
                     <Link to="/cond-avisos-list" className="nav-item nav-link">Avisos</Link>
                     <Link to="/cond-enquetes-list" className="nav-item nav-link">Enquetes</Link>
                     <Link to="/cond-chamados-list" className="nav-item nav-link">Meus chamados</Link>
                     <Link to="/reservas-list" className="nav-item nav-link">Minhas reservas</Link>


                  </div>
                   </div>
                 }
                {this.state.sind && 
                   <div className="collapse navbar-collapse" id="navbarMenu">
                   <div className="navbar-nav">
                     <Link to="/" className="nav-item nav-link">Home</Link>
                     <Link to="/areas-list" className="nav-item nav-link">Áreas</Link>
                     <Link to="/avisos-list" className="nav-item nav-link">Avisos</Link>
                     <Link to="/chamados-list" className="nav-item nav-link">Chamados</Link>
                     <Link to="/condominos-list" className="nav-item nav-link">Condôminos</Link>
                     <Link to="/enquetes-list" className="nav-item nav-link">Enquetes</Link>
        
                  </div>
                   </div>
                 }
              
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>{this.state.userData[0].nome}</h4>
                    <p>{this.state.userData[0].email}</p>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
                </nav>
              ) : null}
          </div> 
          
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()}/>}/>          
          <Route path="/condominos-list" component={CondominosListPage} />
          <Route path="/incluir-condomino" component={IncluirCondomino} />
          <Route path="/alterar-condomino/:id_usuario" component={AlterarCondomino} />


          <Route path="/avisos-list" component={AvisosListPage} />
          <Route path="/cond-avisos-list" component={CondAvisosListPage} />
          <Route path="/incluir-aviso" component={IncluirAviso} />
          <Route path="/alterar-aviso/:id_aviso" component={AlterarAviso} />
          <Route path="/consultar-aviso/:id_aviso" component={ConsultarAviso} />

          <Route path="/chamados-list" component={ChamadosListPage} />
          <Route path="/incluir-chamado" component={IncluirChamado} />
          <Route path="/atender-chamado/:id_chamado" component={AtenderChamado} />
          <Route path="/consultar-chamado/:id_chamado" component={ConsultarChamado} />
          <Route path="/cond-consultar-chamado/:id_chamado" component={CondConsultarChamado} />

          <Route path="/cond-chamados-list" component={CondChamadosListPage} />

          <Route path="/cond-areas-list" component={CondAreasList} />
          <Route path="/areas-list" component={AreasListPage} />
          <Route path="/incluir-area" component={IncluirArea} />
          <Route path="/alterar-area/:id_area_comum" component={AlterarArea} />
          <Route path="/consultar-area/:id_area_comum" component={ConsultarArea} />
          <Route path="/reservar-area/:id_area_comum" component={ReservarArea} />
          <Route path="/reservas-list" component={ReservasListPage} />
          <Route path="/consultar-reserva/:id_reserva" component={CancelarReserva} />

          <Route path="/enquetes-list" component={EnquetesListPage} />
          <Route path="/cond-enquetes-list" component={CondEnquetesListPage} />
          <Route path="/incluir-enquete" component={IncluirEnquete} />
          <Route path="/alterar-enquete/:id_enquete" component={AlterarEnquete} />
          <Route path="/votar-enquete/:id_enquete" component={VotarEnquete} />



          <Route path="/erro" component={ErrorPage} />

      </BrowserRouter>
    );
  }

}

export default App;
