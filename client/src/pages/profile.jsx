import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { HOST, SET_USER_IMAGE, SET_USER_INFO } from '@/utils/constants';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

function profile() {

    const router = useRouter();
  const [cookies] = useCookies();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });

  useEffect(()=>{
    const handleData = {...data};
    if (userInfo) {
      if (userInfo?.username) handleData.userName = userInfo?.username;
      if (userInfo?.description) handleData.description = userInfo?.description;
      if (userInfo?.fullName) handleData.fullName = userInfo?.fullName;
    }

    if (userInfo?.imageName) {
      const fileName = image;
      fetch( userInfo.imageName).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        
        const files = new File([blob], fileName, { contentType });
        
        setImage(files);
      });
    }

    setData(handleData)
    setIsLoaded(true)
  },[userInfo]) 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = (e) =>{
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setImage(file[0]);
    }
  }

  const setProfile = async () => {
    try{
      const response = await axios.post(
        SET_USER_INFO,
        { ...data },
        { headers: {
         // Authorization: `Bearer ${cookies.jwt}`,
         Authorization: `Bearer ${cookies.jwt.jwt}`
        }}
      )
      if(response.data.userNameError)
      {
        setErrorMessage("enter a unique username")
        alert("enter a unique username!"); //modified by j
      }
      else
      {
        setErrorMessage("")
        let imageName = "";
        if(image){
        const formData = new FormData();
        formData.append("images",image);
        const {data:{img}} = await axios.post(SET_USER_IMAGE,formData,{
          headers:{
            //Authorization: `Bearer ${cookies.jwt}`,
            Authorization: `Bearer ${cookies.jwt.jwt}`,
            "Content-Type": "multipart/form-data",
          },
        })
        imageName = img
        }
        dispatch({
          type: reducerCases.SET_USER,
          userInfo: {
            ...userInfo,
            ...data,
            image: imageName.length ? HOST + "/" + imageName : false,
          },
        });
        alert("Your profile has been successfully updated!"); //modified by j
        router.reload();//modified by j
      }

      
      
    }
    catch(err)
    {
      console.log(err);
      
    }
  };

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 ";

  return (
    <>
    {isLoaded && (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">
            {errorMessage && (
                <div>
                    <span className='text-red-600 font-bold'>{errorMessage}</span>
                </div>
            )}  
            <h2 className="text-3xl">Welocme to Fiverr</h2>
          <h4 className="text-xl">
            Please complete your profile to get started
          </h4>
          <div className="flex flex-col items-center w-full gap-5">
            <div 
            className='flex flex-col items-center cursor-pointer'
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
            >
                <label className={labelClassName} >
                Select a profile Picture
              </label>
              <div className='bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative'>
              {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    fill 
                    className="rounded-full"
                  />
                ) : (
                  
                    <span className="text-6xl text-white">
                      
                      {userInfo?.email[0].toUpperCase()}
                    </span>
                  
                )}
                <div
                  className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${
                    imageHover ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span
                    className={` flex items-center justify-center  relative`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white absolute"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="file"
                      onChange={handleFile}
                      className="opacity-0"
                      multiple={true}
                      name="profileImage"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-[500px]">
              <div>
              <label className={labelClassName} htmlFor="userName">
                  Please select a username
                </label>
                <input 
                type='text' 
                className={inputClassName} 
                name='userName' 
                placeholder='Username' 
                value={data.userName} 
                onChange={handleChange} 
                />
              </div>
              <div>
              <label className={labelClassName} htmlFor="fullName">
                  Please enter your Full name
                </label>
                <input 
                type='text' 
                className={inputClassName} 
                name='fullName' 
                placeholder='Full name' 
                value={data.fullName} 
                onChange={handleChange} 
                />
              </div>
            </div>
            <div className="flex flex-col w-[500px]">
              <label className={labelClassName} htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                className={inputClassName}
                placeholder="description"
              ></textarea>
            </div>
            <button
              className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
              type="button"
              onClick={setProfile}
            >
              Set Profile
            </button>
          </div>
        </div>
    )}
    </>
  )
}

export default profile