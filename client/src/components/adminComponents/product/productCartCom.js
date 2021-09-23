import React, { Component } from 'react';
import UpdateProductCom from './updateProductCom';
import ViewProductQuickCom from './viewProductQuickCom';
import { deleteProductAction, archiveProductAction } from '../../../actions/productActions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UploadProductImage from './uploadProductImageCom.js'

class ProductCart extends Component {

    render() {
        const { deleteProductAction, archiveProductAction, product } = this.props
        return (
            <div key={product._id} className='item'>
                <Button className='del' onClick={() => deleteProductAction(product._id)}>Delete</Button>
                <UpdateProductCom product={product} />
                <div className='bodyImgSec'>
                    {product.img ? <img src={require(`../../../images/${product.img.filename}`).default} className='bodyImg' alt='lawyer-img' /> : ''}
                </div>
                <pre className='bodyPara'>{product.title}</pre>
                <pre className='bodyPara'>Category  :{product.category}</pre>
                <pre className='bodyPara'>Type      :{product.type}</pre>
                <Button><Link to={'/productPage/' + product._id}>Show Product details</Link></Button>
                <Button onClick={() => deleteProductAction(product._id)}>Delete</Button>
                <Button onClick={() => archiveProductAction(product._id)}>Archive</Button>
                <ViewProductQuickCom productId={product._id} />
                <UploadProductImage id={product._id} />
            </div>
        )
    }
}


export default connect(null, { deleteProductAction, archiveProductAction })(ProductCart);