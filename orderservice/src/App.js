import './App.css';
import { useEffect, useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/order/all');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log('Error fetching Orders:', error);
    }
  };

  return (
    <div className="App">
      <h1>Order Management System</h1>

      <div className="main-content">
        {/* Left Section - Form */}
        <div className="left-section">
          <OrderForm
            fetchOrders={fetchOrders}
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
          />
        </div>

        {/* Right Section - List */}
        <div className="right-section">
          <OrderList
            orders={orders}
            fetchOrders={fetchOrders}
            setEditingOrder={setEditingOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
