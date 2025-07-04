import React, { useEffect, useState } from "react";
  import Chart from "react-apexcharts";
  import axios from "axios";
  import Sidebar from "./Sidebar"; 

  axios.defaults.baseURL = "http://localhost:5001/api";
  axios.defaults.withCredentials = true;

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
          setUsers(response.data.users); 
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
                        <p className="mt-2">Total Chats: {user.chats?.length ?? 0}</p>
                        {/* <p>Total Feedbacks: {user.feedback?.length ?? 0}</p> */}
                        <p>Total Feedbacks: {user.feedbackCount}</p>


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