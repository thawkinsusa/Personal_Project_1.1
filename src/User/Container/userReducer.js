import axios from 'axios';
import { REGISTER, LOGIN, GET_USER, LOGOUT, GET_USERS } from './actionTypes';

const initialState = {
    users: [],
    user: {},
    error: false,
    redirect: false
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.delete('/api/logout')
    };
};

export const register = ({user_name, user_password, user_email, user_image, user_creation_date}) => {
    let data = axios
        .post('/api/register', { user_name, user_password, user_email, user_image, user_creation_date })
        .then(res => res.data);
    return {
        type: REGISTER,
        payload: data
    };
};

export const login = (user_name, user_password) => {
    let data = axios
        .post('/api/login', { user_name, user_password })
        .then(res => res.data);
    return {
        type: LOGIN,
        payload: data
    };
};

export const getUser = () => {
    let data = axios.get('/api/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};

export const getUsers = () => {
    let data = axios.get('/api/users').then(res => res.data);
    return {
        type: GET_USERS,
        payload: data
    };
};

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case REGISTER + '_FULFILLED':
            return { user: payload, redirect: false, error: false };
        case REGISTER + '_REJECTED':
            return { ...state, error: payload };
        case LOGIN + '_FULFILLED':
            return { user: payload, error: false, redirect: false };
        case LOGIN + '_REJECTED':
            return { ...state, error: payload };
        case LOGOUT + '_FULFILLED':
            return { ...state, user: {}, users: {}, error: false, redirect: false }
        case GET_USER + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_USER + '_FULFILLED':
            return { ...state, user: payload, error: false };
        case GET_USER + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        case GET_USERS + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_USERS + '_FULFILLED':
            return { ...state, users: payload, error: false };
        case GET_USERS + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        default:
            return state;
    }
}