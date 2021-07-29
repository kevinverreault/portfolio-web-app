import React from 'react';
import './App.css';
import './index.css';
import './Header.css';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Faune from './Faune';
import Paysages from './Paysages';
import NavigationHeader from './NavigationHeader';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
          <NavigationHeader />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/faune">
              <Faune />
            </Route>
            <Route path="/paysages">
              <Paysages />
            </Route>
          </Switch>
        <footer>
          <span>© 2021 Kevin Verreault</span>
        </footer>
      </div>
    );
  }
}