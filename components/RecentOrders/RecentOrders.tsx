"use client";

import "./RecentOrders.scss";

interface Item {
  Item_Name: string;
  Total_Price: number;
}

interface Order {
  Order_ID: number;
  Customer_Name: string;
  Items: Item[];
  Order_Status: string;
  Order_Type: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const recentOrders = orders.slice(-8).reverse();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "delivered";
      case "In Transit":
        return "transit";
      case "Pending":
        return "pending";
      default:
        return "";
    }
  };

  const getOrderTotal = (items: Item[]) => {
    return items.reduce((sum, item) => sum + item.Total_Price, 0);
  };

  return (
    <div className="recentOrders">
      <h3 className="recentOrdersTitle">Recent Orders</h3>
      <div className="recentOrdersList">
        {recentOrders.map((order) => (
          <div key={order.Order_ID} className="recentOrder">
            <div className="recentOrderHeader">
              <span className="recentOrderId">#{order.Order_ID}</span>
              <span
                className={`orderStatus ${getStatusClass(order.Order_Status)}`}
              >
                {order.Order_Status}
              </span>
            </div>
            <div className="recentOrderDetails">
              <p className="recentOrderCustomer">{order.Customer_Name}</p>
              <p className="recentOrderType">{order.Order_Type}</p>
            </div>
            <div className="recentOrderTotal">
              ${getOrderTotal(order.Items).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
