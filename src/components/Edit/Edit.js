import React, { Component } from 'react';
import {connect} from 'react-redux';

class Edit extends Component {

    state = {
        title: '',
        description: '',
        id: this.props.reduxState.detailsReducer.id
    }

    backToDetails = () => {
        this.props.history.push('/details');
    }

    handleChange = (event, propertyName) => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    // editMovieInfo = (event, id) => {
    //     this.props.dispatch({type: 'EDIT_MOVIE'})
    // }

    render(){
        return (
            <>
                <p>Edit page</p>
                <input onChange={(event) => this.handleChange(event, 'title')} type="text" placeholder="title" />
                <input onChange={(event) => this.handleChange(event, 'description')} type="text" placeholder="description" />
                <button onClick={this.backToDetails}>Cancel</button>
                {/* <button onClick={this.editMovie(this.props.reduxState.moviesReducer.id)}>Save</button> */}
                {JSON.stringify(this.props.reduxState.detailsReducer.id)}
            </>
        )
    }
}

const putReduxStateOnProps = (reduxState)=>({
    reduxState
});

export default connect(putReduxStateOnProps)(Edit)