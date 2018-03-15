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
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `pets` BINARY NULL DEFAULT NULL,
  `zipcode` INTEGER(5) NULL DEFAULT NULL,
  `house` ENUM NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'dogs'
-- 
-- ---

DROP TABLE IF EXISTS `dogs`;
		
CREATE TABLE `dogs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` INTEGER(50) NULL DEFAULT NULL,
  `breed` INTEGER NULL DEFAULT NULL,
  `gender` ENUM NULL DEFAULT NULL,
  `size` ENUM NULL DEFAULT NULL,
  `temperament` ENUM NULL DEFAULT NULL,
  `age` INTEGER(2) NULL DEFAULT NULL,
  `fixed` BINARY NULL DEFAULT NULL,
  `medical` BINARY NULL DEFAULT NULL,
  `energy` ENUM NULL DEFAULT NULL,
  `photo` VARCHAR(150) NULL DEFAULT NULL,
  `org_id` INTEGER NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `org_id`, `breed`)
);

-- ---
-- Table 'orgs'
-- 
-- ---

DROP TABLE IF EXISTS `orgs`;
		
CREATE TABLE `orgs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `location` INTEGER(5) NULL DEFAULT NULL,
  `contact` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'breed'
-- 
-- ---

DROP TABLE IF EXISTS `breed`;
		
CREATE TABLE `breed` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
KEY ()
);

-- ---
-- Table 'favoritedogs'
-- 
-- ---

DROP TABLE IF EXISTS `favoritedogs`;
		
CREATE TABLE `favoritedogs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `dog_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`, `dog_id`)
);

-- ---
-- Table 'contacts(maybe)'
-- 
-- ---

DROP TABLE IF EXISTS `contacts(maybe)`;
		
CREATE TABLE `contacts(maybe)` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(30) NULL DEFAULT NULL,
  `org_id` INTEGER NULL DEFAULT NULL,
  `address` VARCHAR(150) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `org_id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `dogs` ADD FOREIGN KEY (breed) REFERENCES `breed` (`id`);
ALTER TABLE `dogs` ADD FOREIGN KEY (org_id) REFERENCES `orgs` (`id`);
ALTER TABLE `favoritedogs` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `favoritedogs` ADD FOREIGN KEY (dog_id) REFERENCES `dogs` (`id`);
ALTER TABLE `contacts(maybe)` ADD FOREIGN KEY (org_id) REFERENCES `orgs` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `dogs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `orgs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `breed` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `favoritedogs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `contacts(maybe)` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`name`,`pets`,`zipcode`,`house`) VALUES
-- ('','','','','');
-- INSERT INTO `dogs` (`id`,`name`,`breed`,`gender`,`size`,`temperament`,`age`,`fixed`,`medical`,`energy`,`photo`,`org_id`,`description`) VALUES
-- ('','','','','','','','','','','','','');
-- INSERT INTO `orgs` (`id`,`name`,`location`,`contact`) VALUES
-- ('','','','');
-- INSERT INTO `breed` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `favoritedogs` (`id`,`user_id`,`dog_id`) VALUES
-- ('','','');
-- INSERT INTO `contacts(maybe)` (`id`,`name`,`org_id`,`address`,`city`,`phone`,`email`) VALUES
-- ('','','','','','','');
