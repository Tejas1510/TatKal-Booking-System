import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
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
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import RailwayOperatorActionBar from '../../components/RailwayOperatorActionBar/RailwayOperatorActionBar';
import Spinner from 'react-bootstrap/Spinner';
import {Redirect} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import SignalCellularConnectedNoInternet2BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet2Bar';

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

// function createData(name, age, gender, berth) {
//   return { name, age, gender, berth};
// }


function CounterOperator() {

  const [data, setData] = useState({})
  const [id, setId] = useState('');
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [loggedInState, setLoggedInState] = useState({ status: 'checking', email: '' });

  const logoutMethod = () => {
    const token = localStorage.getItem("token") || '';
    axios.post("http://localhost:5000/api/internal/logoutRailwayOperator", {
      email: loggedInState.email,
      token: token
    }).then((res) => {
      console.log("res", res.data.status);
      if (res.data.status === 'logged out') {
        localStorage.removeItem("token");
        setLoggedInState({ status: "notLoggedIn", email: '' });
      }
    });
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
          setLoggedInState({ ...loggedInState, email: result.data.email, status: 'loggedIn' });
        }
        else
          setLoggedInState({ ...loggedInState, status: 'notLoggedIn' });
      }).catch((err) => {
        setLoggedInState({ ...loggedInState, status: 'networkError' });
        //console.log(err);
      })
  }, []);

  let sigPad = useRef({});
  // let data='';
  function clear() {
    sigPad.current.clear();
  }
  function save() {
    data = sigPad.current.toDataURL();
  }
  function show() {
    sigPad.current.fromDataURL(data);
  }
  // console.log(id)
  const fetchDetails = (e, id) => {
    // e.preventDeafault()
    console.log(id)
    axios.get(`http://localhost:5000/api/userdata/?id=${id}`)
      .then((response) => {
        setData(response.data[0])
      });
  }

  console.log(data)

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

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    return (
     
      <div>

        <RailwayOperatorActionBar email={loggedInState.email} logoutMethod={logoutMethod} />
        <div className="container my-3 pb-2 shadow" style={{ backgroundColor: "#00004d", borderRadius: "8px" }}>
          <br/>
          

          <center><h1 style={{ backgroundColor: "#00004d" }} className="container shadow my-2 p-2 text-white" >Fetch Passenger Details </h1></center>


          <Card style={{ width: "90%", margin: "auto", backgroundColor: "white" }} className="p-2 mb-4 shadow">
            <CardContent>

              <form className="p-2" style={{ textAlign: "left" }}>
                <h5 style={{ color: "#00004d" }}>Fetch Details</h5>
                <div className="row col-12">
                  <div className="col-12 col-sm-4 my-1">
                    <input type="text" placeholder="Enter Token ID"
                      onChange={(e) => setId(e.target.value)} 
                    />
                  </div>
                  <div className="col-12 col-sm-4 my-1">
                    <Button variant="contained" color="secondary"
                      onClick={(e) => fetchDetails(e, id)}
                    >
                      <span>Fetch User Details  <SendIcon /></span>
                    </Button>
                  </div>

                </div>
              </form>

              

             

            </CardContent>

          </Card>
        </div>
      </div>
    )
  }

  else {
    return (
      <div>
      <RailwayOperatorActionBar email={loggedInState.email} logoutMethod={logoutMethod} />
        <div className="container my-3 pb-5 shadow" style={{ backgroundColor: "#00004d", borderRadius: "8px" }}>

          <center><h1 style={{ backgroundColor: "#00004d" }} className="container shadow my-2 p-2 text-white" >Operator 1 Console</h1></center>


          <Card style={{ width: "90%", margin: "auto", backgroundColor: "white" }} className="p-2 shadow">
            <CardContent>

              <form className="p-2" style={{ textAlign: "left" }}>
                <h5 style={{ color: "#00004d" }}>Fetch Details</h5>
                <div className="row col-12">
                  <div className="col-12 col-sm-4 my-1">
                    <input type="text" placeholder="Enter Token ID"
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-sm-4 my-1">
                    <Button variant="contained" color="secondary"
                      onClick={(e) => fetchDetails(e, id)}
                    >
                      <span>Fetch User Details  <SendIcon /></span>
                    </Button>
                  </div>

                </div>
              </form>

              <hr />

              <form style={{ textAlign: "left" }}>
                <h5 style={{ color: "#00004d" }}>1. User Details</h5>
                <div className="row" style={{ fontSize: "18px" }}>
                  <div className="col-12 col-sm-6">
                    <b>Full Name: </b> {data.fullName} <br />
                    <b>Date of Birth (DOB): {data.dateOfBirth} </b> <br />
                    <b>Mobile Number: </b> 1234567890 <br />
                    <b>Aadhar Card Number: </b> {data.aadharNumber} <br />
                  </div>

                  <div className="col-12 col-sm-6">
                    <b>Source Station: </b> {data.sourceStation} <br />
                    <b>Detination Station: </b> {data.destinationStation} <br />
                    <b>Boarding Station: </b> {data.boardingStation} <br />
                    <b>Reservation Up To: </b> {data.reservationUpTo} <br />
                  </div>



                </div>


                {/* Preferences Section */}
                <Divider variant="middle" className="my-3" style={{ fontWeight: "5px", color: "black" }} />
                <h5 style={{ color: "#00004d" }}>2. Preference Details</h5>

                {data.preferenceTrain.allTrain === true ?
                  (
                    <div>
                    <h5>Preference for Trains:</h5> Any possible Train
                    </div>
                  )
                  :
                  (
                    <div className="row">
                      <div className="col-sm-3 col-12 my-2">
                        <h5>Preference for Trains:</h5>
                        <br />
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                        <b>Preference 1:</b> {data.preferenceTrain.train1}
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                      <b>Preference 2:</b> {data.preferenceTrain.train2}
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                      <b>Preference 3:</b> {data.preferenceTrain.train3}
                      </div>
                    </div>
                  )
                }



                {/* Preferences Section */}
                <Divider variant="middle" className="my-3" style={{ fontWeight: "5px", color: "black" }} />


                {data.preferenceClass.allClass === true ?
                  (
                    <div>
                    <h5>Preference for Class:</h5> Any Class
                    </div>
                  )
                  :
                  (
                    <div className="row">
                      <div className="col-sm-3 col-12 my-2">
                        <h5>Preference for Class:</h5>
                        <br />
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                        <b>Preference 1:</b> {data.preferenceClass.class1}
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                      <b>Preference 2:</b> {data.preferenceClass.class2}
                      </div>
                      <div className="col-sm-3 col-12 my-2">
                      <b>Preference 3:</b> {data.preferenceClass.class3}
                      </div>
                    </div>
                  )
                }



                {/* Passenger Section */}
                <Divider variant="middle" className="my-3" style={{ fontWeight: "5px", color: "black" }} />

                <h5 style={{ color: "#00004d" }}>3. Passenger Details</h5>
                <div className="row">
                  <div className="col-sm-7 col-12">

                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{ backgroundColor: "lightgreen" }}>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Berth Preference</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.passengerDetail.map((d, index) => (
                            <TableRow key={index}>
                              <TableCell>{d.name}</TableCell>
                              <TableCell>{d.age}</TableCell>
                              <TableCell>{d.gender}</TableCell>
                              <TableCell>Lower</TableCell>

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>


                  <div className="col-sm-5 col-12">
                    <h6>For children (Below 5 years):</h6>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{ backgroundColor: "lightgreen" }}>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.childrenDetail.map((d, index) => (
                            <TableRow key={index}>
                              <TableCell>{d.name}</TableCell>
                              <TableCell>{d.age}</TableCell>
                              <TableCell>{d.gender}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* date of travel    */}
                    <h5 className="my-3">Date of Travel: {data.dateOfTravel}</h5>
                  </div>

                </div>

              </form>

            </CardContent>

          </Card>
        </div>
      </div>
    )
  }
  //   return(

  //   <div>      
  //     <div className="container my-1 pb-5 shadow" style={{backgroundColor:"orange",borderRadius:"8px"}}>

  //       <center><h1 style={{backgroundColor:"#00004d"}} className="container shadow my-3 p-2 text-white" >User : </h1></center>


  //       <Card style={{width: "80%",margin:"auto",backgroundColor:"white"}} className="p-2 shadow">
  //           <CardContent>

  //       <form className="p-2" style={{textAlign:"left"}}>
  //           <h5 style={{color:"#00004d"}}>Fetch Details</h5>  
  //           <div className="row col-12">
  //               <div className="col-12 col-sm-4 my-1">
  //                 <input type="text" placeholder="Enter Token ID" 
  //                 onChange={(e) => setId(e.target.value)}
  //                 />
  //               </div>
  //               <div className="col-12 col-sm-4 my-1">
  //                       <Button variant="contained" color="secondary"
  //                       onClick={(e) => fetchDetails(e,id)}
  //                       >
  //                               <span>Fetch User Details  <SendIcon/></span>
  //                       </Button>
  //               </div>

  //           </div>
  //       </form>

  //       <hr/>

  //           <form style={{textAlign:"left"}}>
  //           <h5 style={{color:"#00004d"}}>1. User Details</h5>
  //            <div className="row" style={{fontSize:"18px"}}>
  //             <div className="col-12 col-sm-6">
  //               <b>Full Name: </b> {data.fullName} <br/>
  //               <b>Date of Birth (DOB): {data.dateOfBirth} </b> <br/>
  //               <b>Mobile Number: </b> {data.fullName} <br/>
  //               <b>Aadhar Card Number: </b> {data.aadharNumber} <br/>
  //             </div>

  //             <div className="col-12 col-sm-6">
  //               <b>Source Station: </b> {data.sourceStation} <br/>
  //               <b>Detination Station: </b> {data.destinationStation} <br/>
  //               <b>Boarding Station: </b> {data.boardingStation} <br/>
  //               <b>Reservation Up To: </b> {data.reservationUpTo} <br/>
  //             </div>



  //            </div>


  //             {/* Preferences Section */}
  //            <Divider variant="middle" className="my-3" style={{fontWeight:"5px",color:"black"}}/>

  //            <h5 style={{color:"#00004d"}}>2. Preferences</h5>

  //            <div className="row">
  //               <div className="col-sm-3 col-12 my-2">
  //                   <h6>Preference for Trains:</h6>
  //                   <br/>
  //                   <FormControlLabel
  //                       control={<Checkbox onChange={handleChange} name="checkedA" />}
  //                       label="Any Possible Train"
  //                     />
  //               </div>
  //              <div className="col-sm-3 col-12 my-2">
  //              Preference 1:
  //              </div>
  //              <div className="col-sm-3 col-12 my-2">
  //              Preference 2:
  //              </div>
  //              <div className="col-sm-3 col-12 my-2">
  //              Preference 3:
  //              </div>
  //            </div>

  //            <div className="row">
  //               <div className="col-sm-3 col-12 my-2">
  //                   <h6>Preference for Class:</h6>
  //                   <br/>
  //                   <FormControlLabel
  //                       control={<Checkbox onChange={handleChange} name="checkedB" />}
  //                       label="Any Class"
  //                     />
  //               </div>
  //              <div className="col-sm-3 col-12 my-2">

  //               Class Preference 1:
  //              </div>

  //              <div className="col-sm-3 col-12 my-2">
  //              Class Preference 2:
  //              </div>

  //              <div className="col-sm-3 col-12 my-2">
  //              Class Preference 3:
  //              </div>
  //            </div>


  //             {/* Passenger Section */}
  //            <Divider variant="middle" className="my-3" style={{fontWeight:"5px",color:"black"}}/>

  //            <h5 style={{color:"#00004d"}}>3. Passenger Details</h5>
  //            <div className="row">
  //              <div className="col-sm-7 col-12">

  //              <TableContainer component={Paper}>
  //                 <Table className={classes.table} aria-label="simple table">
  //                   <TableHead style={{backgroundColor:"orange"}}>
  //                     <TableRow>
  //                       <TableCell>Name</TableCell>
  //                       <TableCell>Age</TableCell>
  //                       <TableCell>Gender</TableCell>
  //                       <TableCell>Berth Preference</TableCell>

  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {/* {map((d,index) => (
  //                       <TableRow key={index}>
  //                         <TableCell>{d.name}</TableCell>
  //                         <TableCell>{d.age}</TableCell>
  //                         <TableCell>{d.gender}</TableCell>
  //                         <TableCell>Lower</TableCell>

  //                       </TableRow> */}
  //                     ))}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //              </div>


  //              <div className="col-sm-5 col-12">
  //                 <h6>For children (Below 5 years):</h6>
  //                 <TableContainer component={Paper}>
  //                     <Table className={classes.table} aria-label="simple table">
  //                       <TableHead style={{backgroundColor:"orange"}}>
  //                         <TableRow>
  //                           <TableCell>Name</TableCell>
  //                           <TableCell>Age</TableCell>
  //                           <TableCell>Gender</TableCell>

  //                         </TableRow>
  //                       </TableHead>
  //                       <TableBody>
  //                         {[...Array(1)].map((row,index) => (
  //                           <TableRow key={index}>
  //                             <TableCell>Yash Agrawal</TableCell>
  //                             <TableCell>3</TableCell>
  //                             <TableCell>Male</TableCell>

  //                           </TableRow>
  //                         ))}
  //                       </TableBody>
  //                     </Table>
  //                   </TableContainer>

  //                     {/* date of travel    */}
  //                  <h5 className="my-3">Date of Travel:</h5>


  //                  {/* signature */}

  //                 <h5>Digital Signature (For Audit Purpose)</h5>


  //              </div>

  //            </div>

  //           </form>

  //           </CardContent>

  //         </Card>


  //  </div>


  //   </div>

  //   )
}
export default CounterOperator;