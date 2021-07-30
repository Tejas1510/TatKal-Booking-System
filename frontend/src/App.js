import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import MainNavbar from './components/Navbar/Navbar';
import Register from './pages/Registration Form/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Guideliness from './pages/GuideLiness/Guideliness';
import Contact from './pages/ContactUs/Contact';

function App() {
  return (
    <Router>
      <MainNavbar/>
      <Switch>
        <Route exact path ='/'>
          <Register/>
        </Route>
        <Route  path ='/mainhomepage'>
          <Home/>
        </Route>
        <Route  path ='/guideliness'>
          <Guideliness/>
        </Route>
        <Route path ='/contactus'>
          <Contact/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
