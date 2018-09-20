import React from "react";
import PropTypes from "prop-types";
import Home from './Home';
import { getRecipes, removeRecipe, buyRecipe, getBuys, checkLogin } from "./proxy";
import {Button} from 'react-bootstrap';
import moment from 'moment';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
      buyings: [],
     };
     this.getRecipes = this.getRecipes.bind(this);
     this.removeRecipe = this.removeRecipe.bind(this);
     this.handleBuyRecipe = this.handleBuyRecipe.bind(this);  
     this.getBuys = this.getBuys.bind(this);
  }

  componentDidMount() {
    if(this.props.user){
      this.getRecipes(this.props.user.cliente_id);
      this.getBuys(this.props.user.cliente_id);
    }
  }

  async getBuys(clientId) {
   const res = await getBuys(clientId);
   this.setState({ buyings: res });
  }

  removeRecipe(id){
    removeRecipe(id, () => {
      this.getRecipes(this.props.user.cliente_id);
    });
  }

  handleBuyRecipe(recipe) {
    if(recipe.value >  this.props.user.saldo) {
      return alert("Adicione saldo a sua conta para poder comprar essa receita");
    } 
    const data = {
      cliente_id: this.props.user.cliente_id,
      data_pagamento: moment().format('YYYY/MM/DD'),
      custo: recipe.value,
      recipe_id: recipe.receita_id,
    };

    buyRecipe(data, (res) => {
      this.getBuys(this.props.user.cliente_id);
        checkLogin(this.props.user.username, this.props.user.senha, (res) => {
          if(res) {            
            this.props.setUser(res);
          } else {
            alert('Erro ao adicionar valor ao usuario logado');
          }  
        });
    });
    
  }

  async getRecipes(clientId) {   
    let res = await getRecipes(clientId);
    res = res.map(recipe => {
      recipe.buy = <Button onClick={() => this.handleBuyRecipe(recipe)} style={{ backgroundColor: "white" }}>
          {" "}
          Comprar{" "}
        </Button>;
      recipe.exclude = <Button onClick={() => this.removeRecipe(recipe.receita_id)} style={{ backgroundColor: "white" }}>
          {" "}
          Excluir{" "}
        </Button>;
      return recipe;
    });
    this.setState({ recipes: res });
  }


  render() {
    return (
       <div>
         <Home
            user = {this.props.user}
            getRecipes={this.getRecipes}
            recipes={this.state.recipes}
            setUser={this.props.setUser}
            buyings={this.state.buyings}
         />
      </div>);
  }
}

export default HomePage;


