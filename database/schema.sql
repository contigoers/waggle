
DROP DATABASE IF EXISTS waggl;

CREATE DATABASE waggl;

USE waggl;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `org_id` INTEGER NULL DEFAULT NULL,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(30) NULL DEFAULT NULL,
  `state` VARCHAR(2) NULL DEFAULT NULL,
  `zipcode` INTEGER(5) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'adopters'
-- 
-- ---

DROP TABLE IF EXISTS `adopters`;
    
CREATE TABLE `adopters` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `pets` BOOLEAN DEFAULT FALSE,
  `house_type` ENUM('house', 'apartment', 'other') NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'orgs'
-- 
-- ---

DROP TABLE IF EXISTS `orgs`;
    
CREATE TABLE `orgs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `org_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---  
-- Table 'dogs'
--  
-- ---

DROP TABLE IF EXISTS `dogs`;
    
CREATE TABLE `dogs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL, -- string not null
  `breed` VARCHAR(50) NULL DEFAULT NULL, -- (primary breed) string (should be enum but we're not putting in ten million enum cases) ideally filtered search from file
  `mix` BOOLEAN DEFAULT FALSE, -- is mix 
  `male` BOOLEAN DEFAULT FALSE, -- enum m/f
  `size` ENUM('tiny', 'small', 'medium', 'large', 'huge') NULL DEFAULT NULL, -- enum tiny/small/medium/large/giant
  `aggressive` BOOLEAN DEFAULT FALSE, 
  `anxious` BOOLEAN DEFAULT FALSE,
  `lifestage` ENUM('puppy', 'adolescent', 'adult', 'senior') NULL DEFAULT NULL,
  `age` INTEGER(2) NULL DEFAULT NULL, -- optional integer input
  `fixed` BOOLEAN DEFAULT FALSE, -- boolean
  `diet` BOOLEAN DEFAULT FALSE, -- boolean for dietary needs
  `medical` BOOLEAN DEFAULT FALSE, -- boolean for medical needs
  `energy_level` ENUM('low', 'medium', 'high') NULL DEFAULT NULL, -- enum low/medium/high
  `photo` VARCHAR(150) NULL DEFAULT NULL, -- string input
  `description` VARCHAR(500) NULL DEFAULT NULL, -- text (string)
  `adopted` BOOLEAN DEFAULT FALSE,
  `org_id` INTEGER NOT NULL, -- foreign key integer
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'favoritedogs'
-- 
-- ---

DROP TABLE IF EXISTS `favoritedogs`;
    
CREATE TABLE `favoritedogs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `adopter_id` INTEGER NOT NULL,
  `dog_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `adopters` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `dogs` ADD FOREIGN KEY (org_id) REFERENCES `orgs` (`id`);
ALTER TABLE `favoritedogs` ADD FOREIGN KEY (adopter_id) REFERENCES `adopters` (`id`);
ALTER TABLE `favoritedogs` ADD FOREIGN KEY (dog_id) REFERENCES `dogs` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (org_id) REFERENCES `orgs` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `adopters` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `dogs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `orgs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `breed` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `favoritedogs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `orgs` (`id`,`org_name`) VALUES
(1,'DEFAULT - FOR ADOPTERS'),
(2,'Small Chance Rescue'),
(3,'Austin Pets Alive');

INSERT INTO `users` (`id`,`username`,`password`,`email`,`org_id`,`address`,`city`, `state`,`zipcode`,`phone`) VALUES
(1,'orgUser','$2a$10$3X/MZGAsXR1pfIkINcR0Oetim9bDgH8vffVpGmUnhp/SMv4mF3176','info@smallchancerescue.com',2,'P.O. Box 10033','Austin','TX',78766,'512-699-7244'),
(2,'kmehta903','$2a$10$d/sLZ881Y6r.Rl9LsGaINeG4oQKTY2k0dRtdHBid0Ftg4jxuGkiS2','krisha@adopter.com',1,'123 Drury Lane','Austin','TX',78750,'123-456-7890'),
(3,'orgUser3','$2a$10$FoEW9qqOBwe4l3sOQbG1Re3AzT0Hnqlp6FPIQgx13CZtzU07/FSzS','adopt@austinpetsalive.org',3,'1156 West Cesar Chavez','Austin','TX',78704,'512-961-6519');

