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
    -- `location` VARCHAR(100) NULL,
	`contact_email` VARCHAR(150) NOT NULL,
	`contact_phone` VARCHAR(100) NULL,
	`website` VARCHAR(200) NULL,
    `interest_id` INT NOT NULL, -- fk
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user_logins`(`user_id`),
    FOREIGN KEY (`interest_id`) REFERENCES `Capstone`.`interests`(`id`)
);

select * from mentors;
select * from user_logins;

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

-- DUMMY DATA FOR MENTORS
/*
INSERT INTO `Capstone`.`mentors` (`fullname`, `profession`, `user_id`, `description`, `location`,`contact_email`, `contact_phone`, `website`, `interest_id`) 
VALUES ('Jane Smith', 'Computer Engineer', '1', 'Smith is a world-renown Computer Engineer.', 'NC', 'janesmith@gmail.com', '555-555-555', 'janesmith.com', 1); 

	INSERT INTO `Capstone`.`user_logins` (`role_id`,`login_email`,`login_password`,`date_created`)
		VALUES ('4', 'janesmith@gmail.com', 'jane123', '2023-01-30');
    
INSERT INTO `Capstone`.`mentors` (`fullname`, `profession`, `user_id`, `description`, `location`,`contact_email`, `contact_phone`, `website`, `interest_id`) 
VALUES ('Barack Obama', 'Former President', '2', 'Obama was president of the United States. Miss him <3.', 'DC', 'bobama@whitehouse.gov', '555-555-5555', 'barackobama.com', 2);
    
    INSERT INTO `Capstone`.`user_logins` (`role_id`,`login_email`,`login_password`,`date_created`)
	VALUES ('4', 'bobama@whitehouse.gov', 'barryorules', '2023-01-30');

INSERT INTO mentors (fullname, profession, user_id, description, location, contact_email, contact_phone, website, interest_id)
VALUES
("John Doe", "Software Engineer", 16, "Experienced software developer with a passion for technology.", "NV", "johndoe@example.com", "555-555-1212", "johndoe.com", 1),
("Vanessa Paredes", "Teacher", 17, "Dedicated educator with a focus on technology in the classroom.", "NY", "pvanessa@example.com", "555-555-1213", "paredesvanessa.com", 2),
("Bob Smith", "Retail Manager", 18, "Skilled retail professional with a passion for customer service.", "CA", "bobsmith@example.com", "555-555-1214", "bobsmith.com", 3),
("Sara Hernandez", "Chef", 19, "Experienced chef with a focus on farm-to-table cuisine.", "IL", "sarahernandez@example.com", "555-555-1215", "sarahernandez.com", 4),
("Tom Schmidt", "Logistics Coordinator", 20, "Efficient logistics professional with a focus on supply chain management", "TX", "tomschmidt@example.com", "555-555-1216", "tomschmidt.com", 5),
("Emily Davis", "Nurse", 21, "Compassionate nurse with a focus on patient care.", "PA", "emilydavis@example.com", "555-555-1217", "emilydavis.com", 6),
("Tom Davis", "Education Consultant", 22, "Advising and helping educators to enhance student learning.", "MO", "tomdavis@example.com", "555-555-5555", "tomdavis.com", 2),
("Karen Wilson", "Data Scientist", 23, "Expert in data analysis and visualization.", "KS", "karenwilson@example.com", "555-555-5555", "karenwilson.com", 1),
("Mike Huang", "Marketing Manager", 24, "Energetic and knowledgeable marketing manager.", "SC", "mikehuang@example.com", "555-555-5555", "mikehuang.com", 3),
("Emily Green", "Logistics Compoany Founder", 25, "Founder of a company that ensures efficient and effective logistics operations.", "NC", "emilygreen@example.com", "555-555-5555", "emilygreen.com", 5),
("David Lee", "Restaurant Manager", 26, "Leading and managing successful restaurants.", "SC", "davidlee@example.com", "555-555-5555", "davidlee.com", 4);
    
INSERT INTO `Capstone`.`user_logins` (`role_id`,`login_email`,`login_password`,`date_created`)
VALUES (4, 'johndoe@example.com', 'password001', 0000-00-00),
(4, 'pvanessae@example.com', 'password002', 0000-00-00),
(4, 'bobsmith@example.com', 'password003', 0000-00-00),
(4, 'sarahernandez@example.com', 'password004', 0000-00-00),
(4, 'tomschmidt@example.com', 'password005', 0000-00-00),
(4, 'emilydavis@example.com', 'password006', 0000-00-00),
(4, 'tomdavis@example.com', 'password007', 0000-00-00),
(4, 'karenwilson@example.com', 'password008', 0000-00-00),
(4, 'mikehuang@example.com', 'password009', 0000-00-00),
(4, 'emilygreen@example.com', 'password010', 0000-00-00),
(4, 'davidlee@example.com', 'password011', 0000-00-00);

UPDATE 
    `Capstone`.`mentors`
SET 
    `description` = 'An educator whose work has been widely referenced and influential.'
WHERE 
    `id` = 4;

select * from mentors;
*/
-- ^^^ DUMMY DATA ^^^

