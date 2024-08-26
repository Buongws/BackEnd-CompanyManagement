import prisma from "../../prisma/prismaClient.js";

class EmployeeService {
  async getAllEmployees() {
    return await prisma.employees.findMany({
      include: {
        offices: false,
      },
    });
  }

  async getEmployeeById(id) {
    return await prisma.employees.findUnique({
      where: { employeeNumber: Number(id) },
      include: {
        offices: false,
      },
    });
  }

  async createEmployeeWithCustomers(employeeData, customersData = []) {
    if (!Array.isArray(customersData)) {
      throw new Error("customersData should be an array");
    }

    // Validate customersData (e.g., ensure customerName is present)
    const invalidCustomers = customersData.filter(
      (customer) => !customer.customerName
    );
    if (invalidCustomers.length > 0) {
      throw new Error(
        `Invalid customers: ${invalidCustomers
          .map((c) => c.customerNumber)
          .join(", ")}`
      );
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Create the new employee
      const newEmployee = await prisma.employees.create({
        data: employeeData,
      });

      // Create customers associated with the newly created employee
      const createdCustomers = await Promise.all(
        customersData.map((customer) => {
          if (customer.salesRepEmployeeNumber !== newEmployee.employeeNumber) {
            throw new Error(
              "salesRepEmployeeNumber must be the same as the new employee's employeeNumber"
            );
          }
          return prisma.customers.create({
            data: {
              ...customer,
              salesRepEmployeeNumber: newEmployee.employeeNumber,
            },
          });
        })
      );

      return { newEmployee, createdCustomers };
    });

    return result;
  }

  async updateEmployee(id, data) {
    return await prisma.employees.update({
      where: { employeeNumber: Number(id) },
      data,
    });
  }

  async findEmployeeByNumber(employeeNumber) {
    return await prisma.employees.findUnique({
      where: { employeeNumber: Number(employeeNumber) },
    });
  }

  async findDefaultEmployeeByOfficeCode(officeCode) {
    return await prisma.employees.findFirst({
      where: {
        officeCode,
        lastName: "9999",
      },
    });
  }

  async reassignCustomersToEmployee(oldEmployeeNumber, newEmployeeNumber) {
    return await prisma.customers.updateMany({
      where: {
        salesRepEmployeeNumber: oldEmployeeNumber,
      },
      data: {
        salesRepEmployeeNumber: newEmployeeNumber,
      },
    });
  }

  async deleteEmployee(employeeNumber) {
    return await prisma.employees.delete({
      where: { employeeNumber },
    });
  }
}

export default new EmployeeService();
