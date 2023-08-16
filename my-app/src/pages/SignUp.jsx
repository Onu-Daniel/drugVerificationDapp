import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const SignUp = () => {

    return (
        <div className="page-container">
            <Header />
            <div className='signup-body'>
                <div className="rectangle">
                    <h1 className='topic'>Create Account</h1>
                    <form action="">
                        <div className='form-inside'>
                            <label for="address">Address:</label>
                            <input type="" className="input-field" id="address" placeholder="Input Address" />
                            <button className="connect-wallet">Connect Wallet</button>
                        </div>
                        
                        <div className='form-inside'>
                            <label for="manufacturerid">Manufacturer Id:</label>
                            <input type="" className="input-field" id="manufacturerid" placeholder="Manufacturer ID" />
                        </div>
                        
                        <button type="submit" className='register-button'>Register</button>
                    </form>

                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default SignUp