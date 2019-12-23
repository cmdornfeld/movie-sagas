import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


// Styling for material-UI
const styles = theme => ({
  card: {
    fontSize: 16,
  }
});

class Home extends Component {

  // runs initial dispatch on page load with action type that will be caught by rootSaga (index.js)
  componentDidMount() {
    this.props.dispatch({type: 'GET_MOVIES'});
  }
  // triggered by click of img
  // dispatches 2 action types; both with a payload of the movie id as its id property
  // both actions will be caught by the rootSaga (index.js)
  goToDetails = (event, id) => {
    this.props.dispatch({type: 'GET_DETAILS', payload: {id: id}});
    this.props.dispatch({type: 'GET_GENRES', payload: {id: id}});
  }

  render() {
    return (
      <>
      {/* // map through our moviesReducer, creating a "movie" and "i" for each item of our moviesReducer array
          // assign a key to each div = to "i"
          // properties of each moviesReducer item can now be targeted by calling "movie"."propertyName" */}
          {this.props.movies.map((movie, i) => {
            return (
              <div className="card">
              <Card key={i} className={this.props.classes.card} >
                <CardContent>
                  <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                    <h2>{movie.title}</h2>
                  </Typography>
                  <br/>
                  {/* // on the click of the "movie.poster"/img, "link" user to the details page
                      // trigger goToDetails function with given parameters (event and the id of the movie clicked) */}
                  <Link to='/details'>
                  <img onClick={(event) => this.goToDetails(event, movie.id)} src={movie.poster}
                    alt={movie.title} /> 
                  </Link>
                  <Typography component="p">
                    {movie.description}
                  </Typography>
                </CardContent>
              </Card>
              </div>
            )
          })}
      </>
    );
  }
}

// the moviesReducer has been poplulated by our initial dispatch
// setting "movies:" = to our moviesReducer reduxState
const putReduxStateOnProps = (reduxState)=>({
  movies: reduxState.moviesReducer
});

// connecting our reduxState to Home component and exporting "Home" (imported on App.js)
export default connect(putReduxStateOnProps)(withStyles(styles)(Home));