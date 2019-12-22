import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <h1 className="header">Movies</h1>
          <Route exact path="/" component={ Home }/>
          <Route path="/details" component={ Details }/>
          <Route path='/edit' component={ Edit } />
        </Router>
      </div>
    );
  }
}

export default App;
