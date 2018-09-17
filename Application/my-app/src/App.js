import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";
import LoginContainer from './LoginContainer';
import HomeContainer from './HomeContainer';
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./redux/reducer";

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const allReducers = combineReducers({
  user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);




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
            <Provider store={store}>
              <BrowserRouter>
                <Switch>
                  <Route exact name="index" path="/" component={LoginContainer} />
                  <Route exact name="home" path="/home" component={HomeContainer} />
                  <Route path="/login" component={LoginContainer} {...props} {...state} />
                </Switch>
              </BrowserRouter>
            </Provider>
            </div>
          </div>
        </Row>
      </Grid>;
  }
}

export default App;


