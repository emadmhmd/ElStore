import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/framwork_defauit.css';
import './styles/framwork_responsive.css';
import './styles/framework_rtl.css';

import SignUpCom from './components/customerComponents/signUpCom';
import SignInCom from './components/customerComponents/signInCom';
import Header from './components/generalComponents/headerCom';
import Footer from './components/generalComponents/footerCom';

import ProductsCom from './components/adminComponents/product/productsCom'
import ProductPageCom from './components/adminComponents/product/productPageCom'
import ProductsListCom from './components/customerComponents/product/productsListCom'
//import HomeProductsCom from './components/customerComponents/product/homeProductsCom'

import OrdersCom from './components/customerComponents/order/ordersCom'
import CartProductsCom from './components/adminComponents/order/cartProductsCom'
import OrdersListCom from './components/adminComponents/order/ordersListCom'
import FavCom from './components/customerComponents/fav/favCom'
import SectionsBarCom from './components/customerComponents/product/sectionBarCom';


class App extends Component {
renderRoutes(){
  const {signInSuccess , profile:{type}}=this.props
  
  if(signInSuccess){
    if(type===2){
      return(
        <div>
          <Route exact path='/products' component={ProductsCom} />
          <Route exact path='/ordersList' component={OrdersListCom} />
          <Route exact path='/cartProducts/:cartId' component={CartProductsCom} />
          
        </div>
      )
    }else{
      return(
        <div>
          <SectionsBarCom />
          <Route exact path='/products/:section?' component={ProductsListCom} />
          <Route exact path='/orders' component={OrdersCom} />
          <Route exact path='/fav' component={FavCom} />
        </div>
      )
    }
    
  }else{
    return(
      <div>
          <Route exact path='/signIn' component={SignInCom} />
          <Route exact path='/signUp/:type?' component={SignUpCom} />
      </div>
    )
  }
}
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/productPage/:productId' component={ProductPageCom} />
          <Header/>
          {this.renderRoutes()}
          <Footer/>
        </div>
      </BrowserRouter>
    )

  }

}


const mapStateToProps = ({ customerReducer }) => {
  return {
    profile: customerReducer.profile,
    signInSuccess: customerReducer.signInSuccess
  }
}

export default connect(mapStateToProps)(App);

