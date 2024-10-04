import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import axios from 'axios'
import './Page.css'

// The component to display the specific menu
const Pagemenu = () => {
    const { menu_id } = useParams();
    const [menu, setMenu] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { cart, addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/menus/${menu_id}`);
                setMenu(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [menu_id, cart]);

    // const updateQuantity = (sign) => {
    //     return () => {
    //         setQuantity((prevQuantity) => {
    //             if (sign === "+") {
    //                 return prevQuantity + 1;
    //             } else {
    //                 return prevQuantity - 1;
    //             }
    //         });
    //     }
    // }

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        setQuantity(quantity - 1);
    }

    const handleAdd = () => {
        addToCart(menu, quantity);
        navigate("/");
    }
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {menu && (               
                    <div className="container p-5  col text-center">
                        <img src={`/src/assets/img/${menu.filename}`} />
                        <p class="fs-1">{menu.name}</p>
                        <p class="fs-2">{menu.type}</p>
                        <p class="fs-4">{menu.price} THB</p>
                        <div class="d-flex justify-content-center gap-3" >
                        <button onClick={decrement}>-</button>
                        <p class="fs-5">{quantity}</p>
                        <button onClick={increment}>+</button>
                        </div>
                        <br/>
                        <button class="btn btn-secondary rounded-pill" onClick={handleAdd}><p class="fs-5">Add to cart</p></button>
                    </div>               
            )}
       </>
    )
}
export default Pagemenu;