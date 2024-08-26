import CustomerService from "../services/customers.service.js";
import MESSAGE_KEYS from "../constants/messageKeys.js";

const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerService.getAllCustomers(req.user);
    if (!customers) {
      return res.status(403).json({ message: MESSAGE_KEYS.FORBIDDEN });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.ERROR_RETRIEVING_CUSTOMERS });
  }
};

const getCustomersById = async (req, res) => {
  try {
    const customer = await CustomerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: MESSAGE_KEYS.CUSTOMER_NOT_FOUND });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.SERVER_ERROR });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { customerNumber } = req.body;

    const existingCustomer = await CustomerService.findCustomerByNumber(
      customerNumber
    );

    if (existingCustomer) {
      return res.status(400).json({
        message: MESSAGE_KEYS.CUSTOMER_NUMBER_EXISTS,
      });
    }

    const newCustomer = await CustomerService.createCustomer(req.body);

    res.status(201).json({
      message: MESSAGE_KEYS.SUCCESS_CUSTOMER_CREATED,
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.ERROR_CREATING_CUSTOMER });
  }
};

const updateCustomer = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: MESSAGE_KEYS.INVALID_CREDENTIALS });
  }

  try {
    const updatedCustomer = await CustomerService.updateCustomer(id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ message: MESSAGE_KEYS.CUSTOMER_NOT_FOUND });
    }
    res.status(200).json({
      message: MESSAGE_KEYS.SUCCESS_CUSTOMER_UPDATED,
      data: updatedCustomer,
    });
  } catch (error) {
    console.log(req.body);

    res.status(500).json({
      message: MESSAGE_KEYS.ERROR_UPDATING_CUSTOMER,
      body: req.body,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const success = await CustomerService.deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ message: MESSAGE_KEYS.CUSTOMER_NOT_FOUND });
    }
    res.status(200).json({ message: MESSAGE_KEYS.SUCCESS_CUSTOMER_DELETED });
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.ERROR_DELETING_CUSTOMER });
  }
};

export {
  getAllCustomers,
  getCustomersById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
