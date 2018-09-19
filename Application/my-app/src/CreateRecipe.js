import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import { FormControl, Button} from "react-bootstrap";
import { getIngredients, createRecipe} from './proxy';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredients: [],
      ingredients: [],
      recipeName: null,
    };
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.getBiggestPrice = this.getBiggestPrice.bind(this);   
    this.createRecipe = this.createRecipe.bind(this);
    this.handleRecipeName = this.handleRecipeName.bind(this);
    
  }

  componentDidMount() {
    getIngredients((res) => {
      console.log(res);
      this.setState({ingredients: res});
    });
  }

  createRecipe() {
    const name =  this.state.recipeName;
    const selectedIngredients= this.state.selectedIngredients;
    const clientId = this.props.clientId;
    createRecipe(name,selectedIngredients,clientId, (res) => {
      if(res){
        this.props.close('recipe');
      }else {
        alert('Erro ao tentar criar receita');
      }
    });
  }

  getBiggestPrice() {
    let biggestPrice = 0;
    this.state.selectedIngredients.map((recipeId) => {
      const recipe = this.state.ingredients.filter(e => e.ingredientes_id === recipeId)[0];
      const price =  recipe.custo;
      if(price >  biggestPrice){
        biggestPrice = price;
      }
    });
    return biggestPrice;
  }


  handleRecipeClick(id) {
    const state =  this.state;
    if(state['selectedIngredients'].includes(id)) {
      state["selectedIngredients"] = state["selectedIngredients"].filter(e => e != id);
    } else {
       state["selectedIngredients"].push(id);
    } 
    this.setState(state);
  }

  handleRecipeName(e){
    this.setState({recipeName: e.target.value});
  }

  render() {
    return (
      <div style={{padding:'15px', textAlign:'left'}}>
        <div style={{paddingBottom:'25px'}}>
          <span><strong> Qual o nome da receita ? </strong></span>
          <FormControl
            placeholder='nome da sua receita'
            onChange={this.handleRecipeName}
          />
        </div>
        <div>
          <span> <strong>Escolha os ingredientes</strong> </span>
          <div style={{paddingTop:'20px', display: 'flex-wrap'}}>
            {
              this.state.ingredients.map((recipe) => (
                  <Button 
                    onClick={() => this.handleRecipeClick(recipe.ingredientes_id)}
                    style={{
                      backgroundColor:  this.state.selectedIngredients.includes(recipe.ingredientes_id) ? 'pink' : 'white',
                      marginLeft: '5px', marginRight:'5px', marginBottom:'5px'
                    }}
                  >
                    {recipe.nome} R$ {recipe.custo},00
                  </Button>
                ))
            }
          </div>
        </div>
        <div style={{paddingTop:'3em', fontSize:'1.5em', paddingBottom:'2.3em'}}>
          <strong> Preço Atual: {this.getBiggestPrice()},00 </strong>
        </div>
        <div style={{
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
        }}>
        <Button 
          onClick={this.createRecipe}
          style={{fontSize:'1.3em'}}>
          Salvar
        </Button>
        </div>
      </div>
    );
  }
}

export default CreateRecipe;
