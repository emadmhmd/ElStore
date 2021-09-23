import React , {Component } from 'react';
import {NavLink} from 'react-router-dom';

class Footer extends Component{
    render(){
        return(
            <div className='footer'>
                <div className='about'>
                    <h1>Footer</h1>
                    <div className='links'>
                        <NavLink className='link' to='/contact'>Contact Us</NavLink>
                        <NavLink className='link' to='/about'>About US</NavLink>
                        <NavLink className='link' to='/our_team'>Our Team</NavLink> 
                    </div>
                </div>
                <div className='footer-search'>
                            <p>Search By</p>
                            <NavLink className='link' to='/list'>Specialties</NavLink>
                            <NavLink className='link' to='/lsit'>Area</NavLink>
                            <NavLink className='link' to='/list'>Name</NavLink>
                </div>
            </div>
        )
    }
}

export default Footer