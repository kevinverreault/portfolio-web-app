import React from 'react';
import './App.css';
import './index.css';
import './Header.css';
import SocialMediaList from './SocialMediaList';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavigationButton from './NavigationButton';
import Home from './Home';
import Faune from './Faune';
import Paysages from './Paysages';

export default class App extends React.Component {
  render(){
    return (
      
        <div className="App">
          <Router>
            <header>
                <div className="entete">
                    <h1 className="titre-principal">kevin verreault</h1>
                    <p className="description">photographie de la nature du québec</p>
                    <SocialMediaList />
                    <ul className="navigation">
                      <li>
                        <Link to="/" className="navigation-link">
                            <NavigationButton label="accueil" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/faune" className="navigation-link">
                          <NavigationButton label="faune" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/paysages" className="navigation-link">
                          <NavigationButton label="paysages" />
                        </Link>
                      </li>  
                    </ul>           
                </div>
            </header>
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
        </Router>
        </div>
        
    );
  }
}