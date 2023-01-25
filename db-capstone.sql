-- CREATE DATABASE philanthropy;

-- USE philanthropy;

-- DROP DATABASE philanthropy;

CREATE TABLE `philanthropy`.`profiles` (
  `profile_id` INT NOT NULL AUTO_INCREMENT, -- pk
  `organization_name` VARCHAR(100) NOT NULL,
  `org_type_id` INT NOT NULL, -- fk
  `account_type_id` INT NOT NULL, -- fk
  `location` VARCHAR(100) NULL,
  `contact_firstname` VARCHAR(100) NOT NULL,
  `contact_lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(100) NULL,
  `website` VARCHAR(200) NULL,
  `interest_id` VARCHAR(100) NOT NULL,
  
  PRIMARY KEY (`profile_id`)
  -- FOREIGN KEY (`account_type_id`) REFERENCES `account_types`(`type_id`),
  -- FOREIGN KEY (`org_type_id`) REFERENCES `organization_types`(`org_type_id`)
);

-- SELECT * FROM `profiles`;

-- ALTER TABLE `philanthropy`.`profiles` ADD FOREIGN KEY (`account_type_id`) REFERENCES `account_types`(`type_id`);
-- ALTER TABLE `philanthropy`.`profiles` ADD FOREIGN KEY (`org_type_id`) REFERENCES `organization_types`(`org_type_id`);

-- ALTER TABLE `philanthropy`.`profiles` CHANGE `interest` `interest_id` INT NOT NULL;
-- ALTER TABLE `philanthropy`.`profiles` ADD FOREIGN KEY (`interest_id`) REFERENCES `interests`(`interest_id`);

CREATE TABLE `philanthropy`.`organization_types` (
	`org_type_id` INT NOT NULL AUTO_INCREMENT, -- pk
    `org_type` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`org_type_id`)
);

CREATE TABLE `philanthropy`.`interests` (
	`interest_id` INT NOT NULL AUTO_INCREMENT,
    `interest_name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`interest_id`)
);

CREATE TABLE `philanthropy`.`login_information` (
  `profile_id` INT NOT NULL, -- fk
  `account_type_id` INT NOT NULL, -- fk
  `login_email` VARCHAR(150) NOT NULL,
  `login_password` VARCHAR(150) NOT NULL,
  `date_created` DATE NOT NULL,
  
  FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`profile_id`),
  FOREIGN KEY (`account_type_id`) REFERENCES `account_types`(`type_id`)
);
  
CREATE TABLE `philanthropy`.`account_types` (
	`type_id` INT NOT NULL AUTO_INCREMENT, -- pk
    `type_name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`type_id`)
); 
  
CREATE TABLE `philanthropy`.`resources` (
  `resource_id` INT NOT NULL AUTO_INCREMENT, -- pk
  `resource_title` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL, -- fk
  `resource_description` VARCHAR(200) NOT NULL,
  `monetary_value` DECIMAL(7) NULL,
  
  PRIMARY KEY (`resource_id`),
  FOREIGN KEY (`category_id`) REFERENCES `resource_categories`(`category_id`)
);
  
CREATE TABLE `philanthropy`.`resource_categories` (
	`category_id` INT NOT NULL AUTO_INCREMENT, -- pk
    `category_name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`category_id`)
);
