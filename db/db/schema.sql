DROP DATABASE IF EXISTS content_db;

CREATE DATABASE content_db;

USE content_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_title VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(30) NOT NULL,
  role_id INT,
  department VARCHAR(30) NOT NULL,
  salary INT,
  FOREIGN KEY (department)
  REFERENCES demartments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL,
  employee_id INT,
  job_title VARCHAR(30) NOT NULL,
  salary INT,
  manager_name VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INT,
  FOREIGN KEY (department)
  REFERENCES demartments(id)
  ON DELETE SET NULL
);