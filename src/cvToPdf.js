import chalk from "chalk";
import Q from "q";
import twig from "twig";
import fs from "fs";
import pdf from 'html-pdf';
import _ from "lodash";

/**
 * Render template and generate PDF
 */
const cvToPdf = (cvData, template) => {
  const sharedPdfOptions = JSON.parse(fs.readFileSync("./pdf-options.json"));
  const templatePdfOptions = JSON.parse(fs.readFileSync(`./src/views/${template}/pdf-options.json`));

  const pdfOptions = _.merge(sharedPdfOptions, templatePdfOptions);

  const createTemplate = Q.denodeify(twig.renderFile);
  const renderedTemplate = createTemplate(
    `src/views/${template}/cv.twig`,
    cvData,
  );

  renderedTemplate
    .then((html) => {
      console.log(chalk.green("Looks good, just a second..."));

      var deferred = Q.defer();

      pdf.create(html, pdfOptions).toFile("./cv.pdf", (err, res) => {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(res);
        }
      });
      return deferred.promise;
    })
    .then(
      () => {
        console.log(chalk.cyan("SUCCESS: Your CV is baked as ordered!"));
      },
      (err) => {
        console.log(chalk.red("ERROR: " + err));
      },
    );
}

export default cvToPdf;
