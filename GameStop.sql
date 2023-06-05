-- Create a database named GameStopRetail to hold tables
CREATE DATABASE GameStopRetail;

-- Switch to using new database
USE GameStopRetail;

-- Create a table to store customer information
CREATE TABLE Customer (
    ID INT PRIMARY KEY, -- Unique identifier for each customer
    FirstName VARCHAR(255) NOT NULL, -- First name of the customer (required)
    LastName VARCHAR(255) NOT NULL, -- Last name of the customer (required)
    Birthday DATE NOT NULL, -- Date of birth of the customer (required)
    HasMembership BOOLEAN NOT NULL, -- Indicates if the customer has a membership or not (required)
    CreatedAt DATETIME NOT NULL, -- Date and time when the customer record was created (required)
    ModifiedAt DATETIME NOT NULL -- Date and time when the customer record was last modified (required)
);

-- Create a table to store customer address information
CREATE TABLE CustomerAddress (
    ID INT PRIMARY KEY, -- Unique identifier for each customer address
    CustomerId INT NOT NULL, -- ID of the customer associated with this address (required)
    Address1 VARCHAR(255) NOT NULL, -- First line of the address (required)
    Address2 VARCHAR(255), -- Second line of the address (optional)
    City VARCHAR(255) NOT NULL, -- City of the address (required)
    State CHAR(2) NOT NULL, -- State of the address (required)
    ZipCode CHAR(5) NOT NULL, -- Zip code of the address (required)
    Country VARCHAR(255) NOT NULL, -- Country of the address (required)
    Email VARCHAR(255), -- Email address of the customer (optional)
    PhoneNumber VARCHAR(15), -- Phone number of the customer (optional)
    FOREIGN KEY (CustomerId) REFERENCES Customer(ID) -- A foreign key constraint to link each address to a customer record
);

-- Create a table to store customer payment information
CREATE TABLE CustomerPayment (
    ID INT PRIMARY KEY, -- Unique identifier for each payment method
    CustomerId INT NOT NULL, -- ID of the customer associated with this payment method (required)
    PaymentType ENUM('credit', 'debit', 'paypal', 'others') NOT NULL, -- Type of the payment method (required)
    Provider VARCHAR(255), -- Name of the payment provider (optional)
    AccountNo INT, -- Account number associated with the payment method (optional)
    Expiry DATE, -- Expiration date of the payment method (optional)
    FOREIGN KEY (CustomerId) REFERENCES Customer(ID) -- A foreign key constraint to link each payment method to a customer record
);

-- Create a table to store product information
CREATE TABLE Product (
    ID INT PRIMARY KEY, -- Unique identifier for each product
    Name VARCHAR(255) NOT NULL, -- Name of the product (required)
    Description TEXT NOT NULL, -- Description of the product (required)
    Used BOOLEAN NOT NULL, -- Indicates if the product is new or used (required)
    SKU VARCHAR(255) NOT NULL, -- Stock-keeping unit of the product (required)
    Price DECIMAL(10, 2) NOT NULL, -- Price of the product (required)
    Inventory INT NOT NULL, -- Quantity of the product in stock (required)
    DiscountID INT, -- ID of the discount associated with the product (optional)
    CreatedAt DATETIME NOT NULL, -- Date and time when the product record was created (required)
    ModifiedAt DATETIME, -- Date and time when the product record was last modified
    DeletedAt DATETIME, -- Date and time when the product record was deleted (optional)
    FOREIGN KEY (DiscountID) REFERENCES Discount(ID) -- A foreign key constraint to link each product to a discount record
);

-- This table stores information about discounts that can be applied to orders.
CREATE TABLE Discount (
ID INT PRIMARY KEY, -- The unique ID of the discount.
Name VARCHAR(255) NOT NULL, -- The name of the discount.
DiscountType ENUM('percentage', 'fixed', 'bogo') NOT NULL, -- The type of the discount.
DiscountValue DECIMAL NOT NULL, -- The value of the discount.
IsActive BOOLEAN NOT NULL, -- Whether the discount is currently active or not.
CreatedAt DATETIME NOT NULL, -- The date and time the discount was created.
DeletedAt DATETIME -- The date and time the discount was deleted (if applicable).
);

-- This table stores information about the details of an order.
CREATE TABLE "Order" (
ID INT PRIMARY KEY, -- The unique ID of the order.
CustomerID INT NOT NULL, -- The ID of the customer who placed the order.
Total DECIMAL(12, 2) NOT NULL, -- The total amount of the order.
TaxRate DECIMAL(5,1) NOT NULL, -- The tax rate for the order.
CreatedAt DATETIME NOT NULL, -- The date and time the order was created.
FOREIGN KEY (CustomerID) REFERENCES Customer(ID) -- A foreign key constraint linking to the Customer table.
);

