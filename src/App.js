import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';

function App() {

  const [user, setUser] = useState(null);
  return (
    //BEM naming
    <div className="app">
      {!user ? (
       <Login />
      ): (
        <div className="app__body">
          <Router>
            <Sidebar />
  
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
  
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          
          </Router>
        </div>
      )}
    
    </div>
  );
}

export default App;
