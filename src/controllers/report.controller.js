import reportsService from "../services/reports.service.js";

export const getSalesInfo = async (req, res) => {
  const { start_date, end_date, officeCode } = req.query;
  try {
    const orders = await reportsService.getSalesInfo(
      start_date,
      end_date,
      officeCode
    );

    console.log(orders);

    const { totalRevenue, productLineRevenue } = aggregateSalesData(orders);

    const response = {
      totalRevenue,
      officeCode,
      productLineRevenue,
    };

    res.json({
      message: "Sales information retrieved successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving sales information",
      error: error.message,
    });
  }
};

function aggregateSalesData(orders) {
  let totalRevenue = 0;
  const productLineRevenue = {};

  orders.forEach((order) => {
    order.orderDetails.forEach((detail) => {
      const productLine = detail.products.productlines.productLine;
      const revenue = detail.priceEach * detail.quantityOrdered;

      // Add revenue to total
      totalRevenue += revenue;

      if (productLineRevenue[productLine]) {
        productLineRevenue[productLine] += revenue;
      } else {
        productLineRevenue[productLine] = revenue;
      }
    });
  });

  return {
    totalRevenue,
    productLineRevenue,
  };
}

export const getNewCustomers = async (req, res) => {
  const { start_date, end_date, employeeNumber } = req.query;
  try {
    const orders = await reportsService.getNewCustomers(
      start_date,
      end_date,
      employeeNumber
    );

    let totalRevenue = 0;
    orders.forEach((order) => {
      order.orderDetails.forEach((detail) => {
        totalRevenue += detail.priceEach * detail.quantityOrdered;
      });
    });

    res.json({
      message: "Retrieved orders successfully",
      data: orders,
      totalRevenue: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving new customer information",
      error: error.message,
    });
  }
};
