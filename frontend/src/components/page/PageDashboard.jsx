import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const PageDashboard = () => {
    const [topMenuSales, setTopMenuSales] = useState([]);
    const [dailySales, setDailySales] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Fetch top menu sales
    const fetchTopMenuSales = async () => {
        try {
            const response = await axios.get('http://localhost:8085/receipts/top-menu-sales');
            // Ensure the data fits Recharts format
            const formattedData = response.data.map(item => ({
                ...item,
                'menu.name': item.menu.name, // Flatten the nested object for the chart
            }));
            setTopMenuSales(formattedData);
        } catch (error) {
            console.error('Error fetching top menu sales:', error);
        }
    };

    // Fetch daily sales data
    const fetchDailySales = async () => {
        try {
            const response = await axios.get('http://localhost:8085/receipts/daily-sales');
            // Format the sale_date to a readable string
            const formattedData = response.data.map(item => ({
                ...item,
                sale_date: formatDate(item.sale_date), // Format the date for better readability
            }));
            setDailySales(formattedData);
        } catch (error) {
            console.error('Error fetching daily sales:', error);
        }
    };

    // Fetch monthly sales data
    const fetchMonthlySales = async () => {
        try {
            const response = await axios.get('http://localhost:8085/receipts/monthly-sales');
            // Format the sale_month (if needed)
            const formattedData = response.data.map(item => ({
                ...item,
                sale_month: new Date(item.sale_month).toLocaleString('default', { month: 'long', year: 'numeric' }), // Formatting month to readable format
            }));
            setMonthlySales(formattedData);
        } catch (error) {
            console.error('Error fetching monthly sales:', error);
        }
    };

    useEffect(() => {
        fetchTopMenuSales();
        fetchDailySales();
        fetchMonthlySales();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            
            {/* Top Menu Sales Chart */}
            <h2>Top Menu Sales</h2>
            <BarChart width={600} height={300} data={topMenuSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="menu.name" /> {/* Adjust to match the data structure */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_quantity" fill="#8884d8" />
            </BarChart>

            {/* Daily Sales Chart */}
            <h2>Daily Sales</h2>
            <BarChart width={600} height={300} data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sale_date" /> {/* Adjust to match formatted date */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_quantity" fill="#82ca9d" />
            </BarChart>

            {/* Monthly Sales Chart */}
            <h2>Monthly Sales</h2>
            <BarChart width={600} height={300} data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sale_month" /> {/* Adjust to match formatted month */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_quantity" fill="#ffc658" />
            </BarChart>
        </div>
    );
};

export default PageDashboard;
