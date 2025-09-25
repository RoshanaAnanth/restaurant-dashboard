"use client";

import { useState, useEffect } from 'react';

interface Item {
  Item_Name: string;
  Item_Price: number;
  Quantity: number;
  Total_Price: number;
}

interface Order {
  Items: Item[];
}

interface PopularItemsProps {
  orders: Order[];
}

interface PopularItem {
  name: string;
  quantity: number;
  revenue: number;
}

const PopularItems = ({ orders }: PopularItemsProps) => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    const itemStats: { [key: string]: PopularItem } = {};

    orders.forEach(order => {
      order.Items.forEach(item => {
        if (itemStats[item.Item_Name]) {
          itemStats[item.Item_Name].quantity += item.Quantity;
          itemStats[item.Item_Name].revenue += item.Total_Price;
        } else {
          itemStats[item.Item_Name] = {
            name: item.Item_Name,
            quantity: item.Quantity,
            revenue: item.Total_Price,
          };
        }
      });
    });

    const sortedItems = Object.values(itemStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setPopularItems(sortedItems);
  }, [orders]);

  return (
    <div className="popular-items">
      <h3 className="popular-items__title">Top Menu Items</h3>
      <div className="popular-items__list">
        {popularItems.map((item, index) => (
          <div key={item.name} className="popular-item">
            <div className="popular-item__rank">#{index + 1}</div>
            <div className="popular-item__details">
              <h4 className="popular-item__name">{item.name}</h4>
              <p className="popular-item__stats">
                {item.quantity} orders • ${item.revenue.toFixed(2)} revenue
              </p>
            </div>
            <div className="popular-item__bar">
              <div 
                className="popular-item__progress" 
                style={{ width: `${(item.quantity / popularItems[0]?.quantity || 1) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;