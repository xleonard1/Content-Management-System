DROP DATABASE IF EXISTS content_db;

CREATE DATABASE content_db;

USE content_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_title VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  salary INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE CASCADE,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
);