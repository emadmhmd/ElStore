import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductAction } from '../../../actions/productActions';

class ProductPageCom extends Component {
    componentDidMount(){
        const {productId}=this.props.match.params
        this.props.fetchProductAction(productId)
    }
    render() {
        const {product}=this.props
        return (
            <div>
                <h3>Product Details</h3>
                <p>title : {product.title}</p>
                <p>desc : {product.desc}</p>
                <p>price : {product.price}</p>
                <p>count : {product.count}</p>
                <p>section : {product.section}</p>
                <p>category : {product.category}</p>
                <p>type : {product.type}</p>

            </div>
        )
    }
}
const mapStateToProps = ({ productReducer }) => {
    return {
        product: productReducer.product
    }
}
export default connect(mapStateToProps ,{fetchProductAction})(ProductPageCom)