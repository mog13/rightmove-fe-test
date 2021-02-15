import React from 'react';
import ReactDOM from 'react-dom';

//store
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from 'react-redux'
import propertyReducer from "./store/reducers/properties";
import thunk from 'redux-thunk';
import apiMiddleware from "./store/middleware/api";

//components

import App from './components/App';
//styles
import './index.scss';



const store = createStore(propertyReducer,
       compose( applyMiddleware(thunk,apiMiddleware),
           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
    );


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
