import React from "react";
import { Card, Title, DonutChart } from "@tremor/react";
import { useSelector } from "react-redux";

const DonutCharts = () => {
  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;

  products &&
    products.length > 0 &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const cities = [
    {
      name: "Out of Stock",
      sales: outOfStock,
    },
    {
      name: "In Stock",
      sales: products.length - outOfStock,
    },
  ];
  const valueFormatter = (number) => {
    return `Stocks: \n ${Intl.NumberFormat("en-IN").format(number).toString()}`;
  };

  const chartStyles = {
    width: "400px",
    height: "400px",
  };

  return (
    <Card className="">
      <Title>MaNa Ecomm | Stocks Chart</Title>
      <DonutChart
        className="mx-auto mt-4 lg:w-[400px]  lg:h-[400px] md:w-[200px]  md:h-[200px] "
        data={cities}
        category="sales"
        index="name"
        label={
          outOfStock > 0
            ? `In Stock: ${
                products.length - outOfStock
              }\nOut of Stock: ${outOfStock}`
            : `Total Stock ${products.length}`
        }
        valueFormatter={valueFormatter}
        colors={["rose", "cyan"]}
      />
    </Card>
  );
};

export default DonutCharts;
