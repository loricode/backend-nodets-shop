CREATE database shopDB;
use shopDB;

CREATE TABLE users (
id CHAR(36) PRIMARY KEY,
username VARCHAR(250) NOT NULL,
email VARCHAR(255) NOT NULL,
passwordHash VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
id CHAR(36) PRIMARY KEY,
role_name VARCHAR(50) NOT NULL
);

CREATE TABLE user_role (
 id CHAR(36) PRIMARY KEY,
 role_id CHAR(36) NULL,
 user_id CHAR(36) NOT NULL,
 FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products_sold (
 product_id CHAR(36) PRIMARY KEY,
 product_code VARCHAR(200) NULL,
 product_name VARCHAR(250) NULL,
 product_price DOUBLE(6,2) NULL
);


use shopDB;
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sales_products$$
CREATE PROCEDURE sp_sales_products()
BEGIN
  SELECT 
   product_id AS id,
   product_code as codeProduct,
   product_name as nameProduct,
   product_price AS price
   FROM shopdb.products_sold;
END
$$

use shopDB;
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_auth_user_validate$$
CREATE PROCEDURE sp_auth_user_validate(IN email_param VARCHAR(255))
BEGIN
  SELECT 
   username,
   email,
   id AS userId
   FROM shopdb.users
   WHERE email = email_param;
END
$$

use shopDB;
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_auth_user_getById$$
CREATE PROCEDURE sp_auth_user_getById(IN email_param VARCHAR(255))
BEGIN
  SELECT 
   username,
   email,
   id AS userId
   FROM shopdb.users
   WHERE email = email_param;
END
$$

use shopDB;
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_auth_user_adm_validate$$
CREATE PROCEDURE sp_auth_user_adm_validate(IN email_param VARCHAR(255))
BEGIN
  DECLARE var_username VARCHAR(250);
  DECLARE var_userId CHAR(36);
  DECLARE var_user_roleId CHAR(36);
  DECLARE var_name_role VARCHAR(50) DEFAULT 'NINGUNO';
  DECLARE var_email VARCHAR(50) DEFAULT 'NINGUNO';
  
  SELECT 
   id, username, email INTO var_userId, var_username, var_email
   FROM shopdb.users u 
   WHERE email = email_param LIMIT 1;
   
   select role_id INTO var_user_roleId FROM user_role WHERE user_id = var_userId;
   
   select role_name INTO var_name_role FROM roles WHERE id = var_user_roleId;
   
   -- Aquí tu lógica normal
    IF NOT var_name_role = 'ADMIN' THEN
    
     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario restringido.';
     
    ELSE
    -- Lógica que se ejecuta cuando no hay error
       SELECT var_email AS email, var_username AS username, var_userId userId;
     END IF;
     
END
$$

use shopDB;
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_auth_user_register$$
CREATE PROCEDURE sp_auth_user_register(
IN email_param VARCHAR(255), 
IN password_param VARCHAR(255),
IN username_param VARCHAR(250)
 )
BEGIN

 DECLARE var_user_id CHAR(36);

  SET var_user_id = UUID();

  INSERT INTO shopdb.users (id, username, email, passwordHash) VALUES (var_user_id, username_param, email_param, password_param);

  SELECT 
   username,
   email,
   id AS userId
   FROM shopdb.users
   WHERE id = var_user_id limit 1;
END
$$


INSERT INTO users (id, username, email, passwordHash) VALUES (UUID(), 'Administrador', 'admin@gmail.com', 'admin1');

INSERT INTO roles (id, role_name) VALUES (UUID(), 'ADMIN');
INSERT INTO roles (id, role_name) VALUES (UUID(), 'CUSTOMER');

--INSERT INTO user_role (id, role_id, user_id) VALUES (UUID(), 'c04177f1-81c7-11ef-929d-00090ffe0001', '8fcf3b47-81c7-11ef-929d-00090ffe0001');

INSERT INTO products_sold (product_id, product_code, product_name, product_price) VALUES (UUID(), '1', 'Bulbaser', 4000.56);

