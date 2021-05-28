import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

//import { Form, FormControl, Button } from 'react-bootstrap';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res){
                if(res.status) window.location = "/login";
                else setUserInfo(res)
            }
        })
    })
   
    return(
        
        <nav className="navbar navbar-expand-sm bg-dark justify-content-center">
            <Link className="topnav-brand" to= "/">Ask me!</Link>
            <span className="topnav-hamburger-menu" data-target = "myTopnav">&#x2630;</span>
            <div className="topnav-right" id="myTopnav">
            {userInfo?
            <>
             <ul className='nav navbar-nav' style={{marginLeft:'90%'}}> 
                    <li><Link className="topnav-brand" to="/logout">Logout</Link></li>
            </ul>
            </>:<>
                <ul className='nav navbar-nav' style={{marginLeft:'80%'}}> 
                    <li> <Link className="topnav-brand" to="/login">Login</Link></li>
                    <li><Link className="topnav-brand" to="/register">Sign up</Link></li>
                    
                </ul>
               
            </>}
            {/* <Form inline>
              <FormControl type='text' placeholder='Search' style={{margin:'0 0 0 -25%'}} className='mr-sm-1' />
              <Button type='submit' style={{margin:'-16% 0 0 70%'}} >Submit</Button>
            </Form> */}

  
  
            </div>
        </nav>

    )
}

export default Navbar;