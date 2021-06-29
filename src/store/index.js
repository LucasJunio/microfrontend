// Where most of the application information is stored
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '../services/history';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const rootMiddleware = routerMiddleware(history);

const middlewares = [
    sagaMiddleware,
    rootMiddleware    
]

/**
 * createStore parameters 
 * @param  {object} rootReducer function that returns the initial state of combineReducers
 * @return {Array} States tree
 */
const store = createStore(rootReducer(history), applyMiddleware(...middlewares));


sagaMiddleware.run(rootSaga);

export default store;