import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Home = () => {

    return (
        <div className="page-container">
            <Header />
            <div className='user-body'>
                <div className="user-inside"> 
                    <h2>Search for Drug Information here</h2>            
                    <input type="" className="search-bar" id="searchInput" placeholder="Input Transaction Hash" />
                    <button className="button-user">Search</button>                   
                </div>
                <div className="user-inside">
                    <h2>Drug Information</h2>
                    <div className="table">
                        <div className="row">
                            <div className="label">Drug Name:</div>
                            <div className="value">Your Drug Name</div>
                        </div>                        
                        <div className="row">
                            <div className="label">Expiry Date:</div>
                            <div className="value">Your Expiry Date</div>
                        </div>
                        <div className="row">
                            <div className="label">Manufacturing Date:</div>
                            <div className="value">Your Manufacturing Date</div>
                        </div>
                        <div className="row">
                            <div className="label">Batch Number:</div>
                            <div className="value">Your Batch Number</div>
                        </div>
                        <div className="row">
                            <div className="label">Manufacturer:</div>
                            <div className="value">Your Manufacturer Name</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default Home