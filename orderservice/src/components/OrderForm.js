import React, { useEffect, useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ fetchOrders, editingOrder, setEditingOrder }) => {

  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    if (editingOrder) {
      setOrderId(editingOrder.orderId);
      setCustomerName(editingOrder.customerName);
      setProductName(editingOrder.productName);
      setQuantity(editingOrder.quantity);
      setPrice(editingOrder.price);
      setPaymentStatus(editingOrder.paymentStatus);
      setOrderDate(editingOrder.orderDate);
    } else {
      setOrderId('');
      setCustomerName('');
      setProductName('');
      setQuantity('');
      setPrice('');
      setPaymentStatus('');
      setOrderDate('');
    }
  }, [editingOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      orderId,
      customerName,
      productName,
      quantity: Number(quantity),
      price: Number(price),
      paymentStatus,
      orderDate: orderDate || new Date().toISOString(),
    };

    try {
      if (editingOrder) {
        await fetch(`http://localhost:8080/order/update/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
      } else {
        await fetch('http://localhost:8080/order/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
      }

      fetchOrders();
      setEditingOrder(null);
      setCustomerName('');
      setProductName('');
      setQuantity('');
      setPrice('');
      setPaymentStatus('');
      setOrderDate('');

    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className='form-container'>
      <h2>{editingOrder ? 'Edit Order' : 'Add New Order'}</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter Customer Name"
          required
          className="input-field"
        />

        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter Product Name"
          required
          className="input-field"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Quantity"
          required
          className="input-field"
        />

        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          required
          className="input-field"
        />

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          required
          className="select-field"
        >
          <option value="">Select Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>


        <div>
          <button type="submit" className="submit-btn">
            {editingOrder ? 'Update Order' : 'Add Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
