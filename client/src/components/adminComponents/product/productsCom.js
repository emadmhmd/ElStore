import React, { Component } from 'react';
import AddProductCom from './addProductCom';
import UpdateProductCom from './updateProductCom';
import ProdcustSearchBarCom from './productSearchBarCom'
import ViewProductQuickCom from './viewProductQuickCom';
import { fetchProductsAction, deleteProductAction, archiveProductAction } from '../../../actions/productActions';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import UploadProductImage from './uploadProductImageCom.js'
//import ProductCart from './productCartCom'
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
//import { Link } from 'react-router-dom';
//import CaseSearch from './caseSearch.com.js';
//import AddTask from '../agenda/addTask.com.js';
//import AddSession from '../agenda/addSession.com.js';
//import CaseOwner from './updateCaseOwner.com.js';
//import Archive from './archiveCase.com.js';

class ProductListCom extends Component {
    componentDidMount() {
        //this.props.fetchProductsAction()
        document.title = 'Store | Product List'
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
        const { products, deleteProductAction, archiveProductAction } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>

                <div className='bg items'>
                    <ProdcustSearchBarCom />
                   

                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Products</h3>
                            <AddProductCom />
                        </div>
                        {products.map((item) => (

                            <div key={item._id} className='item'>
                                <div className='bodyImgSec'>
                                    {item.img ? <img src={require(`../../../images/${item.img.filename}`).default} className='bodyImg' alt='lawyer-img' /> : ''}
                                </div>
                                <div className=' bodyInfoSec'>
                                    <div className='itemBody'>
                                        <pre className='bodyPara'>{item.title}</pre>
                                        <pre className='bodyPara'>{item.category} | {item.type}</pre>
                                    </div>
                                    <hr />
                                    <ButtonGroup>
                                        <Button className='mainBtn btnL'><Link to={'/productPage/' + item._id}>Show details</Link></Button>
                                        <ViewProductQuickCom productId={item._id} />
                                        <Button className='mainBtn' onClick={() => deleteProductAction(item._id)}>Delete</Button>
                                        <Button className='mainBtn' onClick={() => archiveProductAction(item._id)}>Archive</Button>
                                        <UploadProductImage id={item._id} />
                                        <UpdateProductCom product={item} />
                                    </ButtonGroup>

                                </div>


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
export default connect(mapStateToProps, { fetchProductsAction, deleteProductAction, archiveProductAction })(ProductListCom);