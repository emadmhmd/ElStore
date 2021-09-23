import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logUserOut } from '../../actions/customerActions'
import SearchProductCom from '../adminComponents/product/searchProductCom'

class Header extends Component {
    headerRender() {
        const { profile: { type }, signInSuccess, logUserOut } = this.props
        if (signInSuccess) {
            if (type === 1) {
                return (
                    <div className='navLinks'>
                        <NavLink className='navLink' onClick={() => logUserOut()} to='/'>Logout</NavLink>
                        <NavLink className='navLink' to='/' >Home</NavLink>
                        <NavLink className='navLink' to='/orders' >Cart</NavLink>
                        <NavLink className='navLink' to='/fav' >Fav</NavLink>
                    </div>
                )
            } else {
                return (
                    <div className='navLinks'>
                        <NavLink className='navLink' onClick={() => logUserOut()} to='/'>Logout</NavLink>
                        <NavLink className='navLink' to='/products' >Products</NavLink>
                        <NavLink className='navLink' to='/ordersList' >Orders</NavLink>
                    </div>
                )
            }
        } else {
            return (
                <div className='navLinks'>
                    <NavLink className='navLink' to='/signUp'>SignUp</NavLink>
                    <NavLink className='navLink' to='/signIn'>SignIn</NavLink>
                </div>
            )

        }
    }
    render() {
        return (
            <div className='nav'>
                <h1 className='logo'>Header</h1>
                <SearchProductCom />
                {this.headerRender()}
                
            </div>
        )
    }

}
const mapStateToProps = ({ customerReducer }) => {
    return {
        profile: customerReducer.profile,
        signInSuccess: customerReducer.signInSuccess
    }
}

export default connect(mapStateToProps, { logUserOut })(Header);