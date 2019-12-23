import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Styling for material-UI
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Edit extends Component {

    // declaring local state for this component
    // setting title and description to empty strings
    // id is equal to the movie id of the selected movie (clicked on)
    state = {
        title: '',
        description: '',
        id: this.props.details[0].id
    }

    // triggered by click of the Cancel button
    // returns user to details page of selected movie
    backToDetails = () => {
        this.props.history.push('/details');
    }

    // triggered by typing in input or textarea
    // updates/sets the local state of "title:" to the value of whatever the user types into the input field
    // updates/sets the local state of "description:" to the value of whatever the user types into the textarea field
    handleChange = (event, propertyName) => {
        console.log(event.target.value);
        
        this.setState({
            [propertyName]: event.target.value
        })
    }

    // triggered by clicking the Save button
    // dispatches 2 actions; one with type of EDIT_MOVIE and payload of our local state
    // and one with type GET_DETAILS and a payload of the movie id as its id property
    // both actions will be caught by the rootSaga (index.js)
    // returns user to details page which displays the updated details for the selected movie
    editMovieInfo = (event, id) => {
        console.log(this.state);
        this.props.dispatch({type: 'EDIT_MOVIE', payload: this.state});
        this.props.dispatch({type: 'GET_DETAILS', payload: {id: this.state.id}});
        this.props.history.push('/details');
    }

    render(){
        return (
            <>
                <p>Edit details for {this.props.details[0].title}</p>
                <TextField className={this.props.classes.textField} onChange={(event) => this.handleChange(event, 'title')} 
                    type="text" label="movie title" variant="outlined" />
                <br/>
                <TextField className={this.props.classes.textField} onChange={(event) => this.handleChange(event, 'description')}
                    type="text" label="movie description" variant="outlined" multiline={true} rows={4} />
                <br/>
                <Button className={this.props.classes.button} onClick={this.backToDetails} variant="contained" color="secondary">
                    Cancel
                </Button>
                <Button className={this.props.classes.button} onClick={this.editMovieInfo} variant="contained" color="primary">
                    Save
                </Button>
            </>
        )
    }
}

// the detailsReducer has been poplulated by our dispatch action of GET_DETAILS
// setting "details:" = to our detailsReducer reduxState
const putReduxStateOnProps = (reduxState)=>({
    details: reduxState.detailsReducer
});

// connecting our reduxState to Edit component and exporting "Edit" (imported on App.js)
export default connect(putReduxStateOnProps)(withStyles(styles)(Edit));