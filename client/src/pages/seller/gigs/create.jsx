// import ImageUpload from '@/components/ImageUpload';
// import { categories } from '@/utils/categories';
// import { ADD_GIG_ROUTE } from '@/utils/constants';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react'
// import { useCookies } from 'react-cookie';

// function create() {
//   const [cookies] = useCookies();
//   const router = useRouter();
//   const [files, setFile] = useState([]);
//   const [features, setfeatures] = useState([]);
//   const [data, setData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     time: 0,
//     revisions: 0,
//     feature: "",
//     price: 0,
//     shortDesc: "",
//   });

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const addFeature = () => {
//     if (data.feature) {
//       setfeatures([...features, data.feature]);
//       setData({ ...data, feature: "" });
//     }
//   };

//   const removeFeature = (index) => {
//     const clonedFeatures = [...features];
//     clonedFeatures.splice(index, 1);
//     setfeatures(clonedFeatures);
//   };

//   const addGig = async () => {
//     const { category, description, price, revisions, time, title, shortDesc } =
//       data;
//     if (
//       category &&
//       description &&
//       title &&
//       features.length &&
//       files.length &&
//       price > 0 &&
//       shortDesc.length &&
//       revisions > 0 &&
//       time > 0
//     ) {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("images", file));
//       const gigData = {
//         title,
//         description,
//         category,
//         features,
//         price,
//         revisions,
//         time,
//         shortDesc,
//       };
//       const response = await axios.post(ADD_GIG_ROUTE, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//          // Authorization: `Bearer ${cookies.jwt}`,
//          Authorization: `Bearer ${cookies.jwt.jwt}`
         
//         },
//         params: gigData,
//       });
      
      
      
//       if (response.status === 201) {
//         router.push("/seller/gigs");
//       }
//     }
//   };

//     const inputClassName =
//     "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
//   const labelClassName =
//     "mb-2 text-lg font-medium text-gray-900 ";

//   return (
//     <div className='min-h-[80vh] my-10 mt-0 px-32'>
//         <h1 className="text-6xl text-gray-900 mb-5">Create a new Gig</h1>
//       <h3 className="text-3xl text-gray-900 mb-5">
//         Enter the details to create the gig
//       </h3>
//       <div className='flex flex-col gap-5 mt-10'>
//         <div className="grid grid-cols-2 gap-11">
//             <div>
//                 <label htmlFor='title' className={labelClassName}>Gig Title</label>
//                 <input type='text' name='title' value={data.title} onChange={handleChange} id='title' className={inputClassName} placeholder='eg. I will do something . I am really good at ' required />
//             </div>
//             <div>
//             <label htmlFor='category' className={labelClassName}>Select a Category</label>
//             <select
//               id="category"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//               name="category"
//               onChange={handleChange}
//               defaultValue="Choose a Category"
//             >
//               {categories.map(({ name }) => (
//                 <option key={name} value={name}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//             </div>
//         </div>
//         <div>
//           <label htmlFor="description" className={labelClassName}>
//             Gig Description
//           </label>
//           <textarea
//             id="description"
//             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Write a short description"
//             name="description"
//             value={data.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div className="grid grid-cols-2 gap-11">
//           <div>
//             <label htmlFor="delivery" className={labelClassName}>Delivery Time</label>
//             <input
//               type="number"
//               className={inputClassName}
//               id="delivery"
//               name="time"
//               value={data.time}
//               onChange={handleChange}
//               placeholder="Minimum Delivery Time"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="revision" className={labelClassName}>
//               Gig Revisions
//             </label>
//             <input
//               type="number"
//               id="revision"
//               className={inputClassName}
//               placeholder="Max Number of Revisions"
//               name="revisions"
//               value={data.revisions}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-11">
//           <div>
//             <label htmlFor="features" className={labelClassName}>
//               Gig Features
//             </label>
//             <div className="flex gap-3 items-center mb-5">
//               <input
//                 type="text"
//                 id="features"
//                 className={inputClassName}
//                 placeholder="Enter a Feature Name"
//                 name="feature"
//                 value={data.feature}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
//                 onClick={addFeature}
//               >
//                 Add
//               </button>
//             </div>
//             <ul className="flex gap-2 flex-wrap">
//               {features.map((feature, index) => {
//                 return (
//                   <li
//                     //  key={feature + index.toString()}
//                     key={index + feature}
//                     className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
//                   >
//                     <span>{feature}</span>
//                     <span
//                       className="text-red-700"
//                       onClick={() => removeFeature(index)}
//                     >
//                       X
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           <div>
//             <label htmlFor="image" className={labelClassName}>
//               Gig Images
//             </label>
//             <div>
//               <ImageUpload files={files} setFile={setFile} />
              
//             </div>
//           </div>
//           </div>
//           <div className='grid grid-cols-2 gap-11'>
//             <div>
//             <label htmlFor="shortDesc" className={labelClassName}>
//               Short Description
//             </label>
//             <input
//               type="text"
//               className={inputClassName}
//               id="shortDesc"
//               placeholder="Enter a short description."
//               name="shortDesc"
//               value={data.shortDesc}
//               onChange={handleChange}
//               required
//             />
//             </div>
//             <div>
//             <label htmlFor='price' className={labelClassName}>
//               Gig price  (₹)
//             </label>
//             <input 
//             type='number'
//             name='price'
//             value={data.price}
//             onChange={handleChange}
//             id='price'
//             className={inputClassName}
//             placeholder='Enter a price'
//             required
//             />
//             </div>
//         </div>
//         <div>
//         <button
//             className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
//             type="button"
//             onClick={addGig}
//         >
//             Add Gig
//         </button>
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default create
import ImageUpload from "@/components/ImageUpload";
import { categories } from "@/utils/categories";
import { ADD_GIG_ROUTE } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function Create() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [files, setFile] = useState([]);
  const [features, setFeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: "",
    revisions: "",
    feature: "",
    price: "",
    shortDesc: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (data.feature.trim()) {
      setFeatures([...features, data.feature.trim()]);
      setData({ ...data, feature: "" });
    } else {
      alert("Feature cannot be empty!");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!data.title.trim()) return alert("Title is required.");
    if (!data.category) return alert("Please select a category.");
    if (!data.description.trim() || data.description.length < 20)
      return alert("Description must be at least 20 characters.");
    if (!data.shortDesc.trim() || data.shortDesc.length < 10)
      return alert("Short description must be at least 10 characters.");
    if (features.length === 0) return alert("At least one feature is required.");
    if (files.length === 0) return alert("At least one image is required.");
    if (!data.time || data.time <= 0) return alert("Delivery time must be greater than 0.");
    if (!data.revisions || data.revisions <= 0) return alert("Revisions must be greater than 0.");
    if (!data.price || data.price <= 0) return alert("Price must be greater than 0.");

    return true;
  };

  const addGig = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const gigData = {
      title: data.title,
      description: data.description,
      category: data.category,
      features,
      price: data.price,
      revisions: data.revisions,
      time: data.time,
      shortDesc: data.shortDesc,
    };

    try {
      const response = await axios.post(ADD_GIG_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt.jwt}`,
        },
        params: gigData,
      });

      if (response.status === 201) {
        alert("Gig created successfully!");
        router.push("/seller/gigs");
      }
    } catch (error) {
      alert("Error creating gig. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-gray-900 mb-5">Create a new Gig</h1>
      <h3 className="text-3xl text-gray-900 mb-5">Enter the details to create the gig</h3>

      <div className="flex flex-col gap-5 mt-10">
        {/* Title and Category */}
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Gig Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="e.g. I will design a modern website"
            />
          </div>

          <div>
            <label className="mb-3 text-lg font-medium text-gray-900">Select a Category</label>
            <select name="category" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md">
              <option value="">Choose a Category</option>
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gig Description */}
        <div>
          <label className="mb-2 text-lg font-medium text-gray-900">Gig Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Write a detailed description..."
          />
        </div>

        {/* Delivery Time and Gig Revisions */}
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Delivery Time</label>
            <input
              type="number"
              name="time"
              value={data.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter delivery time in days"
            />
          </div>

          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Gig Revisions</label>
            <input
              type="number"
              name="revisions"
              value={data.revisions}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter number of revisions"
            />
          </div>
        </div>

        {/* Gig Features & Gig Images */}
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Gig Features</label>
            <div className="flex gap-3 items-center mb-3">
              <input
                type="text"
                name="feature"
                value={data.feature}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter a feature"
              />
              <button onClick={addFeature} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md ">
                Add
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => (
                <li key={index} className="bg-gray-100 py-2 px-4 rounded-md cursor-pointer" onClick={() => removeFeature(index)}>
                  {feature} <span className="text-red-700">X</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Gig Images</label>
            <ImageUpload files={files} setFile={setFile} />
          </div>
        </div>

        {/* Short Description and Gig Price */}
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Short Description</label>
            <input
              type="text"
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter a short description"
            />
          </div>

          <div>
            <label className="mb-2 text-lg font-medium text-gray-900">Gig Price (₹)</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter a price"
            />
          </div>
        </div>
        <div>
        {/* Add Gig Button */}
        <button onClick={addGig} className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md">
          Add Gig
        </button>
        </div>
      </div>
    </div>
  );
}

export default Create;