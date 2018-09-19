import React, { Component } from "react";
import logo from "./logo.svg";
import Select from "react-select";
import { browserHistory } from "react-router";
import { FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { _ } from "underscore";
import { registerUser, checkLogin } from "./proxy";

const initialState = {
  isRegistering: false,
  username: null,
  gender: null,
  name: null,
  password: null,
  birthday: null
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.changePage = this.changePage.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.formControlHandler = this.formControlHandler.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  changePage() {
    const state = initialState;
    state["isRegistering"] = !this.state.isRegistering;
    this.setState(state);
  }

  formControlHandler(e, key) {
    const state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  handleSelect(e, key) {
    const state = this.state;
    state[key] = e.value;
    this.setState(state);
  }

  handleDayChange(day) {
    const state = this.state;
    state["birthday"] = day.toISOString().split("T")[0];
    this.setState(state);
  }

  handleRegister() {
    const validations = _.omit(this.state, "isRegistering");
    let isValid = true;
    Object.keys(validations).map(key => {
      if (!validations[key]) {
        isValid = false;
      }
    });
    if (!isValid) {
      return alert("Preencha todos os campos");
    } else {
      registerUser(validations, () => {
        this.changePage();
      });
    }
  }

  handleLogin() {
    checkLogin(this.state.username, this.state.password, (res) => {
      if(res) {       
        this.props.setUser(res);
        browserHistory.push("/home"); 
      } else {
        alert('Email ou senha não válidos');
      }  
    });
  }

  render() {
    const title = this.state.isRegistering ? "Criando Conta" : "Login";
    return (
      <div className="App">
        <div>
          <h1 style={{ padding: "1em" }}> {title} </h1>
          <div className="flex-row-center">
            <div style={{ paddingBottom: "1em" }}>
              {this.state.isRegistering ? (
                <div>
                  <FormControl
                    style={{ maxWidth: "20em", margin: "20px 0 20px 0" }}
                    placeholder={"Digite seu nome"}
                    onChange={e => this.formControlHandler(e, "name")}
                  />
                  <div style={{ paddingBottom: "30px" }}>
                    <span> Data de nascimento: </span>
                    <DayPickerInput
                      onDayChange={day => this.handleDayChange(day)}
                    />
                  </div>
                  <Select
                    placeholder="Selecione seu gênero"
                    onChange={e => this.handleSelect(e, "gender")}
                    options={[
                      { label: "feminino", value: "F" },
                      { label: "masculino", value: "M" }
                    ]}
                  />
                  <FormControl
                    style={{ maxWidth: "20em", margin: "20px 0 20px 0" }}
                    placeholder={"Digite seu usuário"}
                    onChange={e => this.formControlHandler(e, "username")}
                  />
                  <FormControl
                    style={{ maxWidth: "20em", margin: "20px 0 20px 0" }}
                    placeholder={"Digite sua senha"}
                    onChange={e => this.formControlHandler(e, "password")}
                  />
                  <div style={{ paddingBottom: "15px" }}>
                    <Button
                      style={{ backgroundColor: "white", width: "10em" }}
                      onClick={this.handleRegister}
                    >
                      Criar
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={this.changePage}
                      style={{ backgroundColor: "white", width: "10em" }}
                    >
                      Voltar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <FormControl
                    style={{ maxWidth: "20em", margin: "20px 0 20px 0" }}
                    placeholder={"Digite seu usuário"}
                    onChange={e => this.formControlHandler(e, "username")}
                  />
                  <FormControl
                    style={{ maxWidth: "20em", margin: "20px 0 20px 0" }}
                    type={'password'}
                    placeholder={"Digite sua senha"}
                    onChange={e => this.formControlHandler(e, "password")}
                  />
                  <div style={{ paddingBottom: "15px" }}>
                    <Button
                      style={{ backgroundColor: "white", width: "10em" }}
                      onClick={this.handleLogin}
                    >
                      Entrar
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={this.changePage}
                      style={{ backgroundColor: "white", width: "10em" }}
                    >
                      Criar conta
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
