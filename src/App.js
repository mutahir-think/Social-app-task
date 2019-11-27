import React,{useEffect} from 'react';
import SignUp from './components/Home/SignUp';
import SignIn from './components/Home/SignIn';
import Posts from './components/Dashboard/Posts';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

function App() {
  useEffect(()=>{
    
  },[])
  return (
    <Router className="app">
        <Route exact path="/" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/userprofile/:email" component={Posts} />
    </Router>
  );
}

export default App;
