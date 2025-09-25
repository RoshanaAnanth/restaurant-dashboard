"use client";

interface OrderTypeChartProps {
  onlineOrders: number;
  dineInOrders: number;
}

const OrderTypeChart = ({ onlineOrders, dineInOrders }: OrderTypeChartProps) => {
  const total = onlineOrders + dineInOrders;
  const onlinePercentage = total > 0 ? (onlineOrders / total) * 100 : 0;
  const dineInPercentage = total > 0 ? (dineInOrders / total) * 100 : 0;

  return (
    <div className="order-type-chart">
      <h3 className="order-type-chart__title">Order Types Distribution</h3>
      
      <div className="order-type-chart__stats">
        <div className="order-stat">
          <div className="order-stat__indicator order-stat__indicator--online"></div>
          <span className="order-stat__label">Online Orders</span>
          <span className="order-stat__value">{onlineOrders} ({onlinePercentage.toFixed(1)}%)</span>
        </div>
        
        <div className="order-stat">
          <div className="order-stat__indicator order-stat__indicator--dine-in"></div>
          <span className="order-stat__label">Dine In Orders</span>
          <span className="order-stat__value">{dineInOrders} ({dineInPercentage.toFixed(1)}%)</span>
        </div>
      </div>

      <div className="order-type-chart__bar">
        <div 
          className="order-type-chart__segment order-type-chart__segment--online"
          style={{ width: `${onlinePercentage}%` }}
        ></div>
        <div 
          className="order-type-chart__segment order-type-chart__segment--dine-in"
          style={{ width: `${dineInPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OrderTypeChart;