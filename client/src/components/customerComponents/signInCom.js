import React, { Component } from 'react';
import {NavLink , withRouter} from 'react-router-dom';
import { Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signInAction } from '../../actions/customerActions.js';
//import ForgetPassword from './forgetPassword.com';

class SignInCom extends Component {
    componentDidUpdate() {
        document.title='2000Store | SignIn' 
        const {error} = this.props;
        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }  
    }
    _handleFormSubmit = (values, bag) => {
        this.props.signInAction(values).then(()=>{ this.props.history.push('/') })
        this.bag = bag; 
    }
    render() {
        return (
            <div className='bg mt'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Login</h3>
                        <hr />
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required()
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
                            }) => (
                                    <div >
                                        <FormGroup>
                                            <Label>Email <span className='star'>*</span></Label>
                                                <Input
                                                    placeholder="Type Your Email"
                                                    invalid={errors.email && touched.email && errors.email}
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                            {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your Password"
                                                invalid={errors.password && touched.password && errors.password}
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                                        </FormGroup>
                                        <Button className='formBtn' type="submit"  disabled={isSubmitting} onClick={handleSubmit || !isValid}>
                                            Login
                                        </Button>
                                    </div>
                                )}
                        </Formik>
                        <div>
                            
                            <p className='checkPara'>Create New Account  in Afokado ?</p>
                            <NavLink to='/signIn'>SignUp</NavLink>  
                                                                                                                                                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ customerReducer}) => {
    return {
        signInAttempting: customerReducer.signInAttempting,
        signInSuccess: customerReducer.signInSuccess,
    }
}
const LoginWithRouter=withRouter(SignInCom)
export default connect(mapStateToProps, { signInAction })(LoginWithRouter);
