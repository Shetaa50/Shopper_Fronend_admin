import React, { useEffect, useState } from "react";
import './listOrders.css';
import dropdown from '../../assets/toggle.png'
const ListOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [visibleOrders, setVisibleOrders] = useState({});

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/alluserscartdata');
            const data = await response.json();
            setAllOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const toggleOrderVisibility = (index) => {
        setVisibleOrders(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className="listorders">
            <h1>All Orders</h1>
            <div className="listorders-format-main">
                <p>User Name</p>
                <p>Order</p>
            </div>
            <div className="listorders-allproducts" >
                <hr />
                {allOrders.map((order, index) => (
                    <div key={index} className="listorders-format-main "  >
                        
                        <div className="listorders-format" onClick={() => toggleOrderVisibility(index)}><p  className="username"   >
                            {order.name}
                        </p>
                        <img src={dropdown} className="toggle" alt=""  /></div>

                        {visibleOrders[index] && (
                            <div className="order-details">
                                {Object.entries(order.cartData).map(([itemId, { quantity, productDetails }]) => (
                                    <div key={itemId} className="order-item">
                                        <p>Product ID: {itemId}</p>
                                        <p>Quantity: {quantity}</p>
                                        <p>Product Name: {productDetails.name}</p>
                                        <p>Price: ${productDetails.new_price}</p>
                                        <p>Category: {productDetails.category}</p>
                                        <img src={productDetails.image} alt={productDetails.name} />
                                    </div>
                                ))}
                            </div>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOrders;
