// import { GET_USER_GIGS_ROUTE } from '@/utils/constants'
// import axios from 'axios'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie'

// function index() {
//     const [cookies] = useCookies();
//     const [gigs, setGigs] = useState([])


//     useEffect(()=>{
//         const getUserGigs = async()=>{
//             try{
//                 const {data} = await axios.get(GET_USER_GIGS_ROUTE,{
//                   headers:{
//                     // Authorization: `Bearer ${cookies.jwt}`,
//                     Authorization: `Bearer ${cookies.jwt.jwt}`
//                   }
//                 })
//                 console.log("gigs",data);
                
//                 setGigs(data.gigs);
//             }
//             catch(err)
//             {
//                 console.log(err);
                
//             }
//         }
//         getUserGigs()
//     },[])

//     return (
//         <div className="min-h-[80vh] my-10 mt-0 px-32">
//           <h3 className="m-5 text-2xl font-semibold">All your Gigs</h3>
//           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" className="px-6 py-3">
//                     Name
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Category
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Price
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Delivery Time
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                   {/* <th scope="col" className="px-6 py-3">
//                     <span className="sr-only">Delete</span>
//                   </th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {gigs.map(({ title, category, price, deliveryTime, id }) => {
//                   return (
//                     <tr
//                       className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
//                       key={id}
//                     >
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {title}
//                       </th>
//                       <td className="px-6 py-4">{category}</td>
//                       <td className="px-6 py-4">{price}</td>
//                       <td className="px-6 py-4">{deliveryTime}</td>
//                       <td className="px-6 py-4 text-right">
//                         <Link
//                           href={`/seller/gigs/${id}`}
//                           className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                         >
//                           Edit
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
// }

// export default index
import { GET_USER_GIGS_ROUTE, DELETE_GIG_ROUTE } from '@/utils/constants'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

function index() {
    const [cookies] = useCookies();
    const [gigs, setGigs] = useState([])

    useEffect(() => {
        const getUserGigs = async () => {
            try {
                const { data } = await axios.get(GET_USER_GIGS_ROUTE, {
                    headers: {
                        Authorization: `Bearer ${cookies.jwt.jwt}`
                    }
                });
                console.log("gigs", data);
                setGigs(data.gigs);
            } catch (err) {
                console.log(err);
            }
        };
        getUserGigs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${DELETE_GIG_ROUTE}/${id}`, {  // ✅ Corrected Route
                headers: {
                    Authorization: `Bearer ${cookies.jwt.jwt}`
                }
            });
            setGigs((prevGigs) => prevGigs.filter(gig => gig.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-[80vh] my-10 mt-0 px-32">
            <h3 className="m-5 text-2xl font-semibold">All your Gigs</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Delivery Time</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gigs.map(({ title, category, price, deliveryTime, id }) => (
                            <tr
                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={id}
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {title}
                                </th>
                                <td className="px-6 py-4">{category}</td>
                                <td className="px-6 py-4">{price}</td>
                                <td className="px-6 py-4">{deliveryTime}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/seller/gigs/${id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default index;