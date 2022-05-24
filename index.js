const inquirer = require('inquirer');

const promptManager = () => {
    return inquirer.prompt([
       {
        type: 'list',
        name: 'choice',
        message: 'please choose a teammember',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
       },
]).then((answers) => {
    switch (answers.choice) {
        case 'Engineer' :
            addEngineer()
            break;
        case 'Intern' :
            addIntern()
            break;
            default:
            buildTeam()
        
        }
    })
}