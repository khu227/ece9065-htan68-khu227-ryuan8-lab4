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
import Verify from './pages/verify';
import Admin from './pages/admin';
import PublicLists from './pages/publicLists';
import Agreement from './pages/agreement';
import ListDetails from './pages/listDetails';
import ManageLists from './pages/manageLists';
import CreateORALterList from './pages/createOrAlterList';
import Typography from '@mui/material/Typography';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  const auth = useSelector(state => state.auth);
  console.log(auth);
  const { isLoggedIn, userInfo } = auth;
  let isAdmin = false;
  userInfo && userInfo.user && (isAdmin = userInfo.user.is_admin);

  return (
    <div className="App">
      {
        isLoggedIn && isAdmin &&
        <Typography component="h1" variant="h5" color='red'>
          You are admin.
        </Typography>
      }
      <Header auth={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin
      }} />
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/search" element={<TrackSearch />}></Route>
        <Route path="/alter" element={<Alter />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path='/publiclists' element={<PublicLists />}></Route>
        <Route path='/agreement' element={<Agreement />}></Route>
        <Route path='/listdetails/:listname' element={<ListDetails />}></Route>
        <Route path='/managelists' element={<ManageLists />}></Route>
        <Route path='/createoralterlist' element={<CreateORALterList />}></Route>
      </Routes>
    </div>
  );
}

export default App;