"use client";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import ordersData from "../data/masterdata.json";

import "../styles/dashboard.scss";
import OrderTypeChart from "./OrderTypeChart";
import PopularItems from "./PopularItems";
import RecentOrders from "./RecentOrders";
import TopCustomers from "./TopCustomers";

interface Order {
  Order_ID: number;
  Customer_Name: string;
  Customer_Phone: string;
  Customer_Address: string;
  Items: Array<{
    Item_Name: string;
    Item_Price: number;
    Item_Type?: string;
    Quantity: number;
    Rating?: string;
    Total_Price: number;
  }>;
  Order_Date: string;
  Order_Type: string;
  Order_Status: string;
  Delivery_Person: string;
  Delivery_Status: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    inTransitOrders: 0,
    onlineOrders: 0,
    dineInOrders: 0,
  });

  useEffect(() => {
    calculateMetrics(orders);
  }, [orders]);

  const calculateMetrics = (ordersData: Order[]) => {
    const totalRevenue = ordersData.reduce((sum, order) => {
      return (
        sum +
        order.Items.reduce((itemSum, item) => itemSum + item.Total_Price, 0)
      );
    }, 0);

    const totalOrders = ordersData.length;
    const avgOrderValue = totalRevenue / totalOrders;

    const pendingOrders = ordersData.filter(
      (order) => order.Order_Status === "Pending"
    ).length;
    const deliveredOrders = ordersData.filter(
      (order) => order.Order_Status === "Delivered"
    ).length;
    const inTransitOrders = ordersData.filter(
      (order) => order.Order_Status === "In Transit"
    ).length;

    const onlineOrders = ordersData.filter(
      (order) => order.Order_Type === "Online"
    ).length;
    const dineInOrders = ordersData.filter(
      (order) => order.Order_Type === "Dine In"
    ).length;

    setMetrics({
      totalRevenue,
      totalOrders,
      avgOrderValue,
      pendingOrders,
      deliveredOrders,
      inTransitOrders,
      onlineOrders,
      dineInOrders,
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Restaurant Dashboard</h1>
        <p className="dashboard__subtitle">
          Monitor your business performance and make data-driven decisions
        </p>
      </div>

      <div className="dashboard__grid">
        {/* Key Metrics Row */}
        <div className="dashboard__metrics">
          <div className="metric-card metric-card--revenue">
            <div className="metric-card__icon">
              <DollarSign size={24} />
            </div>
            <div className="metric-card__content">
              <h3 className="metric-card__value">
                ${metrics.totalRevenue.toFixed(2)}
              </h3>
              <p className="metric-card__label">Total Revenue</p>
            </div>
          </div>

          <div className="metric-card metric-card--orders">
            <div className="metric-card__icon">
              <ShoppingCart size={24} />
            </div>
            <div className="metric-card__content">
              <h3 className="metric-card__value">{metrics.totalOrders}</h3>
              <p className="metric-card__label">Total Orders</p>
            </div>
          </div>

          <div className="metric-card metric-card--average">
            <div className="metric-card__icon">
              <TrendingUp size={24} />
            </div>
            <div className="metric-card__content">
              <h3 className="metric-card__value">
                ${metrics.avgOrderValue.toFixed(2)}
              </h3>
              <p className="metric-card__label">Avg Order Value</p>
            </div>
          </div>

          <div className="metric-card metric-card--customers">
            <div className="metric-card__icon">
              <Users size={24} />
            </div>
            <div className="metric-card__content">
              <h3 className="metric-card__value">{orders.length}</h3>
              <p className="metric-card__label">Unique Customers</p>
            </div>
          </div>
        </div>

        {/* Order Status Row */}
        <div className="dashboard__status">
          <div className="status-card status-card--delivered">
            <div className="status-card__icon">
              <CheckCircle size={20} />
            </div>
            <div className="status-card__content">
              <h4 className="status-card__value">{metrics.deliveredOrders}</h4>
              <p className="status-card__label">Delivered</p>
            </div>
          </div>

          <div className="status-card status-card--transit">
            <div className="status-card__icon">
              <Clock size={20} />
            </div>
            <div className="status-card__content">
              <h4 className="status-card__value">{metrics.inTransitOrders}</h4>
              <p className="status-card__label">In Transit</p>
            </div>
          </div>

          <div className="status-card status-card--pending">
            <div className="status-card__icon">
              <AlertCircle size={20} />
            </div>
            <div className="status-card__content">
              <h4 className="status-card__value">{metrics.pendingOrders}</h4>
              <p className="status-card__label">Pending</p>
            </div>
          </div>
        </div>

        {/* Charts and Analysis */}
        <OrderTypeChart
          onlineOrders={metrics.onlineOrders}
          dineInOrders={metrics.dineInOrders}
        />
        <PopularItems orders={orders} />
        <TopCustomers orders={orders} />
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
