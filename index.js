const inquirer = require('inquirer');
const mysql = require('mysql2')
const {viewEmployees, viewRoles, viewDepartments} = require('./util/server')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'KDDKKZz2018%',
      database: 'content_db'
    },
)

function init() {
    promptUser()
}

const promptUser = () => {
    return inquirer.prompt([
       {
        type: 'list',
        name: 'choice',
        message: 'please choose an option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
       },
]).then((answers) => {
    switch (answers.choice) {
        case 'View all departments' :
            viewDepartments();
            break;
        case 'View all roles' :
            viewRoles()
            break;
        case 'View all employees' :
            viewEmployees()
            break;
        case 'Add a department' :
            addDepartment()
            break;
        case 'Add a role' :
            addRole()
            break;
        case 'Add an employee' :
            addEmployee()
            break;
        case 'Update an employee role' :
            updateEmployeeRole()
            break;
        default:
            promptUser()
        }
    })
}

// function to add a department

    function addDepartment () {
        return inquirer.prompt([
            {
             type: 'input',
             name: 'department_title',
             message: "What is the name of the department?",
             validate: (answer) => {
                 if(answer !== '') {
                     return true
                 } else { return "Please enter at least one character"}
             }
            },
         ]).then((answers) => {
             console.log(answers);
             db.query('INSERT INTO departments SET ?', {
                  department_title: answers.department_title
                }, function (err) {
                    if(err) throw error;
                })
            promptUser()
     })
    }

    // function to add a role

    function addRole () {
        return inquirer.prompt([
            {
             type: 'input',
             name: 'job_title',
             message: "What is the name of the role",
             validate: (answer) => {
                 if(answer !== '') {
                     return true
                 } else { return "Please enter at least one character"}
             }
            },
            {
             type: 'list',
             name: 'department_id',
             message: "What department does the role belong to?",
             choices: ['1', '2', '3', '4'],
             validate: (answer) => {
                answer.match('(?!0$)[0-9]+(?:\\.[0-9]+)?')
                if(answer == pass){
                   return true;
                 } else {
                     return "Please enter a valid number"
                 }
               }
            },
            {
                type: 'number',
                name: 'Salary',
                message: "What is the salary of the role?",
               },

         ]).then((answers) => {
            console.log(answers);
            db.query('INSERT INTO roles SET ?', {
                 job_title: answers. job_title,
                 department_id: answers.department_id,
                 salary: 0
               }, function (error) {
                   if(error) throw error;
               })
             promptUser()
     })
    }

    // add employee

    function addEmployee () {
        return inquirer.prompt([
            {
             type: 'input',
             name: 'first_name',
             message: "What is the employee's first name?",
             validate: (answer) => {
                 if(answer !== '') {
                     return true
                 } else { return "Please enter at least one character"}
              }
            },
            {
             type: 'input',
             name: 'last_name',
             message: "What is the employee's last name?",
             validate: (answer) => {
                if(answer !== '') {
                    return true
                } else { return "Please enter at least one character"}
              }
            },
            {
             type: 'list',
             name: 'manager_id',
             message: "Who is the employee's manager?",
             choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
            },
            {
             type: 'list',
             name: 'role_id',
             message: "What is the employee's role?",
             choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
            },
         ]).then((answers) => {
            console.log(answers);
            db.query('INSERT INTO employees SET ?', {
                 first_name: answers.first_name,
                 last_name: answers.last_name,
                 role_id: answers.role_id,
                 manger_id: answers.manager_id,
               }, function (error) {
                   if(error) throw error;
               })
             promptUser()
            
     })
    }

    // function updateEmployeeRole () {
    //     return inquirer.prompt([
    //         {
    //          type: 'list',
    //          name: 'employee',
    //          message: "Which employee's role do you want to update?",
    //          choices: [],
    //         },
    //         {
    //          type: 'list',
    //          name: 'role',
    //          message: "Which role do you want to update?",
    //          choices: ['Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service', 'Sales Lead', 'Salesperson'],
    //         },

    //      ]).then((answers) => {
    //         console.log(answers);
    //         db.query('UPDATE employees SET ? WHERE id = ?', {
    //              job_title: answers. job_title,
    //              department_id: answers.department_id,
    //              salary: 0
    //            }, function (error) {
    //                if(error) throw error;
    //            })
    //          promptUser()
    //  })
    // }
    init()