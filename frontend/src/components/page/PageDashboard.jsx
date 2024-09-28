import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BestSeller = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/best-seller");
                setData(response.data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="best-seller">
            {error ? error : data.map((item) => (
                <h3 key={item.menu_id} className="best-seller-item">
                    <p className="best-seller-name">{item.menu.name} ({item.menu.type})</p>
                    <p className="best-seller-amount">{item.total_quantity}</p> {/* amount is the number of times the menu is ordered */}
                </h3>
            ))}
        </div>
    )
}

const DailySales = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/sales-today");
                setData(response.data);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="daily-sales">
            <h3 className="daily-sales-title">Daily Sales</h3>
            <h3 className="daily-sales-value">{error ? error : (loading ? "Loading..." : data.total_sales)}</h3>
        </div>
    )
}

const MonthlySales = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/sales-this-month");
                setData(response.data);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="monthly-sales">
            <h3 className="monthly-sales-title">Monthly Sales</h3>
            <h3 className="monthly-sales-value">{error ? error : (loading ? "Loading" : data.total_sales)}</h3>
        </div>
    )
}

const PageDashboard = () => {
    return (
        <div className="dashboard">
            <BestSeller />
            <div className="dashboard-sales">
                <DailySales />
                <MonthlySales />
            </div>
        </div>
    )
}

export default PageDashboard;