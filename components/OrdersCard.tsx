"use client";

interface OrdersCardProps {
  totalOrders: number;
}

const OrdersCard = ({ totalOrders }: OrdersCardProps) => {
  return (
    <div className="orders-card">
      <h3>Total Orders</h3>
      <p className="orders-count">{totalOrders}</p>
      <span className="orders-trend">+8.3% from last week</span>
    </div>
  );
};

export default OrdersCard;