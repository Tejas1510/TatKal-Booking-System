import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  formControl:{
    width: 200,
  },
  formControl1:{
    width: 80,
  },
  input: {
    display: 'none',
  },
}));

function createData(name, age, gender, berth) {
  return { name, age, gender, berth};
}

const rows = [
  // createData('Yash Agrawal', 21, 'Male', 'L' ),

];

function Register(){
  
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return(
    <div>

    {/* Header Section */}
        


      <div className="container my-5 pb-5 shadow" style={{backgroundColor:"orange",borderRadius:"8px"}}>
        
        <center><h1 style={{backgroundColor:"#00004d"}} className="container shadow my-3 p-2 text-white" >Tatkal Form</h1></center>

      
        <Card style={{width: "80%",margin:"auto",backgroundColor:"white"}} className="p-2 shadow">
            <CardContent>
            <form style={{textAlign:"left"}}>
            <h5 style={{color:"#00004d"}}>1. User Details</h5>
             <div class="row">
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Full Name" />
               </div>
               <div class="col-sm-3 col-12 my-2">
                    <TextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
               </div>

               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Mobile Number" />
               </div>

               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Aadhar Number" />
               </div>

             </div>
             

             {/* 2nd row */}

             <div class="row">
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Source Station" />
               </div>
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Destination Station" />
               </div>

               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Boarding Station" />
               </div>

               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Reservation Up To" />
               </div>

             </div>
              
              {/* Preferences Section */}
             <Divider variant="middle" className="my-3" style={{fontWeight:"5px",color:"black"}}/>

             <h5 style={{color:"#00004d"}}>2. Preferences</h5>
            
             <div class="row">
                <div class="col-sm-3 col-12 my-2">
                    <h6>Preference for Trains:</h6>
                    <br/>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} name="checkedA" />}
                        label="Any Possible Train"
                      />
                </div>
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Enter Train No." helperText="Preference 1" />
               </div>
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Enter Train No." helperText="Preference 2" />
               </div>
               <div class="col-sm-3 col-12 my-2">
               <TextField id="standard-basic" label="Enter Train No." helperText="Preference 3" />
               </div>
             </div>
  
             <div class="row">
                <div class="col-sm-3 col-12 my-2">
                    <h6>Preference for Class:</h6>
                    <br/>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} name="checkedB" />}
                        label="Any Class"
                      />
                </div>
               <div class="col-sm-3 col-12 my-2">
               <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Class Preference 1</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      onChange={handleChange}
                      value={age}>
                      <MenuItem value={10}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={20}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={30}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={40}>Sleeper (SL)</MenuItem>
                      <MenuItem value={50}>AC Chair Car (CC)</MenuItem>
                    </Select>
                  
                  </FormControl>
               </div>

               <div class="col-sm-3 col-12 my-2">
               <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Class Preference 2</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      onChange={handleChange}
                      
                      value={age}>
                      <MenuItem value={10}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={20}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={30}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={40}>Sleeper (SL)</MenuItem>
                      <MenuItem value={50}>AC Chair Car (CC)</MenuItem>
                    </Select>
                    
                  </FormControl>
               </div>

               <div class="col-sm-3 col-12 my-2">
               <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Class Preference 3</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      onChange={handleChange}
                      value={age}>
                      <MenuItem value={10}>AC First Class (1AC)</MenuItem>
                      <MenuItem value={20}>AC 2 Tier (2AC)</MenuItem>
                      <MenuItem value={30}>AC 3 Tier (3AC)</MenuItem>
                      <MenuItem value={40}>Sleeper (SL)</MenuItem>
                      <MenuItem value={50}>AC Chair Car (CC)</MenuItem>
                    </Select>
                    
                  </FormControl>
               </div>
             </div>
              

              {/* Passenger Section */}
             <Divider variant="middle" className="my-3" style={{fontWeight:"5px",color:"black"}}/>

             <h5 style={{color:"#00004d"}}>3. Passenger Details</h5>
             <div class="row">
               <div class="col-sm-7 col-12">
                
               <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead style={{backgroundColor:"orange"}}>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Berth Preference</TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...Array(6)].map((row,index) => (
                        <TableRow key={index}>
                          <TableCell>
                          <TextField id="standard-basic" label="Name" />
                          </TableCell>
                          <TableCell><TextField id="standard-basic" label="Age" /></TableCell>
                          <TableCell>
                          <FormControl className={classes.formControl1}>
                              <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={handleChange}
                                value={age}>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"feamale"}>Female</MenuItem>
                              </Select>
                    
                          </FormControl>
                          </TableCell>
                          <TableCell>
                          <FormControl className={classes.formControl1}>
                              <InputLabel id="demo-simple-select-helper-label">Berth</InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={handleChange}
                                value={age}>
                                <MenuItem value={"l"}>Lower (L)</MenuItem>
                                <MenuItem value={"m"}>Middle (M)</MenuItem>
                                <MenuItem value={"u"}>Upper (U)</MenuItem>
                                <MenuItem value={"su"}>Side Upper (SU)</MenuItem>
                                <MenuItem value={"sl"}>Side Lower (SL)</MenuItem>
                              </Select>
                    
                          </FormControl>
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               </div>


               <div class="col-sm-5 col-12">
                  <h6>For children (Below 5 years):</h6>
                  <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{backgroundColor:"orange"}}>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[...Array(3)].map((row,index) => (
                            <TableRow key={index}>
                              <TableCell>
                              <TextField id="standard-basic" label="Name" />
                              </TableCell>
                              <TableCell><TextField id="standard-basic" label="Age" /></TableCell>
                              <TableCell>
                              <FormControl className={classes.formControl1}>
                                  <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    onChange={handleChange}
                                    value={age}>
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"feamale"}>Female</MenuItem>
                                  </Select>
                        
                              </FormControl>
                              </TableCell>
                              
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                         

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
               </div>

             </div>
             
            </form>
            
            </CardContent>
            <CardActions>
            <Button variant="contained" color="primary" style={{margin:"auto"}}>
                Request Tatkal Ticket 
            </Button>
            </CardActions>
          </Card>
      
    
   
   </div>
    
    
    </div>

    )
}
export default Register;