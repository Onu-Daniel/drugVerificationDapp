import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';


const Dashboard = () => {

    return (
        <div className="page-container">
            <Header />
            <div className="dashbody-container">
                <div className="dashbody left">
                    <Link to={`/dashboard`}><div className='icons'>Home</div></Link>
                    <Link to={`/drug-upload`}><div className='icons'>Upload New Drug Information</div></Link>
                    <Link to={`/view-all-drugs`}><div className='icons'>View all uploaded Information</div></Link>
                </div>
                <div className="dashbody right">
                    <h2 className='heading'>Dashboard</h2>
                    <div className="top-rectangles">
                    <div className="rec half"><Link to={`/drug-upload`}>Upload New Drug Information<span>&#8594;</span></Link></div>
                    <div className="rec half"><Link to={`/view-all-drugs`}>View all uploaded Information<span>&#8594;</span></Link></div>
                    </div>
                    <div className="bottom-rectangle">
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
                </div>
            </div>
            <Footer />
        </div>        
    )
}

export default Dashboard