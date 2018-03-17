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
  `password` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `org_id` INTEGER NULL DEFAULT 0,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(30) NULL DEFAULT NULL,
  `zipcode` INTEGER(5) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `org_id`)
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
  `pets` BINARY NULL DEFAULT 0,
  `house_type` ENUM('house', 'apartment', 'other') NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`)
);

-- ---
-- Table 'orgs'
-- 
-- ---

DROP TABLE IF EXISTS `orgs`;
    
CREATE TABLE `orgs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`)
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
  `mix` BINARY NULL DEFAULT 0; -- is mix 
  `male` BINARY NULL DEFAULT NULL, -- enum m/f
  `size` ENUM('tiny', 'small', 'medium', 'large', 'giant') NULL DEFAULT NULL, -- enum tiny/small/medium/large/giant
  `aggressive` BINARY NULL DEFAULT 0, 
  `anxious ` BINARY NULL DEFAULT 0,
  `lifestage` ENUM('puppy', 'adolescent', 'adult', 'senior') NULL DEFAULT NULL, --life stage enum (puppy/adolescent/adult/senior)
  `age` INTEGER(2) NULL DEFAULT NULL, -- optional integer input
  `fixed` BINARY NULL DEFAULT NULL, -- boolean
  `diet` BINARY NULL DEFAULT 0, -- boolean for dietary needs
  `medical` BINARY NULL DEFAULT 0, -- boolean for medical needs
  `energy_level` ENUM('low', 'medium', 'high') NULL DEFAULT NULL, -- enum low/medium/high
  `photo` VARCHAR(150) NULL DEFAULT NULL, -- string input
  `org_id` INTEGER NULL DEFAULT NULL, -- foreign key integer
  `description` VARCHAR(500) NULL DEFAULT NULL, -- text (string)
  PRIMARY KEY (`id`, `org_id`, `breed_id`)
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
  PRIMARY KEY (`id`, `adopter_id`, `dog_id`)
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

-- INSERT INTO `adopters` (`id`,`user_id`,`name`,`pets`,`zipcode`,`house`) VALUES
-- ('','','','','','');
-- INSERT INTO `dogs` (`id`,`name`,`breed`,`gender`,`size`,`temperament`,`age`,`fixed`,`medical`,`energy`,`photo`,`org_id`,`description`) VALUES
-- ('','','','','','','','','','','','','');
-- INSERT INTO `orgs` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `breed` (`name`) VALUES
-- (''),
-- (''),
-- ('');

-- INSERT INTO `favoritedogs` (`id`,`user_id`,`dog_id`) VALUES
-- ('','','');
-- INSERT INTO `users` (`id`,`username`,`password`,`email`,`org_id`,`address`,`city`,`new field`,`zipcode`,`phone`) VALUES
-- ('','','','','','','','','','');

