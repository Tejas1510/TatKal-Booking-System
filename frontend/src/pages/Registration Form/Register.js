import React, { useRef } from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import uuid from 'react-uuid';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  formControl: {
    width: 200,
  },
  formControl1: {
    width: 80,
  },
  input: {
    display: 'none',
  },
}));

function Register() {

  const classes = useStyles();

  // State for section 1 of registration form
  const [userDetailState, setUserDetailState] = React.useState({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    aadharNumber: '',
    sourceStation: '',
    destinationStation: '',
    boardingStation: '',
    reservationUpTo: '',
    tokenId:'',
    dateOfTravel:''
  });

  // State for section 2 of registration form
  const [preferencesState, setPreferencesState] = React.useState({
    train1: '',
    train2: '',
    train3: '',
    allTrain: false,
    class1: '',
    class2: '',
    class3: '',
    allClass: false
  });


  // state for section 3 adult passengers
  const [adultPassengersState, setAdultPassengersState] = React.useState({
    rowCount: 1,
    maxRowCount: 5,
    passengers: [{ name: '', age: '', gender: '', berth: '' }]
  });

  // state for section 3 children passengers
  const [childrenPassengersState, setChildrenPassengersState] = React.useState({
    rowCount: 1,
    maxRowCount: 3,
    passengers: [{ name: '', age: '', gender: '', berth: '' }]
  });

  const addChildrenRow = () => {
    if (childrenPassengersState.rowCount < childrenPassengersState.maxRowCount) {
      setChildrenPassengersState({
        ...childrenPassengersState,
        rowCount: childrenPassengersState.rowCount + 1,
        passengers: [...childrenPassengersState.passengers, { name: '', age: '', gender: '' }]
      });
    }
  }

  const deleteChildrenRow = (index) => {
    let newState = [...childrenPassengersState.passengers];
    newState.splice(index, 1);

    setChildrenPassengersState({
      ...childrenPassengersState,
      rowCount: childrenPassengersState.rowCount - 1,
      passengers: newState
    });
  }

  const addPassengerRow = () => {
    if (adultPassengersState.rowCount < adultPassengersState.maxRowCount) {
      setAdultPassengersState({
        ...adultPassengersState,
        rowCount: adultPassengersState.rowCount + 1,
        passengers: [...adultPassengersState.passengers, { name: '', age: '', gender: '', berth: '' }]
      });
    }
  }

  const deletePassengerRow = (index) => {
    let newState = [...adultPassengersState.passengers];
    newState.splice(index, 1);

    setAdultPassengersState({
      ...adultPassengersState,
      rowCount: adultPassengersState.rowCount - 1,
      passengers: newState
    });
  }

  const handleTextFieldChange = (event, setStateMethod, initialState) => {
    //console.log("handleTextField", event.target);
    setStateMethod({ ...initialState, [event.target.name]: event.target.value });
  }

  const handleCheckboxChange = (event, setStateMethod, initialState) => {
    //console.log("handleCheckbox", event.target.checked);
    setStateMethod({ ...initialState, [event.target.name]: event.target.checked });
  }

  const handleTableRowChange = (event, setStateMethod, initialState, index) => {
    //console.log("handleTextField", event.target);
    let newState = initialState.passengers;
    const propName = event.target.name.split("-")[0];
    newState[index] = { ...newState[index], [propName]: event.target.value }
    setStateMethod({ ...initialState, passengers: newState });
  }

  const handleFormSubmission = (event) => {
    console.log("Form Submitted");
    const completeForm = {
      fullName: userDetailState.fullName,
      dateOfBirth: userDetailState.dateOfBirth,
      sourceStation: userDetailState.sourceStation,
      destinationStation: userDetailState.destinationStation,
      boardingStation: userDetailState.boardingStation,
      reservationUpTo: userDetailState.reservationUpTo,
      aadharNumber: userDetailState.aadharNumber,
      dateOfTravel: userDetailState.dateOfTravel,
      tokenId:uuid(),
      prefernceTrain: {
        train1: preferencesState.train1,
        train2: preferencesState.train2,
        train3: preferencesState.train3,
        allTrain: preferencesState.allTrain
      },
      prefernceClass: {
        class1: preferencesState.class1,
        class2: preferencesState.class2,
        class3: preferencesState.class3,
        allClass: preferencesState.allClass
      },

      passengerDetail: adultPassengersState.passengers,
      childrenDetail: childrenPassengersState.passengers,
      signature: "sss121"
    };
    console.log(completeForm);
    const res = axios.post('http://localhost:5000/api/userdata/register', completeForm)
      .then((response) => {
        console.log("response", response);
      });
  }


  let sigPad = useRef({});
  let data = '';
  function clear() {
    sigPad.current.clear();
  }
  function save() {
    data = sigPad.current.toDataURL();
    console.log("signData", data);
  }
  function show() {
    sigPad.current.fromDataURL(data);
  }

  return (
    <div>

      {/* Header Section */}

      <div className="container my-5 pb-5 shadow" style={{ backgroundColor: "orange", borderRadius: "8px" }}>

        <center><h1 style={{ backgroundColor: "#00004d" }} className="container shadow my-3 p-2 text-white" >Tatkal Form</h1></center>


        <Card style={{ width: "80%", margin: "auto", backgroundColor: "white" }} className="p-2 shadow">
          <CardContent>
            <form style={{ textAlign: "left" }}>
              <h5 style={{ color: "#00004d" }}>1. User Details</h5>
              <div className="row">
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="fullName" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }} defaultValue={userDetailState.fullName} name="fullName" label="Full Name" />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.dateOfBirth}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <TextField id="mobileNumber" name="mobileNumber" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.mobileNumber} label="Mobile Number" />
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <TextField id="aadharNumber" name="aadharNumber" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.aadharNumber} label="Aadhar Number" />
                </div>

              </div>


              {/* 2nd row */}

              <div className="row">
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="sourceStation" name="sourceStation" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.sourceStation} label="Source Station" />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="destinationStation" name="destinationStation" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.destinationStation} label="Destination Station" />
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <TextField id="boardingStation" name="boardingStation" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.boardingStation} label="Boarding Station" />
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <TextField id="reservationUpTo" name="reservationUpTo" onBlur={(event) => { handleTextFieldChange(event, setUserDetailState, userDetailState) }}
                    defaultValue={userDetailState.reservationUpTo} label="Reservation Up To" />
                </div>

              </div>

              {/* Preferences Section */}
              <Divider variant="middle" className="my-3" style={{ fontWeight: "5px", color: "black" }} />

              <h5 style={{ color: "#00004d" }}>2. Preferences</h5>

              <div className="row">
                <div className="col-sm-3 col-12 my-2">
                  <h6>Preference for Trains:</h6>
                  <br />
                  <FormControlLabel
                    control={<Checkbox onChange={(event) => { handleCheckboxChange(event, setPreferencesState, preferencesState) }} checked={preferencesState.allTrain} name="allTrain" />}
                    label="Any Possible Train"
                  />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="train1" name="train1" onBlur={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}
                    defaultValue={preferencesState.train1} disabled={preferencesState.allTrain} label="Enter Train No. 1" helperText="Preference 1" />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="train2" name="train2" onBlur={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}
                    defaultValue={preferencesState.train2} disabled={preferencesState.allTrain} label="Enter Train No. 2" helperText="Preference 2" />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <TextField id="train3" name="train3" onBlur={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}
                    defaultValue={preferencesState.train3} disabled={preferencesState.allTrain} label="Enter Train No. 3" helperText="Preference 3" />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3 col-12 my-2">
                  <h6>Preference for Class:</h6>
                  <br />
                  <FormControlLabel
                    control={<Checkbox onChange={(event) => { handleCheckboxChange(event, setPreferencesState, preferencesState) }} checked={preferencesState.allClass} name="allClass" />}
                    label="Any Class"
                  />
                </div>
                <div className="col-sm-3 col-12 my-2">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="classPref1">Class Preference 1</InputLabel>
                    <Select
                      id="class1"
                      name="class1"
                      disabled={preferencesState.allClass}
                      value={preferencesState.class1}
                      onChange={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}>
                      <MenuItem value={"10"}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={"20"}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={"30"}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={"40"}>Sleeper (SL)</MenuItem>
                      <MenuItem value={"50"}>AC Chair Car (CC)</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="classPref2">Class Preference 2</InputLabel>
                    <Select
                      id="class2"
                      name="class2"
                      disabled={preferencesState.allClass}
                      value={preferencesState.class2}
                      onChange={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}>
                      <MenuItem value={"10"}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={"20"}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={"30"}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={"40"}>Sleeper (SL)</MenuItem>
                      <MenuItem value={"50"}>AC Chair Car (CC)</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-sm-3 col-12 my-2">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="classPref3">Class Preference 3</InputLabel>
                    <Select
                      id="class3"
                      name="class3"
                      disabled={preferencesState.allClass}
                      value={preferencesState.class3}
                      onChange={(event) => { handleTextFieldChange(event, setPreferencesState, preferencesState) }}>
                      <MenuItem value={"10"}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={"20"}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={"30"}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={"40"}>Sleeper (SL)</MenuItem>
                      <MenuItem value={"50"}>AC Chair Car (CC)</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>


              {/* Passenger Section */}
              <Divider variant="middle" className="my-3" style={{ fontWeight: "5px", color: "black" }} />

              <h5 style={{ color: "#00004d" }}>3. Passenger Details</h5>
              <div className="row">
                <div className="col-sm-7 col-12">

                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead style={{ backgroundColor: "orange" }}>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Age</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Berth Preference</TableCell>
                          <TableCell>Delete Row</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {adultPassengersState.passengers.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField id={`name-${index}`} value={adultPassengersState.passengers[index].name} onChange={(event) => { handleTableRowChange(event, setAdultPassengersState, adultPassengersState, index) }} name={`name-${index}`} label="Name" />
                            </TableCell>
                            <TableCell><TextField id={`age-${index}`} name={`age-${index}`} value={adultPassengersState.passengers[index].age} onChange={(event) => { handleTableRowChange(event, setAdultPassengersState, adultPassengersState, index) }} label="Age" /></TableCell>
                            <TableCell>
                              <FormControl className={classes.formControl1}>
                                <InputLabel id={`genderlabel-${index}`}>Gender</InputLabel>
                                <Select
                                  labelId={`label-gender-${index}`}
                                  id={`gender-${index}`} name={`gender-${index}`}
                                  value={adultPassengersState.passengers[index].gender} onChange={(event) => { handleTableRowChange(event, setAdultPassengersState, adultPassengersState, index) }}
                                >
                                  <MenuItem value={"male"}>Male</MenuItem>
                                  <MenuItem value={"female"}>Female</MenuItem>
                                </Select>

                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <FormControl className={classes.formControl1}>
                                <InputLabel id="demo-simple-select-helper-label">Berth</InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id={`berth-${index}`} name={`berth-${index}`}
                                  value={adultPassengersState.passengers[index].berth} onChange={(event) => { handleTableRowChange(event, setAdultPassengersState, adultPassengersState, index) }}
                                >
                                  <MenuItem value={"l"}>Lower (L)</MenuItem>
                                  <MenuItem value={"m"}>Middle (M)</MenuItem>
                                  <MenuItem value={"u"}>Upper (U)</MenuItem>
                                  <MenuItem value={"su"}>Side Upper (SU)</MenuItem>
                                  <MenuItem value={"sl"}>Side Lower (SL)</MenuItem>
                                </Select>

                              </FormControl>
                            </TableCell>

                            <TableCell>
                              <DeleteIcon variant="contained" color="secondary" fontSize="medium" onClick={() => { deletePassengerRow(index) }}/>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                    <AddCircleIcon variant="contained" color="secondary" fontSize="large" onClick={addPassengerRow}/>
                    </div>
                    <div className="col-12 col-sm-6">
                      <p>(Max. 5 Passengers)</p>
                    </div>
                  </div>

                </div>


                <div className="col-sm-5 col-12">
                  <h6>For children (Below 5 years):</h6>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead style={{ backgroundColor: "orange" }}>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Age</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Delete Row</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {childrenPassengersState.passengers.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField id={`childrenName-${index}`} name={`name-${index}`} value={childrenPassengersState.passengers[index].name} onChange={(event) => { handleTableRowChange(event, setChildrenPassengersState, childrenPassengersState, index) }} label="Name" />
                            </TableCell>
                            <TableCell><TextField id={`childrenAge-${index}`} name={`age-${index}`} value={childrenPassengersState.passengers[index].age} onChange={(event) => { handleTableRowChange(event, setChildrenPassengersState, childrenPassengersState, index) }} label="Age" /></TableCell>
                            <TableCell>
                              <FormControl className={classes.formControl1}>
                                <InputLabel id={`label-children-gender-${index}`}>Gender</InputLabel>
                                <Select
                                  labelId={`labelid-children-gender-${index}`}
                                  id={`childrenGender-${index}`}
                                  name={`gender-${index}`}
                                  value={childrenPassengersState.passengers[index].gender} onChange={(event) => { handleTableRowChange(event, setChildrenPassengersState, childrenPassengersState, index) }}
                                >
                                  <MenuItem value={"male"}>Male</MenuItem>
                                  <MenuItem value={"female"}>Female</MenuItem>
                                </Select>

                              </FormControl>
                            </TableCell>

                            <TableCell>
                     
                              <DeleteIcon variant="contained" color="secondary" fontSize="medium" onClick={() => { deleteChildrenRow(index) }}/>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                     <AddCircleIcon variant="contained" color="secondary" fontSize="large" onClick={addChildrenRow}/>
                    </div>
                    <div className="col-12 col-sm-6">
                      <p>(Max. 3 Children)</p>
                    </div>
                  </div>


                  <TextField
                    id="date"
                    label="Date of Travel"
                    type="date"
                    defaultValue="2017-05-24"
                    className="my-4"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <h6>Upload Signature (For Audit Purpose)</h6>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                      Upload Signature
                    </Button>
                  </label>
                  <h6 className="text-center my-2">OR</h6>
                  <h6 className="text-primary my-2">Digital Signature</h6>
                  <div style={{ border: "1px solid black" }}>
                    <SignaturePad ref={sigPad} penColor="green" />
                    <div className="container-fluid" >
                      <div className="row text-center m-1" >
                        <div className="col-4" >
                          <Button variant="contained" color="primary" onClick={clear} startIcon={<ClearIcon />}>Clear</Button>
                        </div>
                        <div className="col-4">
                          <Button variant="contained" color="primary" onClick={save} startIcon={<SaveIcon />}>Save</Button>
                        </div>
                        <div className="col-4">
                          <Button variant="contained" color="primary" onClick={show} startIcon={<VisibilityIcon />}>Show</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </form>

          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleFormSubmission} color="primary" style={{ margin: "auto" }}>
              Request Tatkal Ticket
            </Button>
          </CardActions>
        </Card>



      </div>


    </div>

  )
}
export default Register;