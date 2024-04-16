import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
 

  const { email, loading, error, dispatchAuth } = useContext(AuthContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [Error, setError] = useState('');

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatchAuth({ type: "Login_Start" })
    const response = await fetch('https://localhost:7208/api/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, Email }),
    });

    if (response.ok) {
      const data = await response.json(); 
      
      dispatchAuth({ type: "Login_Sucess", payload: data })
      toast('Login Successful');
     navigate('/')
      setError(''); 
      console.log(data);
    } else {
      const errorMessage = await response.text();
      dispatchAuth({type:"Login_Fail", payload:errorMessage})
      setError(error);
    }
  };



  return (
    <>

<div className=' h-[100vh] flex justify-center items-center'>
<ToastContainer/>
    <form className='flex flex-col gap-5 border border-gray-800 rounded-md px-6  py-4' onSubmit={handleLogin}>
   
            <label htmlFor="">Email</label>
               <input  type="text" id="email"   value={Email}
          onChange={(e) => setEmail(e.target.value)}  className=' p-1 border-2 rounded-md'  />
               <label htmlFor="">Password</label>
               <input type="password" id="password"  value={password}
         
         onChange={(e) => setPassword(e.target.value)}   className=' p-1 border-2 rounded-md'  />

          
       
{error  && <p className=' text-red-600'>{error}</p> }
<button className=' bg-lime-400 p-2 border rounded-xl' type='submit'>Login</button>
<Link to='/signup'>   <span className=' px-2 py-1 text-blue-600 rounded-lg'>Dont have account? Sign Up</span></Link>
   
      </form>
    </div>


   
    </>
  );
}

export default Login;
