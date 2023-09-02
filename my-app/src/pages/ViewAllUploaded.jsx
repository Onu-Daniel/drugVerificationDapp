import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const ViewAll = () => {

    return (
        <div className="page-container">
            <Header />
            <div>
                <h1 className='title'>All Uploaded Drugs</h1>
                <div className='row firstrow'>
                    <div class="column">Drug ID</div>
                    <div class="column">Drug Name</div>
                    <div class="column">Lot Number</div>
                    <div class="column">Batch Number</div>
                    <div class="column">Expiry Date</div>
                    <div class="column">Manufacturing Date</div>
                </div>  
                <div className='row'>
                    <div class="column">Drug ID</div>
                    <div class="column">Drug Name</div>
                    <div class="column">Lot Number</div>
                    <div class="column">Batch Number</div>
                    <div class="column">Expiry Date</div>
                    <div class="column">Manufacturing Date</div>
                </div> 
            </div>
            <Footer />
        </div>        
    )
}

export default ViewAll