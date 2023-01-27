/* CREATING DB */

USE Capstone;

-- DROP DATABASE philanthropy;

/* CREATING TABLES */ 

CREATE TABLE `Capstone`.`organizations` (
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

CREATE TABLE `Capstone`.`mentors` (
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

CREATE TABLE `Capstone`.`organization_types` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `Capstone`.`interests` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `Capstone`.`user_logins` (
  `user_id` INT NOT NULL AUTO_INCREMENT, -- pk
  `role_id` INT NOT NULL, -- fk
  `login_email` VARCHAR(150) NOT NULL,
  `login_password` VARCHAR(150) NOT NULL,
  `date_created` DATE NOT NULL,
  
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`role_id`) REFERENCES `account_roles`(`id`)
);
  
CREATE TABLE `Capstone`.`account_roles` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `role` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
); 
  
CREATE TABLE `Capstone`.`resources` (
  `id` INT NOT NULL AUTO_INCREMENT, -- pk
  `title` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL, -- fk
  `description` VARCHAR(200) NOT NULL,
  `monetary_value` DECIMAL(7) NULL,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `resource_categories`(`id`)
);

CREATE TABLE `Capstone`.`resource_categories` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `name` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `Capstone`.`locations` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `abbrev` VARCHAR(2) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    
    PRIMARY KEY (`id`)
);

-- junction table --> many-to-many --> use joins here to visualize data/relationships

CREATE TABLE `Capstone`.`resource_avail_byarea` (
	`state_id` INT NOT NULL, -- fk
    `resource_id` INT NOT NULL, -- fk
    
    FOREIGN KEY (`state_id`) REFERENCES `Capstone`.`locations`(`id`),
    FOREIGN KEY (`resource_id`) REFERENCES `Capstone`.`resources`(`ID`)
);

/* INSERTING DATA */

INSERT INTO `Capstone`.`interests`(`name`)
VALUES ('technology'),('education'),('retail'),('restaurant'),('logistics'),('health');

INSERT INTO `Capstone`.`account_roles`(`role`)
VALUES ('admin'), ('hr'), ('organization'), ('mentor'); -- admin adds hr team, hr add resources and then organization/mentor user roles

INSERT INTO `Capstone`.`locations`(`abbrev`, `name`)
VALUES ('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU','Guam'), ('HI', 'Hawaii'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachussetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('MP', 'Northern Mariana Islands'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming');

