import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import MainNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Registration Form/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Guideliness from './pages/GuideLiness/Guideliness';
import Contact from './pages/ContactUs/Contact';
import OTPOperator from './pages/OTPOperator/OTPOperator';
import CounterOperator from './pages/CounterOperator/CounterOperator';
import Success from './pages/Registration Form/Success';
import OperatorLogin from './pages/RailwayOperatorsAuthentication/OperatorLogin';

function App() {
  return (
    <Router>
     
      <Switch>
        <Route exact path ='/'>
          <MainNavbar/>
          <Home/>
        </Route>
        <Route  path ='/register'>
          <MainNavbar/>
          <Register/>
        </Route>
        {/* <Route  path ='/guideliness'>
          <Guideliness/>
        </Route> */}
        <Route path ='/contactus'>
        <MainNavbar/>
          <Contact/>
        </Route>
        <Route path ='/otp_op'>
          <OTPOperator/>
        </Route>
        <Route path ='/counter_op'>
          <CounterOperator/>
        </Route>
        <Route path='/loginRailway'>
          <MainNavbar/> 
          <OperatorLogin/>
        </Route>
      </Switch>

      <Footer/>
    </Router>
  );
}

export default App;
