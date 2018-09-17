import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";
import Login from './login';
import Home from './Home';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

     };
  }


  render() {
    const { props, state, setAfterLoginPath } = this;
    return <Grid className='App' fluid>
        <Row>
          <div className="app-container">
            <div className="app-body">
              <BrowserRouter>
                <Switch>
                  <Route exact name="index" path="/" component={Login} />
                  <Route exact name="home" path="/home" component={Home} />
                  <Route path="/login" component={Login} {...props} {...state} />
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </Row>
      </Grid>;
  }
}

export default App;


