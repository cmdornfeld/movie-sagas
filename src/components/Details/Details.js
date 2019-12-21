import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {



  render() {
    return (
        <>
          {this.props.reduxState.detailsReducer.map((movie, i) => {
            return (
              <div key={i}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            )
          })}
        </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Details);