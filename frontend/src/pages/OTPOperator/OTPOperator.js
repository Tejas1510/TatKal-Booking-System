import React, { useRef, useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SignaturePad from 'react-signature-canvas';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './OTPOperator.css';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Search';

function OTPOperator() {
    const [userListState, setUserListState] = useState(
        [
            { token_id: "67890", mobile_number:"9021067230", arr:[], status: "not verified", otpState: "not sent", timer:0}
        ]
    );

    const handlePhoneVerification=(phone1)=>{
        axios.post("http://localhost:4000/sendOTP",{
        phone: "+91" + phone1.toString()
        }).then((res)=>{
        const phone21 = res.data.phone
        const hash21 = res.data.hash
        const otp21 = res.data.otp
        var OTParr = new Array()
        OTParr = [phone21,hash21,otp21]
        console.log(phone21,hash21,otp21);
        return OTParr
        })
        } 

        const handleSubmit = e =>{

            console.log(userListState)  
            axios.post("http://localhost:4000/verifyOTP",{
            //   phone: userListState.arr[0],
            //   hash :  userListState.arr[1],
            //   otp: userListState.arr[2]
            }).then(result => {
              console.log(result.data.msg);
            }).catch((err)=>{
              console.log(err.response.data);
              if(err.response.data.msg === "Incorrect OTP"){
                window.alert("Incorrect OTP")
              }

            })
              
          }

    const sendOTP = (token_id,mobile_number) => {
        console.log("OTP SEND");
        createSnackBar("OTP Sent Successfully");
        console.log(mobile_number);
        var arr1 = new Array()
        console.log(handlePhoneVerification(mobile_number));
        let affectedIndex = userListState.findIndex(element => element.token_id === token_id );
        let newListState = [...userListState];
        newListState[affectedIndex] = {...newListState[affectedIndex], otpState: "sent", arr: arr1};
        setUserListState(newListState);
        
    }


    const resendOTP = (token_id) => {
        console.log("OTP RESEND");
        createSnackBar("OTP Resent Successfully");
        let affectedIndex = userListState.findIndex(element => element.token_id === token_id );
        let newListState = [...userListState];
        newListState[affectedIndex] = {...newListState[affectedIndex], otpState: "sent"};
        setUserListState(newListState);
    }

    const otpStateRenderer = (record) => {
        if (record.status === "verified") {
            return (
                <div>
                    OTP Sent
                </div>
            );
        }
        if (record.otpState === "not sent") {
            return (
                <div>
                    <Button variant="contained" color="primary" onClick={() => {sendOTP(record.token_id, record.mobile_number)}} startIcon={<SendIcon />}>Send OTP</Button>
                </div>
            );
        }
        else if (record.otpState === "sent" && record.status === "not verified") {
            return (
                <div>
                    <p>OTP Sent</p>
                    <TextField id={"otp-" + record.token_id}
                        label="Enter OTP"
                        type="text"
                        className="my-4"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><br />
                    <Button variant="contained" color="primary" onClick={() => {handleSubmit()}} startIcon={<SendIcon />}>Confirm OTP</Button>
                    <br />
                    <br />
                    <Button variant="contained" color="primary" onClick={() => {resendOTP(record.token_id)}} startIcon={<SendIcon />}>Resend OTP</Button>
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
        if(snackBarState.open)
            destroySnackBar(null, "clickaway");
            setSnackBarState(
                {
                    open: true,
                    message: msg,
                    color: "green",
                }
            );
    };

    return (
        <div style={{ backgroundColor: "orange" }}>
            
            
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



            <div className="container">
                <div className="mb-3">
                    <br/>
                    <br/>
                    <div class="row">
                        
                        <div class="col-md-9 col-12">
                            <input type="text" className="form-control" value={searchState} onChange={searchChangeHandler}/>
                            
                        </div>

                        <div class="col-md-3 col-12">
                            <Button variant="contained" color="primary" startIcon={<SearchIcon />}>Search</Button>
                        </div>
                    
                    </div>                    
                </div>

                <div className="row recordRow bg-dark">
                    <div className="col-md-4 col-12">
                        <div className="cell text-white">
                            Token ID
                        </div>
                    </div>

                    <div className="col-md-4 col-12">
                        <div className="cell text-white">
                            Action
                        </div>
                    </div>

                    <div className="col-md-4 col-12">
                        <div className="cell text-white">
                            Status
                        </div>
                    </div>

                </div>

                {
                    userListState.filter((obj) => obj.token_id.includes(searchState))
                    .map((record, index) => (
                        <div className={index % 2 ? "row recordRow stripe1" : "row recordRow stripe2"} key={record.token_id}>
                            <div className="col-md-4 col-12">
                                <div className="cell">
                                    {record.token_id}
                                </div>
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="cell">
                                    {
                                        otpStateRenderer(record)

                                    }
                                </div>
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="cell">
                                    {record.status}
                                </div>
                            </div>

                        </div>
                    )
                    )
                }

            </div>
        </div>
    );
}

export default OTPOperator;