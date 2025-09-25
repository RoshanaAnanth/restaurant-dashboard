"use client";

import { useEffect, useState } from "react";

import "./PopularItems.scss";

interface Item {
  Item_Name: string;
  Item_Type: string;
  Item_Price: number;
  Quantity: number;
  Rating: string;
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
    const itemStats: {
      [key: string]: {
        totalRating: number;
        ratingCount: number;
        totalOrders: number;
      };
    } = {};

    orders.forEach((order) => {
      order.Items.forEach((item) => {
        const rating = item.Rating ? parseFloat(item.Rating) : null;

        if (itemStats[item.Item_Name]) {
          itemStats[item.Item_Name].totalOrders += item.Quantity;
          if (rating !== null && !isNaN(rating)) {
            itemStats[item.Item_Name].totalRating += rating * item.Quantity;
            itemStats[item.Item_Name].ratingCount += item.Quantity;
          }
        } else {
          itemStats[item.Item_Name] = {
            totalRating:
              rating !== null && !isNaN(rating) ? rating * item.Quantity : 0,
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
    <div className="popularItems">
      <h3 className="popularItemsTitle">Most Liked Menu Items</h3>
      <div className="popularItemsList">
        {popularItems.map((item, index) => (
          <div key={item.name} className="popularItem">
            <div className="popularItemRank">#{index + 1}</div>
            <div className="popularItemDetails">
              <h4 className="popularItemName">{item.name}</h4>
              <p className="popularItemStats">
                ⭐ {item.averageRating.toFixed(1)} • {item.totalOrders} orders
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
