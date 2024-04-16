import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

   
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [Error, setError] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
      
        const response = await fetch('https://localhost:7208/api/User/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  password, Email }),
        });
    
        if (response.ok) {
          const data = await response.json(); 
          
          navigate("/login")
         
          setError(''); 
          console.log(data);
        } else {
          const errorMessage = await response.text();
         
          setError(errorMessage);
        }
      };
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
    <form className='flex flex-col gap-5 border border-gray-800 rounded-md px-6  py-4' onSubmit={handleLogin}>
   
            <label htmlFor="">Email</label>
               <input  type="text" id="email"   value={Email}
          onChange={(e) => setEmail(e.target.value)}  className=' p-1 border-2 rounded-md'  />
               <label htmlFor="">Password</label>
               <input type="password" id="password"  value={password}
         
         onChange={(e) => setPassword(e.target.value)}   className=' p-1 border-2 rounded-md'  />

          
       
{Error  && <p className=' text-red-600'>{Error}</p> }
<button className=' bg-lime-400 p-2 border rounded-xl' type='submit'>Signin</button>
<Link to='/login'>   <span className=' px-2 py-1 text-blue-600 rounded-lg'>Already have account? Login</span></Link>
   
      </form>
    </div>
  )
}

export default Signin