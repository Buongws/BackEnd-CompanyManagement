import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Insert roles into the Role table
  await prisma.role.createMany({
    data: [
      { role: "President" },
      { role: "Manager" },
      { role: "Leader" },
      { role: "Staff" },
    ],
  });

  // Insert sample offices
  await prisma.offices.createMany({
    data: [
      {
        officeCode: "1",
        city: "New York",
        phone: "212-555-0000",
        addressLine1: "123 Park Ave",
        addressLine2: null,
        state: "NY",
        country: "USA",
        postalCode: "10001",
        territory: "NA",
      },
      {
        officeCode: "2",
        city: "San Francisco",
        phone: "415-555-0000",
        addressLine1: "456 Market St",
        addressLine2: null,
        state: "CA",
        country: "USA",
        postalCode: "94105",
        territory: "NA",
      },
      {
        officeCode: "3",
        city: "London",
        phone: "+44-20-5555-0000",
        addressLine1: "789 Oxford St",
        addressLine2: null,
        state: null,
        country: "UK",
        postalCode: "W1D 1NS",
        territory: "EMEA",
      },
      {
        officeCode: "4",
        city: "Tokyo",
        phone: "+81-3-5555-0000",
        addressLine1: "101 Shibuya St",
        addressLine2: null,
        state: "Tokyo",
        country: "Japan",
        postalCode: "150-0001",
        territory: "APAC",
      },
    ],
  });

  // Insert default employees with lastName '9999' for each office
  const defaultEmployees = [
    {
      employeeNumber: 9991,
      lastName: "9999",
      firstName: "Default 1",
      extension: "x9991",
      email: "default1@example.com",
      officeCode: "1",
      reportsTo: null,
      jobTitle: "Default Employee",
      role: null,
    },
    {
      employeeNumber: 9992,
      lastName: "9999",
      firstName: "Default 2",
      extension: "x9992",
      email: "default2@example.com",
      officeCode: "2",
      reportsTo: null,
      jobTitle: "Default Employee",
      role: null,
    },
    {
      employeeNumber: 9993,
      lastName: "9999",
      firstName: "Default 3",
      extension: "x9993",
      email: "default3@example.com",
      officeCode: "3",
      reportsTo: null,
      jobTitle: "Default Employee",
      role: null,
    },
    {
      employeeNumber: 9994,
      lastName: "9999",
      firstName: "Default 4",
      extension: "x9994",
      email: "default4@example.com",
      officeCode: "4",
      reportsTo: null,
      jobTitle: "Default Employee",
      role: null,
    },
  ];

  await prisma.employees.createMany({
    data: defaultEmployees,
  });

  // Insert other employees
  await prisma.employees.createMany({
    data: [
      {
        employeeNumber: 1002,
        lastName: "Adams",
        firstName: "John",
        extension: "x102",
        email: "jadams@example.com",
        officeCode: "1",
        reportsTo: null,
        jobTitle: "President",
        role: 1,
      },
      {
        employeeNumber: 1003,
        lastName: "Baker",
        firstName: "Jane",
        extension: "x103",
        email: "jbaker@example.com",
        officeCode: "2",
        reportsTo: 1002,
        jobTitle: "Sales Manager (NA)",
        role: 2,
      },
      {
        employeeNumber: 1004,
        lastName: "Clark",
        firstName: "Robert",
        extension: "x104",
        email: "rclark@example.com",
        officeCode: "3",
        reportsTo: 1002,
        jobTitle: "Sales Manager (EMEA)",
        role: 3,
      },
      {
        employeeNumber: 1005,
        lastName: "Davis",
        firstName: "Patricia",
        extension: "x105",
        email: "pdavis@example.com",
        officeCode: "4",
        reportsTo: 1002,
        jobTitle: "Sales Manager (APAC)",
        role: 4,
      },
      {
        employeeNumber: 1006,
        lastName: "Evans",
        firstName: "David",
        extension: "x106",
        email: "devans@example.com",
        officeCode: "4",
        reportsTo: 1005,
        jobTitle: "Leader",
        role: 3,
      },
      {
        employeeNumber: 1007,
        lastName: "Garcia",
        firstName: "Linda",
        extension: "x107",
        email: "lgarcia@example.com",
        officeCode: "3",
        reportsTo: 1004,
        jobTitle: "Leader",
        role: 3,
      },
      {
        employeeNumber: 1008,
        lastName: "Ford",
        firstName: "Sarah",
        extension: "x108",
        email: "sford@example.com",
        officeCode: "2",
        reportsTo: 1003,
        jobTitle: "Staff",
        role: 4,
      },
    ],
  });

  // Insert customers
  await prisma.customers.createMany({
    data: [
      {
        customerNumber: 2001,
        customerName: "ABC Corporation",
        contactLastName: "Adams",
        contactFirstName: "John",
        phone: "212-555-0001",
        addressLine1: "987 Pine St",
        addressLine2: null,
        city: "New York",
        state: "NY",
        postalCode: "10002",
        country: "USA",
        salesRepEmployeeNumber: 1002,
        creditLimit: 50000,
      },
      {
        customerNumber: 2002,
        customerName: "XYZ Ltd",
        contactLastName: "Baker",
        contactFirstName: "Jane",
        phone: "415-555-0002",
        addressLine1: "654 Cedar Ave",
        addressLine2: null,
        city: "San Francisco",
        state: "CA",
        postalCode: "94107",
        country: "USA",
        salesRepEmployeeNumber: 1003,
        creditLimit: 70000,
      },
      {
        customerNumber: 2003,
        customerName: "Acme Corp",
        contactLastName: "Clark",
        contactFirstName: "Robert",
        phone: "+44-20-5555-0003",
        addressLine1: "321 Elm St",
        addressLine2: null,
        city: "London",
        state: null,
        postalCode: "SW1A 1AA",
        country: "UK",
        salesRepEmployeeNumber: 1004,
        creditLimit: 45000,
      },
      {
        customerNumber: 2006,
        customerName: "Innovative Designs",
        contactLastName: "Ford",
        contactFirstName: "Sarah",
        phone: "415-555-0006",
        addressLine1: "987 Birch Rd",
        addressLine2: null,
        city: "San Francisco",
        state: "CA",
        postalCode: "94108",
        country: "USA",
        salesRepEmployeeNumber: 1008,
        creditLimit: 30000,
      },
      {
        customerNumber: 2007,
        customerName: "Creative Works",
        contactLastName: "Garcia",
        contactFirstName: "Linda",
        phone: "+44-20-5555-0007",
        addressLine1: "654 Pine St",
        addressLine2: null,
        city: "London",
        state: null,
        postalCode: "SW1A 2BB",
        country: "UK",
        salesRepEmployeeNumber: 1007,
        creditLimit: 55000,
      },
      {
        customerNumber: 2008,
        customerName: "Future Enterprises",
        contactLastName: "Harris",
        contactFirstName: "James",
        phone: "+81-3-5555-0008",
        addressLine1: "321 Cedar Rd",
        addressLine2: null,
        city: "Tokyo",
        state: "Tokyo",
        postalCode: "100-0003",
        country: "Japan",
        salesRepEmployeeNumber: 1006,
        creditLimit: 75000,
      },
    ],
  });

  // Hash the passwords
  const hashedPasswords = await Promise.all([
    bcrypt.hash("presidentcompany", 10),
    bcrypt.hash("managercompany", 10),
    bcrypt.hash("leadercompany", 10),
    bcrypt.hash("staffcompany", 10),
  ]);

  // Insert users into the users table with hashed passwords
  await prisma.users.createMany({
    data: [
      {
        username: "presidentcompany",
        password: hashedPasswords[0],
        employeeNumber: 1002,
      },
      {
        username: "managercompany",
        password: hashedPasswords[1],
        employeeNumber: 1003,
      },
      {
        username: "leadercompany",
        password: hashedPasswords[2],
        employeeNumber: 1004,
      },
      {
        username: "staffcompany",
        password: hashedPasswords[3],
        employeeNumber: 1005,
      },
    ],
  });

  await prisma.productlines.createMany({
    data: [
      {
        productLine: "Planes",
        textDescription: "High-quality models of modern and historical planes",
        htmlDescription:
          "<strong>High-quality models of modern and historical planes</strong>",
        image: null,
      },
      {
        productLine: "Ships",
        textDescription: "Replicas of famous ships",
        htmlDescription: "<strong>Replicas of famous ships</strong>",
        image: null,
      },
      {
        productLine: "Trains",
        textDescription: "Model trains",
        htmlDescription: "<strong>Model trains</strong>",
        image: null,
      },
      {
        productLine: "Trucks and Buses",
        textDescription: "Replicas of trucks and buses",
        htmlDescription: "<strong>Replicas of trucks and buses</strong>",
        image: null,
      },
      {
        productLine: "Vintage Cars",
        textDescription: "Replicas of vintage cars",
        htmlDescription: "<strong>Replicas of vintage cars</strong>",
        image: null,
      },
      {
        productLine: "Classic Cars",
        textDescription: "Replicas of classic cars",
        htmlDescription: "<strong>Replicas of classic cars</strong>",
        image: null,
      },
      {
        productLine: "Motorcycles",
        textDescription: "Replicas of motorcycles",
        htmlDescription: "<strong>Replicas of motorcycles</strong>",
        image: null,
      },
    ],
  });

  await prisma.products.createMany({
    data: [
      {
        productCode: "S10_1678",
        productName: "1969 Harley Davidson Ultimate Chopper",
        productScale: "1:10",
        productVendor: "Min Lin Diecast",
        productDescription:
          "This replica features working kickstand, front suspension, gear-shift lever...",
        quantityInStock: 7933,
        buyPrice: 48.81,
        MSRP: 95.7,
        productLine: "Motorcycles",
      },
      {
        productCode: "S10_1949",
        productName: "1952 Alpine Renault 1300",
        productScale: "1:10",
        productVendor: "Classic Metal Creations",
        productDescription:
          "Turnable front wheels; steering function; detailed interior...",
        quantityInStock: 7305,
        buyPrice: 98.58,
        MSRP: 214.3,
        productLine: "Classic Cars",
      },
      {
        productCode: "S10_2016",
        productName: "1996 Moto Guzzi 1100i",
        productScale: "1:10",
        productVendor: "Highway 66 Mini Classics",
        productDescription:
          "Official Moto Guzzi logos and insignias, saddle bags located on side...",
        quantityInStock: 6625,
        buyPrice: 68.99,
        MSRP: 118.94,
        productLine: "Motorcycles",
      },
      {
        productCode: "S10_4698",
        productName: "2003 Harley-Davidson Eagle Drag Bike",
        productScale: "1:10",
        productVendor: "Red Start Diecast",
        productDescription:
          "Model features, official Harley Davidson logos and insignias...",
        quantityInStock: 5582,
        buyPrice: 91.02,
        MSRP: 193.66,
        productLine: "Ships",
      },
      {
        productCode: "S10_4757",
        productName: "1972 Alfa Romeo GTA",
        productScale: "1:10",
        productVendor: "Motor City Art Classics",
        productDescription:
          "Features include: Turnable front wheels; steering function; detailed interior...",
        quantityInStock: 3252,
        buyPrice: 85.68,
        MSRP: 136.0,
        productLine: "Classic Cars",
      },
    ],
  });

  await prisma.orders.createMany({
    data: [
      {
        orderNumber: 10100,
        orderDate: new Date("2024-01-12"),
        requiredDate: new Date("2024-01-19"),
        shippedDate: new Date("2024-01-13"),
        status: "Shipped",
        comments: "Order processed successfully.",
        customerNumber: 2001,
      },
      {
        orderNumber: 10101,
        orderDate: new Date("2024-01-13"),
        requiredDate: new Date("2024-01-20"),
        shippedDate: new Date("2024-01-14"),
        status: "Shipped",
        comments: "Urgent delivery.",
        customerNumber: 2002,
      },
      {
        orderNumber: 10102,
        orderDate: new Date("2024-01-14"),
        requiredDate: new Date("2024-01-21"),
        shippedDate: new Date("2024-01-15"),
        status: "Shipped",
        comments: "Order processed successfully.",
        customerNumber: 2003,
      },
      {
        orderNumber: 10103,
        orderDate: new Date("2024-01-15"),
        requiredDate: new Date("2024-01-22"),
        shippedDate: new Date("2024-01-16"),
        status: "Shipped",
        comments: "Order processed successfully.",
        customerNumber: 2006,
      },
    ],
  });

  await prisma.orderdetails.createMany({
    data: [
      {
        orderNumber: 10100,
        productCode: "S10_1678",
        quantityOrdered: 30,
        priceEach: 95.7,
        orderLineNumber: 1,
      },
      {
        orderNumber: 10101,
        productCode: "S10_1949",
        quantityOrdered: 15,
        priceEach: 214.3,
        orderLineNumber: 1,
      },
      {
        orderNumber: 10102,
        productCode: "S10_2016",
        quantityOrdered: 25,
        priceEach: 118.94,
        orderLineNumber: 1,
      },
      {
        orderNumber: 10103,
        productCode: "S10_4698",
        quantityOrdered: 20,
        priceEach: 193.66,
        orderLineNumber: 1,
      },
    ],
  });

  console.log(
    "Seed data inserted successfully with hashed passwords and default employees"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
