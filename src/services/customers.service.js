import prisma from "../../prisma/prismaClient.js";

class CustomerService {
  async getAllCustomers() {
    return await prisma.customers.findMany();
  }

  async getCustomerById(id) {
    return await prisma.customers.findUnique({
      where: { customerNumber: Number(id) },
    });
  }

  async createCustomer(data) {
    return await prisma.customers.create({ data });
  }

  async updateCustomer(id, data) {
    return await prisma.customers.update({
      where: { customerNumber: Number(id) },
      data,
    });
  }

  async deleteCustomer(id) {
    return await prisma.customers.delete({
      where: { customerNumber: Number(id) },
    });
  }
  async findCustomerByNumber(customerNumber) {
    return await prisma.customers.findUnique({
      where: { customerNumber: Number(customerNumber) },
    });
  }
}

export default new CustomerService();
