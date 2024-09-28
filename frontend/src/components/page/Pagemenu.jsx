import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import axios from 'axios'

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
                <div>
                    <img src={`/src/assets/img/${menu.filename}`} />
                    <h2>{menu.name}</h2>
                    <p>{menu.type}</p>
                    <p>{menu.price} THB</p>
                    <button onClick={decrement}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increment}>+</button>
                    <button onClick={handleAdd}>Add to cart</button>
                </div>
            )}
        </>
    )
}

export default Pagemenu;