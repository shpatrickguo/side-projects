#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./resume.json");

// add response color
const response = chalk.bold.yellow;

const resumeOptions = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know",
  choices: [...Object.keys(data), "Exit"]
};

function showResume() {
  console.log("Hello my name is Patrick Guo, this is my resume");
  handleResume();
}

function handleResume() {
  inquirer.prompt(resumeOptions).then(answer => {
    if (answer.resumeOptions == "Exit") {
        console.log(response("Thank you for your time!"));
        return;
    }

    const options = data[`${answer.resumeOptions}`]
    if (options) {
      console.log(response(new inquirer.Separator()));
      options.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      }).then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
            console.log(response("Thank you for your time!"));
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

showResume();