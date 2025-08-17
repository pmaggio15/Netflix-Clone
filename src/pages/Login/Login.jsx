import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {auth, login, signup} from '../../firebase'
import { useNavigate } from 'react-router-dom';     
import { onAuthStateChanged } from 'firebase/auth';
import netflix__spinner from '../../assets/netflix__spinner.gif';
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();    

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {                                           
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) navigate('/', { replace: true })            
      })
      return () => unsub()
    }, [navigate])

 const user__auth = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {                                                    
      if (signState === 'Sign In') {
        await login(email, password)
      } 
      else {
        await signup(name, email, password)
      }                      
    } catch (err) {
      toast.error(err.message) 
      console.error(err)
    } finally {
    setLoading(false);        
  }
  }
  
  return (
      loading ? (
        <div className="login__spinner">
          <img src={netflix__spinner} alt="Loading..." />
        </div>
      ) : (
      <div className='login'>
        <img src={logo} className='login__logo' alt="" />
        <div className='login__form'>
          <h1>{signState}</h1>
          <form onSubmit={user__auth}>
            {signState === "Sign Up" ?
            <input value={name} onChange={(event) => {setName(event.target.value)}} 
              type="text" placeholder='Your name' /> : <></>}
            <input value={email} onChange={(event) => {setEmail(event.target.value)}} 
            type="email" placeholder='Email' />
            <input value={password} onChange={(event) => {setPassword(event.target.value)}}
            type="password" placeholder='Password' />
            <button type='submit'>{signState}</button>
            <div className="form__help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form__switch">
            {signState === "Sign In" ? <p>New to Netflix <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p> 
            : 
            <p>Already have account? <span onClick={() => {setSignState("Sign In")}}>Sign In Now</span></p> }
          </div>
        </div>
      </div>
    )
  )
}

export default Login
