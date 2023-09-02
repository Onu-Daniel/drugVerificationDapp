import React, { useState } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import Verify from '../contracts/Verify.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0xCE6Ea6D0dDC93BAec1Fb79f44873DbEfc639175D';
const contractABI = Verify.abi;


const DrugUpload = () => {

    return (
        <div className="page-container">
            <Header />
            <div className='signup-body'>
                <div className="drugrect">
                    <h1>Upload Drug Information</h1>
                    <div className='form-inside'>
                        <label htmlFor="drugname">Drug Name:</label>
                        <input type="" className="druginput-field" id="drugname" placeholder="Drug Name" />
                    </div>  
                    <div className='form-inside'>
                        <label htmlFor="drugid">Drug ID:</label>
                        <input type="" className="druginput-field" id="drugid" placeholder="Drug ID" />
                    </div>      
                    <div className='form-inside'>
                        <label htmlFor="lotnumber">Lot Number:</label>
                        <input type="" className="druginput-field" id="lotnumber" placeholder="Lot Number" />
                    </div>
                    <div className='form-inside'>
                        <label htmlFor="batchnumber">Batch Number:</label>
                        <input type="" className="druginput-field" id="batchnumber" placeholder="Batch Number" />
                    </div> 
                    <div className='form-inside'>
                        <label htmlFor="expirydate">Expiry Date:</label>
                        <input type="" className="druginput-field" id="expirydate" placeholder="Expiry Date" />
                    </div> 
                    {/* <div className='form-inside'>
                        <label htmlFor="manufacturerid">Manufacturing ID:</label>
                        <input type="" className="druginput-field" id="manufacturerId" placeholder="Manufacturing ID" />
                    </div>   */}
                    <button type="submit" className='register-button'>Upload Drug Info</button>
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default DrugUpload