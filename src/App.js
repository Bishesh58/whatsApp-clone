import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Firebase/firebase';
import { login , logout, selectUser} from './Components/features/userSlice';

function App() {

  //pull user from slice
  const user = useSelector(selectUser)
  
  //for dispatching the user
  const dispatch = useDispatch();

  //to keeping user login persistence
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        //dispatch the user to slice
        dispatch(login({
          user: authUser.displayName,
          photoUrl: authUser.photoURL
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [])
  
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
