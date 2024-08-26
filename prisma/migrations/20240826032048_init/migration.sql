-- CreateTable
CREATE TABLE `customers` (
    `customerNumber` INTEGER NOT NULL,
    `customerName` VARCHAR(50) NULL,
    `contactLastName` VARCHAR(50) NULL,
    `contactFirstName` VARCHAR(50) NULL,
    `phone` VARCHAR(20) NULL,
    `addressLine1` VARCHAR(100) NULL,
    `addressLine2` VARCHAR(100) NULL,
    `city` VARCHAR(50) NULL,
    `state` VARCHAR(50) NULL,
    `postalCode` VARCHAR(15) NULL,
    `country` VARCHAR(50) NULL,
    `salesRepEmployeeNumber` INTEGER NULL,
    `creditLimit` DECIMAL(10, 2) NULL,

    INDEX `salesRepEmployeeNumber`(`salesRepEmployeeNumber`),
    PRIMARY KEY (`customerNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `employeeNumber` INTEGER NOT NULL,
    `lastName` VARCHAR(50) NULL,
    `firstName` VARCHAR(50) NULL,
    `extension` VARCHAR(10) NULL,
    `email` VARCHAR(100) NULL,
    `officeCode` VARCHAR(10) NULL,
    `reportsTo` INTEGER NULL,
    `jobTitle` VARCHAR(100) NULL,
    `role` INTEGER NULL,

    INDEX `fk_role`(`role`),
    INDEX `officeCode`(`officeCode`),
    PRIMARY KEY (`employeeNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offices` (
    `officeCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(50) NULL,
    `phone` VARCHAR(20) NULL,
    `addressLine1` VARCHAR(100) NULL,
    `addressLine2` VARCHAR(100) NULL,
    `state` VARCHAR(50) NULL,
    `country` VARCHAR(50) NULL,
    `postalCode` VARCHAR(15) NULL,
    `territory` VARCHAR(10) NULL,

    PRIMARY KEY (`officeCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `role`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `employeeNumber` INTEGER NULL,

    INDEX `employeeNumber`(`employeeNumber`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `productCode` VARCHAR(15) NOT NULL,
    `productName` VARCHAR(70) NOT NULL,
    `productScale` VARCHAR(10) NOT NULL,
    `productVendor` VARCHAR(50) NOT NULL,
    `productDescription` TEXT NOT NULL,
    `quantityInStock` INTEGER NOT NULL,
    `buyPrice` DECIMAL(10, 2) NOT NULL,
    `MSRP` DECIMAL(10, 2) NOT NULL,
    `productLine` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`productCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productlines` (
    `productLine` VARCHAR(50) NOT NULL,
    `textDescription` TEXT NOT NULL,
    `htmlDescription` TEXT NOT NULL,
    `image` TEXT NULL,

    PRIMARY KEY (`productLine`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderdetails` (
    `orderNumber` INTEGER NOT NULL,
    `productCode` VARCHAR(15) NOT NULL,
    `quantityOrdered` INTEGER NOT NULL,
    `priceEach` DECIMAL(10, 2) NOT NULL,
    `orderLineNumber` INTEGER NOT NULL,

    PRIMARY KEY (`orderNumber`, `productCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderNumber` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `requiredDate` DATETIME(3) NOT NULL,
    `shippedDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `comments` TEXT NOT NULL,
    `customerNumber` INTEGER NOT NULL,

    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees`(`employeeNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`officeCode`) REFERENCES `offices`(`officeCode`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `fk_role` FOREIGN KEY (`role`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employeeNumber`) REFERENCES `employees`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_productLine_fkey` FOREIGN KEY (`productLine`) REFERENCES `productlines`(`productLine`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderdetails` ADD CONSTRAINT `orderdetails_orderNumber_fkey` FOREIGN KEY (`orderNumber`) REFERENCES `orders`(`orderNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderdetails` ADD CONSTRAINT `orderdetails_productCode_fkey` FOREIGN KEY (`productCode`) REFERENCES `products`(`productCode`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_customerNumber_fkey` FOREIGN KEY (`customerNumber`) REFERENCES `customers`(`customerNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;
