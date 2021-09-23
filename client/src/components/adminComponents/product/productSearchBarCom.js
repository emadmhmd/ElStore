import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { fetchProductsAction } from '../../../actions/productActions';
/*import Background from '../../../images/home3.jpg';
var homeStyle = {
    backgroundImage: "url(" + Background + ")",
};*/

class ProductsSearchBarCom extends Component {
    _handleFormSubmit = (values, bag) => {
        const { fetchProductsAction } = this.props;
        console.log('query from com' ,values.category , values.type)
        fetchProductsAction(values)
        //this.props.history.push('/products');
    }
    _handleFormChange = (values, bag) => {
        const { fetchProductsAction } = this.props;
        console.log('query from com' ,values.category , values.type)
        fetchProductsAction(values)
        //this.props.history.push('/products');
    }
    render() {
        return (

            <div className='searchCom highTwo' >
                <Formik
                    initialValues={{  minPrice: '' , maxPrice: '', category: '', type: '' ,section: '', brand: '' ,status:'' }}
                    validationScha={Yup.object().shape({
                        title: Yup.string(),
                        category: Yup.string(),
                        type: Yup.string(),
                        code: Yup.string(),
                        section: Yup.string(),
                        brand: Yup.string(),
                        status: Yup.string(),
                        minPrice: Yup.number().positive(),
                        maxPrice: Yup.number().positive(),

                    })}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    onChange={this._handleFormChange.bind(this)}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <div>
                            <FormGroup >
                                <Input
                                    className='cell cellSizeFour'
                                    placeholder="group"
                                    type="text"
                                    name="section"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.section}
                                />
                            </FormGroup >
                            <FormGroup >
                                <Input
                                    className='cell cellSizeFour'
                                    placeholder="category"
                                    type="text"
                                    name="category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                />
                            </FormGroup >
                            <FormGroup>
                                <Input
                                    className='cell cellSizeFour'
                                    type="text"
                                    name="type"
                                    placeholder="type"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.type}
                                >
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    className='cell cellSizeFour'
                                    type="number"
                                    name="minPrice"
                                    placeholder="minPrice"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.minPrice}
                                >
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className='cell cellSizeFour'
                                    type="number"
                                    name="maxPrice"
                                    placeholder="maxPrice"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maxPrice}
                                >
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className='cell cellSizeFour'
                                    type="text"
                                    name="brand"
                                    placeholder="Brand"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.brand}
                                >
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className='cell cellSizeFour'
                                    type="text"
                                    name="status"
                                    placeholder="Status"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.status}
                                >
                                </Input>
                            </FormGroup>
                            <Button type="submit" onClick={handleSubmit} className='cell searchBtn cellSizeFour'>
                                Search
                            </Button>
                        </div>
                    )}
                </Formik>
            </div>
        )
    }
}

const searchWithRouter = withRouter(ProductsSearchBarCom)
export default connect(null, { fetchProductsAction })(searchWithRouter);