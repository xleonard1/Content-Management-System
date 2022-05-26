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



const promptUser = () => {
    return inquirer.prompt([
       {
        type: 'list',
        name: 'choice',
        message: 'please choose an option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
       },
]).then((answers) => {
    switch (answers.choice) {
        case 'View all departments' :
            viewDepartments();
    
            promptUser();
            break;
        case 'View all roles' :
            viewRoles()
            
            promptUser();
            break;
        case 'View all employees' :
            viewEmployees()
            
            promptUser();
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
        case 'Quit' :
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

    const addRole  = async () => {
       
        let departmentInfo = []
        let results = await db.promise().query('SELECT id, department_title FROM departments ')
        let allDepartments = results[0]
        if(allDepartments === null) {
            console.log(allDepartments)
        } 
        for(const department of allDepartments) {
            let departmentName = `${department.department_title}`
            departmentInfo.push(departmentName)
        }


       inquirer.prompt([
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
             choices: departmentInfo,
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
                validate: (answer) => {
                    answer.match('(?!0$)[0-9]+(?:\\.[0-9]+)?')
                    if(answer){
                       return true;
                     } else {
                         return "Please enter a valid number"
                     }
                   }
               },

         ]).then((answers) => {
            let departmentIndex = departmentInfo.indexOf(answers.department_id)
            let departmemntSelected = allDepartments[departmentIndex]
            db.query('INSERT INTO roles SET ?', {
                 job_title: answers. job_title,
                 department_id: departmemntSelected.id,
                 salary: answers.salary
               }, function (error) {
                   if(error) throw error;
               })  
            promptUser();
           })
          
    }

    // add employee

    const addEmployee = async () => {

        // function to get the employees and update the manager
        let employeesInfo = []
        let results = await db.promise().query('SELECT id, first_name, last_name FROM employees ')
        let allEmployees = results[0]
        if(allEmployees === null) {
            console.log(allEmployees)
        } 
        for(const employee of allEmployees) {
            let employeeFullName = `${employee.first_name} ${employee.last_name}`
            employeesInfo.push(employeeFullName)
        }
        // algorithm to get the role ID

        let roleInfo = []
        let data = await db.promise().query('SELECT id, job_title FROM roles ')
        let allRoles = data[0]
        if(allRoles === null) {
            console.log(allRoles)
        } 
        for(const role of allRoles) {
            let jobName = `${role.job_title}`
            roleInfo.push(jobName)
        }

        inquirer.prompt([
            {
             type: 'input',
             name: 'first_name',
             message: "What is the employee's first name?",
             validate: (answer) => {
                 if(answer) {
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
             message: "What is the employee's manager's id?",
             choices: employeesInfo,
            },
            {
             type: 'list',
             name: 'role_id',
             message: "What is the employee's role?",
             choices: roleInfo,
            },
         ]).then((answers) => {
            let employeeIndex = employeesInfo.indexOf(answers.manager_id)
             let employeeSelected = allEmployees[employeeIndex]

             let roleIndex = roleInfo.indexOf(answers.role_id)
             let selectedRole = allRoles[roleIndex]
            db.query('INSERT INTO employees SET ?', {
                first_name: answers.first_name, 
                last_name: answers.last_name,
                manager_id: employeeSelected.id, 
                role_id: selectedRole.id
            })
             promptUser()
            
     })
    }

    const updateEmployeeRole = async () => {
        let employeesInfo = []
        let results = await db.promise().query('SELECT id, first_name, last_name FROM employees ')
        let allEmployees = results[0]
        if(allEmployees === null) {
            console.log(allEmployees)
        } 
        for(const employee of allEmployees) {
            let employeeFullName = `${employee.first_name} ${employee.last_name}`
            employeesInfo.push(employeeFullName)
        }
        console.log(employeesInfo)

        // console.log(allEmployees)

        let roleInfo = []
        let data = await db.promise().query('SELECT id, job_title FROM roles ')
        let allRoles = data[0]
        if(allRoles === null) {
            console.log(allRoles)
        } 
        for(const role of allRoles) {
            let jobName = `${role.job_title}`
            roleInfo.push(jobName)
        }

        
        inquirer.prompt([
            {
             type: 'list',
             name: 'employee',
             message: "Which employee's role do you want to update?",
             choices: employeesInfo,
            },
            {
             type: 'list',
             name: 'role_id',
             message: "Which role do you want to update?",
             choices: roleInfo,
            },

         ]).then((answers) => {
             let employeeIndex = employeesInfo.indexOf(answers.employee)

             console.log(employeeIndex)
             let employeeSelected = allEmployees[employeeIndex]
             let roleIndex = roleInfo.indexOf(answers.role_id)
             let selectedRole = allRoles[roleIndex]

            //  console.log(employeeSelected.id)
            console.log(answers);
            db.query(`UPDATE employees SET role_id = ${selectedRole.id} WHERE id = ?`, employeeSelected.id, function (error) {
                   if(error) throw error;
               })
        
             promptUser()
           })
    }
  
    promptUser()