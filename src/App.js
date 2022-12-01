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

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData : null
    }
  }

  componentDidMount(){
    this.loadUserData()
  }
  
  loadUserData(){
    let userData = authService.getLoggedUser()
    if(userData){
      this.setState({ userData : userData })
    }
  }

  logout(){
    authService.clearLoggedUser();
    window.location.reload();
  }

  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Condominio</Link>
          <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenu"
            aria-controls="navbarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/condominos-list" className="nav-item nav-link">Condôminos</Link>
              <Link to="/avisos-list" className="nav-item nav-link">Avisos</Link>
              <Link to="/chamados-list" className="nav-item nav-link">Chamados</Link>
              <Link to="/cond-chamados-list" className="nav-item nav-link">Chamados cond</Link>
              <Link to="/areas-list" className="nav-item nav-link">Areas</Link>
              <Link to="/cond-areas-list" className="nav-item nav-link">Areas cond</Link>
              <Link to="/reservas-list" className="nav-item nav-link">Reservas cond</Link>

            </div>
            {(this.state.userData) ? (
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>{this.state.userData.name}</h4>
                    <p>{this.state.userData.email}</p>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
              ) : null}
          </div>
        </nav>
     
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()}/>}/>
          <Route path="/condominos-list" component={CondominosListPage} />
          <Route path="/incluir-condomino" component={IncluirCondomino} />
          <Route path="/alterar-condomino/:id_usuario" component={AlterarCondomino} />


          <Route path="/avisos-list" component={AvisosListPage} />
          <Route path="/incluir-aviso" component={IncluirAviso} />
          <Route path="/alterar-aviso/:id_aviso" component={AlterarAviso} />
          <Route path="/consultar-aviso/:id_aviso" component={ConsultarAviso} />

          <Route path="/chamados-list" component={ChamadosListPage} />
          <Route path="/incluir-chamado" component={IncluirChamado} />
          <Route path="/atender-chamado/:id_chamado" component={AtenderChamado} />
          <Route path="/consultar-chamado/:id_chamado" component={ConsultarChamado} />
          <Route path="/cond-chamados-list/:id_chamado" component={CondChamadosListPage} />

          <Route path="/cond-areas-list" component={CondAreasList} />
          <Route path="/areas-list" component={AreasListPage} />
          <Route path="/incluir-area" component={IncluirArea} />
          <Route path="/alterar-area/:id_area_comum" component={AlterarArea} />
          <Route path="/consultar-area/:id_area_comum" component={ConsultarArea} />
          <Route path="/reservar-area/:id_area_comum" component={ReservarArea} />
          <Route path="/reservas-list" component={ReservasListPage} />
          <Route path="/cancelar-reserva/:id_reserva" component={CancelarReserva} />

      </BrowserRouter>
    );
  }

}

export default App;
