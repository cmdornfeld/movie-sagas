import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
    // inital dispatch will catch here and trigger getMoviesSaga
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    // dispatch from goToDetails will catch here and trigger getDetailsSaga
    // dispatch from editMovieInfo will catch here and trigger getDetailsSaga
    yield takeEvery('GET_DETAILS', getDetailsSaga);
    // dispatch from goToDetails will catch here and trigger getGenresSaga
    yield takeEvery('GET_GENRES', getGenresSaga);
    // dispatch from editMovieInfo will catch here and trigger editMovieSaga
    yield takeEvery('EDIT_MOVIE', editMovieSaga);
}

// sends GET request to /movies (movies.router.js)
function* getMoviesSaga() {
    try {
        const getResponse = yield axios.get('/movies');
        // dispatches an action SET_MOVIES with our payload as the response from the DB query
        yield put({type: 'SET_MOVIES', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getMoviesSaga...... error:', error);
    }
}

// sends GET request to /movies/:id where id is = to the id of the movie clicked
function* getDetailsSaga(action) {
    try {
        const getResponse = yield axios.get(`/movies/${action.payload.id}`);
        // dispatches an action SET_DETAILS with our payload as the response from the DB query
        yield put({type: 'SET_DETAILS', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getDetailsSaga...... error:', error);
    }
}

// sends GET request to /genres/:id where id is = to the id of the movie clicked
function* getGenresSaga(action) {
    try {
        const getResponse = yield axios.get(`/genres/${action.payload.id}`);
        // dispatches an action SET_GENRES with our payload as the response from the DB query
        yield put({type: 'SET_GENRES', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getDetailsSaga...... error:', error);
    }
}

// sends PUT request to /movies/:id where id is = to the id of the movie clicked
// and payload is = to this.state from Edit.js
function* editMovieSaga(action) {
    try {
        yield axios.put(`/movies/${action.payload.id}`, action.payload);
    } catch (error) {
        console.log('Error editing details of movie', error);
    }
 }
 

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
// SET_MOVIES action from getMoviesSaga will catch here and set the state of this reducer to our payload (response from DB)
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store detalis returned from the server
// SET_DETAILS action from getMoviesSaga will catch here and set the state of this reducer to our payload (response from DB)
// if edit was done, the detailsReducer state will now be set to the updated title and description
const detailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the genres returned from the server
// SET_GENRES action from getMoviesSaga will catch here and set the state of this reducer to our payload (response from DB)
const genresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        genresReducer,
        detailsReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
