// import ImageUpload from '@/components/ImageUpload';
// import { categories } from '@/utils/categories';
// import { EDIT_GIG_ROUTE, GET_GIG_DATA, HOST } from '@/utils/constants';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie';

// function create() {
//   const [cookies] = useCookies();
//   const router = useRouter();
//   const { gigId } = router.query;
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

//   const editGig = async () => {
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
//       const response = await axios.put(`${EDIT_GIG_ROUTE}/${gigId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           // Authorization: `Bearer ${cookies.jwt}`,
//           Authorization: `Bearer ${cookies.jwt.jwt}`
//         },
//         params: gigData,
//       });
      
      
//       if (response.status === 200) {
//         router.push("/seller/gigs");
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchGigData = async () => {
//       try {
//         const {
//           data: { gig },
//         } = await axios.get(`${GET_GIG_DATA}/${gigId}`);

//         setData({ ...gig, time: gig.revisions });
//         setfeatures(gig.features);

//         gig.images.forEach((image) => {
//           const url = HOST + "/uploads/" + image;
//           const fileName = image;
//           fetch(url).then(async (response) => {
//             const contentType = response.headers.get("content-type");
//             const blob = await response.blob();
//             const files = new File([blob], fileName, { contentType });
//             setFile([files]);
//           });
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     if (gigId) fetchGigData();
//   }, [gigId]);

//     const inputClassName =
//     "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
//   const labelClassName =
//     "mb-2 text-lg font-medium text-gray-900 ";

//   return (
//     <div className='min-h-[80vh] my-10 mt-0 px-32'>
//         <h1 className="text-6xl text-gray-900 mb-5">Edit Gig</h1>
//       <h3 className="text-3xl text-gray-900 mb-5">
//         Enter the details to edit the gig
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
//               value={data.category}
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
//             onClick={editGig}
//         >
//             Edit Gig
//         </button>
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default create
import ImageUpload from '@/components/ImageUpload';
import { categories } from '@/utils/categories';
import { EDIT_GIG_ROUTE, GET_GIG_DATA, HOST } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function create() {
  const [cookies] = useCookies();
  const router = useRouter();
  const { gigId } = router.query;
  const [files, setFile] = useState([]);
  const [features, setfeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: 0,
    shortDesc: "",
  });
  const [initialData, setInitialData] = useState({}); // Store the initial data fetched
  const [validationMessage, setValidationMessage] = useState(""); // For showing validation errors

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
  };

  const editGig = async () => {
    const { category, description, price, revisions, time, title, shortDesc } = data;

    // Check if at least one field has changed
    const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);
    if (!hasChanges) {
      alert('Please make changes to at least one field before saving.');
      return;
    }

    // Validate required fields
    if (
      !category ||
      !description ||
      !title ||
      !features.length ||
      !files.length ||
      !price ||
      !shortDesc ||
      !revisions ||
      !time
    ) {
      setValidationMessage("Please fill all required fields before submitting.");
      return;
    }

    // Clear validation message if all fields are filled
    setValidationMessage("");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const gigData = {
      title,
      description,
      category,
      features,
      price,
      revisions,
      time,
      shortDesc,
    };

    try {
      const response = await axios.put(`${EDIT_GIG_ROUTE}/${gigId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt.jwt}`,
        },
        params: gigData,
      });

      if (response.status === 200) {
        router.push("/seller/gigs");
      }
    } catch (error) {
      console.error("Error editing gig:", error);
    }
  };

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const { data: { gig } } = await axios.get(`${GET_GIG_DATA}/${gigId}`);
        setData({ ...gig, time: gig.revisions });
        setfeatures(gig.features);
        setInitialData({ ...gig, time: gig.revisions }); // Save the initial data for comparison

        gig.images.forEach((image) => {
          const url = HOST + "/uploads/" + image;
          const fileName = image;
          fetch(url).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const files = new File([blob], fileName, { contentType });
            setFile([files]);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (gigId) fetchGigData();
  }, [gigId]);

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 ";

  return (
    <div className='min-h-[80vh] my-10 mt-0 px-32'>
        <h1 className="text-6xl text-gray-900 mb-5">Edit Gig</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Enter the details to edit the gig
      </h3>
      {validationMessage && (
        <div className="text-red-500 font-medium mb-4">
          {validationMessage}
        </div>
      )}
      <div className='flex flex-col gap-5 mt-10'>
        <div className="grid grid-cols-2 gap-11">
            <div>
                <label htmlFor='title' className={labelClassName}>Gig Title</label>
                <input type='text' name='title' value={data.title} onChange={handleChange} id='title' className={inputClassName} placeholder='eg. I will do something . I am really good at ' required />
            </div>
            <div>
            <label htmlFor='category' className={labelClassName}>Select a Category</label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              defaultValue="Choose a Category"
              value={data.category}
            >
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            Gig Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="delivery" className={labelClassName}>Delivery Time</label>
            <input
              type="number"
              className={inputClassName}
              id="delivery"
              name="time"
              value={data.time}
              onChange={handleChange}
              placeholder="Minimum Delivery Time"
              required
            />
          </div>
          <div>
            <label htmlFor="revision" className={labelClassName}>
              Gig Revisions
            </label>
            <input
              type="number"
              id="revision"
              className={inputClassName}
              placeholder="Max Number of Revisions"
              name="revisions"
              value={data.revisions}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="features" className={labelClassName}>
              Gig Features
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="features"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                name="feature"
                value={data.feature}
                onChange={handleChange}
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
                onClick={addFeature}
              >
                Add
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => {
                return (
                  <li
                    key={index + feature}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Gig Images
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-11'>
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Short Description
            </label>
            <input
              type="text"
              className={inputClassName}
              id="shortDesc"
              placeholder="Enter a short description."
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='price' className={labelClassName}>
              Gig price  (₹)
            </label>
            <input 
              type='number'
              name='price'
              value={data.price}
              onChange={handleChange}
              id='price'
              className={inputClassName}
              placeholder='Enter a price'
              required
            />
          </div>
        </div>
        <div>
          <button
            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={editGig}
          >
            Edit Gig
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default create;