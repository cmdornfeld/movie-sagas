import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from '../Home/Home';
import Details from '../Details/Details';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <h1 className="header">Movie Search</h1>
          <Route exact path="/" component={ Home }/>
          <Route path="/details" component={ Details }/>
        </Router>
      </div>
    );
  }
}

export default App;
