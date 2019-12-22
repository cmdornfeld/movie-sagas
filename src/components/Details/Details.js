import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {

  render() {
    return (
        <>
          {this.props.details.map((movie, i) => {
            return (
              <div key={i}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            )
          })}
            <h3>Genres:</h3>
            <ul>
              {this.props.genres.map((genre,i) => {
                return <li key={i}>{genre.name}</li>
              })}
            </ul>
        </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
    details: reduxState.detailsReducer,
    genres: reduxState.genresReducer
});
  
export default connect(putReduxStateOnProps)(Details);