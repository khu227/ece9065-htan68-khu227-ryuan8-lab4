import './App.css';
import Header from './components/header.js';
import { Routes, Route, RouterProvider } from 'react-router-dom';
import router from './router/router.js';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import {
  createBrowserRouter
} from 'react-router-dom';
import Home from './pages/home.js';
import SignIn from './pages/signin.js';
import SignUp from './pages/signup.js';
import TrackSearch from './pages/trackSearch.js';
import Alter from './pages/alter.js';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  
  const auth = useSelector(state => state.auth);
  const { isLoggedIn , user} = auth;
  let isAdmin = false;
  user && (isAdmin = user.is_admin);

  return (
    <div className="App">
      <Header auth={{
        isLoggedIn:isLoggedIn,
        isAdmin:isAdmin
      }}/>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/search" element={<TrackSearch/>}></Route>
        <Route path="/alter" element={<Alter/>}></Route>
      </Routes>
    </div>
  );
}

export default App;