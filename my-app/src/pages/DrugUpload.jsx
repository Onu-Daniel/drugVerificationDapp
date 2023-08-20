import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';


const DrugUpload = () => {

    return (
        <div className="page-container">
            <Header />
            <div className='signup-body'>
                <div className="drugrect">
                    <h1>Upload Drug Information</h1>
                    <div className='form-inside'>
                        <label for="drugname">Drug Name:</label>
                        <input type="" className="druginput-field" id="drugname" placeholder="Drug Name" />
                    </div>  
                    <div className='form-inside'>
                        <label for="drugid">Drug ID:</label>
                        <input type="" className="druginput-field" id="drugid" placeholder="Drug ID" />
                    </div>      
                    <div className='form-inside'>
                        <label for="lotnumber">Lot Number:</label>
                        <input type="" className="druginput-field" id="lotnumber" placeholder="Lot Number" />
                    </div>
                    <div className='form-inside'>
                        <label for="batchnumber">Batch Number:</label>
                        <input type="" className="druginput-field" id="batchnumber" placeholder="Batch Number" />
                    </div> 
                    <div className='form-inside'>
                        <label for="expirydate">Expiry Date:</label>
                        <input type="" className="druginput-field" id="expirydate" placeholder="Expiry Date" />
                    </div> 
                    <div className='form-inside'>
                        <label for="manufacturingdate">Manufacturing Date:</label>
                        <input type="" className="druginput-field" id="manufacturingdate" placeholder="Manufacturing Date" />
                    </div>  
                    <button type="submit" className='register-button'>Upload Drug Info</button>
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default DrugUpload