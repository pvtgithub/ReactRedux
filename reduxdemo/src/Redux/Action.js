import { CHANGE_LOADING, FAIL_REQUEST, GET_NEWS_LIST, GET_ONE_NEWS, MAKE_REQUEST } from "./ActionType"
import axios from "axios"

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (error) => {
    return {
        type: FAIL_REQUEST,
        payload: error
    }
}

export const getNewsList = (data) => {
    return {
        type: GET_NEWS_LIST,
        payload: data
    }
}

export const getOneNews = (data) => {
    return {
        type: GET_ONE_NEWS,
        payload : data
    }
}

export const changeLoading = () => {
    return {
        type: CHANGE_LOADING,
    }
}

export const fetchNewsList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(() => {
            axios.get('http://localhost:8000/posts').then((res) => {
                dispatch(getNewsList(res.data))
            }).catch((error) => {
                dispatch(failRequest(error.message))
            })
        }, 1000);
    }
}

export const removeNews = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete('http://localhost:8000/posts/' + id).then((res) => {
            dispatch(changeLoading())
        }).catch((err) => {
            dispatch(failRequest(err.message))
        })
    }
}

export const postNews = (responseBody) => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.post('http://localhost:8000/posts', responseBody).then(() => {
            dispatch(changeLoading())
        }).catch((err) => {
            dispatch(failRequest(err.message))
        })
    }
}

export const getNewsById = (id) => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.get('http://localhost:8000/posts/'+id).then((res) => {
            dispatch(getOneNews(res.data))
        }).catch((err) => {
            dispatch(failRequest(err.message))
        })
    }
}

export const editNews = (responseBody,id) => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.put('http://localhost:8000/posts/'+id, responseBody).then(() => {
            dispatch(changeLoading())
        }).catch((err) => {
            dispatch(failRequest(err.message))
        })
    }
}