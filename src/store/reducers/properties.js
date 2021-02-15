import {PROPERTIES_FETCH_BEGIN, PROPERTIES_FETCH_ERROR, PROPERTIES_UPDATE} from "../actionTypes";

export const propertyReducerDefaultState = {
    loading: false,
    error: null,
    properties: []
};

// in a full implementation there would be pagination data and it wouldn't just overwrite properties

const propertyReducer = (state = propertyReducerDefaultState, action) => {
    switch (action.type) {
        case PROPERTIES_UPDATE:
            return {
                loading: false,
                error: null,
                properties: action.payload.properties
            };

        case PROPERTIES_FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PROPERTIES_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            };

        default:
            return state;
    }
};

export const isPropertiesLoading = state => state.loading;
export const getProperties = state => state.properties;

export default propertyReducer;

