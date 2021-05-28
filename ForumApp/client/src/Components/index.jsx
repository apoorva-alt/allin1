import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import getUserByToken from '../Lib/getUserByToken';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [value,setvalue] = useState(" ");
    const [questions1, setQuestions1] = useState(null);
    const [sc,setsc] = useState(true);
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            if(firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/all`)
        .then(res => setQuestions(res.data))
    })

    useEffect(() => console.log(userInfo), [userInfo])
   

    const handelsubmit = (e) => {

        e.preventDefault()
        console.log(value)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/search/` + value)
            .then(res => { setQuestions1(res.data); setsc(false) })
    }

       const List= ()=>{


    return(
        <div className="container panel">
            {!userInfo && !firstRender?
            <div className="mt-5 intro-pg pt-5">
                <h1 className="intro-title"></h1>
                <p className="mt-3 intro-text"></p>
                <Link to = "/login" className="btn btn-dark mr-2">Log in</Link>
                <Link to = "/register" className="btn btn-light ml-2">Sign up</Link>
            </div>
            :<div className="">
                <h1 className="index-title">Top Questions <Link className="btn btn-primary" style={{float:"right"}} to = "/create">Ask question</Link></h1>
                {questions?.map(question => {
                    return(
                        <div key = {question._id} className="panel box1">

                            <Link className="topnav-brand1" to = {`/question/${question._id}`}>
                                <h3>{question.title}</h3>
                                <p className="color-adjust">Asked {moment(question?.createdAt).fromNow()} by {question?.asker?.name}</p>
                            </Link>
                            <div style={{marginLeft:"90%"}}> 
                                <span><i className="glyphicon glyphicon-thumbs-up icon"></i></span>
                                <span><i className="glyphicon glyphicon-thumbs-down icon"></i></span>
                            </div>
                                
                        </div>
                    )
                })}
            </div>}
        </div>
    )
            }

       
            const Lists= ()=>{


                return(
                    <div className="container panel">
                        {!userInfo && !firstRender?
                        <div className="mt-5 intro-pg pt-5">
                            <h1 className="intro-title"></h1>
                            <p className="mt-3 intro-text"></p>
                            <Link to = "/login" className="btn btn-dark mr-2">Log in</Link>
                            <Link to = "/register" className="btn btn-light ml-2">Sign up</Link>
                        </div>
                        :<div className="">
                            <h1 className="index-title">Top Questions <Link className="btn btn-primary" style={{float:"right"}} to = "/create">Ask question</Link></h1>
                            {questions1?.map(question => {
                                return(
                                    <div key = {question._id} className="panel box1">
            
                                        <Link className="topnav-brand1" to = {`/question/${question._id}`}>
                                            <h3>{question.title}</h3>
                                            <p className="color-adjust">Asked {moment(question?.createdAt).fromNow()} by {question?.asker?.name}</p>
                                        </Link>
                                        <div style={{marginLeft:"90%"}}> 
                                            <span><i className="glyphicon glyphicon-thumbs-up icon"></i></span>
                                            <span><i className="glyphicon glyphicon-thumbs-down icon"></i></span>
                                        </div>
                                            
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                )
                        }



  return(
      <div>
          <form class="form-inline" style={{ margin: '0 0 0 35%' }}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setvalue(e.target.value) }} />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handelsubmit}>Search</button>
          </form>
    

        <div>
            { sc ?List():Lists()}
        </div>
      </div>
  )


   
}
export default Home;