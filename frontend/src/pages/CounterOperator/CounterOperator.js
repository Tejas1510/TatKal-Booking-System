import React,{useRef} from 'react';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SignaturePad from 'react-signature-canvas';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';

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

// function createData(name, age, gender, berth) {
//   return { name, age, gender, berth};
// }


function CounterOperator(){
  
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let sigPad = useRef({});
  let data='';
  function clear(){
    sigPad.current.clear();
  }
  function save(){
     data= sigPad.current.toDataURL();
  }
  function show(){
    sigPad.current.fromDataURL(data);
  }

    return(
    <div>

    {/* Header Section */}  
   
            
      <div className="container my-1 pb-5 shadow" style={{backgroundColor:"orange",borderRadius:"8px"}}>
 
        <center><h1 style={{backgroundColor:"#00004d"}} className="container shadow my-3 p-2 text-white" >User : </h1></center>

         
        <Card style={{width: "80%",margin:"auto",backgroundColor:"white"}} className="p-2 shadow">
            <CardContent>

        <form class="p-2" style={{textAlign:"left"}}>
            <h5 style={{color:"#00004d"}}>Fetch Details</h5>  
            <div class="row col-12">
                <div class="col-12 col-sm-4 my-1">
                  <input type="text" placeholder="Enter Token ID" />
                </div>
                <div class="col-12 col-sm-4 my-1">
                        <Button variant="contained" color="secondary">
                                <span>Fetch User Details  <SendIcon/></span>
                        </Button>
                </div>
            
            </div>
        </form>

        <hr/>

            <form style={{textAlign:"left"}}>
            <h5 style={{color:"#00004d"}}>1. User Details</h5>
             <div class="row" style={{fontSize:"18px"}}>
              <div class="col-12 col-sm-6">
                <b>Full Name: </b> <br/>
                <b>Date of Birth (DOB): </b> <br/>
                <b>Mobile Number: </b> <br/>
                <b>Aadhar Card Number: </b> <br/>
              </div>

              <div class="col-12 col-sm-6">
                <b>Source Station: </b> <br/>
                <b>Detination Station: </b> <br/>
                <b>Boarding Station: </b> <br/>
                <b>Reservation Up To: </b> <br/>
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
               Preference 1:
               </div>
               <div class="col-sm-3 col-12 my-2">
               Preference 2:
               </div>
               <div class="col-sm-3 col-12 my-2">
               Preference 3:
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
               
                Class Preference 1:
               </div>

               <div class="col-sm-3 col-12 my-2">
               Class Preference 2:
               </div>

               <div class="col-sm-3 col-12 my-2">
               Class Preference 3:
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
                      {[...Array(1)].map((row,index) => (
                        <TableRow key={index}>
                          <TableCell>Yash Agrawal</TableCell>
                          <TableCell>21</TableCell>
                          <TableCell>Male</TableCell>
                          <TableCell>Lower</TableCell>
                          
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
                          {[...Array(1)].map((row,index) => (
                            <TableRow key={index}>
                              <TableCell>Yash Agrawal</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>Male</TableCell>
                              
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                      {/* date of travel    */}
                   <h5 class="my-3">Date of Travel:</h5>
                   

                   {/* signature */}
                
                  <h5>Digital Signature (For Audit Purpose)</h5>
                  
                
               </div>

             </div>
             
            </form>
            
            </CardContent>
           
          </Card>
      
   
   </div>
    
    
    </div>

    )
}
export default CounterOperator;