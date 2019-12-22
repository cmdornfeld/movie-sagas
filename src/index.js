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
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('GET_DETAILS', getDetailsSaga);
    yield takeEvery('GET_GENRES', getGenresSaga)
}

function* getMoviesSaga() {
    try {
        const getResponse = yield axios.get('/movies');
        yield put({type: 'SET_MOVIES', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getMoviesSaga...... error:', error);
    }
}

function* getDetailsSaga(action) {
    try {
        const getResponse = yield axios.get(`/movies/${action.payload.id}`);
        yield put({type: 'SET_DETAILS', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getDetailsSaga...... error:', error);
    }
}

function* getGenresSaga(action) {
    try {
        const getResponse = yield axios.get(`/genres/${action.payload.id}`);
        yield put({type: 'SET_GENRES', payload: getResponse.data})
    }
    catch (error){
        console.log('error in getDetailsSaga...... error:', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const detailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
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
