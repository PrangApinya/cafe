import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './PageDashboard.css'; // Import a CSS file for styling

const PageDashboard = () => {
    const [topMenuSales, setTopMenuSales] = useState([]);
    const [dailySales, setDailySales] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

    // Fetch top menu sales
    const fetchTopMenuSales = async () => {
        try {
            const response = await axios.get('http://localhost:8085/receipts/top-menu-sales');
            const formattedData = response.data.map(item => ({
                ...item,
                combinedLabel: `${item.menu.name} (${item.menu.type})`,
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
            const formattedData = response.data.map(item => ({
                menuName: item.menu.name,
                menuType: item.menu.type,
                total_quantity: item.total_quantity,
                total_price: item.total_price
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
            const formattedData = response.data.map(item => ({
                ...item,
                sale_month: new Date(item.sale_month).toLocaleString('default', { month: 'long', year: 'numeric' }),
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

    // Custom label for daily sales to display menu name, type, quantity, and total price
    const renderDailySalesLabel = ({ menuName, menuType, total_quantity, total_price }) => {
        return `${menuName} (${menuType}) : ${total_quantity} items ($${total_price.toFixed(2)})`;
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* Top Menu Sales Bar Chart */}
            <h2>Top Menu Sales</h2>
            <div className="chart-container">
                <BarChart width={1000} height={300} data={topMenuSales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="combinedLabel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_quantity" fill="#8884d8" />
                </BarChart>
            </div>

            {/* Daily Sales Pie Chart */}
            <h2>Daily Sales</h2>
            <div className="chart-container">
                <PieChart width={800} height={300}>
                    <Pie
                        data={dailySales}
                        dataKey="total_quantity"
                        nameKey="menu.name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={renderDailySalesLabel}
                    >
                        {dailySales.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            {/* Monthly Sales Pie Chart */}
            <h2>Monthly Sales</h2>
            <div className="chart-container">
                <PieChart width={600} height={300}>
                    <Pie
                        data={monthlySales}
                        dataKey="total_quantity"
                        nameKey="sale_month"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#82ca9d"
                        label
                    >
                        {monthlySales.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};

export default PageDashboard;
