/* CREATING DB */

CREATE DATABASE Capstone;
USE Capstone;

/* CREATING TABLES */ 

CREATE TABLE `Capstone`.`businesses` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `business_name` VARCHAR(100) NOT NULL,
    `user_id` INT NOT NULL, -- fk
    `description` VARCHAR(200) NOT NULL,
    `location` VARCHAR(100) NULL,
	`owner_fullname` VARCHAR(100) NOT NULL,
	`email` VARCHAR(150) NOT NULL,
	`phone` VARCHAR(100) NULL,
	`website` VARCHAR(200) NULL,
    `interest_id` INT NOT NULL, -- fk
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`),
    FOREIGN KEY (`interest_id`) REFERENCES `Capstone`.`interests`(`id`)
);

CREATE TABLE `Capstone`.`mentors` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `fullname` VARCHAR(100) NOT NULL,
    `profession` VARCHAR(100) NOT NULL,
    `user_id` INT NOT NULL, -- fk
    `description` VARCHAR(200) NOT NULL,
    `location` VARCHAR(100) NULL,
	`contact_email` VARCHAR(150) NOT NULL,
	`contact_phone` VARCHAR(100) NULL,
	`website` VARCHAR(200) NULL,
    `interest_id` INT NOT NULL, -- fk
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`),
    FOREIGN KEY (`interest_id`) REFERENCES `Capstone`.`interests`(`id`)
);

-- DUMMY DATA

select * from mentors;
select * from user_logins;

-- INSERT INTO `Capstone`.`mentors` (`fullname`, `profession`, `user_id`, `description`, `location`,`contact_email`, `contact_phone`, `website`, `interest_id`) 
-- VALUES ('Jane Smith', 'Computer Engineer', '1', 'Smith is a world-renown Computer Engineer.', 'NC', 'janesmith@gmail.com', '555-555-555', 'janesmith.com', 1); 

	-- INSERT INTO `Capstone`.`user_logins` (`role_id`,`login_email`,`login_password`,`date_created`)
	-- 	VALUES ('4', 'janesmith@gmail.com', 'jane123', '2023-01-30');
    
INSERT INTO `Capstone`.`mentors` (`fullname`, `profession`, `user_id`, `description`, `location`,`contact_email`, `contact_phone`, `website`, `interest_id`) 
VALUES ('Barack Obama', 'Former President', '2', 'Obama was president of the United States. Miss him <3.', 'DC', 'bobama@whitehouse.gov', '555-555-5555', 'barackobama.com', 2);
    
    -- INSERT INTO `Capstone`.`user_logins` (`role_id`,`login_email`,`login_password`,`date_created`)
	-- VALUES ('4', 'bobama@whitehouse.gov', 'barryorules', '2023-01-30');
-- ^^^ DUMMY DATA ^^^

CREATE TABLE `Capstone`.`employees` (
	`id` INT NOT NULL AUTO_INCREMENT, -- pk
    `fullname` VARCHAR(100) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `user_id` INT NOT NULL, -- fk
    `email` VARCHAR(150) NOT NULL,
	`phone` VARCHAR(100) NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`)
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
  `description` VARCHAR(200) NOT NULL,
  `monetary_value` DECIMAL(7) NULL,
  `interest_id` INT NOT NULL, -- fk
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (`interest_id`) REFERENCES `Capstone`.`interests`(`id`)-- fk
);

-- DUMMY DATA FOR RESOURCES (RAY)
INSERT INTO `resources`(`title`,`description`, `monetary_value`, `interest_id`)
VALUES('Best in Technology Grant', 'This is grant goes to the best small business in technology.','50000',1),('Health Sciences Scholarship', 'This scholarship will help someone at a health-related small business further their studies in the health sciences','10000',6);
-- ^^^ DUMMY DATA ^^^

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
VALUES ('admin'), ('hr'), ('business'), ('mentor'); -- admin adds hr team, hr add resources and then organization/mentor user roles

INSERT INTO `Capstone`.`locations`(`abbrev`, `name`)
VALUES ('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU','Guam'), ('HI', 'Hawaii'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachussetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('MP', 'Northern Mariana Islands'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming');

