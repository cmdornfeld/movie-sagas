import React, { Component } from 'react';
import {connect} from 'react-redux';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'GET_MOVIES'});
  }

  render() {
    return (
      <>
          <h1>Movies</h1>
          {this.props.reduxState.map((movie, i) => {
            return (
              <div key={i}>
                <h2>{movie.title}</h2>
                <br/>
                <img src={movie.poster} />
                <p>{movie.description}</p>
              </div>
            )
          })}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.moviesReducer
});
  
export default connect(putReduxStateOnProps)(Home);