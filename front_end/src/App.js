import './App.css';
import Header from './components/header.js';
import { Routes, RouterProvider } from 'react-router-dom';
import router from './router/router.js';

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;