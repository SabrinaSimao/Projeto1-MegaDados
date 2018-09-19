import axios from "axios";

export const registerUser = (user, callback) => {
   axios.post(`http://localhost:3002/api/user`, user).then(res => {
      callback();
   }).catch(err => {
     console.log(err); 
   });
};

export const checkLogin = (username, password, callback) => {
  const data  = {
    username,
    password
  };
     axios.post(`http://localhost:3002/api/check-login`, data).then(res => { 
      const result =  res.data.result[0][0];
      callback(result);
   }).catch(err => {
     console.log(err); 
   });
};

export const getRecipes = async (clientId) => {
  const data = {clientId};
  const res = await axios.post(`http://localhost:3002/api/get-recipes`, data);
  let list = res.data.result;
  const recipes = [];
  for(var i =0; i < list.length;i++) {
    const recipe = list[i];
    let value = 0;
    const postData = { recipeId: recipe.receita_id };
    const response = await axios.post(`http://localhost:3002/api/get-recipes-ingredients`, postData);
    let recipes_ingredients = response.data.result;
    for(var j=0; j < recipes_ingredients.length; j++){
      const both = recipes_ingredients[j];
      const lastData = { ingredientId: both.ingredientes_id };
      const result = await axios.post(`http://localhost:3002/api/ingredients`, lastData);
      const ingredient = result.data.result;
      if(ingredient[0].custo > value) {
        value = ingredient[0].custo;
      }
    }
    recipe.value = value;
    recipe.name = recipe.nome;
    recipes.push(recipe);
  }
  return recipes;
};

export const getIngredients = (callback) => {
  axios.post(`http://localhost:3002/api/ingredients`).then(res => {  
      callback(res.data.result);
   }).catch(err => {
     console.log(err); 
   });
};

export const createRecipe = (name,ingredients,clientId, callback) => {
  const data = {
    name,
    ingredients,
    clientId,
  }; 
    axios.post(`http://localhost:3002/api/recipe`, data).then(res => {   
      callback(1);
   }).catch(err => {
     console.log(err); 
      callback(0);
   });
};

export const removeRecipe = (id, callback) => {
  axios.post(`http://localhost:3002/api/remove-recipe`,{recipeId: id}).then(res => {  
      callback(res.data.result);
   }).catch(err => {
     console.log(err); 
   });
};

export const buyCredits = (clientId, value, callback) => {
  axios.post(`http://localhost:3002/api/buy-credits`,{clientId, value}).then(res => {     
      callback(res.data.result);
   }).catch(err => {
     console.log(err); 
   });
};

export const buyRecipe = (data,callback) => {
  axios.post(`http://localhost:3002/api/buy-recipe`,data).then(res => {    
    callback(res.data.result);
  }).catch(err => {
    console.log(err); 
  });
};

export const getBuys = async (clientId) => {
  const res = await axios.post(`http://localhost:3002/api/get-buys`,{clientId});
  let list  =  res.data.result;
  const buyings = [];
  for(var i = 0; i < list.length;i++) {
    const buy = list[i];
    let name = 'Aleatório';
    const response = await axios.post(`http://localhost:3002/api/get-buys-recipe`, { compras_id: buy.compras_id });
    const both = response.data.result;
    if(both.length > 0) {
      const recipeId=  both[0].receita_id;
      const result = await axios.post(`http://localhost:3002/api/get-specific-recipe`, { recipeId });
      const recipes = result.data.result;
      const recipe = recipes[0];
      name  = recipe.nome;
    }         
    buy.recipe = name;
    buyings.push(buy);
  }  
  return buyings;
};