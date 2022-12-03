

import React from "react";
import authService from "../../services/auth.service";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Iniciando o state com os valores dos campos vazios
    this.state = {
      email: "",
      senha: "",
    };
  }

  // Função responsável por realizar o login
  async sendLogin(event) {
    event.preventDefault();

    const data = {
      email: this.state.email,
      senha: this.state.senha,
    };

    if (!data.email || data.email == "") {
      window.alert("E-mail é obrigatório");
      return;
    }

    if (!data.senha || data.senha == "") {
      window.alert("Senha é obrigatória");
      return;
    }

    try {
      console.log(data)

      let res = await authService.sendLogin(data);
      console.log(res)

      authService.setLoggedUser(res.data);
      this.props.onLogin();
      this.props.history.replace("/");
    } catch (error) {
      console.log("error", error)
      window.alert("Não foi possível efetuar o login.");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={(e) => this.sendLogin(e)}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Insira seu email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input
                  type="senha"
                  className="form-control"
                  id="senha"
                  placeholder="Insira sua senha"
                  value={this.state.senha}
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

