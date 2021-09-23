import axios from 'axios';

export const addRateApi=(rate)=>{
    return axios.post('http://localhost:5000/addRate', rate)
}

export const fetchRatesApi=(id)=>{
    return axios.get(`http://localhost:5000/updateOrder/${id}`)
}


