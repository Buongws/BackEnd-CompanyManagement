const MESSAGE_KEYS = {
  ACCESS_DENIED: "ACCESS_DENIED",
  CUSTOMER_NOT_FOUND: "CUSTOMER_NOT_FOUND",
  DUPLICATE_CUSTOMER: "DUPLICATE_CUSTOMER_EXISTS",
  STAFF_ONLY_CREATE_SELF_CUSTOMER: "STAFF_ONLY_CAN_CREATE_CUSTOMER",
  LEADER_ONLY_CREATE_SAME_OFFICE:
    "LEADER_CAN_ONLY_CREATE_CUSTOMER_IN_SAME_OFFICE",
  STAFF_ONLY_UPDATE_SELF_CUSTOMER: "STAFF_ONLY_CAN_UPDATE_SELF_CUSTOMER",
  LEADER_ONLY_UPDATE_SAME_OFFICE:
    "LEADER_CAN_ONLY_UPDATE_CUSTOMER_IN_SAME_OFFICE",
  STAFF_CANNOT_DELETE_CUSTOMER: "STAFF_CANNOT_DELETE_CUSTOMER",
  SUCCESS_CUSTOMER_RETRIEVED: "CUSTOMER_RETRIEVED_SUCCESSFULLY",
  SUCCESS_CUSTOMER_CREATED: "CUSTOMER_CREATED_SUCCESSFULLY",
  SUCCESS_CUSTOMER_UPDATED: "CUSTOMER_UPDATED_SUCCESSFULLY",
  SUCCESS_CUSTOMER_DELETED: "CUSTOMER_DELETED_SUCCESSFULLY",
  ERROR_RETRIEVING_CUSTOMERS: "FAILED_TO_RETRIEVE_CUSTOMERS",
  ERROR_CREATING_CUSTOMER: "FAILED_TO_CREATE_CUSTOMER",
  ERROR_UPDATING_CUSTOMER: "FAILED_TO_UPDATE_CUSTOMER",
  ERROR_DELETING_CUSTOMER: "FAILED_TO_DELETE_CUSTOMER",

  USERNAME_EXISTS: "USERNAME_ALREADY_EXISTS",
  EMPLOYEE_NUMBER_EXISTS: "EMPLOYEE_NUMBER_ALREADY_EXISTS",
  USER_REGISTER_SUCCESS: "USER_REGISTERED_SUCCESSFULLY",
  INVALID_CREDENTIALS: "INVALID_LOGIN_CREDENTIALS",
  LOGIN_SUCCESS: "USER_LOGGED_IN_SUCCESSFULLY",

  EMPLOYEE_NOT_FOUND: "EMPLOYEE_NOT_FOUND",
  DUPLICATE_EMPLOYEE_NUMBER: "DUPLICATE_EMPLOYEE_NUMBER_EXISTS",
  EMPLOYEE_CREATE_SUCCESS: "EMPLOYEE_CREATED_SUCCESSFULLY",
  EMPLOYEE_UPDATE_SUCCESS: "EMPLOYEE_UPDATED_SUCCESSFULLY",
  EMPLOYEE_DELETE_SUCCESS: "EMPLOYEE_DELETED_SUCCESSFULLY",

  // Employee validation errors
  EMPLOYEE_NUMBER_REQUIRED: "EMPLOYEE_NUMBER_IS_REQUIRED",
  EMPLOYEE_NUMBER_BASE: "EMPLOYEE_NUMBER_MUST_BE_A_NUMBER",
  EMPLOYEE_NUMBER_POSITIVE: "EMPLOYEE_NUMBER_MUST_BE_POSITIVE",
  LAST_NAME_REQUIRED: "LAST_NAME_IS_REQUIRED",
  LAST_NAME_BASE: "LAST_NAME_MUST_BE_A_STRING",
  LAST_NAME_MIN: "LAST_NAME_TOO_SHORT",
  LAST_NAME_MAX: "LAST_NAME_TOO_LONG",
  FIRST_NAME_REQUIRED: "FIRST_NAME_IS_REQUIRED",
  FIRST_NAME_BASE: "FIRST_NAME_MUST_BE_A_STRING",
  FIRST_NAME_MIN: "FIRST_NAME_TOO_SHORT",
  FIRST_NAME_MAX: "FIRST_NAME_TOO_LONG",
  EXTENSION_REQUIRED: "EXTENSION_IS_REQUIRED",
  EXTENSION_BASE: "EXTENSION_MUST_BE_A_STRING",
  EXTENSION_MAX: "EXTENSION_TOO_LONG",
  EMAIL_REQUIRED: "EMAIL_IS_REQUIRED",
  EMAIL_BASE: "EMAIL_MUST_BE_A_STRING",
  EMAIL_VALID: "EMAIL_MUST_BE_VALID",
  EMAIL_MIN: "EMAIL_TOO_SHORT",
  EMAIL_MAX: "EMAIL_TOO_LONG",
  OFFICE_CODE_REQUIRED: "OFFICE_CODE_IS_REQUIRED",
  OFFICE_CODE_BASE: "OFFICE_CODE_MUST_BE_A_STRING",
  OFFICE_CODE_MAX: "OFFICE_CODE_TOO_LONG",
  REPORTS_TO_BASE: "REPORTS_TO_MUST_BE_A_NUMBER",
  REPORTS_TO_POSITIVE: "REPORTS_TO_MUST_BE_POSITIVE",
  JOB_TITLE_REQUIRED: "JOB_TITLE_IS_REQUIRED",
  JOB_TITLE_BASE: "JOB_TITLE_MUST_BE_A_STRING",
  JOB_TITLE_VALID: "INVALID_JOB_TITLE",
  SALES_REP_EMPLOYEE_NUMBER_NOT_FOUND: "SALES_REP_EMPLOYEE_NUMBER_NOT_FOUND",

  // Customer validation errors
  CUSTOMER_NUMBER_REQUIRED: "CUSTOMER_NUMBER_IS_REQUIRED",
  CUSTOMER_NUMBER_BASE: "CUSTOMER_NUMBER_MUST_BE_A_NUMBER",
  CUSTOMER_NUMBER_EXISTS: "EMPLOYEE_NUMBER_ALREADY_EXISTS",
  CUSTOMER_NUMBER_POSITIVE: "CUSTOMER_NUMBER_MUST_BE_POSITIVE",
  CUSTOMER_NAME_REQUIRED: "CUSTOMER_NAME_IS_REQUIRED",
  CUSTOMER_NAME_BASE: "CUSTOMER_NAME_MUST_BE_A_STRING",
  CUSTOMER_NAME_MIN: "CUSTOMER_NAME_TOO_SHORT",
  CUSTOMER_NAME_MAX: "CUSTOMER_NAME_TOO_LONG",
  CONTACT_LAST_NAME_REQUIRED: "CONTACT_LAST_NAME_IS_REQUIRED",
  CONTACT_LAST_NAME_BASE: "CONTACT_LAST_NAME_MUST_BE_A_STRING",
  CONTACT_LAST_NAME_MIN: "CONTACT_LAST_NAME_TOO_SHORT",
  CONTACT_LAST_NAME_MAX: "CONTACT_LAST_NAME_TOO_LONG",
  CONTACT_FIRST_NAME_REQUIRED: "CONTACT_FIRST_NAME_IS_REQUIRED",
  CONTACT_FIRST_NAME_BASE: "CONTACT_FIRST_NAME_MUST_BE_A_STRING",
  CONTACT_FIRST_NAME_MIN: "CONTACT_FIRST_NAME_TOO_SHORT",
  CONTACT_FIRST_NAME_MAX: "CONTACT_FIRST_NAME_TOO_LONG",
  PHONE_REQUIRED: "PHONE_IS_REQUIRED",
  PHONE_BASE: "PHONE_MUST_BE_A_STRING",
  PHONE_MIN: "PHONE_TOO_SHORT",
  PHONE_MAX: "PHONE_TOO_LONG",
  ADDRESS_LINE1_REQUIRED: "ADDRESS_LINE1_IS_REQUIRED",
  ADDRESS_LINE1_BASE: "ADDRESS_LINE1_MUST_BE_A_STRING",
  ADDRESS_LINE1_MIN: "ADDRESS_LINE1_TOO_SHORT",
  ADDRESS_LINE1_MAX: "ADDRESS_LINE1_TOO_LONG",
  ADDRESS_LINE2_BASE: "ADDRESS_LINE2_MUST_BE_A_STRING",
  ADDRESS_LINE2_MIN: "ADDRESS_LINE2_TOO_SHORT",
  ADDRESS_LINE2_MAX: "ADDRESS_LINE2_TOO_LONG",
  CITY_REQUIRED: "CITY_IS_REQUIRED",
  CITY_BASE: "CITY_MUST_BE_A_STRING",
  CITY_MIN: "CITY_NAME_TOO_SHORT",
  CITY_MAX: "CITY_NAME_TOO_LONG",
  STATE_BASE: "STATE_MUST_BE_A_STRING",
  STATE_MIN: "STATE_NAME_TOO_SHORT",
  STATE_MAX: "STATE_NAME_TOO_LONG",
  POSTAL_CODE_BASE: "POSTAL_CODE_MUST_BE_A_STRING",
  POSTAL_CODE_MIN: "POSTAL_CODE_TOO_SHORT",
  POSTAL_CODE_MAX: "POSTAL_CODE_TOO_LONG",
  COUNTRY_REQUIRED: "COUNTRY_IS_REQUIRED",
  COUNTRY_BASE: "COUNTRY_MUST_BE_A_STRING",
  COUNTRY_MIN: "COUNTRY_NAME_TOO_SHORT",
  COUNTRY_MAX: "COUNTRY_NAME_TOO_LONG",
  SALES_REP_EMPLOYEE_NUMBER_REQUIRED: "SALES_REP_EMPLOYEE_NUMBER_IS_REQUIRED",
  SALES_REP_EMPLOYEE_NUMBER_BASE: "SALES_REP_EMPLOYEE_NUMBER_MUST_BE_A_NUMBER",
  SALES_REP_EMPLOYEE_NUMBER_POSITIVE:
    "SALES_REP_EMPLOYEE_NUMBER_MUST_BE_POSITIVE",
  CREDIT_LIMIT_BASE: "CREDIT_LIMIT_MUST_BE_A_NUMBER",
  CREDIT_LIMIT_PRECISION: "CREDIT_LIMIT_MUST_HAVE_MAX_2_DECIMALS",

  USERNAME_REQUIRED: "USERNAME_IS_REQUIRED",
  USERNAME_BASE: "USERNAME_MUST_BE_A_STRING",
  USERNAME_MIN: "USERNAME_TOO_SHORT",
  USERNAME_MAX: "USERNAME_TOO_LONG",

  // Password validation errors
  PASSWORD_REQUIRED: "PASSWORD_IS_REQUIRED",
  PASSWORD_BASE: "PASSWORD_MUST_BE_A_STRING",
  PASSWORD_PATTERN: "PASSWORD_DOES_NOT_MEET_REQUIREMENTS",

  // Employee number validation errors
  EMPLOYEE_NUMBER_REQUIRED: "EMPLOYEE_NUMBER_IS_REQUIRED",
  EMPLOYEE_NUMBER_BASE: "EMPLOYEE_NUMBER_MUST_BE_A_NUMBER",
  EMPLOYEE_NUMBER_POSITIVE: "EMPLOYEE_NUMBER_MUST_BE_POSITIVE",

  // Registration-specific keys
  USERNAME_EXISTS: "USERNAME_ALREADY_EXISTS",
  EMPLOYEE_NUMBER_EXISTS: "EMPLOYEE_NUMBER_ALREADY_EXISTS",
  USER_REGISTER_SUCCESS: "USER_REGISTERED_SUCCESSFULLY",

  // General error and success keys
  VALIDATION: "VALIDATION_ERROR",
  SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  FORBIDDEN: "ACTION_FORBIDDEN",
};

export default MESSAGE_KEYS;
