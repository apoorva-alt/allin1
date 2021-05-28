import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./Components/index.jsx";
import Register from "./Components/register.jsx";
import Login from "./Components/login.jsx";
import Logout from "./Components/logout.jsx";
import Navbar from "./Components/navbar.jsx";
import Create from "./Components/create.jsx";
import Question from "./Components/question.jsx";
import "./style1.css"


const App = () => ( <
    Router >
    <
    Route exact path = "*"
    component = { Navbar }
    /> <
    Switch >
    <
    Route exact path = "/"
    component = { Home }
    /> <
    Route path = "/register"
    component = { Register }
    />   <
    Route path = "/login"
    component = { Login }
    /> <
    Route path = "/logout"
    component = { Logout }
    /> <
    Route path = "/create"
    component = { Create }
    /> <
    Route path = "/question/:questionId"
    component = { Question }
    /> < /
    Switch > <
    /Router>
)

export default App;