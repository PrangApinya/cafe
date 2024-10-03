import { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// The provider component to wrap the application with shopping cart context
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);

    const addToCart = (menu, quantity) => {
        setCart((prevCart) => {
            const existingMenu = prevCart.find((item) => item.id === menu.id);
            if (existingMenu) {
                return prevCart.map((item) =>
                    item.id === menu.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, { ...menu, quantity: quantity }];
            }
        });
    };

    const removeFromCart = (menuId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== menuId));
    };

    const increaseQuantity = (menuId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === menuId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (menuId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === menuId ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                getCartTotal,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node
};