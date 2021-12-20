// TODO: Include packages needed for this application
//include inquirer node module
const inquirer = require('inquirer');
//connect to generate markdown javascript file
const generateMarkdown = require('./utils/generateMarkdown.js');
//include file system node module
const fs = require('fs');

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'user',
        message: 'What is your name? (Required)',
        validate: userInput => {
          if (userInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email address!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your github username? (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your github username!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'title',
        message: 'What is your project name? (Required)',
        validate: projectNameInput => {
          if (projectNameInput) {
            return true;
          } else {
            console.log('Please enter your project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please enter a description for your project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Project description is a required field!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'install',
        message: 'Please list the steps required to install your project (Required)',
        validate: instructionsInput => {
          if (instructionsInput) {
            return true;
          } else {
            console.log('Install instructions is a required field!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use of your application (Required)',
        validate: instructionsInput => {
          if (instructionsInput) {
            return true;
          } else {
            console.log('Usage is a required field!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        message: 'Select the appropriate license for your application (Required)',
        name: 'license',
        choices: [
          new inquirer.Separator(' = License Choices = '),
          {
            name: 'GNU',
          },
          {
            name: 'Mozilla',
          },
          {
            name: 'Apache',
          },
          {
            name: 'MIT',
          },
          {
            name: 'Boost',
          },
          {
            name: 'Unlicense',
          }
        ],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one license.';
          }
          else if (answer.length > 1) {
            return 'You may only choose one license.';
          }
  
          return true;
        },
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so.',
        validate: contributingInput => {
          if (contributingInput) {
            return true;
          }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: "If you've created test cases for your application please provide examples on how to run them.",
        validate: testsInput => {
          if (testsInput) {
            return true;
          }
        }
    }
    ]);
  };
// TODO: Create a function to write README file
const writeFile = data => {
  //specify new file location and data
  fs.writeFile('../dist/README.md', data, err => {
      // if there is an error  return error
      if (err) {
          console.log(err);
          return;
      // Tell user their README has been created in the dist folder
      } else {
          console.log("---------------------------------------------------------------------")
          console.log("Your README file has been created! Check your dist folder to find it!")
      }
  })
}; 

// TODO: Create a function to initialize app
function init() {
  //ask user questions
    promptUser()
    //then take the answers and pass them to generate Markdown
    .then ( data => {
      return generateMarkdown(data);
    })
    //then write the output of the generate markdown function to a new README.md file
    .then (data => {
      return writeFile(data);
    })
    //return error if needed
    .catch(err => {
      console.log(err)
    })
}

// Calling init function to run the app
init();
