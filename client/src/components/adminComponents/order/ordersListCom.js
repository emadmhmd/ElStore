import React, { Component } from 'react';
//import UpdateCase from './updateCase.com.js';
import { fetchCartsAction, changeStatusAction } from '../../../actions/orderActions'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
//import moment from 'moment';
//import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import EmptyMessage from '../../general_components/empty.com.js';
import { Link } from 'react-router-dom';
//import CaseSearch from './caseSearch.com.js';
//import AddTask from '../agenda/addTask.com.js';
//import AddSession from '../agenda/addSession.com.js';
//import CaseOwner from './updateCaseOwner.com.js';
//import Archive from './archiveCase.com.js';

class OrdersListCom extends Component {
    componentDidMount() {
        this.props.fetchCartsAction('checked')
        document.title = 'Store | Carts'
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
        const { carts } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div className='sectionBar'>
                            <div className='sections'>
                                <Button className='section' onClick={() => this.props.fetchCartsAction('pending')}>Pending</Button>
                                <Button className='section' onClick={() => this.props.fetchCartsAction('checked')}>Checked</Button>
                                <Button className='section' onClick={() => this.props.fetchCartsAction('packaged')}>Packaged</Button>
                                <Button className='section' onClick={() => this.props.fetchCartsAction('shipped')}>Shipped</Button>
                                <Button className='section' onClick={() => this.props.fetchCartsAction('deliveried')}>Deliveried</Button>

                            </div>
                        </div>


                        <div cleas='headBar'>
                            <h3 className='header'>Carts</h3>
                        </div>
                        {carts.map((item) => (

                            <div key={item._id} className='item'>
                                <div className='itemBody'>
                                <pre className='pareBody'>customer       : {item.customer.userName}</pre>
                                <pre className='pareBody'>products count : {item.cart.length}</pre>
                                <pre className='pareBody'>Item Status    : {item.status}</pre>
                                </div>
                         
                                <hr/>
                                <Button className='mainBtn btnL'><Link to={'/cartProducts/' + item._id}>Show cart Products</Link></Button>
                                <Button className='mainBtn ' onClick={() => this.props.changeStatusAction(item._id, 'packaged')}>Package Order</Button>
                                <Button className='mainBtn ' onClick={() => this.props.changeStatusAction(item._id, 'shipped')}>Shipping Order</Button>
                                <Button className='mainBtn btnR' onClick={() => this.props.changeStatusAction(item._id, 'deliveried')}>Delivery Order</Button>

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
        carts: orderReducer.carts
    }
}
export default connect(mapStateToProps, { fetchCartsAction, changeStatusAction })(OrdersListCom);