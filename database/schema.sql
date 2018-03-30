
DROP DATABASE IF EXISTS waggl;

CREATE DATABASE waggl;

USE waggl;
-- mysql -u root -p < ./database/schema.sql
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
  `photo` VARCHAR(150) NOT NULL DEFAULT "http://i65.tinypic.com/5v26ns.jpg", -- string input
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
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `sender_id` INTEGER NOT NULL,
  `recipient_id` INTEGER NOT NULL,
  `message` VARCHAR(1000) NOT NULL,
  `deleted` BOOLEAN NOT NULL DEFAULT 0,
  `sent` TIMESTAMP NOT NULL DEFAULT NOW(),
  `dogName` VARCHAR(50) NULL DEFAULT NULL,
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
ALTER TABLE `messages` ADD FOREIGN KEY (sender_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (recipient_id) REFERENCES `users` (`id`);

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
(1,'orgUser','$2a$10$3X/MZGAsXR1pfIkINcR0Oetim9bDgH8vffVpGmUnhp/SMv4mF3176','info@smallchancerescue.com',2,'P.O. Box 10033','Austin','TX',78766,'5126997244'),
(2,'kmehta903','$2a$10$d/sLZ881Y6r.Rl9LsGaINeG4oQKTY2k0dRtdHBid0Ftg4jxuGkiS2','krisha@adopter.com',1,'123 Drury Lane','Austin','TX',78750,'1234567890'),
(3,'orgUser3','$2a$10$FoEW9qqOBwe4l3sOQbG1Re3AzT0Hnqlp6FPIQgx13CZtzU07/FSzS','adopt@austinpetsalive.org',3,'1156 West Cesar Chavez','Austin','TX',78704,'5129616519');

INSERT INTO `adopters` (`id`,`user_id`,`name`,`pets`,`house_type`) VALUES
(1,2,'Krisha Mehta',true,'house');

INSERT INTO `dogs` (`name`,`breed`,`mix`,`male`,`size`,`aggressive`,`anxious`,`lifestage`,`age`,`fixed`,`diet`,`medical`,`energy_level`,`photo`,`description`,`adopted`,`org_id`) VALUES
('Sammy','Black Labrador Retriever',true,true,'medium',true,false,'adult',3,true,false,false,'medium',NULL,'Best dog ever! Has some aggression issues with other dogs but loves people', true,2),
('Charles Jr','Corgi',false,false,'small',false,false,'puppy',1,false,true,false,'high','http://imgur.com/JBFlsJK.jpg','Adorable corgi puppy! Has to have a special diet for now but very healthy and friendly!',false,3),
('Dixie', 'Akbash', false, true, 'medium', true, true, 'puppy', 14, true, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Luna', 'Feist', false, true, 'large', true, false, 'senior', 4, true, true, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Jake', 'Cavalier King Charles Spaniel', true, true, 'large', true, false, 'adult', 14, false, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Rocco', 'Lancashire Heeler', false, false, 'medium', true, false, 'puppy', 8, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Chewy', 'Finnish Lapphund', true, false, 'large', true, true, 'adolescent', 15, true, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Jasper', 'Pumi', true, true, 'small', true, true, 'adult', 9, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Ziggy', 'Black and Tan Coonhound', false, true, 'medium', false, true, 'puppy', 4, true, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Thor', 'Basset Hound', false, false, 'tiny', true, true, 'senior', 4, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Beau', 'Ibizan Hound', false, false, 'medium', false, false, 'adult', 14, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Lucy', 'Australian Kelpie', false, false, 'large', false, true, 'puppy', 5, true, true, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Oscar', 'Bolognese', false, false, 'small', true, true, 'adult', 2, true, false, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Sasha', 'Harrier', true, true, 'large', true, false, 'puppy', 14, false, true, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Lexi', 'Dogue de Bordeaux', true, true, 'medium', false, true, 'adolescent', 9, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Maddie', 'Retriever', true, true, 'medium', true, true, 'senior', 2, false, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Boomer', 'Rat Terrier', true, true, 'huge', true, true, 'puppy', 6, true, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Buster', 'Shepherd', false, false, 'tiny', false, true, 'puppy', 7, true, true, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Luke', 'Fila Brasileiro', true, false, 'medium', false, true, 'senior', 1, true, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Moose', 'Spaniel', false, false, 'small', false, false, 'senior', 8, false, true, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Boomer', 'German Pinscher', true, false, 'tiny', false, false, 'adult', 5, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Bailey', 'German Wirehaired Pointer', true, true, 'small', false, true, 'adolescent', 6, true, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Bubba', 'Redbone Coonhound', false, false, 'small', false, false, 'adolescent', 8, true, true, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('George', 'Petit Basset Griffon Vendeen', true, true, 'large', false, false, 'puppy', 1, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Copper', 'Australian Cattle Dog / Blue Heeler', true, true, 'medium', true, false, 'adolescent', 9, false, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Maggie', 'Dogo Argentino', false, false, 'huge', true, true, 'adolescent', 15, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Bella', 'Bloodhound', true, true, 'medium', true, true, 'adolescent', 1, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Hank', 'Belgian Shepherd / Tervuren', false, true, 'small', false, true, 'puppy', 11, false, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Chance', 'Maltese', true, false, 'huge', true, false, 'adult', 14, true, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Bailey', 'Rough Collie', true, false, 'tiny', false, true, 'puppy', 9, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Maverick', 'Leonberger', true, true, 'huge', false, false, 'senior', 5, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Rudy', 'Great Pyrenees', true, false, 'medium', false, false, 'puppy', 8, true, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Sam', 'Blue Lacy', false, true, 'medium', false, true, 'senior', 15, false, true, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Bo', 'Boerboel', true, false, 'tiny', false, false, 'adult', 6, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Ella', 'Flat-Coated Retriever', false, false, 'small', false, false, 'adult', 1, true, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Layla', 'Giant Schnauzer', true, false, 'tiny', true, true, 'adult', 4, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Bruno', 'Australian Terrier', true, false, 'small', true, false, 'puppy', 3, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Mickey', 'Bluetick Coonhound', true, false, 'tiny', true, true, 'senior', 11, false, false, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Luna', 'Pug', true, true, 'small', false, true, 'adolescent', 1, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Buddy', 'Dandi Dinmont Terrier', true, false, 'tiny', false, false, 'puppy', 2, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Willow', 'Rat Terrier', false, true, 'small', true, false, 'adolescent', 10, false, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('King', 'Illyrian Sheepdog', false, true, 'medium', true, false, 'senior', 4, false, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Abby', 'Rough Collie', false, false, 'medium', false, true, 'puppy', 2, false, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Lilly', 'Appenzell Mountain Dog', false, true, 'medium', false, true, 'senior', 15, false, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Dexter', 'White German Shepherd', false, true, 'large', true, true, 'puppy', 10, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Lexi', 'Klee Kai', true, false, 'medium', true, false, 'senior', 14, false, true, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Koda', 'Terrier', true, false, 'tiny', true, true, 'senior', 2, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Ruby', 'Glen of Imaal Terrier', true, false, 'large', true, true, 'adult', 2, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Ginger', 'Kai Dog', false, false, 'medium', true, true, 'adolescent', 12, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Boomer', 'Old English Sheepdog', false, false, 'medium', true, true, 'adolescent', 2, false, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Cash', 'Whippet', false, false, 'medium', false, true, 'senior', 2, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Zoe', 'Saluki', true, true, 'large', false, true, 'adolescent', 13, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Chase', 'Norwich Terrier', false, false, 'large', true, true, 'adolescent', 14, true, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Jasper', 'Giant Schnauzer', false, false, 'tiny', true, true, 'senior', 5, false, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Copper', 'Tibetan Terrier', true, true, 'large', false, false, 'adolescent', 4, false, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Lulu', 'Otterhound', false, false, 'small', false, true, 'adult', 8, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Lucy', 'Irish Setter', false, false, 'tiny', true, true, 'adult', 15, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Marley', 'Kai Dog', false, true, 'medium', false, true, 'adult', 1, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Rex', 'Feist', false, false, 'medium', false, true, 'adult', 15, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Walter', 'Tibetan Mastiff', false, true, 'large', false, false, 'adult', 4, true, true, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Chloe', 'Mountain Cur', true, true, 'small', false, true, 'puppy', 14, true, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Belle', 'Norwegian Elkhound', false, true, 'huge', false, false, 'adult', 1, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Brody', 'Alaskan Malamute', true, false, 'tiny', true, true, 'puppy', 10, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Kona', 'Portuguese Water Dog', true, true, 'small', false, true, 'puppy', 2, true, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Annie', 'Catahoula Leopard Dog', true, true, 'huge', false, true, 'senior', 8, false, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Blue', 'Australian Cattle Dog / Blue Heeler', false, false, 'small', true, true, 'adult', 15, false, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Dexter', 'German Shorthaired Pointer', true, false, 'huge', true, true, 'adult', 11, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Jasper', 'Cavalier King Charles Spaniel', false, false, 'tiny', false, true, 'puppy', 4, true, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Mia', 'Podengo Portugueso', true, true, 'tiny', true, false, 'senior', 11, false, false, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Buddy', 'West Highland White Terrier Westie', true, true, 'tiny', false, true, 'adult', 14, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Penny', 'Sealyham Terrier', true, false, 'tiny', false, false, 'adolescent', 10, false, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Bear', 'Clumber Spaniel', true, false, 'large', false, false, 'senior', 9, true, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Toby', 'Caucasian Sheepdog / Caucasian Ovtcharka', false, true, 'small', false, false, 'adult', 14, false, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Rex', 'Border Terrier', true, true, 'tiny', true, false, 'puppy', 7, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Tank', 'Carolina Dog', false, true, 'huge', false, true, 'senior', 10, false, false, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Rosie', 'American Hairless Terrier', true, false, 'large', true, true, 'senior', 10, false, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Roscoe', 'Shiba Inu', false, true, 'small', false, false, 'senior', 7, false, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Annie', 'Blue Lacy', false, true, 'huge', false, false, 'senior', 3, false, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Rufus', 'Staffordshire Bull Terrier', true, false, 'tiny', false, true, 'puppy', 14, true, false, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Ollie', 'Feist', false, true, 'large', true, false, 'puppy', 4, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Hank', 'Bloodhound', true, false, 'tiny', false, true, 'senior', 11, true, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Lucky', 'Sealyham Terrier', false, true, 'medium', false, false, 'puppy', 3, false, false, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Millie', 'Papillon', false, true, 'tiny', true, true, 'adult', 2, false, true, true, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Lexi', 'Australian Cattle Dog / Blue Heeler', false, true, 'large', true, false, 'adult', 11, true, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Ziggy', 'Polish Lowland Sheepdog', false, false, 'small', false, true, 'adult', 12, false, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Joey', 'Black Labrador Retriever', false, false, 'medium', false, true, 'senior', 10, false, true, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Oreo', 'Catahoula Leopard Dog', false, false, 'medium', false, false, 'senior', 1, false, true, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Piper', 'Manchester Terrier', false, true, 'tiny', false, false, 'puppy', 5, true, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Tyson', 'Portuguese Water Dog', false, true, 'huge', false, true, 'adolescent', 12, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2),
('Harley', 'Chinook', true, false, 'small', false, false, 'puppy', 9, false, true, false, 'low', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Bandit', 'Samoyed', false, false, 'large', false, false, 'adolescent', 14, false, false, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Ella', 'Jack Russell Terrier', false, true, 'tiny', false, false, 'adolescent', 7, true, true, false, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Bandit', 'Greater Swiss Mountain Dog', false, true, 'tiny', true, true, 'puppy', 12, false, false, true, 'medium', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Ace', 'Norwegian Elkhound', true, false, 'medium', false, true, 'adult', 11, false, true, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Dexter', 'Ibizan Hound', true, false, 'huge', true, false, 'puppy', 12, false, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 2),
('Rocco', 'English Shepherd', false, true, 'medium', false, false, 'adolescent', 8, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 3),
('Marley', 'Dutch Shepherd', true, true, 'huge', true, false, 'adolescent', 3, false, true, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Cooper', 'Yellow Labrador Retriever', true, true, 'tiny', false, true, 'adolescent', 12, false, false, false, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', false, 3),
('Lexi', 'Feist', true, false, 'large', false, false, 'senior', 6, true, false, true, 'high', 'https://i.redd.it/uwptaiy07xn01.jpg', 'INSERT_DESCRIPTION_HERE', true, 2);

INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('1', '2', 'hi', true, 'Manik');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('1', '3', 'take me to your leader', false, 'Lexi');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('2', '3', 'how do you write a for loop?', false, 'Cooper');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('3', '2', 'give me all your dogs', false, 'Marley');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('3', '1', 'whats a dog', false, 'Rocco');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('2', '1', 'sah dude', false, 'Ace');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('1', '2', 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. Youre on your own. And you know what you know. And YOU are the one wholl decide where to go...', false, 'Annie');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('1', '2', 'my spoon is too big', true, 'Dexter');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('1', '3', 'i am a banana', false, 'Bandit');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('2', '3', 'so take a nap and zen fire ze missiles', false, 'Ella');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('3', '2', 'dogs dogs dogs dogs dogs', false, 'Harley');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('3', '1', 'yabois back', false, 'Tyson');
INSERT INTO messages (sender_id, recipient_id, message, deleted, dogName) VALUES ('2', '1', 'we should have a balcony', false, 'Hank');