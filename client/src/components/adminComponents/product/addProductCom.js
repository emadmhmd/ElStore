import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback,Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addProductAction } from '../../../actions/productActions';


class AddProductCom extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        //this.props.addProductAction(values);
        if (values) {
            this.props.addProductAction(values);
            this.toggle();
            this.bag = bag;
        }
        else {
            bag.isSubmitting(false)
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='add btnN'>Add Product</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Add New Product</ModalHeader>
                    <ModalBody>
                            <div>
                                <h3 className='formHeader'>Add New Product</h3>
                                <Formik
                                    initialValues={{  title:'', desc:' ',code:'' , price: '' , category: '', type: '' ,section: '', brand: '' ,discount:'' ,status:'',count:''}}
                                    validationSchema={Yup.object().shape({
                                        title: Yup.string().required(),
                                        desc: Yup.string(),
                                        code: Yup.string().required(),
                                        category: Yup.string().required(),
                                        type: Yup.string().required(),
                                        price: Yup.number().required().positive(),
                                        discount: Yup.number().required().positive(),
                                        count:Yup.number().required().positive(),
                                        status:Yup.string(),
                                        brand:Yup.string(),
                                        section:Yup.string()
                                    })}
                                    onSubmit={this._handleFormSubmit.bind(this)}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        isValid
                                        /* and other goodies */
                                    }) => (
                                            <div>
                                                <FormGroup>
                                                    <Label>Title</Label>
                                                    <Input
                                                        placeholder="Enter Title"
                                                        invalid={errors.title && touched.title && errors.title}
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                    />

                                                    {errors.title && touched.title ? (<FormFeedback>{errors.title}</FormFeedback>) : null}
                                                </FormGroup >

                                                <FormGroup>
                                                    <Label>Description</Label>
                                                    <Input
                                                        placeholder="Enter Description"
                                                        invalid={errors.desc && touched.desc && errors.desc}
                                                        type="text"
                                                        name="desc"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.desc}
                                                    />

                                                    {errors.desc && touched.desc ? (<FormFeedback>{errors.desc}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Code</Label>
                                                    <Input
                                                        placeholder="Enter Code"
                                                        invalid={errors.code && touched.code && errors.code}
                                                        type="text"
                                                        name="code"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.code}
                                                    />

                                                    {errors.code && touched.code ? (<FormFeedback>{errors.code}</FormFeedback>) : null}
                                                </FormGroup >

                                                <FormGroup>
                                                    <Label>Category</Label>
                                                    <Input
                                                        placeholder="Enter Category"
                                                        invalid={errors.category && touched.category && errors.category}
                                                        type="text"
                                                        name="category"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.category}
                                                    />

                                                    {errors.category && touched.category ? (<FormFeedback>{errors.category}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Type</Label>
                                                    <Input
                                                        placeholder="Enter Type"
                                                        invalid={errors.type && touched.type && errors.type}
                                                        type="text"
                                                        name="type"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.type}
                                                    />

                                                    {errors.type && touched.type ? (<FormFeedback>{errors.type}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Price</Label>
                                                    <Input
                                                        placeholder="Enter Price"
                                                        invalid={errors.price && touched.price && errors.price}
                                                        type="number"
                                                        name="price"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.price}
                                                    />

                                                    {errors.price && touched.price ? (<FormFeedback>{errors.price}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Discount</Label>
                                                    <Input
                                                        placeholder="Enter Discount"
                                                        invalid={errors.discount && touched.discount && errors.discount}
                                                        type="number"
                                                        name="discount"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.discount}
                                                    />

                                                    {errors.discount && touched.discount ? (<FormFeedback>{errors.discount}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Status</Label>
                                                    <Input
                                                        placeholder="Enter Status"
                                                        invalid={errors.status && touched.status && errors.status}
                                                        type="text"
                                                        name="status"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.status}
                                                    />

                                                    {errors.status && touched.status ? (<FormFeedback>{errors.status}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Count</Label>
                                                    <Input
                                                        placeholder="Enter Count"
                                                        invalid={errors.count && touched.count && errors.count}
                                                        type="number"
                                                        name="count"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.count}
                                                    />

                                                    {errors.count && touched.count ? (<FormFeedback>{errors.count}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Brand</Label>
                                                    <Input
                                                        placeholder="Enter Brand"
                                                        invalid={errors.brand && touched.brand && errors.brand}
                                                        type="text"
                                                        name="brand"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.brand}
                                                    />

                                                    {errors.brand && touched.brand ? (<FormFeedback>{errors.brand}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Section</Label>
                                                    <Input
                                                        placeholder="Enter section"
                                                        invalid={errors.section && touched.section && errors.section}
                                                        type="text"
                                                        name="section"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.section}
                                                    />

                                                    {errors.section && touched.section ? (<FormFeedback>{errors.section}</FormFeedback>) : null}
                                                </FormGroup >


                                                <ModalFooter>
                                                    <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Add New Product
                                            </Button>
                                                    <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </div>
                                        )}

                                </Formik>
                            </div>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}
const mapStateToProps = ({ productReducer }) => {
    return {
        added: productReducer.added
    }
}
export default connect(mapStateToProps, {addProductAction })(AddProductCom);