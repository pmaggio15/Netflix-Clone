import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);      

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if(currentUser) {
        // Only navigate to home if we're currently on the login page
        if (window.location.pathname === '/login') {
          navigate('/');
        }
        // Don't navigate if we're already on a valid route like /player/:id
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/movie/:id' element={<MovieDetails />}/>
          <Route path='/player/:id' element={<Player />}/>
        </Routes>
      )}
    </div>
  );
}

export default App
