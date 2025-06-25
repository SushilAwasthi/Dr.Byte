// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Chart from 'react-apexcharts';

// axios.defaults.baseURL = "http://localhost:5001/api";
// axios.defaults.withCredentials = false; // Enable sending credentials (e.g., cookies) in cross-origin requests

// const Admin = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [feedbackStats, setFeedbackStats] = useState<any>({});

//   useEffect(() => {
//     // Using dummy data for now
//     const dummyUsers = [
//       {
//         _id: '1',
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         chats: [{}, {}, {}], // 3 chats
//         feedback: [{}, {}, {}, {}], // 4 feedbacks
//       },
//       {
//         _id: '2',
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com',
//         chats: [{}], // 1 chat
//         feedback: [{}, {}], // 2 feedbacks
//       },
//     ];

//     const dummyFeedbackStats = {
//       ratings: {
//         '1 Star': 2,
//         '2 Stars': 3,
//         '3 Stars': 5,
//         '4 Stars': 7,
//         '5 Stars': 10,
//       },
//       sentiments: {
//         Positive: 10,
//         Negative: 4,
//         Neutral: 3,
//       },
//     };

//     setUsers(dummyUsers);
//     setFeedbackStats(dummyFeedbackStats);
//     setIsLoading(false);
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Format data for Pie Chart
//   const pieChartData = Object.entries(feedbackStats.ratings).map(([key, value]) => ({ name: key, data: value }));

//   // Format data for Column Chart
//   const columnChartData = Object.entries(feedbackStats.sentiments).map(([key, value]) => ({ x: key, y: value }));

//   return (
//     <div className="w-full h-auto bg-[#05101c] px:4 md:px-8 py-[100px]">

//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//         {/* Display User Information */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Users Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
//             {users.map((user) => (
//               <div key={user._id} className="border p-4 rounded shadow bg-white">
//                 <p className="font-bold">{user.name}</p>
//                 <p className="text-gray-500">{user.email}</p>
//                 <p className="mt-2">Total Chats: {user.chats.length}</p>
//                 <p>Total Feedbacks: {user.feedback.length}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Display Statistics */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Feedback Statistics</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Pie Chart for Ratings */}
//             <div className="border p-4 rounded shadow bg-white">
//               <h3 className="font-bold mb-2">Ratings Distribution</h3>
//               <Chart
//                 options={{ labels: pieChartData.map(data => data.name) }}
//                 series={pieChartData.map(data => data.data)}
//                 type="pie"
//                 width="100%"
//               />
//             </div>

//             {/* Column Chart for Sentiments */}
//             <div className="border p-4 rounded shadow bg-white text-black">
//               <h3 className="font-bold mb-2">Sentiments Overview</h3>
//               <Chart
//                 options={{ xaxis: { categories: columnChartData.map(data => data.x) } }}
//                 series={[{ data: columnChartData.map(data => data.y) }]}
//                 type="bar"
//                 width="100%"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

// import React, {useEffect, useState} from "react";
// import Chart from 'react-apexcharts';


// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import Study from "/page-photos/study.png";

// import FormLabel from "../components/auth/FormLabel";


// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5001/api";
// axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

// import { useAuth } from "../context/context";

// const Admin = () => {

  

//     const [buttonName, setButtonName] = useState('Login')

//     const navigate = useNavigate()

// 	const auth = useAuth();

  

// 	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		const formData = new FormData(event.currentTarget);
// 		const email = formData.get("email") as string;
// 		const password = formData.get("password") as string;

// 		try {
//             setButtonName('Loading ...')
// 			toast.loading("Signing in ..", { id: "login" });
// 			await auth?.login(email, password);
//             setButtonName('Login')
//             toast.success("Signed in successfully", { id: "login" })
//             navigate('/chat')
// 		} catch (error: any) {
//             setButtonName('Login')
//             toast.error(error.message, { id: "login" })
// 			console.log(error, 'error');
// 		}
// 	};

//   // Using dummy data for now
//   const Users = [
//     {
//       _id: '1',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       chats: [{}, {}, {}], // 3 chats
//       feedback: [{}, {}, {}, {}], // 4 feedbacks
//     },
//     {
//       _id: '2',
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       chats: [{}], // 1 chat
//       feedback: [{}, {}], // 2 feedbacks
//     },
//   ];

//   const FeedbackStats = {
//     ratings: {
//       '1 Star': 2,
//       '2 Stars': 3,
//       '3 Stars': 5,
//       '4 Stars': 7,
//       '5 Stars': 10,
//     },
//     sentiments: {
//       Positive: 10,
//       Negative: 4,
//       Neutral: 3,
//     },
//   };

