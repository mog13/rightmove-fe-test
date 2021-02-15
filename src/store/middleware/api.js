
import {API_URL} from "../../constants";
import {API_META} from "../actionTypes";

// A function to respond correctly to errors
// this can be expanded to handle different statuses differently by building up data on the error object
const throwForStatus = async response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    let error = new Error('API Error');
    error.response = response;
    throw error;
}

const apiMiddleware = store => next => async action => {
    if (!action) {
        return;
    }

    next(action);

    if (!action.meta || action.meta.type !== API_META) {
        return;
    }

    const {
        url,
        method,
        headers,
        body,
        onSuccess,
        onError,
    } = action.meta;

    // build a data object we can use with fetch
    // this is useful for sanitising the data or adding things like auth.
    const fetchData = {
        method: method || 'GET',
        body: (typeof body === 'string' ? body : JSON.stringify(body)),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    return fetch(`${API_URL}${url}`, fetchData)
        .then(throwForStatus)
        .then(res => res.json())
        .then(json => {
            if (typeof onSuccess === 'function') {
                try {
                    store.dispatch(onSuccess(json));
                } catch (e) {
                    // Error in success action.
                    // in production or full implementation you would want to hide this and
                    // report it to application or error monitoring
                    // could also implement some sort of generic error implementation
                    console.warn(`Success action for call to ${url}`)
                    console.warn(e)
                }
            }

            return json;
        })
        .catch(e => {
            //see above, we could add more here in full implementation
            if (typeof onError === 'function') {
                store.dispatch(onError(e));
            }
        })

}

export default apiMiddleware;
