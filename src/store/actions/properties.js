import {PROPERTIES_FETCH_BEGIN, PROPERTIES_FETCH_ERROR, PROPERTIES_UPDATE} from "../actionTypes";
import {request} from "./api";

export const updateProperties = (properties) => {
    return {
        type: PROPERTIES_UPDATE,
        payload: {
            properties
        }
    }
}
export const propertiesFetchError = (error) => {
    return {
        type: PROPERTIES_FETCH_ERROR,
        payload: {
            errorMessage: error
        }
    }
}

export const propertiesFetchBegin = () => {
    return {
        type: PROPERTIES_FETCH_BEGIN,
    }
}


export const fetchAllProperties = () => (dispatch, getState) => {

    //we could do some more checking of if the properties have been recently fetched or are stale etc
    if (getState().loading) return ;

    dispatch(propertiesFetchBegin());

    const onSuccess = (properties) => (dispatch, getState) => {
        dispatch(updateProperties(properties));
    };

    const onError = (e) => ( dispatch, getState) => {
        //in full implementation would need error handling strategy to tidy up error for uses
        dispatch(propertiesFetchError(e));
    };


    return dispatch(
        request({
            url: `properties`,
            onSuccess,
            onError,
        })
    );
};