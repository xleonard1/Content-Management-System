INSERT INTO departments (department_title)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (job_title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
       ("Salesperson",1, 80000),
       ("Lead Engineer", 2, 150000),
       ("Software Engineer", 2, 120000),
       ("Account Manager",3, 160000),
       ("Accountant", 3, 125000),
       ("Legal Team Lead", 4, 250000),
       ("Lawyer",4, 190000);

INSERT INTO  employees (first_name, last_name, manager_id, role_id)
VALUES ("John", "Doe", 1,1),
       ("Mike", "Chan",2,2),
       ("Ashley", "Rodriguez",3,3),
       ("Kevin", "Tupik", 4,4),
       ("Kunal", "Singh",5,5),
       ("Malia", "Brown",6,6),
       ("Sarah", "Lourd", 7,7),
       ("Tom", "Allen",8,8);
