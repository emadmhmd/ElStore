import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { searchProductAction } from '../../../actions/productActions';


class SearchProductCom extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            this.props.searchProductAction(values.title);
            this.props.history.push('/products')
        }
        else {
            bag.isSubmitting(false)
        }
    }
    render() {
        return (

            <div>
                <Formik
                    initialValues={{ title: '' }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required(),
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
                        <div className='search'>
                            <InputGroup>
                                <Input
                                    className='searchInput'
                                    placeholder="Enter product name"
                                    invalid={errors.title && touched.title && errors.title}
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button className='searchBtn' onClick={handleSubmit}  disabled={!isValid}>Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    )}

                </Formik>
            </div>

        )
    }
}
const SearchProduct = withRouter(SearchProductCom)
export default connect(null, { searchProductAction })(SearchProduct);