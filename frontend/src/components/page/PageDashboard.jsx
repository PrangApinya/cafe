import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PageDashboard.css'; // Import CSS สำหรับสไตล์ที่ออกแบบเอง
import DonutChart from './DonutChart';

const BestSeller = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/best-seller");
                setData(response.data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="best-seller">
            <h2 className="section-title">Best Sellers</h2>
            {error ? <p>{error}</p> : (
                <div className="best-seller-list">
                    {data.map((item) => (
                        <div key={item.menu_id} className="best-seller-item">
                            <p className="best-seller-name">{item.menu.name} ({item.menu.type})</p>
                            <p className="best-seller-amount">{item.total_quantity} sold</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const DailySales = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/sales-today");
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="daily-sales">
            <h2 className="section-title">Today's Sales</h2>
            {error ? <p>{error}</p> : (
                <div>
                    <p className="sales-amount">{loading ? "Loading..." : `${data.total_sales} orders`}</p>
                    <p className="sales-amount">{data.total_price && `฿${data.total_price.toFixed(2)}`}</p>
                </div>
            )}
        </div>
    );
}

const MonthlySales = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/receipts/sales-this-month");
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="monthly-sales">
            <h2 className="section-title">Monthly Sales</h2>
            {error ? <p>{error}</p> : (
                <div>
                    <p className="sales-amount">{loading ? "Loading..." : `${data.total_sales} orders`}</p>
                    <p className="sales-amount">{data.total_price && `฿${data.total_price.toFixed(2)}`}</p>
                </div>
            )}
        </div>
    );
}

const PageDashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <Link to="/" className="home-button">Home</Link> {/* Home button */}
            </div>
            <div className="dashboard-left">
                <BestSeller />
            </div>
            <div className="dashboard-right">
                <DailySales />
                <MonthlySales />
                <DonutChart/>
            </div>
        </div>
    );
}

export default PageDashboard;
