"use client";

import "./OrderTypeChart.scss";

interface OrderTypeChartProps {
  onlineOrders: number;
  dineInOrders: number;
}

const OrderTypeChart = ({
  onlineOrders,
  dineInOrders,
}: OrderTypeChartProps) => {
  const total = onlineOrders + dineInOrders;
  const onlinePercentage = total > 0 ? (onlineOrders / total) * 100 : 0;
  const dineInPercentage = total > 0 ? (dineInOrders / total) * 100 : 0;

  return (
    <div className="orderTypeChart">
      <h3 className="orderTypeChartTitle">Order Distribution</h3>

      <div className="orderTypeChartStats">
        <div className="orderStat">
          <div className="orderStatIndicator online"></div>
          <span className="orderStatLabel">Online Orders</span>
          <span className="orderStatValue">
            {onlineOrders} ({onlinePercentage.toFixed(1)}%)
          </span>
        </div>

        <div className="orderStat">
          <div className="orderStatIndicator dineIn"></div>
          <span className="orderStatLabel">Dine In Orders</span>
          <span className="orderStatValue">
            {dineInOrders} ({dineInPercentage.toFixed(1)}%)
          </span>
        </div>
      </div>

      <div className="orderTypeChartBar">
        <div
          className="orderTypeChartSegment online"
          style={{ width: `${onlinePercentage}%` }}
        ></div>
        <div
          className="orderTypeChartSegment dineIn"
          style={{ width: `${dineInPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OrderTypeChart;
