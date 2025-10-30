"use client";
import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItem >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItem] = {...updatedCart[existingItem], quantity: updatedCart[existingItem].quantity + quantity};
                return updatedCart;
            }
            return [...prevCart, {...item, quantity}];
        });
    };

    const removeFromCart = itemId => {
        setCart(prevCart => prevCart.filter(p => p.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCart(prevCart => 
            prevCart.map(item =>
                item.id === itemId ? {...item, quantity: Math.max(1, quantity)} : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cost }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}