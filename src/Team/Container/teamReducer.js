import axios from 'axios';
import { TEAM_REGISTRATION, GET_TEAM, GET_ALL_TEAMS, GET_TEAM_MEMBERS, DELETE_TEAM_MEMBER, ADD_TEAM_MEMBER, LOGOUT_TEAM } from './actionTypes';

const initialState = {
    teamMembers: {},
    allTeams: {},
    team: {},
    error: false,
    redirect: false
};

export const teamRegistration = (team_name, team_image, team_creation_date, id) => {
    let data = axios
        .post('/api/teamSignup', { team_name, team_image, team_creation_date, id })
        .then(res => res.data);
    return {
        type: TEAM_REGISTRATION,
        payload: data
    };
};

export const getAllTeams = () => {
    let data = axios.get('/api/allTeams').then(res => {
        return res.data
    });
    return {
        type: GET_ALL_TEAMS,
        payload: data
    };
};

export const getTeam = (id) => {
    let data = axios.get(`/api/teams/${id}`).then(res => {
        return res.data
    });
    return {
        type: GET_TEAM,
        payload: data
    };
};
export const getTeamMembers = (id) => {
    let data = axios.get(`/api/teamMembers/${id}`).then(res => {
        return res.data
    });
    return {
        type: GET_TEAM_MEMBERS,
        payload: data
    };
};

export function deleteTeamMember(userId, teamId) {
    let data = axios.delete(`/api/deleteTeamMember/${userId}?teamId=${teamId}`)
        .then(res => res.data)
    return {
        type: DELETE_TEAM_MEMBER,
        payload: data
    };
};

export const logoutTeam = () => {
    return {
        type: LOGOUT_TEAM,
    };
};

export function addTeamMember(userId, teamId) {
    let data = axios
        .put(`/api/addTeamMember`, { userId, teamId })
        .then(res => res.data);
    return {
        type: ADD_TEAM_MEMBER,
        payload: data
    };
};


export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case TEAM_REGISTRATION + '_FULFILLED':
            return { team: payload, redirect: false, error: false };
        case TEAM_REGISTRATION + '_REJECTED':
            return { ...state, error: payload };
        case GET_TEAM + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_TEAM + '_FULFILLED':
            return { ...state, team: payload, error: false };
        case GET_TEAM + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        case GET_TEAM_MEMBERS + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_TEAM_MEMBERS + '_FULFILLED':
            return { ...state, teamMembers: payload, error: false };
        case GET_TEAM_MEMBERS + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        case GET_ALL_TEAMS + '_PENDING':
            return { ...state, redirect: false, error: false };
        case GET_ALL_TEAMS + '_FULFILLED':
            return { ...state, allTeams: payload, error: false };
        case GET_ALL_TEAMS + '_REJECTED':
            return { ...state, redirect: true, error: payload };
        case ADD_TEAM_MEMBER + '_FULFILLED':
            return { ...state, teamMembers: payload };
        case DELETE_TEAM_MEMBER + '_FULFILLED':
            return { ...state, teamMembers: payload };
        case LOGOUT_TEAM + '_FULFILLED':
            return { ...state, team: {}, allTeams: {}, teamMembers: {}, error: false, redirect: false };
        default:
            return state;
    }
}