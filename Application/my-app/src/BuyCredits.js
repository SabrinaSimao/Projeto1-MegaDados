import React from "react";
import PropTypes from "prop-types";
import { FormControl, Button } from 'react-bootstrap';
import "./App.css";

class BuyCredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToBuy: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.buyCredits = this.buyCredits.bind(this);
  }

  handleChange(e){
    this.setState({valueToBuy: e.value});
  }

  buyCredits() {
    if(this.state.valueToBuy < 10){
      alert("O valor deve ser maior que 10 reais");
    } else {
      console.log('comprooou');
    }
  }

  render() {
    return(
      <div>
        <div style={{paddingTop:'7em', paddingLeft:'40px', paddingRight:'40px', paddingBottom:'4em'}}>
            <h4> Qual valor deseja adicionar? </h4>
            <FormControl 
              placeholder="valor minimo 10 reais" 
              value={this.state.valueToBuy} 
              onChange={this.handleChange} 
              type={'number'}
            />
        </div>
        <div style={{
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
        }}>
          <Button 
            onClick={this.buyCredits}
            style={{fontSize:'1.2em'}}>
            Comprar
          </Button>
        </div>
      </div>
      );
  }
}

export default BuyCredits;
