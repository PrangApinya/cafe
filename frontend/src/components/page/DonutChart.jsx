// src/components/DonutChart.js
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import "./PageDashboard.css"; // Import the CSS file

const DonutChart = () => {
    const [salesData, setSalesData] = useState({});

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const todayResponse = await axios.get("/receipts/sales-today");
                const monthResponse = await axios.get("/receipts/sales-this-month");

                const todayData = todayResponse.data.quantitiesToday.map(item => ({
                    name: item.Menu.name,
                    quantity: item.total_quantity,
                }));

                const monthData = monthResponse.data.quantitiesThisMonth.map(item => ({
                    name: item.Menu.name,
                    quantity: item.total_quantity,
                }));

                setSalesData({ todayData, monthData });
            } catch (error) {
                console.error("Error fetching sales data", error);
            }
        };

        fetchSalesData();
    }, []);

    const chartData = {
        labels: salesData.todayData ? salesData.todayData.map(item => item.name) : [],
        datasets: [
            {
                data: salesData.todayData ? salesData.todayData.map(item => item.quantity) : [],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <div className="best-seller"> {/* Use your CSS class for styling */}
            <h2 className="section-title">Today's Sales Donut Chart</h2>
            {salesData.todayData && <Doughnut data={chartData} />}
        </div>
    );
};

export default DonutChart;
