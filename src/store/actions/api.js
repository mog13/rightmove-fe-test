import {API_META, API_REQUEST} from "../actionTypes";

export const request = (meta) => ({
    type: API_REQUEST,
    meta: {
        type: API_META,
        ...meta
    }
});