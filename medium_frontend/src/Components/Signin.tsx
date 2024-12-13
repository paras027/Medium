/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Signin({setToken}:any) {
  const [uname,setUname] = useState('');
  const [pass,setPass] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center flex-col items-center overflow-hidden">
      <div className=" font-bold text-4xl">Sign in to your Accunt</div>
      <div className='text-lg'>Don't Have an Account?<span className='underline hover:text-blue-400 cursor-pointer' onClick={()=>{
        navigate('/signup');
      }}> Signup</span></div>
      <br></br>
      <div className='w-full max-w-xs flex flex-col justify-evenly text-lg'>
      <div className='font-semibold '>Username</div>
      <input name="paras" className='w-full max-w-xs border-2 rounded-lg p-1' onChange={e=>{
        setUname(e.target.value)
      }}/>
      <br/>
      <div className='font-semibold'>Email</div>
      <input name="paras" className='w-full max-w-xs border-2 rounded-lg p-1' onChange={e=>{
        setEmail(e.target.value)
      }}/>
      <br/>
      <div className='font-semibold'>Password</div>
      <input name="paras" className='w-full max-w-xs border-2 rounded-lg p-1' onChange={e=>{
        setPass(e.target.value)
        }}/>
      <br></br>
      <button className='w-full max-w-xs border-2 rounded-lg p-1 bg-black text-white' onClick={
        async ()=>{
          const resp = await axios.post("http://localhost:3001/api/v1/user/signin",{email:email});
          localStorage.setItem("token", resp.data.token);
          setToken(resp.data.token);
          navigate('/blog',{ state: { ...resp.data } });
          console.log("logged in");
        }
      }>Login</button>
      </div>
      </div>
      
      <div className="flex flex-col justify-center items-center bg-slate-200 h-screen ">
      <div className="w-full max-w-md font-bold text-4xl">"The customer service i received was exceptional. The support team went above and beyond to address my concerns."</div>
      <br/><div className="w-full max-w-md font-bold text-xl">Paras Sharma</div>
      <div className="w-full max-w-md  text-xl">CEO</div>
      </div>
    </div>
  );
}

export default Signin;
