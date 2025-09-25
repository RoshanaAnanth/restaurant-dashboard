"use client";

import { useState, useEffect } from 'react';

interface Item {
  Item_Name: string;
  Item_Price: number;
  Quantity: number;
  Total_Price: number;
  Rating?: string;
}

interface Order {
  Items: Item[];
}

interface LeastLikedItemsProps {
  orders: Order[];
}

interface LeastLikedItem {
  name: string;
  averageRating: number;
  ratingCount: number;
  totalOrders: number;
}

const LeastLikedItems = ({ orders }: LeastLikedItemsProps) => {
  const [leastLikedItems, setLeastLikedItems] = useState<LeastLikedItem[]>([]);

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
      .sort((a, b) => a.averageRating - b.averageRating) // Sort by lowest rating first
      .slice(0, 5);

    setLeastLikedItems(sortedItems);
  }, [orders]);

  return (
    <div className="least-liked-items">
      <h3 className="least-liked-items__title">Least Liked Menu Items</h3>
      <div className="least-liked-items__list">
        {leastLikedItems.map((item, index) => (
          <div key={item.name} className="least-liked-item">
            <div className="least-liked-item__rank">#{index + 1}</div>
            <div className="least-liked-item__details">
              <h4 className="least-liked-item__name">{item.name}</h4>
              <p className="least-liked-item__stats">
                ⭐ {item.averageRating.toFixed(1)} avg rating • {item.totalOrders} orders
              </p>
            </div>
            <div className="least-liked-item__bar">
              <div 
                className="least-liked-item__progress" 
                style={{ width: `${(item.averageRating / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeastLikedItems;