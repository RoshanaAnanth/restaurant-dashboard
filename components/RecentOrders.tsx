"use client";

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
      case 'Delivered':
        return 'order-status--delivered';
      case 'In Transit':
        return 'order-status--transit';
      case 'Pending':
        return 'order-status--pending';
      default:
        return '';
    }
  };

  const getOrderTotal = (items: Item[]) => {
    return items.reduce((sum, item) => sum + item.Total_Price, 0);
  };

  return (
    <div className="recent-orders">
      <h3 className="recent-orders__title">Recent Orders</h3>
      <div className="recent-orders__list">
        {recentOrders.map(order => (
          <div key={order.Order_ID} className="recent-order">
            <div className="recent-order__header">
              <span className="recent-order__id">#{order.Order_ID}</span>
              <span className={`order-status ${getStatusClass(order.Order_Status)}`}>
                {order.Order_Status}
              </span>
            </div>
            <div className="recent-order__details">
              <p className="recent-order__customer">{order.Customer_Name}</p>
              <p className="recent-order__type">{order.Order_Type}</p>
            </div>
            <div className="recent-order__total">
              ${getOrderTotal(order.Items).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;