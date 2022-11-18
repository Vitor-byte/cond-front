import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import CondominosDetailPage from './pages/condomino-detail/condomino-detail.page';
import CondominosEditPage from './pages/condomino-edit/condominos-edit.page';
import authService from './services/auth.service';
import CondominosListPage from './pages/condominos-list/condominos-list.page';

import AvisosListPage from './pages/avisos/avisos-list/avisos-list.page';
import AvisosEditPage from './pages/avisos/aviso-edit/avisos-edit.page';
import AvisosDetailPage from './pages/avisos/aviso-detail/avisos-detail.page';

import ChamadosListPage from './pages/chamados/chamados-list/chamados-list.page';
import ChamadosEditPage from './pages/chamados/chamado-edit/chamado-edit.page';
import ChamadosDetailPage from './pages/chamados/chamado-detail/chamado-detail.page';



import ReservasListPage from './pages/chamados/chamados-list/chamados-list.page';
import ResservasEditPage from './pages/areas/reservas-edit/reservas-edit.page';

import AreasListPage from './pages/areas/areas-list/areas-list.page';
import AreasEditPage from './pages/areas/areas-edit/areas-edit.page';
import AreasDetailPage from './pages/areas/areas-detail/areas-detail.page';

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
              <Link to="/home" className="nav-item nav-link">Home</Link>
              <Link to="/condominos-list" className="nav-item nav-link">Condôminos</Link>
              <Link to="/avisos-list" className="nav-item nav-link">Avisos</Link>
              <Link to="/chamados-list" className="nav-item nav-link">Chamados</Link>
              <Link to="/areas-list" className="nav-item nav-link">Areas</Link>

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
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()}/>}/>
          <Route path="/condominos-list" component={CondominosListPage} />
          <Route path="/condominos-add" component={CondominosEditPage} />
          <Route path="/condominos-edit/:id_usuario" component={CondominosEditPage} />
          <Route path="/condominos-detail/:id_usuario" component={CondominosDetailPage} />
          <Route path="/condomino-add" component={CondominosEditPage} />

          <Route path="/avisos-list" component={AvisosListPage} />
          <Route path="/avisos-add" component={AvisosEditPage} />
          <Route path="/avisos-edit/:id_aviso" component={AvisosEditPage} />
          <Route path="/avisos-detail/:id_aviso" component={AvisosDetailPage} />

          <Route path="/chamados-list" component={ChamadosListPage} />
          <Route path="/chamados-add" component={ChamadosEditPage} />
          <Route path="/chamados-edit/:id_chamado" component={ChamadosEditPage} />
          <Route path="/chamados-detail/:id_chamado" component={ChamadosDetailPage} />

          <Route path="/areas-list" component={AreasListPage} />
          <Route path="/areas-add" component={AreasEditPage} />
          <Route path="/areas-edit/:id_area_comum" component={AreasEditPage} />
          <Route path="/areas-detail/:id_area_comum" component={AreasDetailPage} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
