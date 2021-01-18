import React from 'react';
import { Counter } from './features/Counter';
import './App.css';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    //BEM naming
    <div className="app">
     <div className="app__body">
       <Sidebar />
       {/* Chat */}
     </div>
    </div>
  );
}

export default App;
