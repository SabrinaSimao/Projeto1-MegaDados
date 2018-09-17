import React from "react";
import './App.css';
import PropTypes from "prop-types";
import { Grid, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from './Table';
import Dock from 'react-dock';
import CreateRecipe from './CreateRecipe';
import BuyCredits from './BuyCredits';

const recipeData = [
  {
    name: 'Frutas Vermelhas',
    value: 21500,
    buy: <Button style={{backgroundColor:'white'}}> Comprar </Button>,
    exclude: <Button style={{backgroundColor:'white'}}>  Excluir </Button>
  }
]

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

const historicData = [
  {
    recipe: "Frutas Vermelhas",
    value: 21500,
    date: '2018-07-07',
  }
];

const historicColumns = [
  {
    Header: "Valor",
    accessor: "value"
  },
  {
    Header: "Receita",
    accessor: "recipe"
  },
  {
    Header: "Data",
    accessor: "date"
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
  }

  componentDidMount(){

  }

  closeModal() {
    this.setState({whichDock: null});
  }

  handleCreateRecipe(whichDock) {
    this.setState({ whichDock });
  }

  render() {
    return <div className="Home">
        <Grid fluid>
          <Row>
            <Col style={{ height: "100vh" }} md={9}>
              <div style={{ textAlign: "center" }}>
                <h1 className="hello"> Olá, Maurício! </h1>
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
              <Table data={recipeData} columns={recipeColumns} showPagination={true} results={8} />
            </Col>
            <Col style={{ backgroundColor: "lightblue", height: "100vh" }} md={3}>
              <div style={{ padding: "20px", color: "white", fontWeight: "500" }}>
                <h4> Histórico de Compras </h4>
              </div>
              <Table data={historicData} columns={historicColumns} showPagination={false} results={13} />
            </Col>
          </Row>
        </Grid>
        <div className="saldo">Seu saldo: 200,00 R$</div>
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
              <CreateRecipe/>
              :
              <BuyCredits/>
          }
        </Dock>
      </div>;
  }
}

export default Home;
