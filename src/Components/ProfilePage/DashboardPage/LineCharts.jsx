import { Card, Title, LineChart } from "@tremor/react";
import React from "react";
import { useSelector } from "react-redux";

const LineCharts = () => {
  const { orders } = useSelector((state) => state.orders);

  let totalAmount = 0;
  orders &&
    orders.length > 0 &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const chartData = [
    {
      title: "Initial Amount",
      amount: 0,
    },
    {
      title: "Amount Earned",
      amount: totalAmount,
    },
  ];

  const customValueFormatter = (value) => {
    if (value === 0) {
      return "Initial Amount";
    }
    if (value === totalAmount) {
      return totalAmount;
    }

    return value / 10000 + "k";
  };

  return (
    <Card>
      <Title>MaNa Ecomm | Sales Trends</Title>

      <LineChart
        className="mt-8"
        data={chartData}
        index="title"
        categories={["amount"]}
        colors={["emerald"]}
        yAxisWidth={40}
        valueFormatter={customValueFormatter}
      />
    </Card>
  );
};

export default LineCharts;
