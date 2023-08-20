import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const SignIn = () => {

    return (
        <div className="page-container">
            <Header />
            <div className='signup-body'>
                <div className="rectangle">
                    <h1 className='topic'>Log In</h1>                    
                    <button type="submit" className='login-button'>Connect Wallet</button>
                    <p className='text'>Don't have an account? <Link to={`/sign-up`}>Create one</Link> </p>                
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default SignIn