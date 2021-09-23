import axios from 'axios';

export const signUpApi=( user)=>{
    return axios.post('http://localhost:5000/signUp', user)
}

export const signInApi=(user)=>{
    return axios.post('http://localhost:5000/signIn', user)
}

export const getUserApi=( )=>{
    return axios.get('http://localhost:5000/getUser')
}

export const updateUserApi=(user)=>{
    return axios.put(`http://localhost:5000/updateUser`,user)
}