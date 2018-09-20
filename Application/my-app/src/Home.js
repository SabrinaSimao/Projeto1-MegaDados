import React from "react";
import './App.css';
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { Grid, Row, Col, Button, Modal } from "react-bootstrap";
import {checkLogin} from './proxy';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from './Table';
import Dock from 'react-dock';
import CreateRecipe from './CreateRecipe';
import BuyCredits from './BuyCredits';

const recipeColumns = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Valor",
    accessor: "value"
  },
  {
    Header: "Comprar",
    accessor: "buy"
  },
  {
    Header: "Excluir",
    accessor: "exclude"
  }
];

const historicColumns = [
  {
    Header: "Valor",
    accessor: "custo"
  },
  {
    Header: "Receita",
    accessor: "recipe"
  },
  {
    Header: "Data",
    accessor: "data_pagamento"
  },
];


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichDock: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleCreateRecipe = this.handleCreateRecipe.bind(this);   
    this.closeDock = this.closeDock.bind(this);
  }
  

  closeModal() {
    this.setState({whichDock: null});
    this.fillRecipesTable(this.props.user.cliente_id);
  }

  handleCreateRecipe(whichDock) {
    this.setState({ whichDock });
  }

  closeDock(arg){
    this.setState({whichDock: null});
    if(arg === 'recipe'){
      this.props.getRecipes(this.props.user.cliente_id);
    } else if(arg === 'credits') {
        checkLogin(this.props.user.username, this.props.user.senha, (res) => {
          if(res) {     
            this.props.setUser(res);
          } else {
            alert('Erro ao adicionar valor ao usuario logado');
          }  
        });
    }
  }

  render() {
    if(!this.props.user) {
      browserHistory.push("/login"); 
    }
    const user = this.props.user || {};
    const clientId = user.cliente_id;
    return <div className="Home">
        <Grid fluid>
          <Row>
            <Col style={{ height: "100vh" }} md={9}>
              <div style={{ textAlign: "center" }}>
                <h1 className="hello"> Olá, {user.nome}! </h1>
              </div>
              <Button 
                style={{ backgroundColor: "white" }}
                onClick={() => this.handleCreateRecipe("recipe")}>
                Criar Receita
              </Button>
              <Button
                style={{ backgroundColor: "white", marginLeft: "15px" }}
                onClick={() => this.handleCreateRecipe("balance")}
              >
                Comprar Saldo
              </Button>
              <h3 style={{ padding: "1em" }}> Receitas Salvas </h3>
              <Table data={this.props.recipes} columns={recipeColumns} showPagination={true} results={8} />
            </Col>
            <Col style={{ backgroundColor: "lightblue", height: "100vh" }} md={3}>
              <div style={{ padding: "20px", color: "white", fontWeight: "500" }}>
                <h4> Histórico de Compras </h4>
              </div>
              <Table data={this.props.buyings} columns={historicColumns} showPagination={false} results={13} />
            </Col>
          </Row>
        </Grid>
        <div className="saldo">Seu saldo: {user.saldo} R$</div>
        <Dock position="left" isVisible={this.state.whichDock}>         
          <div
            style={{textAlign:'right', cursor: 'pointer', padding:'15px'}}
            onClick={() =>
              this.setState({ whichDock: !this.state.whichDock })}
          >
            X
          </div>
          {
            this.state.whichDock === 'recipe' ?
              <CreateRecipe
                close={this.closeDock}
                clientId={clientId}
              />
              :
              <BuyCredits
                close={this.closeDock}
                clientId={clientId}
              />
          }
        </Dock>
      </div>;
  }
}

export default Home;
