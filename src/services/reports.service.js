import prisma from "../../prisma/prismaClient.js";

class reportService {
  async getSalesInfo(startDate, endDate, officeCode) {
    const whereClause = {
      orderDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };

    if (officeCode) {
      whereClause["customers"] = {
        employees: {
          officeCode: officeCode,
        },
      };
    }

    return await prisma.orders.findMany({
      where: whereClause,
      include: {
        orderDetails: {
          include: {
            products: {
              include: {
                productlines: true,
              },
            },
          },
        },
      },
    });
  }

  async getNewCustomers(startDate, endDate, employeeNumber) {
    return await prisma.orders.findMany({
      where: {
        orderDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        customers: {
          salesRepEmployeeNumber: parseInt(employeeNumber),
        },
      },
      include: {
        orderDetails: true, // Adjust this to ensure priceEach and quantityOrdered are accessible
      },
    });
  }
}

export default new reportService();
