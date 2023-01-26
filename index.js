const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([    {      type: "input",      name: "name",      message: "What is the name of the team member?"    },   
   {      type: "input",      name: "email",      message: "What is the email address of the team member?"    },   
    {      type: "input",      name: "github",      message: "What is the GitHub username of the team member?"    },   
     {      type: "list",      name: "role",      message: "What is the role of the team member?",      choices: ["Manager", "Engineer", "Intern"]
    }
  ])
  .then(answers => {
    // Use the answers to generate an HTML file
    const generateHTML = async (employees) => {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            <title>My Team</title>
        </head>
        <body>
            <div class="container mx-auto">
                <h1 class="text-2xl font-medium">My Team</h1>
                <div class="grid grid-cols-3 gap-4">
                    ${employees.map(employee => {
                        return `
                            <div class="bg-white rounded-lg p-4">
                                <h2 class="text-lg font-medium">${employee.getName()}</h2>
                                <p><strong>Role:</strong> ${employee.getRole()}</p>
                                <p><strong>ID:</strong> ${employee.getId()}</p>
                                <p><strong>Email:</strong> <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></p>
                                ${employee.getRole() === 'Manager' ? `<p><strong>Office Number:</strong> ${employee.getOfficeNumber()}</p>` : ''}
                                ${employee.getRole() === 'Engineer' ? `<p><strong>GitHub:</strong> <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></p>` : ''}
                                ${employee.getRole() === 'Intern' ? `<p><strong>School:</strong> ${employee.getSchool()}</p>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </body>
        </html>
        `;
        return html;
    };

    fs.writeFileSync("team.html", html);
  });
