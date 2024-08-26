import { Joi } from "celebrate";
import MESSAGE_KEYS from "../constants/messageKeys.js";
import prisma from "../../prisma/prismaClient.js";

const validJobTitles = [
  "President",
  "Sales Rep",
  "Sales Manager",
  "Sales Manager (APAC)",
  "Sales Manager (EMEA)",
  "Sales Manager (NA)",
];

const customerSchema = Joi.object({
  customerNumber: Joi.number().positive().required().messages({
    "any.required": MESSAGE_KEYS.CUSTOMER_NUMBER_REQUIRED,
    "number.base": MESSAGE_KEYS.CUSTOMER_NUMBER_BASE,
    "number.positive": MESSAGE_KEYS.CUSTOMER_NUMBER_POSITIVE,
  }),
  customerName: Joi.string().min(5).max(50).required().messages({
    "any.required": MESSAGE_KEYS.CUSTOMER_NAME_REQUIRED,
    "string.base": MESSAGE_KEYS.CUSTOMER_NAME_BASE,
    "string.min": MESSAGE_KEYS.CUSTOMER_NAME_MIN,
    "string.max": MESSAGE_KEYS.CUSTOMER_NAME_MAX,
  }),
  contactLastName: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.CONTACT_LAST_NAME_REQUIRED,
    "string.base": MESSAGE_KEYS.CONTACT_LAST_NAME_BASE,
    "string.min": MESSAGE_KEYS.CONTACT_LAST_NAME_MIN,
    "string.max": MESSAGE_KEYS.CONTACT_LAST_NAME_MAX,
  }),
  contactFirstName: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.CONTACT_FIRST_NAME_REQUIRED,
    "string.base": MESSAGE_KEYS.CONTACT_FIRST_NAME_BASE,
    "string.min": MESSAGE_KEYS.CONTACT_FIRST_NAME_MIN,
    "string.max": MESSAGE_KEYS.CONTACT_FIRST_NAME_MAX,
  }),
  phone: Joi.string().min(8).max(20).required().messages({
    "any.required": MESSAGE_KEYS.PHONE_REQUIRED,
    "string.base": MESSAGE_KEYS.PHONE_BASE,
    "string.min": MESSAGE_KEYS.PHONE_MIN,
    "string.max": MESSAGE_KEYS.PHONE_MAX,
  }),
  addressLine1: Joi.string().min(10).max(50).required().messages({
    "any.required": MESSAGE_KEYS.ADDRESS_LINE1_REQUIRED,
    "string.base": MESSAGE_KEYS.ADDRESS_LINE1_BASE,
    "string.min": MESSAGE_KEYS.ADDRESS_LINE1_MIN,
    "string.max": MESSAGE_KEYS.ADDRESS_LINE1_MAX,
  }),
  addressLine2: Joi.string().min(10).max(50).optional().allow(null).messages({
    "string.base": MESSAGE_KEYS.ADDRESS_LINE2_BASE,
    "string.min": MESSAGE_KEYS.ADDRESS_LINE2_MIN,
    "string.max": MESSAGE_KEYS.ADDRESS_LINE2_MAX,
  }),
  city: Joi.string().min(2).max(50).required().messages({
    "any.required": MESSAGE_KEYS.CITY_REQUIRED,
    "string.base": MESSAGE_KEYS.CITY_BASE,
    "string.min": MESSAGE_KEYS.CITY_MIN,
    "string.max": MESSAGE_KEYS.CITY_MAX,
  }),
  state: Joi.string().min(2).max(50).optional().allow(null).messages({
    "string.base": MESSAGE_KEYS.STATE_BASE,
    "string.min": MESSAGE_KEYS.STATE_MIN,
    "string.max": MESSAGE_KEYS.STATE_MAX,
  }),
  postalCode: Joi.string().min(5).max(15).optional().allow(null).messages({
    "string.base": MESSAGE_KEYS.POSTAL_CODE_BASE,
    "string.min": MESSAGE_KEYS.POSTAL_CODE_MIN,
    "string.max": MESSAGE_KEYS.POSTAL_CODE_MAX,
  }),
  country: Joi.string().min(2).max(50).required().messages({
    "any.required": MESSAGE_KEYS.COUNTRY_REQUIRED,
    "string.base": MESSAGE_KEYS.COUNTRY_BASE,
    "string.min": MESSAGE_KEYS.COUNTRY_MIN,
    "string.max": MESSAGE_KEYS.COUNTRY_MAX,
  }),
  salesRepEmployeeNumber: Joi.number().positive().required().messages({
    "any.required": MESSAGE_KEYS.SALES_REP_EMPLOYEE_NUMBER_REQUIRED,
    "number.base": MESSAGE_KEYS.SALES_REP_EMPLOYEE_NUMBER_BASE,
    "number.positive": MESSAGE_KEYS.SALES_REP_EMPLOYEE_NUMBER_POSITIVE,
  }),
  creditLimit: Joi.number().precision(2).optional().allow(null).messages({
    "number.base": MESSAGE_KEYS.CREDIT_LIMIT_BASE,
    "number.precision": MESSAGE_KEYS.CREDIT_LIMIT_PRECISION,
  }),
});

