import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext()

function App() {
  const [vehicles, setVehicles] = useState([])
  const {id} = vehicles;
  return (
    <userContext.Provider value={[vehicles, setVehicles]}>
      <Router>
        <Header/>
        <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <PrivateRoute path="/destination/:id">
              <Destination/>
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <Destination/>
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Home/>
            </Route>
          </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
