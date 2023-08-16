import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import Animated from '../components/Animated'

const Manufacturer = () => {

    return (
        <div className="page-container">
            <Header />
            <div>
                <div className="body"> 
                    <div className="user-inside">                    
                        <Animated />
                    </div>
                    <div className="user-inside">
                        <h1 className='get-started'>Get started</h1>
                        <div>
                            <Link to={`/sign-up`}><button className="button-body">Sign Up</button></Link>
                            <Link to={`/sign-in`}><button className="button-body">Log In</button></Link>  
                        </div>                                                              
                    </div>
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default Manufacturer