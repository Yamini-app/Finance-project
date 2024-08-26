import React from 'react';
import Header from '../components/Header';
import SignupSigninComponent from '../components/SignupSignin/index.js'

function Signup() {
  return (
    <div>
        <Header/>
        <div className="wrapper" style={{
          display:'flex',
          justifyContent:'center',
          width:'100%',
          paddingTop:'10vh'
        }}>
            <SignupSigninComponent/>
            </div>
    </div>
  )
}

export default Signup;

