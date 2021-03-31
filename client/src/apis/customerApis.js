import axios from 'axios';

export const signUpApi=( user)=>{
    return axios.post('http://localhost:5000/signUp', user)
}

export const signInApi=(user)=>{
    return axios.post('http://localhost:5000/signIn', user)
}

export const getProfileApi=( )=>{
    return axios.get('http://localhost:5000/getProfile')
}