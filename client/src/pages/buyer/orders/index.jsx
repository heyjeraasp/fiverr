
// import { useStateProvider } from "@/context/StateContext";
// import { GET_BUYER_ORDERS_ROUTE } from "@/utils/constants";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

// function index() {
//   const [orders, setOrders] = useState([]);
//   const [{ userInfo }] = useStateProvider();
//   const [cookies] = useCookies();
//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const {data} = await axios.get(GET_BUYER_ORDERS_ROUTE, {
//           headers: {
//             // Authorization: `Bearer ${cookies.jwt}`,
//             Authorization: `Bearer ${cookies.jwt.jwt}`
//           },
//         });
        
//         setOrders(data.orders);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (userInfo) getOrders();
//   }, [userInfo]);
//   return (
//     <div className="min-h-[80vh] my-10 mt-0 px-32">
//       <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Order Id
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Category
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Price
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Delivery Time
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Order Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Send Message
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => {
//               return (
//                 <tr
//                   className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   key={order.id}
//                 >
//                   <th scope="row" className="px-6 py-4 ">
//                     {order.id}
//                   </th>
//                   <th scope="row" className="px-6 py-4 font-medium">
//                     {order.gig.title}
//                   </th>
//                   <td className="px-6 py-4">{order.gig.category}</td>
//                   <td className="px-6 py-4">{order.gig.price}</td>
//                   <td className="px-6 py-4">{order.gig.deliveryTime}</td>
//                   <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>

//                   <td className="px-6 py-4 ">
//                     <Link
//                       href={`/buyer/orders/messages/${order.id}`}
//                       className="font-medium text-blue-600  hover:underline"
//                     >
//                       Send
//                     </Link>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default index;

import { useStateProvider } from "@/context/StateContext";
import { GET_BUYER_ORDERS_ROUTE, CANCEL_ORDER_ROUTE } from "@/utils/constants"; // ✅ Import CANCEL_ORDER_ROUTE
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function index() {
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();
  const [cookies] = useCookies();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(GET_BUYER_ORDERS_ROUTE, {
          headers: {
            Authorization: `Bearer ${cookies.jwt.jwt}`,
          },
        });

        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  // ✅ Corrected API call for order cancellation
  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`${CANCEL_ORDER_ROUTE}/${orderId}`, { // ✅ Fixed route
        headers: {
          Authorization: `Bearer ${cookies.jwt.jwt}`,
        },
      });

      // Remove cancelled order from UI
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));

      alert("Order cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Error cancelling order. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Delivery Time</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Send Message</th>
              <th scope="col" className="px-6 py-3">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={order.id}
              >
                <th scope="row" className="px-6 py-4">{order.id}</th>
                <th scope="row" className="px-6 py-4 font-medium">{order.gig.title}</th>
                <td className="px-6 py-4">{order.gig.category}</td>
                <td className="px-6 py-4">{order.gig.price}</td>
                <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>

                <td className="px-6 py-4">
                  <Link
                    href={`/buyer/orders/messages/${order.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Send
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Cancel
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