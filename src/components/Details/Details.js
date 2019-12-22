import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {

  backToHome = () => {
    this.props.history.push('/');
  }

  editDetails = (event, id) => {
    this.props.history.push('/edit')
  }

  render() {
    return (
        <>
          <button onClick={this.backToHome}>Back to Home</button>
          <button onClick={(event) => this.editDetails(event, this.props.details[0])}>Edit</button>
          {JSON.stringify(this.props.details[0])}
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