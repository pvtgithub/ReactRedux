import { CHANGE_LOADING, FAIL_REQUEST, GET_NEWS_LIST, GET_ONE_NEWS, MAKE_REQUEST } from "./ActionType";

const initialization = {
    loading: true,
    newslist: [],
    newsobj: {},
    errmessage: ""
}

export const Reducer = (state = initialization, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errmessage: action.payload
            }
        case GET_NEWS_LIST:
            return {
                ...state,
                loading: false,
                newslist: action.payload,
            }
        case CHANGE_LOADING:
            return {
                ...state,
                loading: false
            }
        case GET_ONE_NEWS:
            return {
                ...state,
                loading: false,
                newsobj: action.payload
            }
        default:
            return state
    }
}