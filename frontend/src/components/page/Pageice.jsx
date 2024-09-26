import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Page.css'
import Cafe from '../cafehead/Cafe'
import axios from 'axios'

const Pageice = () => {
    const [loading, setLoading] = useState(true);
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085/menus/ice');
                setMenus(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <Cafe />
            <div className="box2">
                <div className="boxcoffee mt-5">
                    <div className="row">
                        { loading && <p>Loading...</p> }
                        { error && <p>Error: {error.message}</p> }
                        { menus && menus.map((menu, index) => (
                            <div className="col-sm-3 " key={index}>
                                <div className="card ms-5" >
                                    <img src={`/src/assets/img/${menu.filename}`} className="card-img-top" width="170" height="160" />
                                    <div className="card-body">
                                        <h4>{menu.name}</h4>
                                        <h5>{menu.price} THB</h5>
                                        <Link to={`/${menu.id}`}>
                                            <button
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Add menu
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Pageice