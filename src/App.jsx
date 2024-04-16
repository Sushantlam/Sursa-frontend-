import React, { useEffect, useState } from 'react';
import Login from './Page/Login/Login';
import {
  BrowserRouter as Router,
 Routes,
  Route
} from "react-router-dom";
import Signin from './Page/SignUp/Signin';
import Home from './Page/Home/Home';
import Nav from './Components/Nav';

function App() {
 

  return (
    <>


         <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signin/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
