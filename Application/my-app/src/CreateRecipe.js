import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import { FormControl, Button} from "react-bootstrap";

const recipes = [
  {name:'hugo', value: 1, amount: 100},
  {name:'hugo', value: 2, amount: 200},
  {name:'hugo', value: 3, amount: 300},
  {name:'hugo', value: 4, amount: 400},
  {name:'hugo', value: 5, amount: 500},
  {name:'hugo', value: 6, amount: 500},
  {name:'hugo', value: 7, amount: 700},
];

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipes: [],
    };
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.getBiggestPrice = this.getBiggestPrice.bind(this);   
  }

  getBiggestPrice() {
    let biggestPrice = 0;
    this.state.selectedRecipes.map((recipeId) => {
      const recipe = recipes.filter(e => e.value === recipeId)[0];
      const price =  recipe.amount;
      if(price >  biggestPrice){
        biggestPrice = price;
      }
    });
    return biggestPrice;
  }


  handleRecipeClick(id) {
    const state =  this.state;
    if(state['selectedRecipes'].includes(id)) {
      state["selectedRecipes"] = state["selectedRecipes"].filter(e => e != id);
    } else {
       state["selectedRecipes"].push(id);
    } 
    this.setState(state);
  }

  render() {
    return (
      <div style={{padding:'15px', textAlign:'left'}}>
        <div style={{paddingBottom:'25px'}}>
          <span><strong> Qual o nome da receita ? </strong></span>
          <FormControl
            placeholder='nome da sua receita'
          />
        </div>
        <div>
          <span> <strong>Escolha os ingredientes</strong> </span>
          <div style={{paddingTop:'20px', display: 'flex-wrap'}}>
            {
              recipes.map((recipe) => (
                  <Button 
                    onClick={() => this.handleRecipeClick(recipe.value)}
                    style={{
                      backgroundColor:  this.state.selectedRecipes.includes(recipe.value) ? 'pink' : 'white',
                      marginLeft: '5px', marginRight:'5px', marginBottom:'5px'
                    }}
                  >
                    {recipe.name} R$ {recipe.amount/100},00
                  </Button>
                ))
            }
          </div>
        </div>
        <div style={{paddingTop:'3em', fontSize:'1.5em', paddingBottom:'2.3em'}}>
          <strong> Preço Atual: {this.getBiggestPrice()/100},00 </strong>
        </div>
        <div style={{
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
        }}>
        <Button style={{fontSize:'1.3em'}}>
          Salvar
        </Button>
        </div>
      </div>
    );
  }
}

export default CreateRecipe;
