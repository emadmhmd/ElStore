import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchProductsAction } from '../../../actions/productActions';
import { connect } from 'react-redux';

class SectionsBarCom extends Component {
    sectionOnClick(section) {
        //this.props.fetchProductsAction({section})
        this.props.history.push(`/products/${section}`)
        console.log('path name', this.props.location.pathname)
        if (this.props.location.pathname === '/products/man' || this.props.location.pathname === '/products/girl' || this.props.location.pathname === '/products/boy') {
            console.log('enterd')
            const query = { section }
            this.props.fetchProductsAction(query)
        }
    }
    render() {
        return (
            <div className='sectionBar'>
                    
{/*                     
                    <UncontrolledDropdown nav className='categories'>
                        <DropdownToggle caret className='dropLink' >All Categories</DropdownToggle>
                        <DropdownMenu className='navLink'>
                            <DropdownItem className='section'>
                                <NavItem ><NavLink to="/profile">Girl</NavLink></NavItem>
                            </DropdownItem>
                            <DropdownItem className='section'>
                                <NavItem><NavLink to="/profile">Girl</NavLink></NavItem>
                            </DropdownItem>
                            <DropdownItem className='section'>
                                <NavItem><NavLink to="/profile">Boy</NavLink></NavItem>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> */}
                    <div className='sections'>
                        <Button className='section' onClick={() => this.sectionOnClick('man')}><i className='fa fa-trash fas' />Man</Button>
                        <Button className='section' onClick={() => this.sectionOnClick('girl')}><i className='fa fa-trash fas' />Girl</Button>
                        <Button className='section' onClick={() => this.sectionOnClick('boy')}><i className='fa fa-trash fas' />Boy</Button>
                    </div>
                    



            </div>
        )
    }
}
const SectionBar = withRouter(SectionsBarCom)
export default connect(null, { fetchProductsAction })(SectionBar)