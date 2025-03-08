// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'
// import FiverrLogo from './FiverrLogo';
// import { useStateProvider } from '@/context/StateContext';
// import { IoSearchOutline } from 'react-icons/io5'
// import { useRouter } from 'next/router';
// import { useCookies } from 'react-cookie';
// import axios from 'axios';
// import { GET_USER_INFO, HOST } from '@/utils/constants';
// import { reducerCases } from '@/context/constants';
// import  Image  from 'next/image';

// function NavBar() {
    
//       const router = useRouter();
//       const [cookies] = useCookies();
//       const [isLoaded, setIsLoaded] = useState(false);
//       const [isFixed, setIsFixed] = useState(false);
//       const [searchData, setsearchData] = useState("")
//       const [{showLoginModal,showSignupModal,userInfo,isSeller},dispatch] = useStateProvider()

//       const handleLogin = () => {
//         if (showSignupModal) {
//           dispatch({
//             type: reducerCases.TOGGLE_SIGNUP_MODAL,
//             showSignupModal: false,
//           });
//         }
//         dispatch({
//           type: reducerCases.TOGGLE_LOGIN_MODAL,
//           showLoginModal: true,
//         });
//       };
    
//       const handleSignup = () => {
//         if (showLoginModal) {
//           dispatch({
//             type: reducerCases.TOGGLE_LOGIN_MODAL,
//             showLoginModal: false,
//           });
//         }
//         dispatch({
//           type: reducerCases.TOGGLE_SIGNUP_MODAL,
//           showSignupModal: true,
//         });
//       };

//       useEffect(() => {
//         if (router.pathname === "/") {
//           const positionNavbar = () => {
//             window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
//           };
//           window.addEventListener("scroll", positionNavbar);
//           return () => window.removeEventListener("scroll", positionNavbar);
//         } else {
//           setIsFixed(true);
//         }
//       }, [router.pathname]);

      

//       const links = [
//         { linkName: "Fiverr Business", handler: "#", type: "link" },
//         { linkName: "Explore", handler: "#", type: "link" },
//         { linkName: "English", handler: "#", type: "link" },
//         { linkName: "Become a Seller", handler: "#", type: "link" },
//         { linkName: "Sign in", handler: handleLogin, type: "button" },
//         { linkName: "Join", handler: handleSignup, type: "button2" },
//       ];

//       useEffect(()=> {
//          if(cookies.jwt && !userInfo) {
//            const getUserInfo = async () => {
//              try {
//                const {
//                  data:{user},
//                } = await axios.post(GET_USER_INFO,{},{headers:{
//                 //Authorization: `Bearer ${cookies.jwt}`,
//                 Authorization: `Bearer ${cookies.jwt.jwt}`
//                }})
//                console.log({user});
              
//                let projectedUserInfo = {...user};
//                if (user.profileImage) {
//                  projectedUserInfo = {
//                    ...projectedUserInfo,
//                    imageName: HOST + "/" + user.profileImage,
//                  };
//                }
//                  delete projectedUserInfo.image;
//                  dispatch({
//                    type:reducerCases.SET_USER,
//                    userInfo:projectedUserInfo,
//                  });
//                  setIsLoaded(true);
//                  if(user.isProfileInfoSet === false){
//                       router.push("/profile");   
//                  }
                
            
//              }catch(err){
//                console.log(err);
              
//              }
//            }
//            getUserInfo();
//          }
//          else
//          {
//            setIsLoaded(true);
//          } 
//       },[cookies,userInfo])

//       const handleOrdersNavigate = () => {
//         if (isSeller) router.push("/seller/orders");
//         router.push("/buyer/orders");
//       };

//       const handleModeSwitch = () => {
//         if (isSeller) {
//           dispatch({ type: reducerCases.SWITCH_MODE });
//           router.push("/buyer/orders");
//         } else {
//           dispatch({ type: reducerCases.SWITCH_MODE });
//           router.push("/seller");
//         }
//       };

