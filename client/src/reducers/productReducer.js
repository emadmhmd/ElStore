import {PRODUCT_ADDED , PRODUCT_DELETED , PRODUCT_UPDATED ,PRODUCTS_FETCHED ,PRODUCT_SEARCHED , PRODUCT_FETCHED , PRODUCT_ARCHIVED , PRODUCT_IMAGE_UPLOADED} from '../actions/actionTypes.js';



const initState={
    productAdded: false,
    productDeleted:false,
    productUpdated:false,
    productArchived:false,
    productImageUploaded:false,
    products:[],
    product:{}
}

const productReducer =(state=initState , action)=>{
    switch(action.type){
        case PRODUCT_ADDED:
            return {...state ,productAdded:true}
        case PRODUCT_DELETED:
            return {...state ,productDeleted:true}
        case PRODUCT_ARCHIVED:
            return {...state ,productArchived:true}
        case PRODUCT_UPDATED:
            return {...state ,productUpdated:true}
        case PRODUCT_IMAGE_UPLOADED:
            return {...state ,productImageUploaded:true}
        case PRODUCTS_FETCHED:
            return {...state , products : action.payload}
        case PRODUCT_SEARCHED:
                return {...state , products : action.payload}
        case PRODUCT_FETCHED:
                return {...state , product : action.payload}
        default:
            return state
    }
}

export default productReducer;