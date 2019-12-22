import React, { Component } from 'react';
import {connect} from 'react-redux';

class Edit extends Component {

    state = {
        title: '',
        description: '',
        id: this.props.details[0].id
    }

    backToDetails = () => {
        this.props.history.push('/details');
    }

    handleChange = (event, propertyName) => {
        console.log(event.target.value);
        
        this.setState({
            [propertyName]: event.target.value
        })
    }

    editMovieInfo = (event, id) => {
        console.log(this.state);
        this.props.dispatch({type: 'EDIT_MOVIE', payload: this.state})
        this.props.history.push('/details');
    }

    render(){
        return (
            <>
                <p>Edit page</p>
                <input onChange={(event) => this.handleChange(event, 'title')} type="text" placeholder="title" />
                <input onChange={(event) => this.handleChange(event, 'description')} type="text" placeholder="description" />
                <button onClick={this.backToDetails}>Cancel</button>
                <button onClick={this.editMovieInfo}>Save</button>
                {JSON.stringify(this.props.details[0].id)}
            </>
        )
    }
}

const putReduxStateOnProps = (reduxState)=>({
    details: reduxState.detailsReducer
});

export default connect(putReduxStateOnProps)(Edit)