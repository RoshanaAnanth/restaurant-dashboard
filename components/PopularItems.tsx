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
  averageRating: number;
  ratingCount: number;
  totalOrders: number;
}

const PopularItems = ({ orders }: PopularItemsProps) => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    const itemStats: { [key: string]: { totalRating: number; ratingCount: number; totalOrders: number } } = {};

    orders.forEach(order => {
      order.Items.forEach(item => {
        const rating = item.Rating ? parseFloat(item.Rating) : null;
        
        if (itemStats[item.Item_Name]) {
          itemStats[item.Item_Name].totalOrders += item.Quantity;
          if (rating !== null && !isNaN(rating)) {
            itemStats[item.Item_Name].totalRating += rating * item.Quantity;
            itemStats[item.Item_Name].ratingCount += item.Quantity;
          }
        } else {
          itemStats[item.Item_Name] = {
            totalRating: rating !== null && !isNaN(rating) ? rating * item.Quantity : 0,
            ratingCount: rating !== null && !isNaN(rating) ? item.Quantity : 0,
            totalOrders: item.Quantity,
          };
        }
      });
    });

    const sortedItems = Object.entries(itemStats)
      .filter(([_, stats]) => stats.ratingCount > 0) // Only include items with ratings
      .map(([name, stats]) => ({
        name,
        averageRating: stats.totalRating / stats.ratingCount,
        ratingCount: stats.ratingCount,
        totalOrders: stats.totalOrders,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    setPopularItems(sortedItems);
  }, [orders]);

  return (
    <div className="popular-items">
      <h3 className="popular-items__title">Most Liked Menu Items</h3>
      <div className="popular-items__list">
        {popularItems.map((item, index) => (
          <div key={item.name} className="popular-item">
            <div className="popular-item__rank">#{index + 1}</div>
            <div className="popular-item__details">
              <h4 className="popular-item__name">{item.name}</h4>
              <p className="popular-item__stats">
                ⭐ {item.averageRating.toFixed(1)} avg rating • {item.totalOrders} orders
              </p>
            </div>
            <div className="popular-item__bar">
              <div 
                className="popular-item__progress" 
                style={{ width: `${(item.averageRating / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;