INSERT INTO `adopters` (`id`,`user_id`,`name`,`pets`,`house_type`) VALUES
(1,2,'Krisha Mehta',true,'house');

INSERT INTO `dogs` (`name`,`breed`,`mix`,`male`,`size`,`aggressive`,`anxious`,`lifestage`,`age`,`fixed`,`diet`,`medical`,`energy_level`,`photo`,`description`,`adopted`,`org_id`) VALUES
('Sammy','Black Labrador Retriever',true,true,'medium',true,false,'adult',3,true,false,false,'medium',NULL,'Best dog ever! Has some aggression issues with other dogs but loves people', true,2),
('Charles Jr','Corgi',false,false,'small',false,false,'puppy',1,false,true,false,'high','http://imgur.com/JBFlsJK.jpg','Adorable corgi puppy! Has to have a special diet for now but very healthy and friendly!',false,3),
('Sparky','Golden Retriever',false,true,'large',false,true,'senior',9,true,false,true,'low','http://imgur.com/BuhZN1l.jpg','Very sweet dog but has some medical issues and needs due to senior age',false,3);
('Oscar', 'Ibizan Hound', false, true, 'small', true, true, 'adult', 4, false, true, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Oreo', 'German Shorthaired Pointer', false, true, 'medium', true, false, 'puppy', 12, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 4);
('Piper', 'Xoloitzcuintle / Mexican Hairless', false, false, 'small', false, true, 'adult', 14, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 9);
('Maverick', 'Italian Spinone', false, true, 'small', false, true, 'senior', 7, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 3);
('Gracie', 'Chesapeake Bay Retriever', true, false, 'medium', false, true, 'adolescent', 5, false, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 8);
('Cash', 'Afghan Hound', true, true, 'tiny', true, true, 'puppy', 13, true, true, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 3);
('Rudy', 'Norwegian Buhund', false, false, 'large', false, true, 'adolescent', 6, false, false, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Mia', 'Norwegian Lundehund', true, false, 'large', true, true, 'puppy', 10, false, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Otis', 'English Toy Spaniel', true, false, 'tiny', true, true, 'puppy', 12, false, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 7);
('Apollo', 'Scottish Terrier Scottie', true, false, 'small', true, false, 'puppy', 14, true, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 4);
('Leo', 'Sussex Spaniel', true, true, 'small', true, false, 'adult', 5, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Chewy', 'Blue Lacy', true, false, 'large', false, false, 'adult', 5, false, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 4);
('Jake', 'Australian Kelpie', false, false, 'large', true, false, 'adult', 11, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Millie', 'Rough Collie', true, true, 'tiny', true, false, 'adult', 14, true, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 1);
('Jackson', 'Icelandic Sheepdog', true, true, 'small', true, false, 'puppy', 2, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Rusty', 'Entlebucher', false, false, 'huge', false, true, 'adult', 9, true, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 2);
('Rusty', 'Rat Terrier', false, true, 'small', true, false, 'adult', 13, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 4);
('Roscoe', 'Jack Russell Terrier', true, true, 'medium', false, false, 'senior', 9, true, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 6);
('Teddy', 'Spaniel', false, true, 'large', false, true, 'puppy', 14, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 6);
('Lexi', 'Great Pyrenees', false, true, 'small', true, false, 'senior', 10, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 4);
('Dexter', 'Galgo Spanish Greyhound', false, true, 'tiny', false, false, 'puppy', 10, false, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 4);
('Lexi', 'Papillon', false, true, 'huge', false, true, 'adult', 9, true, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Winston', 'Wheaten Terrier', false, false, 'medium', false, false, 'adult', 11, false, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Kona', 'Terrier', false, true, 'medium', true, true, 'senior', 14, true, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Oscar', 'American Eskimo Dog', true, true, 'small', false, true, 'adolescent', 12, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Daisy', 'Shiba Inu', false, true, 'small', true, false, 'adolescent', 7, true, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 2);
('Ella', 'Dogue de Bordeaux', false, true, 'small', false, true, 'adult', 2, true, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 1);
('Sam', 'Norwegian Elkhound', false, true, 'small', false, true, 'adolescent', 3, false, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Harley', 'Greater Swiss Mountain Dog', true, false, 'small', true, false, 'puppy', 6, false, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Oscar', 'English Springer Spaniel', true, true, 'huge', true, false, 'puppy', 13, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 2);
('Honey', 'Australian Shepherd', true, true, 'small', true, true, 'adolescent', 3, true, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Moose', 'Catahoula Leopard Dog', true, true, 'tiny', true, false, 'adult', 10, false, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 5);
('Ginger', 'Coton de Tulear', true, false, 'large', true, false, 'senior', 5, false, false, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 3);
('Copper', 'Kuvasz', false, true, 'medium', false, false, 'adult', 2, false, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Bubba', 'Chesapeake Bay Retriever', false, false, 'huge', true, true, 'adolescent', 14, false, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Peanut', 'Chihuahua', false, true, 'large', false, true, 'puppy', 8, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Lulu', 'Lancashire Heeler', true, false, 'small', true, true, 'puppy', 13, false, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 8);
('Cooper', 'Belgian Shepherd / Malinois', false, true, 'tiny', true, true, 'adolescent', 9, true, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 9);
('Rudy', 'Field Spaniel', false, false, 'medium', true, false, 'senior', 5, true, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 10);
('Simba', 'Tibetan Terrier', false, true, 'large', true, true, 'adolescent', 2, false, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 10);
('Marley', 'English Cocker Spaniel', true, false, 'medium', true, false, 'adolescent', 5, true, false, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 8);
('Oliver', 'Field Spaniel', true, false, 'medium', true, false, 'puppy', 5, true, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 1);
('Chester', 'Pit Bull Terrier', true, false, 'small', false, false, 'adult', 9, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Brody', 'West Highland White Terrier Westie', false, true, 'huge', true, true, 'adult', 5, false, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Lulu', 'Bluetick Coonhound', false, true, 'huge', true, false, 'senior', 14, false, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Harley', 'Bouvier des Flanders', false, true, 'huge', false, false, 'adolescent', 5, false, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 10);
('Henry', 'Afghan Hound', true, true, 'small', false, false, 'adolescent', 14, true, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Lexi', 'Wheaten Terrier', true, false, 'medium', true, true, 'adolescent', 6, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Tyson', 'Bichon Frise', false, true, 'huge', true, true, 'adolescent', 13, true, false, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 10);
('Chewy', 'Boxer', true, true, 'huge', false, true, 'adolescent', 13, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 1);
('Tucker', 'Australian Terrier', false, false, 'large', true, true, 'adult', 8, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Bailey', 'Bolognese', true, true, 'huge', true, true, 'puppy', 3, true, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Sophie', 'Cairn Terrier', false, false, 'tiny', true, true, 'adolescent', 8, false, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Tank', 'Cairn Terrier', false, true, 'small', true, true, 'puppy', 2, true, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Boomer', 'Fila Brasileiro', false, false, 'medium', true, true, 'puppy', 6, true, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 3);
('Diesel', 'Spaniel', false, true, 'small', false, false, 'puppy', 10, false, true, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 6);
('Buddy', 'Great Pyrenees', true, true, 'tiny', true, false, 'adult', 1, false, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Bruno', 'Akbash', true, true, 'medium', true, true, 'adolescent', 3, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Frankie', 'Caucasian Sheepdog / Caucasian Ovtcharka', true, true, 'medium', true, true, 'senior', 5, true, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Oliver', 'Ibizan Hound', true, true, 'huge', false, true, 'puppy', 4, true, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Annie', 'Pointer', true, false, 'small', false, false, 'puppy', 1, false, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Bailey', 'Airedale Terrier', false, true, 'large', false, true, 'adolescent', 13, false, false, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 9);
('Duke', 'Pit Bull Terrier', true, true, 'large', true, true, 'adult', 15, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 2);
('Rex', 'Sheep Dog', true, false, 'tiny', true, true, 'senior', 11, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 1);
('Ruby', 'Whippet', true, true, 'large', false, false, 'puppy', 12, false, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 4);
('Lucky', 'Keeshond', true, false, 'tiny', true, true, 'puppy', 12, true, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('King', 'Bernese Mountain Dog', true, false, 'small', false, false, 'adult', 14, true, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 7);
('Maverick', 'Kerry Blue Terrier', true, true, 'medium', true, true, 'puppy', 5, true, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Copper', 'Xoloitzcuintle / Mexican Hairless', false, false, 'huge', false, true, 'senior', 6, false, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 3);
('Rufus', 'Tosa Inu', true, false, 'medium', false, true, 'adolescent', 4, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 8);
('Rusty', 'Scottish Deerhound', true, true, 'tiny', false, true, 'adult', 15, true, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 3);
('Rosie', 'Sloughi', true, true, 'tiny', false, false, 'adolescent', 10, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 5);
('Rusty', 'Manchester Terrier', false, true, 'large', false, false, 'adolescent', 1, true, false, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Winston', 'Sheep Dog', false, true, 'small', true, false, 'puppy', 8, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 8);
('Teddy', 'Pekingese', true, false, 'large', false, false, 'adolescent', 3, true, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Jack', 'Entlebucher', false, false, 'small', true, false, 'senior', 12, false, true, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 5);
('Marley', 'Afghan Hound', true, false, 'small', true, true, 'puppy', 9, true, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 6);
('Sadie', 'White German Shepherd', true, false, 'medium', true, true, 'adult', 1, false, false, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Henry', 'Akita', false, false, 'medium', false, true, 'adolescent', 15, true, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 3);
('Tank', 'Ibizan Hound', false, true, 'tiny', true, false, 'senior', 9, true, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 9);
('Apollo', 'Corgi', true, true, 'large', true, true, 'adolescent', 13, false, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 3);
('Sadie', 'English Cocker Spaniel', false, false, 'tiny', true, false, 'adolescent', 1, false, false, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Molly', 'Feist', false, false, 'small', false, false, 'puppy', 2, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 10);
('Buddy', 'American Water Spaniel', true, true, 'medium', true, true, 'puppy', 9, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 1);
('Benny', 'Great Dane', false, true, 'large', false, false, 'puppy', 6, false, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 10);
('Riley', 'Cocker Spaniel', true, false, 'tiny', true, true, 'senior', 8, false, false, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 7);
('Shadow', 'Wirehaired Pointing Griffon', false, false, 'huge', false, false, 'senior', 3, true, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 6);
('Henry', 'Shepherd', true, false, 'tiny', false, false, 'adolescent', 4, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 2);
('Toby', 'Thai Ridgeback', true, true, 'medium', false, false, 'puppy', 4, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 9);
('Buster', 'Spanish Water Dog', true, false, 'large', true, true, 'senior', 10, false, true, true, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 2);
('Annie', 'Shiba Inu', true, false, 'huge', true, false, 'puppy', 14, false, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 3);
('Milo', 'Norwegian Elkhound', false, false, 'tiny', false, true, 'puppy', 13, true, true, true, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 5);
('Milo', 'Havanese', true, true, 'medium', false, false, 'senior', 9, false, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', true, 7);
('Bandit', 'Giant Schnauzer', false, true, 'tiny', true, true, 'puppy', 9, true, true, true, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 5);
('Gizmo', 'Great Dane', true, true, 'tiny', true, true, 'adolescent', 15, true, true, false, 'low', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 8);
('Buster', 'Standard Schnauzer', true, true, 'small', true, true, 'senior', 5, true, false, false, 'high', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 4);
('Toby', 'Havanese', true, false, 'tiny', false, true, 'puppy', 11, true, true, false, 'medium', 'INSERT_URL_HERE', 'INSERT_DESCRIPTION_HERE', false, 3);



-- INSERT INTO `favoritedogs` (`id`,`user_id`,`dog_id`) VALUES
-- ('','','');



