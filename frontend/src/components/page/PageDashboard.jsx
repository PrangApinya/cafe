import React from 'react';
import { useEffect, useState } from 'react';

const BestSeller = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:8085/receipts/best-seller";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="best-seller">
            {error ? error : data.map((item, index) => (
                <h3 key={index} className="best-seller-item">
                    <p className="best-seller-name">{item.name}</p>
                    <p className="best-seller-amount">{item.amount}</p> {/* amount is the number of times the menu is ordered */}
                </h3>
            ))}
        </div>
    )
}

const DailySales = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:8085/receipts/daily-sales";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="daily-sales">
            <h3 className="daily-sales-title">Daily Sales</h3>
            <h3 className="daily-sales-value">{error ? error : data}</h3>
        </div>
    )
}

const MonthlySales = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:8085/receipts/monthly-sales";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="monthly-sales">
            <h3 className="monthly-sales-title">Monthly Sales</h3>
            <h3 className="monthly-sales-value">{error ? error : data}</h3>
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