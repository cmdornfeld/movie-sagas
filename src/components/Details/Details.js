import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Styling for material-UI
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Details extends Component {

  // triggered by click of Back to Home button
  // returns user to Home page
  backToHome = () => {
    this.props.history.push('/');
  }

  // triggerd by click of Edit button
  // pushes user to the Edit component with an id = to the movie id
  editDetails = (event, id) => {
    this.props.history.push('/edit')
  }

  render() {
    return (
        <>
          <Button className={this.props.classes.button} onClick={this.backToHome} variant="contained" color="secondary">
            Back to Home
          </Button>
          <Button className={this.props.classes.button} onClick={(event) => this.editDetails(event, this.props.details[0].id)}
            variant="contained" color="primary">
              Edit
          </Button>
          {/* // map through our detailsReducer, creating a "movie" and "i" for the item in our detailsReducer array
              // assign a key to the div = to "i"
              // properties of the detailsReducer item can now be targeted by calling "movie"."propertyName" */}
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
              {/* // map through our genresReducer, creating a "genre" and "i" for each item of our genresReducer array
                  // assign a key to each div = to "i"
                  // name property of each genresReducer item can now be targeted by calling "genres"."name" */}
              {this.props.genres.map((genre,i) => {
                return <li key={i}>{genre.name}</li>
              })}
            </ul>
        </>
    );
  }
}

// the detailsReducer has been poplulated by our dispatch action of GET_DETAILS
// the genresReducer has been poplulated by our dispatch action of GET_GENRES
// setting "details:" = to our detailsReducer reduxState
// setting "genres:" = to our genresReducer reduxState
const putReduxStateOnProps = (reduxState)=>({
    details: reduxState.detailsReducer,
    genres: reduxState.genresReducer
});

// connecting our reduxState to Details component and exporting "Details" (imported on App.js)
export default connect(putReduxStateOnProps)(withStyles(styles)(Details));