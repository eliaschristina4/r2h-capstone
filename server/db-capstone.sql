/* CREATING DB */
CREATE DATABASE philanthropy;

USE philanthropy;

-- DROP DATABASE philanthropy;

/* CREATING TABLES */ 

CREATE TABLE `philanthropy`.`organizations` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    `user_id` INT NOT NULL, -- fk
    `type_id` INT NOT NULL, -- fk
    `location` VARCHAR(100) NULL,
	`contact_firstname` VARCHAR(100) NOT NULL,
	`contact_lastname` VARCHAR(100) NOT NULL,
	`contact_email` VARCHAR(150) NOT NULL,
	`contact_phone` VARCHAR(100) NULL,
	`website` VARCHAR(200) NULL,
	`interest_id` INT NOT NULL, -- fk
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`),
    FOREIGN KEY (`type_id`) REFERENCES `organization_types`(`id`),
    FOREIGN KEY (`interest_id`) REFERENCES `interests`(`id`)
);

CREATE TABLE `philanthropy`.`mentors` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `user_id` INT NOT NULL, -- fk
    `location` VARCHAR(100) NULL,
	`contact_email` VARCHAR(150) NOT NULL,
	`contact_phone` VARCHAR(100) NULL,
	`website` VARCHAR(200) NULL,
	`interest_id` INT NOT NULL, -- fk
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`),
    FOREIGN KEY (`interest_id`) REFERENCES `interests`(`id`)
);

CREATE TABLE `philanthropy`.`organization_types` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `philanthropy`.`interests` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `philanthropy`.`user_logins` (
  `user_id` INT NOT NULL AUTO_INCREMENT, -- pk
  `role_id` INT NOT NULL, -- fk
  `login_email` VARCHAR(150) NOT NULL,
  `login_password` VARCHAR(150) NOT NULL,
  `date_created` DATE NOT NULL,
  
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`role_id`) REFERENCES `account_roles`(`id`)
);
  
CREATE TABLE `philanthropy`.`account_roles` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `role` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
); 
  
CREATE TABLE `philanthropy`.`resources` (
  `id` INT NOT NULL AUTO_INCREMENT, -- pk
  `title` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL, -- fk
  `description` VARCHAR(200) NOT NULL,
  `monetary_value` DECIMAL(7) NULL,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `resource_categories`(`id`)
);
  
-- need to add states table and junction table (resources AND states - meet in the middle - many-to-many -> RESEARCH)

CREATE TABLE `philanthropy`.`resource_categories` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

/* INSERTING DATA */

INSERT INTO `philanthropy`.`interests`(`name`)
VALUES ('technology'),('education'),('retail'),('restaurant'),('logistics'),('health');

INSERT INTO `philanthropy`.`account_roles`(`role`)
VALUES ('admin'), ('hr'), ('organization'), ('mentor'); -- admin adds hr team, hr add resources and then organization/mentor user roles


