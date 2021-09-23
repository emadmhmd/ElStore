import React, { Component } from 'react';
import {fetchCartAction} from '../../../actions/orderActions'
import { connect } from 'react-redux';
class CartProductsCom extends Component {
    componentDidMount() {
        const { cartId } = this.props.match.params;
        this.props.fetchCartAction(cartId)
        document.title='Store | Cart page'
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
        const {  cart } = this.props
        /*if (fetching) {
            return <Spinner size={50} />
        }*/
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>Cart Products</h3>
                        </div>
                        {cart.map((item) => (

                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>title :{item.product.title}</h3>   
                                <h3 className='itemHeader'>desc :{item.product.desc}</h3>
                                <h3 className='itemHeader'>stock count :{item.product.count}</h3>
                                <h3 className='itemHeader'>price  :{item.product.price}</h3>

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
export default connect(mapStateToProps, { fetchCartAction})(CartProductsCom);