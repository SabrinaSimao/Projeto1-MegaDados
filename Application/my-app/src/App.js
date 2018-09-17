import React, { Component } from 'react';
import logo from './logo.svg';
import Select from 'react-select';
import './App.css';
import {FormControl, Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistering: false
    };
    this.changePage = this.changePage.bind(this);

  }

  changePage() {
    this.setState({isRegistering: !this.state.isRegistering});
  }

  render() {
    const title = this.state.isRegistering ? 'Criando Conta' : 'Login';
    return <div className="App">
        <div>
          <h1 style={{ padding: "1em" }}> {title} </h1>
          <div className="flex-row-center">
            <div style={{ paddingBottom: "1em" }}>
              {this.state.isRegistering ? <div>
                  <FormControl style={{ maxWidth: "20em", margin: "20px 0 20px 0" }} placeholder={"Digite seu nome"} />
                  <div>
                    <span> Data de nascimento: </span>
                    <DayPickerInput 
                      onDayChange={day => console.log(day)}
                    />
                  </div>
                  <FormControl style={{ maxWidth: "20em", margin: "20px 0 20px 0" }} placeholder={"Digite seu usuário"} />
                  <FormControl style={{ maxWidth: "20em", margin: "20px 0 20px 0" }} placeholder={"Digite sua senha"} />
                  <div style={{ paddingBottom: "15px" }}>
                    <Button
                      style={{ backgroundColor: "white", width: "10em" }}
                    >
                      Criar
                    </Button>
                  </div>
                  <div>
                    <Button onClick={this.changePage} style={{ backgroundColor: "white", width: "10em" }}>
                      Voltar
                    </Button>
                  </div>
                </div> : <div>
                  <FormControl style={{ maxWidth: "20em", margin: "20px 0 20px 0" }} placeholder={"Digite seu usuário"} />
                  <FormControl style={{ maxWidth: "20em", margin: "20px 0 20px 0" }} placeholder={"Digite sua senha"} />
                  <div style={{ paddingBottom: "15px" }}>
                    <Button
                      style={{ backgroundColor: "white", width: "10em" }}
                    >
                      Entrar
                    </Button>
                  </div>
                  <div>
                    <Button onClick={this.changePage} style={{ backgroundColor: "white", width: "10em" }}>
                      Criar conta
                    </Button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>;
  }
}

export default App;
