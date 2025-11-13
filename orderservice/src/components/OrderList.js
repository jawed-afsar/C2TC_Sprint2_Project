import React from 'react';
import './OrderList.css';

const OrderList = ({ orders, fetchOrders, setEditingOrder }) => {

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/order/delete/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (error) {
      console.log('Error deleting order:', error);
    }
  };

  return (
    <div className='order-list-container'>
      <h2>Order Records</h2>
      {orders.length === 0 ? (
        <p className='no-data'>No orders available.</p>
      ) : (
        <div className='order-grid'>
          {orders.map((order) => (
            <div key={order.orderId} className='order-card'>
              <div className='order-details'>
                <h3>{order.productName}</h3>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Product Name:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> ₹{order.price}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              </div>

              <div className='card-buttons'>
                <button
                  className='edit-btn'
                  onClick={() => setEditingOrder(order)}
                >
                  Edit
                </button>

                <button
                  className='delete-btn'
                  onClick={() => handleDelete(order.orderId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
