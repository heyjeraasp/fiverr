// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import React,{useEffect,useState} from 'react';

// function HeroBanner(){
//     const router = useRouter();
//     const [image,setImage]= useState(3);

//     useEffect(()=>{
//         const interval = setInterval(
//             ()=> setImage(image >= 6 ? 1 : image+1),
//             10000
//         );
//         return ()=> clearInterval(interval);
    
//     },[image]);

//     return (
//         <div className='h-[680px] relative bg-cover'>
//             <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
//             <Image
//           alt="hero"
//           src="/bg-hero1.webp"
//           fill
//           className={`${
//             image === 1 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero2.webp"
//           fill
//           className={`${
//             image === 2 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero3.webp"
//           fill
//           className={`${
//             image === 3 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero4.webp"
//           fill
//           className={`${
//             image === 4 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero5.webp"
//           fill
//           className={`${
//             image === 5 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero6.webp"
//           fill
//           className={`${
//             image === 6 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//     </div>
//     <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
//         <h1 className="text-white text-5xl leading-snug">
//           Find the perfect&nbsp;
//           <i>freelance</i>
//           <br />
//           services for your business
//         </h1>
//         <div className="flex align-middle">
//           <div className="relative">
//             <input
//               type="text"
//               className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
//               placeholder={`Try "building mobile app"`}    
//             />
//           </div>
//           <button
//             className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md"
//           >
//             Search
//           </button>
//         </div>
//         <div className="text-white flex gap-4">
//           Popular:  
//           <ul className="flex gap-5">
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Website Design
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Wordpress
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Logo Design
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               AI Services
//             </li>
//           </ul>
//         </div>
//       </div>

//         </div>
//     );
// }

// export default HeroBanner;

// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import React,{useEffect,useState} from 'react';

// function HeroBanner(){
//     const router = useRouter();
//     const [searchData, setsearchData] = useState("");
//     const [image,setImage]= useState(3);

//     useEffect(()=>{
//         const interval = setInterval(
//             ()=> setImage(image >= 6 ? 1 : image+1),
//             10000
//         );
//         return ()=> clearInterval(interval);
    
//     },[image]);

//     return (
//         <div className='h-[680px] relative bg-cover'>
//             <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
//             <Image
//           alt="hero"
//           src="/bg-hero1.webp"
//           fill
//           className={`${
//             image === 1 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero2.webp"
//           fill
//           className={`${
//             image === 2 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero3.webp"
//           fill
//           className={`${
//             image === 3 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero4.webp"
//           fill
//           className={`${
//             image === 4 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero5.webp"
//           fill
//           className={`${
//             image === 5 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//         <Image
//           alt="hero"
//           src="/bg-hero6.webp"
//           fill
//           className={`${
//             image === 6 ? "opacity-100" : "opacity-0"
//           } transition-all duration-1000`}
//         />
//     </div>
//     <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
//         <h1 className="text-white text-5xl leading-snug">
//           Find the perfect&nbsp;
//           <i>freelance</i>
//           <br />
//           services for your business
//         </h1>
//         <div className="flex align-middle">
//           <div className="relative">
//             <input
//               type="text"
//               className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
//               placeholder={`Try "building mobile app"`} 
//               value={searchData}
//               onChange={(e) => setsearchData(e.target.value)}  
//               onKeyDown={(e) => {
//                 if (e.key === "Enter")
//                   {
//                     setsearchData("");
//                     router.push(`/search?q=${searchData}`);
//                   };
//               }} 
//             />
//           </div>
//           <button
//             className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md"
//             onClick={() => {
//               setsearchData("");
//               router.push(`/search?q=${searchData}`);
//             }}
//           >
//             Search
//           </button>
//         </div>
//         <div className="text-white flex gap-4">
//           Popular:  
//           <ul className="flex gap-5">
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Website Design
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Wordpress
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               Logo Design
//             </li>
//             <li
//               className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              
//             >
//               AI Services
//             </li>
//           </ul>
//         </div>
//       </div>

//         </div>
//     );
// }

// export default HeroBanner;

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HeroBanner() {
  const router = useRouter();
  const [searchData, setSearchData] = useState("");
  const [image, setImage] = useState(3);
  const [popularServices, setPopularServices] = useState([
    "Website Design",
    "WordPress",
    "Logo Design",
    "AI Services",
  ]);

  // Background image slideshow effect
  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  // Load popular services from localStorage on component mount
  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem("searchCounts")) || {};

    // Convert to array and sort by frequency
    const sortedServices = Object.entries(searchHistory)
      .sort((a, b) => b[1] - a[1]) // Sort in descending order
      .map(([service]) => service)
      .slice(0, 4); // Keep top 4

    if (sortedServices.length > 0) {
      setPopularServices(sortedServices);
    }
  }, []);

  // Function to handle search and track searches
  const handleSearch = (query) => {
    if (!query.trim()) return;

    // Get search history from localStorage
    const searchHistory = JSON.parse(localStorage.getItem("searchCounts")) || {};

    // Update search count
    searchHistory[query] = (searchHistory[query] || 0) + 1;

    // Save updated search history
    localStorage.setItem("searchCounts", JSON.stringify(searchHistory));

    setSearchData("");
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="h-[680px] relative bg-cover">
      {/* Slideshow Background Images */}
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        {Array.from({ length: 6 }, (_, i) => (
          <Image
            key={i}
            alt="hero"
            src={`/bg-hero${i + 1}.webp`}
            fill
            className={`${
              image === i + 1 ? "opacity-100" : "opacity-0"
            } transition-all duration-1000`}
          />
        ))}
      </div>

      {/* Search and Content Section */}
      <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl leading-snug">
          Find the perfect&nbsp;<i>freelance</i>
          <br />
          services for your business
        </h1>

        {/* Search Input */}
        <div className="flex align-middle">
          <div className="relative">
            <input
              type="text"
              className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
              placeholder={`Try "building mobile app"`}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchData);
              }}
            />
          </div>
          <button
            className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md"
            onClick={() => handleSearch(searchData)}
          >
            Search
          </button>
        </div>

        {/* Dynamic Popular Services Section */}
        <div className="text-white flex gap-4">
          Popular:
          <ul className="flex gap-5">
            {popularServices.map((service) => (
              <li
                key={service}
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => handleSearch(service)}
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;