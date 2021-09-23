import React, { Component } from 'react';
//import UpdateCase from './updateCase.com.js';
import { fetchFavOrdersAction, deleteOrderAction, addOrderAction } from '../../../actions/orderActions'
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'reactstrap';
//import { Button, ButtonGroup } from 'reactstrap';
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
//import { Link } from 'react-router-dom';
//import CaseSearch from './caseSearch.com.js';
//import AddTask from '../agenda/addTask.com.js';
//import AddSession from '../agenda/addSession.com.js';
//import CaseOwner from './updateCaseOwner.com.js';
//import Archive from './archiveCase.com.js';

class FavCom extends Component {
    componentDidMount() {
        this.props.fetchFavOrdersAction()
        document.title = 'Store | My Fav Products'
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
        const { orders } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Favourties</h3>
                        </div>
                        {orders.map((item) => (
                            <div key={item._id} className='item'>
                                <div className='itemBody'>
                                <pre className='bodyPara'>Title         : {item.product.title}</pre>
                                <pre className='bodyPara'>descriptiopn  : {item.product.desc}</pre>
                                <pre className='bodyPara'>stock count   : {item.product.count}</pre>
                                <pre className='bodyPara'>product count : {item.count}</pre>
                                <pre className='bodyPara'>price         : {item.product.price}</pre>
                                </div>
                                <hr />
                                < ButtonGroup>
                                    <Button className='mainBtn btnL' onClick={() => { this.props.deleteOrderAction(item._id, 'fav', "fav") }}>Delete Product</Button>
                                    {item.product.count !== 0 ? <Button className='mainBtn btnR' onClick={() => { this.props.addOrderAction(item.product._id) }}>Add To cart</Button> : <p>Out Of Stock</p>}</ButtonGroup>

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
        orders: orderReducer.orders
    }
}
export default connect(mapStateToProps, { fetchFavOrdersAction, deleteOrderAction, addOrderAction })(FavCom);