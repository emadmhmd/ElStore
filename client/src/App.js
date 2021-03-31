import './App.css';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component , Fragment} from 'react';

import SignUpCom from './components/customerComponents/signUpCom';
import SignInCom from './components/customerComponents/signInCom';
import Header from './components/generalComponents/headerCom';
import Footer from './components/generalComponents/footerCom';


class App extends Component {
renderRoutes(){
  const {signInSuccess}=this.props
  
  if(signInSuccess){
    return(
      <></>
    )
  }else{
    return(
      <div>
        <h1>signInSuccess: {signInSuccess}</h1>
          <Route exact path='/signIn' component={SignInCom} />
          <Route exact path='/signUp' component={SignUpCom} />
      </div>
    )
  }
}
  render() {
    const { profile } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          
          <Header/>
          {this.renderRoutes()}
          <h2>{profile.userName}</h2>
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

