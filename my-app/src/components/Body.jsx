import { Link } from 'react-router-dom';

const Body = () => {
    
    return (
        <>
            <div className="body"> 
                <div className="inside-body">                    
                    <Link to={`/manufacturer-login`}><button className="button-body">Manufacturer</button></Link>
                    <Link to={`/user-search`}><button className="button-body">User</button></Link>
                    
                </div>
                <div className="inside-body">
                    <img src="../v2.jpg" alt="verifex logo" className="body-logo" />
                </div>
            </div>
        </>
    )
}

export default Body