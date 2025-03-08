
// import { useStateProvider } from "@/context/StateContext";
// import { GET_SELLER_ORDERS_ROUTE } from "@/utils/constants";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

// function Orders() {
//     const [cookies] = useCookies();
//   const [orders, setOrders] = useState([]);
//   const [{ userInfo }] = useStateProvider();
//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const {
//           data: { orders },
//         } = await axios.get(GET_SELLER_ORDERS_ROUTE,{
//             headers: {
//               // Authorization: `Bearer ${cookies.jwt}`,
//               Authorization: `Bearer ${cookies.jwt.jwt}`
//             },
//         });
//         setOrders(orders);
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
//                 Ordered By
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
//                   <td className="px-6 py-4">{order.price}</td>
//                   <td className="px-6 py-4">{order.gig.deliveryTime}</td>
//                   <td className="px-6 py-4">
//                     {order.buyer.fullName} ({order.buyer.username})
//                   </td>
//                   <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>

//                   <td className="px-6 py-4 ">
//                     <Link
//                       href={`/seller/orders/messages/${order.id}`}
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

// export default Orders;
import { useStateProvider } from "@/context/StateContext";
import { GET_SELLER_ORDERS_ROUTE, CANCEL_ORDER_BY_FREELANCER_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Orders() {
  const [cookies] = useCookies();
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_SELLER_ORDERS_ROUTE, {
          headers: {
            Authorization: `Bearer ${cookies.jwt.jwt}`,
          },
        });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`${CANCEL_ORDER_BY_FREELANCER_ROUTE}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt.jwt}`,
        },
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again later.");
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Order Id</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Delivery Time</th>
              <th className="px-6 py-3">Ordered By</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={order.id}
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4 font-medium">{order.gig.title}</td>
                <td className="px-6 py-4">{order.gig.category}</td>
                <td className="px-6 py-4">{order.price}</td>
                <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                <td className="px-6 py-4">
                  {order.buyer.fullName} ({order.buyer.username})
                </td>
                <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <Link
                    href={`/seller/orders/messages/${order.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Send
                  </Link>
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel Order
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

export default Orders;