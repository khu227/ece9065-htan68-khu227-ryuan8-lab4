import './App.css';
import Header from './components/header.js';
import { Routes, RouterProvider } from 'react-router-dom';
import router from './router/router.js';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;