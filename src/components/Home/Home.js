import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'GET_MOVIES'});
  }

  goToDetails = (event, id) => {
    this.props.dispatch({type: 'GET_DETAILS', payload: {id: id}});
    this.props.dispatch({type: 'GET_GENRES', payload: {id: id}});
  }

  render() {
    return (
      <>
          <h1>Movies</h1>
          {this.props.movies.map((movie, i) => {
            return (
              <div key={i}>
                <h2>{movie.title}</h2>
                <br/>
                <Link to='/details'>
                  <img onClick={(event) => this.goToDetails(event, movie.id)} src={movie.poster} /> 
                </Link>
                <p>{movie.description}</p>
              </div>
            )
          })}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  movies: reduxState.moviesReducer
});
  
export default connect(putReduxStateOnProps)(Home);