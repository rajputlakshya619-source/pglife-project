USE pg_life;

CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(500) NOT NULL,
    city_id INT NOT NULL,
    gender ENUM('male','female','unisex') NOT NULL,
    rent INT NOT NULL,
    description TEXT,
    rating_clean DECIMAL(3,1) DEFAULT 0,
    rating_food DECIMAL(3,1) DEFAULT 0,
    rating_safety DECIMAL(3,1) DEFAULT 0,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    type ENUM('Building','Common Area','Bedroom','Washroom') NOT NULL
);

CREATE TABLE properties_amenities (
    property_id INT NOT NULL,
    amenity_id INT NOT NULL,
    PRIMARY KEY (property_id, amenity_id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    gender ENUM('male','female','other'),
    college_name VARCHAR(200)
);

CREATE TABLE interested_users_properties (
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Seed cities
INSERT INTO cities (name) VALUES ('Delhi'), ('Mumbai'), ('Bengaluru'), ('Hyderabad');

-- Seed amenities
INSERT INTO amenities (name, icon, type) VALUES
('Lift', 'lift', 'Building'),
('Power Backup', 'power_backup', 'Building'),
('Security', 'security', 'Building'),
('CCTV', 'cctv', 'Building'),
('Wi-Fi', 'wifi', 'Common Area'),
('TV', 'tv', 'Common Area'),
('Gym', 'gym', 'Common Area'),
('Laundry', 'laundry', 'Common Area'),
('AC', 'ac', 'Bedroom'),
('Geyser', 'geyser', 'Washroom'),
('Attached Washroom', 'attached_washroom', 'Washroom');

-- Seed properties (2 per city)
INSERT INTO properties (name, address, city_id, gender, rent, description, rating_clean, rating_food, rating_safety) VALUES
('Sunshine PG', '12 MG Road, Connaught Place, Delhi', 1, 'male', 8000, 'A comfortable PG in the heart of Delhi with all modern amenities. Located near metro station for easy commute.', 4.0, 3.5, 4.5),
('Green Valley PG', '45 Lajpat Nagar, Delhi', 1, 'female', 9000, 'Premium female PG with excellent food and safety. 24/7 security and CCTV surveillance.', 4.5, 4.5, 5.0),
('Sea Breeze PG', '7 Bandra West, Mumbai', 2, 'unisex', 12000, 'Modern PG near Bandra with sea view. Fully furnished rooms with AC and attached washroom.', 4.2, 4.0, 4.3),
('Colaba Comforts', '23 Colaba Causeway, Mumbai', 2, 'male', 11000, 'Well-maintained PG in South Mumbai. Close to CST station and major offices.', 3.8, 3.5, 4.0),
('Tech Park PG', '88 Koramangala, Bengaluru', 3, 'unisex', 10000, 'Perfect for IT professionals near Electronic City. High-speed Wi-Fi and power backup included.', 4.3, 4.0, 4.5),
('Garden City PG', '34 Indiranagar, Bengaluru', 3, 'female', 9500, 'Peaceful PG in Indiranagar with garden view. Homely food and great safety measures.', 4.6, 4.8, 4.7),
('Cyber Hub PG', '12 Madhapur, Hyderabad', 4, 'male', 8500, 'Located in HITEC City, ideal for software professionals. Walking distance to major tech parks.', 4.0, 3.8, 4.2),
('Pearl PG', '56 Banjara Hills, Hyderabad', 4, 'unisex', 11000, 'Luxury PG in the upscale Banjara Hills area. Premium amenities and excellent food.', 4.7, 4.6, 4.8);

-- Seed amenities for properties
INSERT INTO properties_amenities (property_id, amenity_id) VALUES
(1,1),(1,2),(1,3),(1,5),(1,9),
(2,1),(2,3),(2,4),(2,5),(2,10),(2,11),
(3,1),(3,2),(3,5),(3,9),(3,11),
(4,2),(4,3),(4,5),(4,10),
(5,1),(5,2),(5,5),(5,7),(5,9),
(6,1),(6,3),(6,4),(6,5),(6,10),(6,11),
(7,2),(7,3),(7,5),(7,9),
(8,1),(8,2),(8,3),(8,4),(8,5),(8,7),(8,9),(8,11);

-- Seed testimonials
INSERT INTO testimonials (property_id, user_name, content) VALUES
(1, 'Rahul Sharma', 'Great place to stay! Very clean and the staff is helpful. Would recommend to anyone coming to Delhi.'),
(1, 'Amit Kumar', 'Good PG with decent food. Metro connectivity is a big plus.'),
(2, 'Priya Singh', 'Best female PG in Delhi. Very safe and the food is just like home!'),
(3, 'Rohan Mehta', 'Loved my stay here. The sea breeze in the morning is amazing. Highly recommend!'),
(4, 'Karan Patel', 'Good location, close to everything. Rooms are clean and spacious.'),
(5, 'Sneha Reddy', 'Perfect for working professionals. Fast internet and power backup is always available.'),
(6, 'Ananya Rao', 'Felt like home away from home. The aunty cooks amazing food!'),
(7, 'Vikram Nair', 'Convenient location near my office. Good value for money.'),
(8, 'Pooja Gupta', 'Luxurious PG at a reasonable price. The gym facility is a bonus!');
