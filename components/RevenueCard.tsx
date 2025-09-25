"use client";

interface RevenueCardProps {
  totalRevenue: number;
}

const RevenueCard = ({ totalRevenue }: RevenueCardProps) => {
  return (
    <div className="revenue-card">
      <h3>Total Revenue</h3>
      <p className="revenue-amount">${totalRevenue.toFixed(2)}</p>
      <span className="revenue-growth">+12.5% from last month</span>
    </div>
  );
};

export default RevenueCard;