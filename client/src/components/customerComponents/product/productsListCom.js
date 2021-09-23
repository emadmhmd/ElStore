import React, { Component } from 'react';
import ProductSearchBarCom from '../../adminComponents/product/productSearchBarCom';
import ViewProductQuickCom from '../../adminComponents/product/viewProductQuickCom';
import { fetchProductsAction } from '../../../actions/productActions';
import {addOrderAction ,addFavOrderAction} from '../../../actions/orderActions'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'
//import ProductCart from '../../adminComponents/product/productCartCom'
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
//import { Link } from 'react-router-dom';


class ProductListCom extends Component {
    componentDidMount() {
        document.title='Store | Product List'
        const {section}=this.props.match.params
        if(section){
            const query={section}
            this.props.fetchProductsAction(query)
        }
    }
    /*emptyCase() {
        const { products } = this.props
        const message = `ooops !! You still don't have any a case !?`
        if (cases.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }*/
 
    render() {
        const {  products } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>
                <div className='bg items'>
                    <ProductSearchBarCom />
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Products</h3>
                        </div>
                        {products.filter((product) => (product.count>0)).map((item)=>(
                            <div key={item._id} className='item'>
                            <Button onClick={()=>this.props.addOrderAction(item._id  , 'status' , 'pending')}>Add To cart</Button>
                            <Button onClick={()=>this.props.addFavOrderAction(item._id   , 'fav')}>Add To Fav</Button>
                            <h3 className='itemHeader'>{item.title}</h3>
                            <Button><Link to={'/productPage/' + item._id}>Show Product details</Link></Button>
                            <ViewProductQuickCom productId={item._id} />
                        </div>
                        
                        ))}

                    </div>
                </div>
                {/*this.emptyCase()*/}
            </div>
        )
    }
}

const mapStateToProps = ({ productReducer }) => {
    return {
        products: productReducer.products
    }
}
export default connect(mapStateToProps, { fetchProductsAction,addOrderAction,addFavOrderAction })(ProductListCom);