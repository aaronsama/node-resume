/**
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <tibor@szasz.hu> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * Tibor Szász
 * ----------------------------------------------------------------------------
 */

import path from "path";
import fs from "fs";
import chalk from "chalk";
import minimist from "minimist";
import startDevMode from "./startDevMode.js";
import scientistMode from "./scientistMode.js";
import loadCvData from "./loadCvData.js";
import cvToPdf from "./cvToPdf.js";

/**
 * npm start dev > this launches a web server to help debug CSS
 * npm start dev [templatename] > same as above, but with the desired template
 * npm start [templatename] > this renders the template
 * npm start [dev] [templatename] -- --skip=first,second > as above skipping sections first and second
 */

const cmdLineArgs = minimist(process.argv.slice(2));
const devMode = cmdLineArgs._.length > 0 && cmdLineArgs._[0] == "dev";
const template = loadTemplate(cmdLineArgs, devMode);

if (!checkTemplateFolder(template)) {
	process.exit(1);
}

const cvPath = cmdLineArgs["cv"]
  ? path.resolve(cmdLineArgs["cv"])
  : "./data/cv.json";
const cvData = loadCvData(cvPath, template, devMode);

if (cmdLineArgs["skip"]) {
	cmdLineArgs["skip"].split(",").forEach((item) => {
		delete cvData[item];
	});
}

/**
 * Check for a BibTex file and add publications
 */
try {
  const bibTexData = fs.readFileSync("./data/publications.bib", "utf8");
  console.log(
    chalk.yellow("You are a scientist! Adding your publications to the CV..."),
  );

  scientistMode(bibTexData);
} catch (e) {
  console.log(
    chalk.yellow(
      "No publications file found. Add them in BiBTeX format to data/publications.bib",
    ),
  );
}

/**
 * Start a server to display the template to debug or modify
 */
if (devMode) {
  startDevMode(cvData, template);
} else {
  cvToPdf(cvData, template);
}

function loadTemplate(cmdLineArgs, devMode) {
	if (cmdLineArgs._.length > 0) {
		return devMode ? cmdLineArgs._[1] : cmdLineArgs._[0]
	}
  
	return "basic";
}

function checkTemplateFolder(templateId) {
  try {
    fs.accessSync("./src/views/" + templateId, fs.F_OK);
    console.log(chalk.green(`Rendering template: ${template}`));
    return true;
  } catch (e) {
    console.log(chalk.red(`Can't find template: ${template}`));
    return false;
  }
}
