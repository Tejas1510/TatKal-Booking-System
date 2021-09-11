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

    const [userListState, setUserListState] = useState( [] );

    const fetchUserData = () => {
        axios.get("http://localhost:5000/api/otpOperator/otpUserData")
        .then(result => {
            var newStateList = [];
            for(let obj of result.data){
                //console.log(obj);
                newStateList.push({ fullName: obj.fullName, tokenId: obj.tokenId, mobile_number: obj.mobileNumber, arr: [], otpVerification: obj.otpVerification, otpState: "not sent", otpValue: "", timer: 0 });
            }
            console.log("newStateList", newStateList);
            setUserListState(newStateList);
        }).catch((err) => {
            //console.log(err);
        })
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
                newListState[affectedIndex] = { ...newListState[affectedIndex], otpVerification: true};
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
                    <br />
                    <br />
                    <div class="row">

                        <div class="col-md-9 col-12">
                            <input type="text" className="form-control" value={searchState} onChange={searchChangeHandler} />

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
                    userListState.filter((obj) => obj.tokenId.includes(searchState))
                        .map((record, index) => (
                            <div className={index % 2 ? "row recordRow stripe1" : "row recordRow stripe2"} key={record.tokenId}>
                                <div className="col-md-4 col-12">
                                    <div className="cell">
                                        {record.tokenId}<br/>
                                        {`( ${record.fullName} )`}
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
                                        {record.otpVerification ? "Verified" : "Not Verified"}
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