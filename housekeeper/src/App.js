import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <AnonRoute exact path="/login" component={Authentication} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />


          {/* <Route exact path="/gigboard" component={GigBoard} />
          <Route exact path="/faq" component={FAQ} />

          <AnonRoute exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/my-profile" component={MyProfile} />
          <Route exact path="/:endpoint" component={BandPage}/> */}
        </Switch>
    </div>
  );
}

export default App;