//   const pieChartData = Object.entries(FeedbackStats.ratings).map(([key, value]) => ({ name: key, data: value }));

//   // Format data for Column Chart
//   const columnChartData = Object.entries(FeedbackStats.sentiments).map(([key, value]) => ({ x: key, y: value }));

// 	return (
// 			// <div className="w-full h-screen bg-[#05101c] px:4 md:px-8 pt-[150px]">
// 			// 	{/* login with image */}
// 			// 	<div className="flex flex-col md:flex-row md:justify-around md:items-center max-w-7xl mx-auto">
// 			// 		{/* login form */}
// 			// 		<div className="flex flex-col justify-center items-center space-y-8">
// 			// 			<h1 className="text-3xl font-semibold">Admin Panel</h1>
// 			// 		</div>
// 			// 	</div>
// 			// </div>

//       <div className="w-full h-auto bg-[#05101c] px:4 md:px-8 py-[100px]">

//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//         {/* Display User Information */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Users Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
//             {Users.map((user) => (
//               <div key={user._id} className="border p-4 rounded shadow bg-white">
//                 <p className="font-bold">{user.name}</p>
//                 <p className="text-gray-500">{user.email}</p>
//                 <p className="mt-2">Total Chats: {user.chats.length}</p>
//                 <p>Total Feedbacks: {user.feedback.length}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Display Statistics */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Feedback Statistics</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Pie Chart for Ratings */}
//             <div className="border p-4 rounded shadow bg-white">
//               <h3 className="font-bold mb-2">Ratings Distribution</h3>
//               <Chart
//                 options={{ labels: pieChartData.map(data => data.name) }}
//                 series={pieChartData.map(data => data.data)}
//                 type="pie"
//                 width="100%"
//               />
//             </div>

//             {/* Column Chart for Sentiments */}
//             <div className="border p-4 rounded shadow bg-white text-black">
//               <h3 className="font-bold mb-2">Sentiments Overview</h3>
//               <Chart
//                 options={{ xaxis: { categories: columnChartData.map(data => data.x) } }}
//                 series={[{ data: columnChartData.map(data => data.y) }]}
//                 type="bar"
//                 width="100%"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
		
// 	);
// };

// export default Admin;

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Sidebar from "./Sidebar"; // Adjust the path if needed

const Admin: React.FC = () => {
  const [view, setView] = useState<string>("users");
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (view === "users") {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get("/feedback/users");
          setUsers(response.data);
        } catch (error) {
          setError("Failed to fetch users");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    } else if (view === "stats") {
      const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get("/feedback/stats");
          setStats(response.data);
          console.log(response.data);
        } catch (error) {
          setError("Failed to fetch statistics");
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [view]);

  const pieChartData = stats
    ? [
        { name: "1 Star", data: stats.ratings["1 Star"] },
        { name: "2 Stars", data: stats.ratings["2 Stars"] },
        { name: "3 Stars", data: stats.ratings["3 Stars"] },
        { name: "4 Stars", data: stats.ratings["4 Stars"] },
        { name: "5 Stars", data: stats.ratings["5 Stars"] }
      ].filter((data) => data.data !== undefined)
    : [];

  const columnChartData = stats
    ? [
        { x: "Positive", y: stats.sentiments.Positive },
        { x: "Negative", y: stats.sentiments.Negative },
        { x: "Neutral", y: stats.sentiments.Neutral }
      ].filter((data) => data.y !== undefined)
    : [];

  return (
    <div className="flex">
      <Sidebar onSelect={(selectedView) => setView(selectedView)} />
      <div className="w-3/4 h-auto bg-[#05101c] px-4 md:px-8 py-[100px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          {view === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Users Information</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
                  {users.map((user) => (
                    <div key={user._id} className="border p-4 rounded shadow bg-white">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                      <p className="mt-2">Total Chats: {user.chats.length}</p>
                      <p>Total Feedbacks: {user.feedback.length}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {view === "stats" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Feedback Statistics</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border p-4 rounded shadow bg-white text-black">
                    <h3 className="font-bold mb-2">Ratings Distribution</h3>
                    <Chart
                      options={{
                        labels: pieChartData.map((data) => data.name),
                      }}
                      series={pieChartData.map((data) => data.data)}
                      type="pie"
                      width="100%"
                    />
                  </div>
                  <div className="border p-4 rounded shadow bg-white text-black">
                    <h3 className="font-bold mb-2">Feedbacks Overview</h3>
                    <Chart
                      options={{
                        xaxis: {
                          categories: columnChartData.map((data) => data.x),
                        },
                      }}
                      series={[{ data: columnChartData.map((data) => data.y) }]}
                      type="bar"
                      width="100%"
                    />
                  </div>
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;



