import React, { Component } from 'react';
import { fetchOrdersAction, deleteOrderAction, checkoutAction, addFavOrderAction } from '../../../actions/orderActions'
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
//import { Link } from 'react-router-dom';

class OrdersCom extends Component {
    componentDidMount() {
        this.props.fetchOrdersAction()
        document.title = 'Store | My Cart'
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
        const { cart } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Cart</h3>
                            {cart.length ? <Button className='mainBtn add' onClick={() => this.props.checkoutAction()}>Check out</Button> : <></>}
                        </div>
                        {cart.map((item) => (

                            <div key={item._id} className='item'>
                                <div className='itemBody'>
                                    {item.status === 'out' ? <pre className='bodyPara'>Out Of Stock</pre> : <></>}
                                    <pre className='bodyPara'>Title         : {item.product.title}</pre>
                                    <pre className='bodyPara'>descriptiopn  :{item.product.desc}</pre>
                                    <pre className='bodyPara'>stock count   : {item.product.count}</pre>
                                    <pre className='bodyPara'>product count : {item.count}</pre>
                                    <pre className='bodyPara'>price         : {item.product.price}</pre>
                                </div>
                                <hr />
                                <ButtonGroup>
                                    <Button className='mainBtn btnL' onClick={() => { this.props.deleteOrderAction(item._id, 'status', "pending") }}>Del Product</Button>
                                    <Button className='mainBtn btnR' onClick={() => this.props.addFavOrderAction(item._id, 'fav')}>Add To Fav</Button>
                                </ButtonGroup>

                            </div>
                           


                        ))}

                    </div>
                </div>
                {/*this.emptyCase()*/}
            </div>
        )
    }
}

const mapStateToProps = ({ orderReducer }) => {
    return {
        cart: orderReducer.cart
    }
}
export default connect(mapStateToProps, { fetchOrdersAction, deleteOrderAction, checkoutAction, addFavOrderAction })(OrdersCom);