// import { reducerCases } from '@/context/constants';
// import { useStateProvider } from '@/context/StateContext';
// import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
// import axios from 'axios';
// import React,{ useState } from 'react'
// import { useCookies } from 'react-cookie';
// import { FcGoogle } from "react-icons/fc";
// import { MdFacebook } from "react-icons/md";

// function AuthWrapper({type}) {
//     const [cookies,setCookies] = useCookies();
//     const [{ showLoginModal, showSignupModal },dispatch] = useStateProvider();
//     const [values, setValues] = useState({email:"",password:""})

//     const handleChange = (e) => {
//         setValues({...values,[e.target.name]:e.target.value })
//     };

//     const handleClick = async () => {
//         try{
//             const {email,password} = values;
//             if(email && password)
//             {
//                 const {data: {user, jwt }} = await axios.post(
//                         type==="login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
//                     {email,password},
//                     {withCredentials:true}
//                 );
//                 setCookies("jwt",{ jwt })
//                 dispatch({type:reducerCases.CLOSE_AUTH_MODEL})
//                 if(user)
//                 {
//                     dispatch({type:reducerCases.SET_USER,userInfo:user})
//                     window.location.reload();
//                 }
//             }
            
//         }
//         catch(err)
//         {
//             console.log(err)
//         }
//     }

//   return (
//     <div className=' fixed top-0 z-[100]'>
//         <div className='h-[100vh] w-[100vw] backdrop-blur-md fixed top-0' id='blur-div'>

//         </div>
//         <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
//             <div className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center  shadow-lg  shadow-[rgba(0,_0,_0,_0.06)]" id='auth-modal'>
//                 <div className='flex flex-col justify-center items-center p-8 gap-7'>
//                     <h3 className="text-2xl font-semibold text-slate-700">
//                         {
//                             type=== "login" ? "Login to Fiverr" : "Signup to Fiverr" 
//                         };
                        
//                     </h3>
//                     <div className='flex flex-col gap-5'>
//                         <button className='text-white bg-blue-500 p-3 font-semibold w-80 items-center justify-center relative'>
//                             <MdFacebook className="absolute left-4 text-2xl" />
//                             Continue with Facebook
//                         </button>
//                         <button className='border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative'>
//                             <FcGoogle className="absolute left-4 text-2xl" />
//                             Continue with Google
//                         </button>
//                     </div>
//                     <div className="relative w-full text-center">
//                         <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
//                             <span className='bg-white relative z-10 px-2'>
//                                 OR
//                             </span>
//                         </span>
//                     </div>
//                     <div className="flex flex-col gap-5">
//                         <input type="text" name='email' placeholder='Email' className='border border-slate-300 p-3 w-80' value={values.email} onChange={handleChange}/>
//                         <input type="password" name='password' placeholder='Password' className='border border-slate-300 p-3 w-80' value={values.password} onChange={handleChange}/>
//                         <button
//                         className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md rounded-l-md p-3 w-80" 
//                         onClick={handleClick}
//                         type="button"
//                     >
//                         Continue
//                     </button>
//                     </div>
//                 </div>
//                 <div className="py-5 w-full flex items-center justify-center border-t border-r-slate-400 ">
//                     <span className="text-sm text-slate-700">
//                         {
//                             type==="login" ? (
//                                 <>
//                                     Not a member yet?{" "} 
//                                     <span className='text-[#1DBF73] cursor-pointer' 
//                                     onClick={()=> {
//                                     dispatch({
//                                         type:reducerCases.TOGGLE_LOGIN_MODAL,
//                                         showLoginModal:false,
//                                         })

//                                         dispatch({
//                                             type:reducerCases.TOGGLE_SIGNUP_MODAL,
//                                             showSignupModal:true,
//                                             })                   
                                    
//                                     }
                                    
                                    
                                    

//                                     }
                                
//                                         >
//                                         Join Now 
//                                         </span>
//                                 </>
//                             ):(
//                                 <>
//                                     Already a member?{" "} 
//                                     <span className='text-[#1DBF73] cursor-pointer' onClick={()=>  { 
//                                         dispatch({
//                                             type:reducerCases.TOGGLE_SIGNUP_MODAL,
//                                             showSignupModal:false,
//                                             })
                                        
//                                             dispatch({
//                                                 type:reducerCases.TOGGLE_LOGIN_MODAL,
//                                                 showLoginModal:true,
//                                                 })
                                        
//                                         }

                                        

                                        
                                        
                                        
//                                     }
                                    
//                                         >
//                                         Login Now 
//                                         </span>
//                                 </>
                                
//                             )
//                         }
                        
//                     </span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AuthWrapper
import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';

function AuthWrapper({ type }) {
  const [cookies, setCookies] = useCookies();
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
  const [values, setValues] = useState({ email: '', password: '' });

  // Handle input change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle login/signup button click
  const handleClick = async () => {
    try {
      const { email, password } = values;

      // ✅ Check if the fields are empty
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // ✅ Proceed if fields are not empty
      const { data: { user, jwt } } = await axios.post(
        type === 'login' ? LOGIN_ROUTE : SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      setCookies('jwt', { jwt });
      dispatch({ type: reducerCases.CLOSE_AUTH_MODEL });

      if (user) {
        dispatch({ type: reducerCases.SET_USER, userInfo: user });
        alert(type === 'login' ? 'Login successful!' : 'Signup successful!');
        window.location.reload();
      }
    } catch (err) {
      if (type === 'login') {
        alert('Incorrect email or password. Please try again.');
      } else {
        alert('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed top-0 z-[100]">
      <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0" id="blur-div"></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center shadow-lg shadow-[rgba(0,_0,_0,_0.06)]" id="auth-modal">
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-2xl font-semibold text-slate-700">
              {type === 'login' ? 'Login to Fiverr' : 'Signup to Fiverr'}
            </h3>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-500 p-3 font-semibold w-80 items-center justify-center relative">
                <MdFacebook className="absolute left-4 text-2xl" />
                Continue with Facebook
              </button>
              <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Continue with Google
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div>

            {/* Email and Password Fields */}
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="border border-slate-300 p-3 w-80"
                value={values.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border border-slate-300 p-3 w-80"
                value={values.password}
                onChange={handleChange}
              />
              <button
                className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md rounded-l-md p-3 w-80"
                onClick={handleClick}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="py-5 w-full flex items-center justify-center border-t border-r-slate-400">
            <span className="text-sm text-slate-700">
              {type === 'login' ? (
                <>
                  Not a member yet?{' '}
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });

                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                    }}
                  >
                    Join Now
                  </span>
                </>
              ) : (
                <>
                  Already a member?{' '}
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });

                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                    }}
                  >
                    Login Now
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;