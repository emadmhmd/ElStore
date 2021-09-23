import React, { Component } from 'react';
import ProductSearchBarCom from '../../adminComponents/product/productSearchBarCom';
import { fetchProductsAction } from '../../../actions/productActions';
import {addOrderAction} from '../../../actions/orderActions'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
//import ProductCart from '../../adminComponents/product/productCartCom'
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
//import { Link } from 'react-router-dom';


class ProductListCom extends Component {
    componentDidMount() {
        //this.props.fetchProductsAction()
        document.title='Store | Product List'
        const {section}=this.props.match.params
        this.props.fetchProductsAction({section})
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
    /*renderBtns(item) {
        if (item.archive === 1) {
            return <Button className='mainBtn btnN'><Link className='btnLink' to={'/casepage/' + item._id}>Case Details</Link></Button>
        }
        return <Fragment>
            <hr />
            <div>
                <ButtonGroup>
                    <Button className='mainBtn btnL'><Link className='btnLink' to={'/casepage/' + item._id}>Case Details</Link></Button>
                    <UpdateCase oneCase={item} />
                    <AddTask caseId={item._id}/>
                    <AddSession caseId={item._id}/>
                    <CaseOwner caseId={item._id}/>
                    <Archive caseId={item._id}/>
                </ButtonGroup>
            </div>
        </Fragment>
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
                            <Button onClick={()=>this.props.addOrderAction(item._id  , 'fav' , 'fav')}>Add To Fav</Button>
                            <h3 className='itemHeader'>{item.title}</h3>
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
export default connect(mapStateToProps, { fetchProductsAction,addOrderAction })(ProductListCom);