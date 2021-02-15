import reducer, {propertyReducerDefaultState} from './properties';
import {PROPERTIES_FETCH_BEGIN, PROPERTIES_FETCH_ERROR, PROPERTIES_UPDATE} from "../actionTypes";
import {propertyAPIResponse} from "../../../_mocks_/properties";


describe('using the properties reducer', () => {
    it('should return the initial state', () => {
        const action = {};
        const result = {};

        expect(reducer(undefined, action)).toEqual(propertyReducerDefaultState);
    });

    it('should update the loading and error status on PROPERTIES_FETCH_BEGIN but maintain the rest of the state',()=>{
        let initialState = {
            test:"hello world",
            loading: false,
            error: true
        }

        const action = {
            type: PROPERTIES_FETCH_BEGIN
        };

        const output = reducer(initialState, action);

        expect(output.test).toEqual(initialState.test);
        expect(output.loading).toBe(true);
        expect(output.error).toBe(null)
    })

    it('should update the loading and error status on PROPERTIES_FETCH_ERROR but maintain the rest of the state',()=>{
        let initialState = {
            test:"hello world",
            loading: true,
            error: null
        }

        const errorMessage = "something went wrong!";

        const action = {
            type: PROPERTIES_FETCH_ERROR,
            payload: {
                errorMessage
            }
        };

        const output = reducer(initialState, action);

        expect(output.test).toEqual(initialState.test);
        expect(output.loading).toBe(false);
        expect(output.error).toBe(errorMessage)
    })

    it('should update properties on PROPERTIES_UPDATE',()=>{
        let initialState = {
            loading:true,
        }

        const action = {
            type: PROPERTIES_UPDATE,
            payload: {
                properties: propertyAPIResponse
            }
        };

        const output = reducer(initialState, action);

        expect(output.properties).toEqual(propertyAPIResponse);
        expect(output.loading).toBe(false);
    })


})