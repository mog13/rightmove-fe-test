import React from 'react';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import apiMiddleware from "../store/middleware/api";
import thunk from "redux-thunk";
import {propertyReducerDefaultState} from "../store/reducers/properties";

export const mockStore = configureStore([thunk, apiMiddleware]);

export const withStore = (Component, initialState = {}) => {
    const store = mockStore({
        ...propertyReducerDefaultState,
        ...initialState});

    return (
        <Provider store={store}>
            {Component}
        </Provider>
    );
};