-- This table stores information about the items in an order.
CREATE TABLE OrderItem (
ID INT PRIMARY KEY, -- The unique ID of the order item.
OrderID INT NOT NULL, -- The ID of the order the item belongs to.
ProductID INT NOT NULL, -- The ID of the product in the order item.
Quantity INT NOT NULL, -- The quantity of the product in the order item.
FOREIGN KEY (OrderID) REFERENCES Order(ID), -- A foreign key constraint linking to the Order table.
FOREIGN KEY (ProductID) REFERENCES Product(ID) -- A foreign key constraint linking to the Product table.

INSERT INTO Customer (ID, FirstName, LastName, Birthday, HasMembership, CreatedAt, ModifiedAt)
VALUES (1, 'John', 'Doe', '1990-01-01', 1, '2022-01-01 00:00:00', '2022-01-01 00:00:00'),
       (2, 'Jane', 'Doe', '1995-05-05', 0, '2022-02-01 00:00:00', '2022-02-01 00:00:00');



-- Insert 10 records into the Customer table with names, birthdays, and membership statuses
INSERT INTO Customer (ID, FirstName, LastName, Birthday, HasMembership, CreatedAt, ModifiedAt)
VALUES 
(1, 'Mohammed', 'Ali', '1985-06-15', 1, '2022-05-01 12:30:00', '2022-05-01 12:30:00'),
(2, 'Yusra', 'Ahmed', '1999-11-03', 0, '2022-05-01 10:45:00', '2022-05-01 10:45:00'),
(3, 'Juan', 'Garcia', '1992-02-24', 1, '2022-05-01 15:20:00', '2022-05-01 15:20:00'),
(4, 'Jasmine', 'Kim', '1988-08-12', 1, '2022-05-01 16:50:00', '2022-05-01 16:50:00'),
(5, 'Sana', 'Khan', '1994-01-22', 0, '2022-05-01 09:15:00', '2022-05-01 09:15:00'),
(6, 'Gabriela', 'Lopez', '1997-03-10', 1, '2022-05-01 14:25:00', '2022-05-01 14:25:00'),
(7, 'Makoto', 'Nakamura', '2001-07-05', 0, '2022-05-01 13:00:00', '2022-05-01 13:00:00'),
(8, 'Aisha', 'Omar', '1986-12-08', 1, '2022-05-01 11:10:00', '2022-05-01 11:10:00'),
(9, 'Maria', 'Ramirez', '1993-05-18', 0, '2022-05-01 17:35:00', '2022-05-01 17:35:00'),
(10, 'Saeed', 'Saeedi', '1983-09-01', 1, '2022-05-01 08:20:00', '2022-05-01 08:20:00');

-- Delete the record with ID 5 from the Customer table
DELETE FROM Customer WHERE ID = 5;

-- Update the record with ID 7 in the Customer table to have a HasMembership value of 1
UPDATE Customer SET HasMembership = 1 WHERE ID = 7;

INSERT INTO CustomerAddress (ID, CustomerId, Address1, Address2, City, State, ZipCode, Country, Email, PhoneNumber)
VALUES 
(1, 1, '123 Main St', '', 'Los Angeles', 'CA', '90001', 'USA', 'mohammed.ali@example.com', '+1-323-555-1234'),
(2, 2, '456 Elm St', 'Apt 2B', 'New York', 'NY', '10001', 'USA', 'yusra.ahmed@example.com', '+1-212-555-5678'),
(3, 3, '789 Oak Ave', '', 'San Francisco', 'CA', '94101', 'USA', 'juan.garcia@example.com', '+1-415-555-9012'),
(4, 4, '10 Maple Ln', '', 'Seattle', 'WA', '98101', 'USA', 'jasmine.kim@example.com', '+1-206-555-3456'),
(5, 5, '1234 Pine St', 'Unit 5', 'Denver', 'CO', '80202', 'USA', 'sana.khan@example.com', '+1-303-555-7890'),
(6, 6, '5678 Spruce St', '', 'Miami', 'FL', '33101', 'USA', 'gabriela.lopez@example.com', '+1-305-555-1234'),
(7, 7, '910 Elm St', 'Apt 3C', 'Honolulu', 'HI', '96813', 'USA', 'makoto.nakamura@example.com', '+1-808-555-6789'),
(8, 8, '111 Maple Ave', '', 'Chicago', 'IL', '60601', 'USA', 'aisha.omar@example.com', '+1-312-555-1234'),
(9, 9, '1212 Oak St', 'Unit 7', 'Houston', 'TX', '77002', 'USA', 'maria.ramirez@example.com', '+1-713-555-5678'),
(10, 10, '1313 Cedar Ave', '', 'San Diego', 'CA', '92101', 'USA', 'saeed.saeedi@example.com', '+1-619-555-9012');

INSERT INTO CustomerPayment (ID, CustomerId, PaymentType, Provider, AccountNo, Expiry)
VALUES 
(1, 1, 'credit', 'Visa', 1234567890123456, '2024-12-31'),
(2, 2, 'debit', 'Mastercard', 9876543210987654, '2025-06-30'),
(3, 3, 'paypal', 'PayPal', NULL, NULL),
(4, 4, 'others', 'Venmo', NULL, NULL),
(5, 5, 'credit', 'American Express', 1111222233334444, '2026-03-31'),
(6, 6, 'debit', 'Discover', 5555666677778888, '2023-09-30'),
(7, 7, 'credit', 'Capital One', 9999888877776666, '2027-01-31'),
(8, 8, 'paypal', 'PayPal', NULL, NULL),
(9, 9, 'debit', 'Chase', 4444333322221111, '2022-12-31'),
(10, 10, 'others', 'Zelle', NULL, NULL);

INSERT INTO Product (ID, Name, Description, Used, UPC, Price, Inventory, DiscountID, CreatedAt, ModifiedAt)
VALUES
(1, 'Sony PlayStation 5 Console', 'Step up your gaming experience with the PlayStation 5. Enjoy lightning-fast loading on your PS5 console with an ultra-high speed SSD, deep immersion with haptic feedback, adaptive triggers, and 3D audio. ', 0, '711719541028', 459.99, 3285, NULL, '2020-11-12 12:30:00', NULL),
(2, 'Microsoft Xbox Series S', 'Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X. Explore rich new worlds and enjoy the action like never before with the unmatched 12 teraflops of raw graphic processing power. Enjoy 4K gaming at up to 120 frames per second, advanced 3D spatial sound, and more.', 0, '889842651317', 459.99, 6393, NULL, '2020-11-10 10:00:00', NULL),
(3, 'Nintendo Switch OLED', 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch™ system (OLED model). ', 1, '045496883386', 319.99, 2, NULL, '2021-10-08 09:45:00', NULL),
(4, 'Hogwarts Legacy - Xbox Series S', 'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. For the first time, experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Now you can take control of the action and be at the center of your own adventure in the wizarding world. Your legacy is what you make of it. Live the unwritten.', 0, '883929730704', 64.99, 5000, 6, '2022-05-03 00:00:00', NULL),
(5, 'PDP Wired Controller for Xbox Series X/S, Xbox One, and Windows 10/11', 'Stealth Mode: Activated. Conceal your moves and crush the competition with the PDP Gaming Wired Controller for Xbox! With a sleek camouflage design, your enemies will never see you coming.', 0, '708056067663', 34.99, 125, NULL, '2021-04-14 16:00:00', NULL),
(6, 'Grand Theft Auto V - PlayStation 5', 'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody — least of all each other.', 1, '710425578649', 18.99, 80, 4, '2013-09-17 00:00:00', NULL),
(7, 'Star Wars Jedi: Fallen Order - PlayStation 5', 'On a quest to rebuild the Jedi Order, you must pick up the pieces of your shattered past to complete your training, develop new powerful Force abilities, and master the art of the iconic lightsaber - all while staying one step ahead of the Empire and its deadly Inquisitors.', 0, '14633742473', 29.99, 2000, NULL, '2019-11-15 13:30:00', NULL),
(8, 'LEGO Star Wars: The Skywalker Saga - Nintendo Switch', 'Conquer the galaxy in LEGO® Star Wars: The Skywalker Saga on Nintendo Switch. Play through all nine Star Wars saga films in a brand-new LEGO video game unlike any other. Experience fun-filled adventures, whimsical humor, and the freedom to fully immerse yourself in the LEGO Star Wars universe like never before.', 0, '883929695157', 44.99, 1, 2, '2022-04-05 00:45:00', NULL),
(9, 'Astro Gaming A10 Gen 2 Wired Headset for PlayStation 5, Xbox Series X/S, and PC', 'Enhance your everyday gaming setup with the ASTRO A10 Headset. Experience explosive audio thanks to 32mm dynamic drivers, flip-to-mute boom mic, and durable construction with replaceable ear cushions and headband pad combine for an unforgettable audio experience.', 0, '097855172532', 59.99, 10, 5, '2022-03-14 10:20:00', NULL),
(10, 'SteelSeries Arctis 7 Wireless Gaming Headset', 'A high-quality wireless gaming headset with clear audio and long battery life', 0, 'ARCTIS7-001', 79.99, 100, NULL, '2022-04-18 10:20:00', NULL)

INSERT INTO Discount (ID, Name, DiscountType, DiscountValue, IsActive, CreatedAt, DeletedAt)
VALUES
(1, 'Summer Sale', 'percentage', 0.15, false, '2022-06-01 00:00:00', '2022-08-31 23:59:59'),
(2, 'Sale 20 Discount', 'fixed', 20.00, true, '2023-04-25 00:00:00', NULL),
(3, 'Buy One Get One Free', 'bogo', 1, false, '2023-03-01 10:00:00', '2023-04-01 10:00:00'),
(4, 'Clearance', 'percentage', 0.30, true, '2023-05-01 12:00:00', NULL),
(5, 'Sale 10 Discount', 'fixed', 10.00, true, '2023-04-01 09:00:00', NULL),
(6, 'Sale 5 Discount', 'fixed', 10.00, true, '2023-05-01 09:00:00', NULL),
(7, 'Back to School Sale', 'fixed', 15.00, true, '2023-08-01 10:00:00', NULL),
(8, 'Black Friday Sale', 'percentage', 0.30, false, '2023-11-24 00:00:00', NULL),
(9, 'Winter Clearance', 'fixed', 20.00, false, '2023-12-01 12:00:00', NULL),
(10, 'Spring Fling', 'percentage', 0.10, false, '2024-03-01 09:00:00', NULL);

-- Insert 10 records into the Order table
INSERT INTO "Order" (ID, CustomerID, Total, TaxRate, CreatedAt)
VALUES
(1, 2, 459.99, 4.0, '2023-03-03 10:30:00'),
(2, 2, 319.99, 4.0, '2023-03-03 10:30:00'),
(3, 4, 459.99, 10.25, '2023-04-01 11:15:00'),
(4, 3, 34.99, 8.63, '2023-04-10 09:45:00'),
(5, 3, 459.99,  8.63, '2023-04-10 09:45:00'),
(6, 3, 64.99,  8.63, '2023-04-10 09:45:00'),
(7, 6, 319.99, 7.0, '2023-04-27 13:00:00'),
(8, 8, 459.99, 10.25, '2023-04-28 10:45:00'),
(9, 10, 79.99, 7.75, '2023-04-29 09:00:00'),
(10, 10, 459.99, 7.75, '2023-04-29 09:00:00');

-- OrderItem table records
INSERT INTO OrderItem (ID, OrderID, ProductID, Quantity)
VALUES 
(1, 1, 1, 1),
(2, 2, 3, 1),
(3, 3, 2, 1),
(4, 4, 5, 1),
(5, 5, 2, 1),
(6, 6, 4, 1),
(7, 7, 3, 1),
(8, 8, 1, 1),
(9, 9, 10, 1),
(10, 10, 2, 1);

-- Get the latest order ID and CreatedAt date and store as variables @latestOrderID, @latestOrderDate
SELECT ID, CreatedAt INTO @latestOrderID, @latestOrderDate
FROM "Order"
ORDER BY CreatedAt DESC
LIMIT 1;
-- Selects the product ID and quantity from the OrderItem table, where the OrderID matches the value of the variable @latestOrderID.
SELECT ProductID, Quantity INTO @latestOrderProductID, @latestOrderQuantity
FROM OrderItem
WHERE OrderID = @latestOrderID;

-- Update Product with changes to ModifiedAt and Inventory due to last order in Order and OrderItem
UPDATE Product 
SET ModifiedAt = @latestOrderDate, 
    Inventory = Inventory - @latestOrderQuantity
WHERE ProductID = @latestOrderProductID;


-- Select the CustomerID and count the number of distinct OrderIDs associated with each customer.
-- Alias the count column as 'TotalOrders'
SELECT CustomerID, COUNT(DISTINCT OrderID) AS TotalOrders
FROM Order
-- Group the results by CustomerID
GROUP BY CustomerID;


-- Selects the ProductID and the sum of the Quantity for each product from the OrderItem table.
SELECT ProductID, SUM(Quantity) AS TotalOrders
FROM OrderItem
-- Groups the result by ProductID 
GROUP BY ProductID;



-- Declare a variable with the desired customer ID
DECLARE @customerID INT = 3;

-- First, delete all order items related to the customer's orders
DELETE FROM OrderItem
WHERE OrderID IN (
SELECT ID FROM "Order"
WHERE CustomerID = @customerID
);

-- Next, delete all orders related to the customer
DELETE FROM "Order"
WHERE CustomerID = @customerID;

-- Finally, delete the customer
DELETE FROM Customer
WHERE ID = @customerID;

-- Get productID, product name, and maximum price of the Product table
SELECT ProductID, Name, MAX(Price) AS MaxPrice
FROM Product;
-- Get productID, product name, and minimum CreatedAt date of the Product table
SELECT ProductID, Name, MIN(CreatedAt) AS EarliestCreationDate
FROM Product;



