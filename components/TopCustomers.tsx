"use client";

import { useState, useEffect } from 'react';

interface Item {
  Total_Price: number;
}

interface Order {
  Customer_Name: string;
  Customer_Phone: string;
  Items: Item[];
}

interface TopCustomersProps {
  orders: Order[];
}

interface Customer {
  name: string;
  phone: string;
  totalSpent: number;
  orderCount: number;
}

const TopCustomers = ({ orders }: TopCustomersProps) => {
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const customerStats: { [key: string]: Customer } = {};

    orders.forEach(order => {
      const orderTotal = order.Items.reduce((sum, item) => sum + item.Total_Price, 0);
      
      if (customerStats[order.Customer_Name]) {
        customerStats[order.Customer_Name].totalSpent += orderTotal;
        customerStats[order.Customer_Name].orderCount += 1;
      } else {
        customerStats[order.Customer_Name] = {
          name: order.Customer_Name,
          phone: order.Customer_Phone,
          totalSpent: orderTotal,
          orderCount: 1,
        };
      }
    });

    const sortedCustomers = Object.values(customerStats)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    setTopCustomers(sortedCustomers);
  }, [orders]);

  return (
    <div className="top-customers">
      <h3 className="top-customers__title">Top Customers</h3>
      <div className="top-customers__list">
        {topCustomers.map((customer, index) => (
          <div key={customer.name} className="top-customer">
            <div className="top-customer__rank">#{index + 1}</div>
            <div className="top-customer__details">
              <h4 className="top-customer__name">{customer.name}</h4>
              <p className="top-customer__phone">{customer.phone}</p>
            </div>
            <div className="top-customer__stats">
              <p className="top-customer__spent">${customer.totalSpent.toFixed(2)}</p>
              <p className="top-customer__orders">{customer.orderCount} orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;