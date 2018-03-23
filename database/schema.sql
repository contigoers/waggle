
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
  `user_id` INTEGER NULL DEFAULT NULL,
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
ALTER TABLE `orgs` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);

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

INSERT INTO `adopters` (`id`,`user_id`,`name`,`pets`,`house_type`) VALUES
(1,2,'Krisha Mehta',true,'house');

INSERT INTO `dogs` (`id`,`name`,`breed`,`mix`,`male`,`size`,`aggressive`,`anxious`,`lifestage`,`age`,`fixed`,`diet`,`medical`,`energy_level`,`photo`,`description`,`adopted`,`org_id`) VALUES
(1,'Sammy','Black Labrador Retriever',true,true,'medium',true,false,'adult',3,true,false,false,'medium',NULL,'Best dog ever! Has some aggression issues with other dogs but loves people', true,2);
(2,'Charles Jr','Corgi',false,false,'small',false,false,'puppy',1,false,true,false,'high','http://imgur.com/JBFlsJK.jpg','Adorable corgi puppy! Has to have a special diet for now but very healthy and friendly!',false,3);
(3,'Sparky','Golden Retriever',false,true,'large',false,true,'senior',9,true,false,true,'low','http://imgur.com/BuhZN1l.jpg','Very sweet dog but has some medical issues and needs due to senior age',false,3);

INSERT INTO `orgs` (`id`,`org_name`,`user_id`) VALUES
(1, 'DEFAULT - FOR ADOPTERS', NULL);
(2,'Small Chance Rescue',1);
(3,'Austin Pets Alive',3)

-- INSERT INTO `favoritedogs` (`id`,`user_id`,`dog_id`) VALUES
-- ('','','');
INSERT INTO `users` (`id`,`username`,`password`,`email`,`org_id`,`address`,`city`, `state`,`zipcode`,`phone`) VALUES
(1,'orgUser','$2a$10$3X/MZGAsXR1pfIkINcR0Oetim9bDgH8vffVpGmUnhp/SMv4mF3176','info@smallchancerescue.com',2,'P.O. Box 10033','Austin','TX',78766,'512-699-7244');
(2,'kmehta903','$2a$10$d/sLZ881Y6r.Rl9LsGaINeG4oQKTY2k0dRtdHBid0Ftg4jxuGkiS2','krisha@adopter.com',1,'123 Drury Lane','Austin','TX',78750,'123-456-7890');
(3,'orgUser3','$2a$10$FoEW9qqOBwe4l3sOQbG1Re3AzT0Hnqlp6FPIQgx13CZtzU07/FSzS','adopt@austinpetsalive.org',3,'1156 West Cesar Chavez','Austin','TX',78704,'512-961-6519');


