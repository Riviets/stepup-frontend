import React from 'react';
import useFetch from "../hooks/useFetch";
import { trackerService } from "../../services/trackerService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import close from "../../assets/close.svg"


export default function Analytics({onClose}) {
  const { data: analyticsData, isLoading, error } = useFetch(trackerService.getAnalytics);
  const navigate = useNavigate();

  useEffect(() => {
    if (analyticsData) {
      console.log(JSON.stringify(analyticsData, null, 2));
    }
  }, [analyticsData]);

  const formatChartData = (dailyData) => {
    if (!dailyData) return [];
    
    return dailyData.map(item => {
      const date = new Date(item.date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return {
        ...item,
        formattedDate: `${day}/${month}`
      };
    });
  };

  const chartData = analyticsData ? formatChartData(analyticsData.dailyCompletions) : [];

  return (
    <div className="flex items-center justify-center fixed inset-0" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
      <div className="px-6 py-8 bg-[#D9D9D9] border-2 border-[#483D61] rounded-md w-full max-w-[370px] max-h-[600px] overflow-scroll relative">
        <h1 className="text-2xl font-bold mb-7">Analytics</h1>

        {isLoading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-center py-4 text-red-500">Error loading data</div>}
        {analyticsData ? (
          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-lg border border-[#563897]">
              <h2 className="text-lg font-semibold mb-3">Daily Completions</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="formattedDate" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completions" 
                      stroke="#563897" 
                      strokeWidth={2}
                      dot={{ r: 5, fill: '#563897', stroke: '#563897', strokeWidth: 1 }}
                      activeDot={{ r: 7, fill: '#563897', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#563897]">
              <h2 className="text-lg font-semibold mb-3">Total Stats</h2>
              <div className="flex justify-between">
                <div className="text-center p-2 bg-yellow-50 rounded-md w-1/2 mr-2 border border-[#292139]">
                  <p className="text-sm">Total XP</p>
                  <p className="text-xl font-bold">{analyticsData.totals.totalXp}</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-md w-1/2 ml-2 border border-[#292139]">
                  <p className="text-sm">Total Currency</p>
                  <p className="text-xl font-bold">{analyticsData.totals.totalCurrency}</p>
                </div>
              </div>
            </div>

            {analyticsData.topHabit && (
              <div className="bg-white p-4 rounded-lg border border-[#563897]">
                <h2 className="text-lg font-semibold mb-3">Top Habit</h2>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md border border-[#292139]">
                  <div>
                    <p className="font-bold">{analyticsData.topHabit.name}</p>
                    <p className="text-sm">Completed {analyticsData.topHabit.completions} times</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">No data available</div>
        )}
        <button onClick={onClose} className="absolute top-5 right-7">
            <img src={close} alt="Close Stats Modal" className="min-w-[15px]"/>
        </button>
      </div>
    </div>
  );
}