//   return (
//     <>{
//         isLoaded && <nav className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
//             isFixed || userInfo
//               ? "fixed bg-white border-b border-gray-200"
//               : "absolute bg-transparent border-transparent"
//           }`}
//           >
//             <div>
//                 <Link href="/">
//                 <FiverrLogo fillColor={!isFixed && !userInfo  ? "#ffffff" : "#404145"} />
//                 </Link>
//             </div>
//             <div className={`flex ${
//               isFixed || userInfo ? "opacity-100" : "opacity-0"
//             }`}>
//                 <input
//               type="text"
//               placeholder="What service are you looking for today?"
//               className="w-[30rem] py-2.5 px-4 border"
//               value={searchData}
//               onChange={(e) => setsearchData(e.target.value)}
//             />

//             <button
//               className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
//               onClick={() => {
//                 setsearchData("");
//                 router.push(`/search?q=${searchData}`);
//               }}
//             >
//               <IoSearchOutline className="fill-white text-white h-6 w-6" />
//             </button>
//             </div>
//             {!userInfo ? (
//             <ul className="flex gap-10 items-center">
//               {links.map(({ linkName, handler, type }) => {
//                 return (
//                   <li
//                     key={linkName}
//                     className={`${
//                       isFixed ? "text-black" : "text-white"
//                     } font-medium`}
//                   >
//                     {type === "link" && <Link href={handler}>{linkName}</Link>}
//                     {type === "button" && (
//                       <button onClick={handler}>{linkName}</button>
//                     )}
//                     {type === "button2" && (
//                       <button
//                         onClick={handler}
//                         className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
//                           isFixed
//                             ? "border-[#1DBF73] text-[#1DBF73]"
//                             : "border-white text-white"
//                         } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
//                       >
//                         {linkName}
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <ul className="flex gap-10 items-center">
//               {isSeller && (
//                 <li
//                   className="cursor-pointer text-[#1DBF73] font-medium"
//                   onClick={() => router.push("/seller/gigs/create")}
//                 >
//                   Create Gig
//                 </li>
//               )}
//               <li
//                 className="cursor-pointer text-[#1DBF73] font-medium"
//                 onClick={handleOrdersNavigate}
//               >
//                 Orders
//               </li>

              
//                 <li
//                   className="cursor-pointer font-medium text-black"
//                   onClick={handleModeSwitch}
//                 >
//                   Switch To { isSeller ?  " Buyer" : " Seller" }
                  
//                 </li>
//               <li
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   //setIsContextMenuVisible(true);
//                 }}
//                 title="Profile"
//               >
//                 {userInfo?.imageName ? (
//                   <Image
//                     src={userInfo.imageName}
//                     alt="Profile"
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                     onClick={() => router.push("/profile")} //mod by j
//                   />
//                 ) : (
//                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative" onClick={() => router.push("/profile")} > {/*mod by j*/}
//                     <span className="text-xl text-white">
//                       {/* {userInfo &&
//                         userInfo?.email &&
//                         userInfo?.email.split("")[0].toUpperCase()} */}
//                       {userInfo.email[0].toUpperCase()}
//                     </span>
//                   </div>
//                 )}
//               </li>
//             </ul>
//           )}
//           </nav>
//     }</>
//   )
// }

