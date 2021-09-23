import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductAction } from '../../../actions/productActions';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ViewProductQuickCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

    }
    toggle() {
        if (this.state.modal === false) {
            this.props.fetchProductAction(this.props.productId)
        }
        this.setState({
            modal: !this.state.modal
        })

    }
    render() {
        const { product } = this.props
        return (
            <div>
                <div>
                    <Button onClick={this.toggle} className='mainBtn'>view Quick</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>view Product Quick</ModalHeader>
                        <ModalBody>
                            <div>
                                <h3 className='formHeader'>view Product Quick</h3>
                                <h3>Product Details</h3>
                                <p>title : {product.title}</p>
                                <p>desc : {product.desc}</p>
                                <p>price : {product.price}</p>
                                <p>count : {product.count}</p>
                                <p>section : {product.section}</p>
                                <p>category : {product.category}</p>
                                <p>type : {product.type}</p>
                                <ModalFooter>
                                    <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ productReducer }) => {
    return {
        product: productReducer.product
    }
}
export default connect(mapStateToProps, { fetchProductAction })(ViewProductQuickCom)