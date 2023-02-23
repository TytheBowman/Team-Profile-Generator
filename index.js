const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');

let team = [];

function startApp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the team member?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the email address of the team member?"
      },
      {
        type: "list",
        name: "role",
        message: "What is the role of the team member?",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ])
    .then(answers => {
      switch (answers.role) {
        case "Manager":
          inquirer
            .prompt([
              {
                type: "input",
                name: "officeNumber",
                message: "What is the office number of the Manager?"
              }
            ])
            .then(managerAnswers => {
              const manager = new Manager(
                answers.name,
                answers.email,
                id++,
                managerAnswers.officeNumber
              );
              team.push(manager);
              continueApp();
            });
          break;
        case "Engineer":
          inquirer
            .prompt([
              {
                type: "input",
                name: "github",
                message: "What is the GitHub username of the Engineer?"
              }
            ])
            .then(engineerAnswers => {
              const engineer = new Engineer(
                answers.name,
                answers.email,
                id++,
                engineerAnswers.github
              );
              team.push(engineer);
              continueApp();
            });
          break;
        case "Intern":
          inquirer
            .prompt([
              {
                type: "input",
                name: "school",
                message: "What is the school of the Intern?"
              }
            ])
            .then(internAnswers => {
              const intern = new Intern(
                answers.name,
                answers.email,
                id++,
                internAnswers.school
              );
              team.push(intern);
              continueApp();
            });
          break;
        default:
          break;
      }
      continueApp();
    });
}

function continueApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add an employee", "Finish building my team"]
      }
    ])
    .then(answer => {
      switch (answer.choice) {
        case "Add an employee":
          startApp();
          break;
        case "Finish building my team":
          generateHTML();
          break;
        default:
          console.log("Error: Invalid choice.");
          break;
      }
    });
}

function generateHTML() {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
  </head>
  <body>
    <nav class="navbar navbar-dark bg-dark mb-5">
      <span class="navbar-brand mb-0 h1 w-100 text-center">My Team</span>
    </nav>
    <div class="container">
      <div class="row">
        ${team
          .map(
            member => `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${member.getName()}</h5>
                  <p class="card-text">${member.getRole()}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${member.getId()}</li>
                  <li class="list-group-item">Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></li>
                  ${
                    member instanceof Manager
                      ? `<li class="list-group-item">Office Number: ${member.getOfficeNumber()}</li>`
                      : member instanceof Engineer
                      ? `<li class="list-group-item">GitHub: <a href="https://github.com/${member.getGithub()}">${member.getGithub()}</a></li>`
                      : member instanceof Intern
                      ? `<li class="list-group-item">School: ${member.getSchool()}</li>`
                      : ""
                  }
                </ul>
              </div>
            </div>
            `
          )
          .join("")}
      </div>
    </div>
  </body>
  </html>
  `;

  fs.writeFile("team.html", html, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