const employeeSchema = Joi.object({
  employeeNumber: Joi.number().positive().required().messages({
    "any.required": MESSAGE_KEYS.EMPLOYEE_NUMBER_REQUIRED,
    "number.base": MESSAGE_KEYS.EMPLOYEE_NUMBER_BASE,
    "number.positive": MESSAGE_KEYS.EMPLOYEE_NUMBER_POSITIVE,
  }),
  lastName: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.LAST_NAME_REQUIRED,
    "string.base": MESSAGE_KEYS.LAST_NAME_BASE,
    "string.min": MESSAGE_KEYS.LAST_NAME_MIN,
    "string.max": MESSAGE_KEYS.LAST_NAME_MAX,
  }),
  firstName: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.FIRST_NAME_REQUIRED,
    "string.base": MESSAGE_KEYS.FIRST_NAME_BASE,
    "string.min": MESSAGE_KEYS.FIRST_NAME_MIN,
    "string.max": MESSAGE_KEYS.FIRST_NAME_MAX,
  }),
  extension: Joi.string().max(50).required().messages({
    "any.required": MESSAGE_KEYS.EXTENSION_REQUIRED,
    "string.base": MESSAGE_KEYS.EXTENSION_BASE,
    "string.max": MESSAGE_KEYS.EXTENSION_MAX,
  }),
  email: Joi.string().email().min(10).max(100).required().messages({
    "any.required": MESSAGE_KEYS.EMAIL_REQUIRED,
    "string.base": MESSAGE_KEYS.EMAIL_BASE,
    "string.email": MESSAGE_KEYS.EMAIL_VALID,
    "string.min": MESSAGE_KEYS.EMAIL_MIN,
    "string.max": MESSAGE_KEYS.EMAIL_MAX,
  }),
  officeCode: Joi.string().max(10).required().messages({
    "any.required": MESSAGE_KEYS.OFFICE_CODE_REQUIRED,
    "string.base": MESSAGE_KEYS.OFFICE_CODE_BASE,
    "string.max": MESSAGE_KEYS.OFFICE_CODE_MAX,
  }),
  reportsTo: Joi.number().positive().allow(null).optional().messages({
    "number.base": MESSAGE_KEYS.REPORTS_TO_BASE,
    "number.positive": MESSAGE_KEYS.REPORTS_TO_POSITIVE,
  }),
  jobTitle: Joi.string()
    .valid(...validJobTitles)
    .required()
    .messages({
      "any.required": "jobTitle is required",
      "string.base": "jobTitle must be a string",
      "any.only": `jobTitle must be one of the following: ${validJobTitles.join(
        ", "
      )}`,
    }),
  role: Joi.number().valid(1, 2, 3, 4).required().messages({
    "any.required": "role is required",
    "number.base": "role must be a number",
    "any.only":
      "role must be one of 1 (President), 2 (Manager), 3 (Leader), 4 (Staff)",
  }),
  customers: Joi.array().items(customerSchema).optional().messages({
    "array.base": "Customers must be an array of customer objects",
  }),
});

const updateEmployeeSchema = employeeSchema.fork(
  ["employeeNumber", "lastName", "firstName"],
  (field) =>
    field.forbidden().messages({
      "any.unknown": "{#label} should not be changed",
    })
);

const updateCustomerSchema = customerSchema.fork(["customerNumber"], (field) =>
  field.forbidden().messages({
    "any.unknown": "customerNumber should not be changed",
  })
);

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.USERNAME_REQUIRED,
    "string.base": MESSAGE_KEYS.USERNAME_BASE,
    "string.min": MESSAGE_KEYS.USERNAME_MIN,
    "string.max": MESSAGE_KEYS.USERNAME_MAX,
  }),
  password: Joi.string().required().messages({
    "any.required": MESSAGE_KEYS.PASSWORD_REQUIRED,
    "string.base": MESSAGE_KEYS.PASSWORD_BASE,
  }),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "any.required": MESSAGE_KEYS.USERNAME_REQUIRED,
    "string.base": MESSAGE_KEYS.USERNAME_BASE,
    "string.min": MESSAGE_KEYS.USERNAME_MIN,
    "string.max": MESSAGE_KEYS.USERNAME_MAX,
  }),
  password: Joi.string().required().messages({
    "any.required": MESSAGE_KEYS.PASSWORD_REQUIRED,
    "string.base": MESSAGE_KEYS.PASSWORD_BASE,
  }),
  employeeNumber: Joi.number().positive().required().messages({
    "any.required": MESSAGE_KEYS.EMPLOYEE_NUMBER_REQUIRED,
    "number.base": MESSAGE_KEYS.EMPLOYEE_NUMBER_BASE,
    "number.positive": MESSAGE_KEYS.EMPLOYEE_NUMBER_POSITIVE,
  }),
});

export {
  employeeSchema,
  updateEmployeeSchema,
  customerSchema,
  updateCustomerSchema,
  loginSchema,
  registerSchema,
};
