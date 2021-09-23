import axios from 'axios';

export const addProductApi=product=>{
    return axios.post('http://localhost:5000/addProduct', product)
}

export const updateProductApi=(product , id)=>{
    return axios.put(`http://localhost:5000/updateProduct/${id}`, product)
}

export const uploadProductImageApi=()=>{
    return axios.put(`http://localhost:5000/uploadProductImage`)
}
export const fetchProductsApi=query=>{
    return axios.get(`http://localhost:5000/fetchProducts`,{params  : {...query}})
}

export const searchProductApi=title=>{
    return axios.get(`http://localhost:5000/searchProduct/${title}`)
}
export const fetchProductApi=productId=>{
    return axios.get(`http://localhost:5000/fetchProduct/${productId}`)
}
/*export const fetchProductsApi=(title='em' , code='em')=>{
    return axios.get(`http://localhost:5000/fetchProducts/${title}/${code}`)
}
export const filterProductsApi=(category='em' , type='em')=>{
    return axios.get(`http://localhost:5000/filterProducts/${category}/${type}`)
}*/
export const deleteProductApi=(id)=>{
    return axios.delete(`http://localhost:5000/deleteProduct/${id}`)
}
export const archiveProductApi=(id)=>{
    return axios.put(`http://localhost:5000/archiveProduct/${id}`)
}



