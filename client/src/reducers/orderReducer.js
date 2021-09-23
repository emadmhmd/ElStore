import { ORDER_ADDED, ORDER_DELETED, ORDER_UPDATED, ORDERS_FETCHED, CHECHOUT, CARTS_FETCHED, CART_FETCHED, FAV_ORDER_ADDED, FAV_ORDERS_FETCHED,STATUS_CHANGED } from '../actions/actionTypes.js';



const initState = {
    orderAdded: false,
    orderDeleted: false,
    orderUpdated: false,
    orders: [],
    checkout: false,
    carts: [],
    cart: []

}

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case ORDER_ADDED:
            return { ...state, orderAdded: true }
        case ORDER_DELETED:
            return { ...state, orderDeleted: true }
        case ORDER_UPDATED:
            return { ...state, orderUpdated: true }
        case STATUS_CHANGED:
            return { ...state, orderUpdated: true }
        case ORDERS_FETCHED:
            return { ...state, orders: action.payload }
        case CHECHOUT:
            return { ...state, checkout: true }
        case CARTS_FETCHED:
            return { ...state, carts: action.payload }
        case CART_FETCHED:
            return { ...state, cart: action.payload }
        case FAV_ORDER_ADDED:
            return { ...state, orderAdded: true  }
        case FAV_ORDERS_FETCHED:
            return { ...state, orders: action.payload }
        default:
            return state
    }
}

export default orderReducer;