// export default NavBar
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import FiverrLogo from './FiverrLogo';
import { useStateProvider } from '@/context/StateContext';
import { IoSearchOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { GET_USER_INFO, HOST } from '@/utils/constants';
import { reducerCases } from '@/context/constants';
import Image from 'next/image';

function NavBar() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setsearchData] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [{ showLoginModal, showSignupModal, userInfo, isSeller }, dispatch] = useStateProvider();

  // Toggle Login Modal
  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({ type: reducerCases.TOGGLE_SIGNUP_MODAL, showSignupModal: false });
    }
    dispatch({ type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: true });
  };

  // Toggle Signup Modal
  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({ type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: false });
    }
    dispatch({ type: reducerCases.TOGGLE_SIGNUP_MODAL, showSignupModal: true });
  };

  // Handle Logout
  const handleLogout = () => {
    removeCookie('jwt');
    dispatch({ type: reducerCases.SET_USER, userInfo: null });
    router.push('/');
  };

  // Navbar Scroll Effect
  useEffect(() => {
    if (router.pathname === '/') {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener('scroll', positionNavbar);
      return () => window.removeEventListener('scroll', positionNavbar);
    } else {
      setIsFixed(true);
    }
  }, [router.pathname]);

  // Fetch User Info
  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const { data: { user } } = await axios.post(GET_USER_INFO, {}, {
            headers: { Authorization: `Bearer ${cookies.jwt.jwt}` },
          });
          let projectedUserInfo = { ...user };
          if (user.profileImage) {
            projectedUserInfo.imageName = `${HOST}/${user.profileImage}`;
          }
          delete projectedUserInfo.image;
          dispatch({ type: reducerCases.SET_USER, userInfo: projectedUserInfo });
          setIsLoaded(true);
          if (user.isProfileInfoSet === false) {
            router.push('/profile');
          }
        } catch (err) {
          console.error(err);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo]);

  // Navigation Handlers
  const handleOrdersNavigate = () => {
    if (isSeller) router.push('/seller/orders');
    else router.push('/buyer/orders');
  };

  const handleModeSwitch = () => {
    dispatch({ type: reducerCases.SWITCH_MODE });
    if (isSeller) router.push('/buyer/orders');
    else router.push('/seller');
  };

  // Navigation Links
  const links = [
    { linkName: 'Fiverr Business', handler: '#', type: 'link' },
    { linkName: 'Explore', handler: '#', type: 'link' },
    { linkName: 'English', handler: '#', type: 'link' },
    { linkName: 'Become a Freelancer', handler: '#', type: 'link' },
    { linkName: 'Sign in', handler: handleLogin, type: 'button' },
    { linkName: 'Join', handler: handleSignup, type: 'button2' },
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? 'fixed bg-white border-b border-gray-200'
              : 'absolute bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <div>
            <Link href="/">
              <FiverrLogo fillColor={!isFixed && !userInfo ? '#ffffff' : '#404145'} />
            </Link>
          </div>

          {/* Search Bar */}
          <div className={`flex ${isFixed || userInfo ? 'opacity-100' : 'opacity-0'}`}>
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setsearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setsearchData('');
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-10 items-center">
            {!userInfo ? (
              links.map(({ linkName, handler, type }) => (
                <li key={linkName} className={`${isFixed ? 'text-black' : 'text-white'} font-medium`}>
                  {type === 'link' && <Link href={handler}>{linkName}</Link>}
                  {type === 'button' && <button onClick={handler}>{linkName}</button>}
                  {type === 'button2' && (
                    <button
                      onClick={handler}
                      className={`border text-md font-semibold py-1 px-3 rounded-sm ${
                        isFixed ? 'border-[#1DBF73] text-[#1DBF73]' : 'border-white text-white'
                      } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                    >
                      {linkName}
                    </button>
                  )}
                </li>
              ))
            ) : (
              <>
                {isSeller && (
                  <>
                    {/* ✅ Added Dashboard Link */}
                    <li
                      className="cursor-pointer text-[#1DBF73] font-medium"
                      onClick={() => router.push('/seller')}
                    >
                      Dashboard
                    </li>

                    <li
                      className="cursor-pointer text-[#1DBF73] font-medium"
                      onClick={() => router.push('/seller/gigs/create')}
                    >
                      Create Gig
                    </li>
                  </>
                )}

                <li className="cursor-pointer text-[#1DBF73] font-medium" onClick={handleOrdersNavigate}>
                  Orders
                </li>

                <li className="cursor-pointer font-medium text-black" onClick={handleModeSwitch}>
                  Switch To {isSeller ? 'Client' : 'Freelancer'}
                </li>

                {/* Profile Photo Dropdown */}
                <li className="relative">
                  <div className="cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                    {userInfo?.imageName ? (
                      <Image src={userInfo.imageName} alt="Profile" width={40} height={40} className="rounded-full" />
                    ) : (
                      <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full">
                        <span className="text-xl text-white">{userInfo.email[0].toUpperCase()}</span>
                      </div>
                    )}
                  </div>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                      <ul>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/profile')}>
                          Manage profile
                        </li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={handleLogout}>
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}

export default NavBar;