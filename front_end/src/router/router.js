import {
    createBrowserRouter
} from 'react-router-dom';
import Home from '../pages/home.js';
import SignIn from '../pages/signin.js';
import SignUp from '../pages/signup.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    // {
    //     path: '/home',
    //     element: <Home/>
    // },
    {
        path: 'signin',
        element: <SignIn/>
    },
    {
        path: 'signup',
        element: <SignUp/>
    },
    {
        path: '/search',
        element: <h1>search</h1>
    }
]);

export default router;