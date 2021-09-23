import axios from 'axios';

export const addOrderApi=(id)=>{
    return axios.post(`http://localhost:5000/addOrder/${id}`)
}

export const updateOrderApi=(order , id)=>{
    return axios.put(`http://localhost:5000/updateOrder/${id}`, order)
}

export const checkoutApi=()=>{
    return axios.put(`http://localhost:5000/checkout`)
}
export const changeStatusApi=(cartId,status)=>{
    return axios.put(`http://localhost:5000/changeStatus/${cartId}/${status}`)
}

export const deleteOrderApi=(id, flage )=>{
    return axios.put(`http://localhost:5000/updateOrder/${id}/${flage}`)
}

export const fetchOrdersApi=()=>{
    return axios.get(`http://localhost:5000/fetchOrders`)
}

export const fetchCartsApi=(status)=>{
    return axios.get(`http://localhost:5000/fetchCarts/${status}`)
}

export const fetchCartApi=(cartId)=>{
    return axios.get(`http://localhost:5000/fetchCart/${cartId}`)
}

export const addFavOrderApi=(id,value)=>{
    return axios.post(`http://localhost:5000/addFavOrder/${id}/${value}`)
}

export const fetchFavOrdersApi=()=>{
    return axios.get(`http://localhost:5000/fetchFavOrders`)
}