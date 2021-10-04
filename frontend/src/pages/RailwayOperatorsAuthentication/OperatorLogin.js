import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button } from '@material-ui/core';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function OperatorLogin(props) {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [loginInfo, setLoginInfo] = useState('');

    const [loginState, setLoginState] = useState('checking');

    const [loadingState, setLoadingState] = useState(false);

    const inputHandler = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        const token = localStorage.getItem("token") || '';
        axios.post("http://localhost:5000/api/internal/authenticateRailwayOperator", {}, {
            headers: {
                'token': token
            }
        })
            .then(result => {
                if (result.data.status === 'verified') {
                    setLoginState('loggedIn');
                }
                else
                    setLoginState('notLoggedIn');
            }).catch((err) => {
                setLoginState(false);
                //console.log(err);
            })
    }, []);

    const handleFormSubmission = () => {
        setLoadingState(true);
        setLoginInfo('');

        const res = axios.post('http://localhost:5000/api/internal/loginRailwayOperator',
            formState)
            .then((response) => {
                console.log("response", response);
                if (response.data['status'] === 'verified') {
                    console.log("logged in");
                    localStorage.setItem('token', response.data['token'])
                    setLoginState('loggedIn');
                }
                else {
                    console.log("incorrect credentials");
                    setLoginInfo('Incorrect Credentials');
                }
                setLoadingState('notLoggedIn');
            }).catch((err) => {
                setLoadingState('notLoggedIn');
                console.log("err", err);
                setLoginInfo('Error: Check your network connection and try again');
            });
    }

    if (loginState === 'loggedIn')
        return <Redirect to="/otp_op" />
    else if (loginState === 'checking') {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <br /><br />
                <Spinner animation="border" variant="primary" />
                <br /><br />
            </div>
        );
    }

    return (
        <div>
            <form>
            <h2 class="text-center my-3">Operator Login Page</h2>
            <div class="p-5 shadow bg-light my-4 text-center" style={{margin: "auto",width:"50vh"}}>
                <TextField color="secondary" id="email" type="email" onBlur={inputHandler} defaultValue={formState.email} name="email" label="Email" />
                <br /><br />
                <TextField color="secondary" id="password" type="password" onBlur={inputHandler} defaultValue={formState.password} name="password" label="Password" />
                <br /><br />

                <div className={loadingState ? "d-block" : "d-none"} style={{ textAlign: "center", width: "100%" }}>
                    <Spinner animation="border" variant="primary" /> <br />
                </div>

                <Button disabled={loadingState} variant="contained" onClick={handleFormSubmission} color="primary" style={{ margin: "auto" }}>
                    Login
                </Button>
            
                <div>
                    {loginInfo} 
                </div>
            </div>
            </form>
        </div>
    );
}
export default OperatorLogin;