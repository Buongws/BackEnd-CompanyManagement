import EmployeeService from "../services/employees.service.js";
import MESSAGE_KEYS from "../constants/messageKeys.js";

export async function getAllEmployees(req, res) {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.ERROR_RETRIEVING_CUSTOMERS });
  }
}

export async function getEmployeeById(req, res) {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: MESSAGE_KEYS.EMPLOYEE_NOT_FOUND });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createEmployee(req, res) {
  try {
    const { customers, ...employeeData } = req.body;

    const { newEmployee, createdCustomers } =
      await EmployeeService.createEmployeeWithCustomers(
        employeeData,
        customers
      );

    res.status(201).json({
      message: MESSAGE_KEYS.EMPLOYEE_CREATE_SUCCESS,
      employee: newEmployee,
      customers: createdCustomers,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateEmployee(req, res) {
  try {
    const updatedEmployee = await EmployeeService.updateEmployee(
      req.params.id,
      req.body
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: MESSAGE_KEYS.EMPLOYEE_NOT_FOUND });
    }
    res.status(200).json({
      message: MESSAGE_KEYS.EMPLOYEE_UPDATE_SUCCESS,
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: MESSAGE_KEYS.ERROR_UPDATING_CUSTOMER });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const employeeNumber = parseInt(req.params.id);

    // Fetch the employee to be deleted
    const employeeToDelete = await EmployeeService.getEmployeeById(
      employeeNumber
    );
    if (!employeeToDelete) {
      return res.status(404).json({ message: MESSAGE_KEYS.EMPLOYEE_NOT_FOUND });
    }
    if (employeeToDelete.lastName === "9999") {
      return res
        .status(404)
        .json({ message: "Cannot delete default employees" });
    }

    // Find the default employee for the office
    const defaultEmployee =
      await EmployeeService.findDefaultEmployeeByOfficeCode(
        employeeToDelete.officeCode
      );

    if (!defaultEmployee) {
      return res
        .status(404)
        .json({ message: "Default employee not found for the office" });
    }

    // Reassign customers to the default employee
    await EmployeeService.reassignCustomersToEmployee(
      employeeNumber,
      defaultEmployee.employeeNumber
    );

    // Delete the employee
    await EmployeeService.deleteEmployee(employeeNumber);

    res.status(200).json({ message: MESSAGE_KEYS.EMPLOYEE_DELETE_SUCCESS });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
