import React, { useRef, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import IRCTC from '../../images/IRCTC_LOGO.png';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import './OTPOperator.css';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import RailwayOperatorActionBar from '../../components/RailwayOperatorActionBar/RailwayOperatorActionBar';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import SignalCellularConnectedNoInternet2BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet2Bar';

function OTPOperator() {

    const [userListState, setUserListState] = useState([]);
    const [loggedInState, setLoggedInState] = useState({ status: 'checking', email: '' });

    const sentToken = (e) => {
        const token = localStorage.getItem("token") || '';
        axios.get("http://localhost:5000/api/otpOperator/sendTokenDetail/",{
            headers: {
                'token': token
            }
        })
        .then(response => {
            fetchUserData()
        })
        ;
        // console.log(fetchedPassengerData)
    }

    const fetchUserData = () => {
        const token = localStorage.getItem("token") || '';
        axios.get("http://localhost:5000/api/otpOperator/otpUserData", {
            headers: {
                'token': token
            }
        })
            .then(result => {
                console.log("result from OTPOperator.js", result);
                if (result.data.status === 'verified') {
                    setLoggedInState({ ...loggedInState, email: result.data.email, status: 'loggedIn' });
                    var newStateList = [];
                    for (let obj of result.data.userData) {
                        //console.log(obj);
                        newStateList.push({ fullName: obj.fullName, tokenId: obj.tokenId, mobile_number: obj.mobileNumber, arr: [], otpVerification: obj.otpVerification, otpState: "not sent", otpValue: "", timer: 0 });
                    }
                    console.log("newStateList", newStateList);
                    setUserListState(newStateList);
                }
                else
                    setLoggedInState({ ...loggedInState, status: 'notLoggedIn' });
            }).catch((err) => {
                setLoggedInState({ ...loggedInState, status: 'networkError' });
                //console.log(err);
            })
    }

    const logoutMethod = () => {
        const token = localStorage.getItem("token") || '';
        axios.post("http://localhost:5000/api/internal/logoutRailwayOperator", {
            email: loggedInState.email,
            token: token
        }).then((res) => {
            console.log("res", res.data.status);
            if(res.data.status === 'logged out'){
                localStorage.removeItem("token");
                setLoggedInState({ status: "notLoggedIn", email: '' });
            }
        });
    }

    useEffect(fetchUserData, []); // Initializes the state

    const updateOtpVerification = (tokenId) => {
        axios.patch("http://localhost:5000/api/otpOperator/updateOtpVerification", {
            tokenId: tokenId,
            otpVerification: true
        });
    }

    const handlePhoneVerification = (phone1, otpCallback) => {
        axios.post("http://localhost:5000/api/otpOperator/sendOTP", {
            phone: "+91" + phone1.toString()
        }).then((res) => {
            const phone21 = res.data.phone
            const hash21 = res.data.hash
            const otp21 = res.data.otp
            var OTParr = new Array()
            OTParr = [phone21, hash21, otp21]
            console.log(phone21, hash21, otp21);
            otpCallback(OTParr);
            return OTParr
        });
    }

    const handleSubmit = (event, tokenId) => {
        let affectedIndex = userListState.findIndex(element => element.tokenId === tokenId);

        axios.post("http://localhost:5000/api/otpOperator/verifyOTP", {
            phone: userListState[affectedIndex].arr[0],
            hash: userListState[affectedIndex].arr[1],
            otp: userListState[affectedIndex].otpValue
        }).then(result => {
            //console.log(result.data.msg);
            if (result.data.msg === "Device verified") {
                console.log("Device Verified");
                let newListState = [...userListState];
                newListState[affectedIndex] = { ...newListState[affectedIndex], otpVerification: true };
                updateOtpVerification(tokenId);
                setUserListState(newListState);
            }
        }).catch((err) => {
            //console.log(err.response.data);
            if (err.response.data.msg === "Incorrect OTP") {
                window.alert("Incorrect OTP")
            }
        })
    }

    const otpValueChangeHandler = (event, tokenId) => {
        //console.log("optValueHandler");
        let affectedIndex = userListState.findIndex(element => element.tokenId === tokenId);
        let newListState = [...userListState];
        newListState[affectedIndex] = { ...newListState[affectedIndex], otpValue: event.target.value };
        setUserListState(newListState);
    }

    const sendOTP = (tokenId, mobile_number) => {
        //console.log("OTP SEND");
        createSnackBar("OTP Sent Successfully");
        //console.log(mobile_number);
        var arr1 = new Array();

        const otpCallback = (optHashArray) => {
            let affectedIndex = userListState.findIndex(element => element.tokenId === tokenId);
            let newListState = [...userListState];
            newListState[affectedIndex] = { ...newListState[affectedIndex], otpState: "sent", arr: optHashArray };
            setUserListState(newListState);
        }

        handlePhoneVerification(mobile_number, otpCallback);
    }


    const resendOTP = (event, tokenId, mobile_number) => {
        //console.log("OTP RESEND");
        createSnackBar("OTP Resent Successfully");

        const otpCallback = (optHashArray) => {
            let affectedIndex = userListState.findIndex(element => element.tokenId === tokenId);
            let newListState = [...userListState];
            newListState[affectedIndex] = { ...newListState[affectedIndex], otpState: "sent", arr: optHashArray };
            setUserListState(newListState);
        }

        handlePhoneVerification(mobile_number, otpCallback);
    }

    const otpStateRenderer = (record) => {
        if (record.otpVerification === true) {
            return (
                <div>
                    OTP Sent
                </div>
            );
        }
        if (record.otpState === "not sent") {
            return (
                <div>
                    <Button variant="contained" color="primary" onClick={() => { sendOTP(record.tokenId, record.mobile_number) }} startIcon={<SendIcon />}>Send OTP</Button>
                </div>
            );
        }
        else if (record.otpState === "sent" && record.otpVerification === false) {
            return (
                <div>
                    <p>OTP Sent</p>
                    <TextField id={"otp-" + record.tokenId}
                        label="Enter OTP"
                        type="text"
                        value={record.otpValue}
                        onChange={(event) => { otpValueChangeHandler(event, record.tokenId) }}
                        className="my-4"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><br />
                    <Button variant="contained" color="primary" onClick={(event) => { handleSubmit(event, record.tokenId) }} startIcon={<SendIcon />}>Confirm OTP</Button>
                    <br />
                    <br />
                    <Button variant="contained" color="primary" onClick={(event) => { resendOTP(event, record.tokenId, record.mobile_number) }} startIcon={<SendIcon />}>Resend OTP</Button>
                </div>
            );
        }
    }

    const [snackBarState, setSnackBarState] = React.useState(
        {
            open: false,
            message: "",
            color: "",
        }
    );

    const [searchState, setSearchState] = React.useState("");

    const searchChangeHandler = (event) => {
        setSearchState(event.target.value);
    }

    const destroySnackBar = (event, reason) => {
        if ("clickaway" == reason) return;
        setSnackBarState(
            {
                open: false,
                message: "",
                color: "",
            }
        );
    };

    const createSnackBar = (msg) => {
        if (snackBarState.open)
            destroySnackBar(null, "clickaway");
        setSnackBarState(
            {
                open: true,
                message: msg,
                color: "green",
            }
        );
    };

    if (loggedInState.status === 'notLoggedIn')
        return <Redirect to="/loginRailway" />
    else if (loggedInState.status === 'checking') {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <br /><br />
                <Spinner animation="border" variant="primary" />
                <br /><br />
            </div>
        );
    }
    else if (loggedInState.status === 'networkError') {
        return (
            <Alert variant="warning">
            <Alert.Heading>Network Error!!</Alert.Heading>
              Check your network connection and try again <SignalCellularConnectedNoInternet2BarIcon/>
            </Alert>
        );
    }

    return (
        <div>

            <Snackbar
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
                open={snackBarState.open}
                autoHideDuration={3000}
                message={snackBarState.message}
                onClose={destroySnackBar}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={destroySnackBar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />


           <RailwayOperatorActionBar email={loggedInState.email} logoutMethod={logoutMethod} />
            <div className="container">
                <div>
                    <div className="row m-3">
                        <div className="col-md-6 col-12">
                            <input type="text" className="form-control" value={searchState} onChange={searchChangeHandler} />
                        </div>

                        <div className="col-md-3 col-12">
                            <Button variant="contained" color="primary" startIcon={<SearchIcon />}>Search</Button>
                        </div>

                        <div className="col-md-3 col-12">
                            <Button variant="contained" color="secondary" onClick={sentToken}>Fetch Today's Passengers</Button>
                        </div>
                    </div>
                </div>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Token Number</th>
                        <th>Name of Passenger</th>
                        <th>Action</th>
                        <th>Authentication Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    userListState.filter((obj) => obj.tokenId.includes(searchState))
                        .map((record, index) => (
                            <tr key={record.tokenId + record.fullName} style={{padding:"5px"}}>
                                        <td>{index+1}</td>
                                        <td>{record.tokenId}</td>
                                        <td>{record.fullName}</td>
                            
                                        <td>{
                                                        otpStateRenderer(record)

                                        }</td>
                                        
                                        {record.otpVerification ? <td>Verified</td> : <td class="bg-danger">Not Verified</td>} 
                
                           </tr>

                        )
                        )
                }
                        
                        
                    </tbody>
                    </Table>

            </div>
        </div>
    );
}

export default OTPOperator;