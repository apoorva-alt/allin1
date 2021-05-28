import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const Logout = () => {
    const [toHome, setToHome] = useState(false)
    useEffect(() => {
        document.cookie = null
        const token = new Cookies();
        token.remove('token');
        setToHome(true)
    }, [])
    window.location.href="http://localhost:3000/login"
    return(
        <div>
            {toHome?<Redirect to = "/" />:null}
        </div>
    )
}

export default Logout;