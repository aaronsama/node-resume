import chalk from "chalk";
import Q from "q";
import twig from "twig";
import fs from "fs";
import pdf from 'html-pdf';

/**
 * Render template and generate PDF
 */
const cvToPdf = (cvData, template) => {
  const pdfOptions = JSON.parse(fs.readFileSync("./pdf-options.json"));

  /**
   * Tell "html-pdf" which template to look assets for
   */
  pdfOptions.base += template;

  const createTemplate = Q.denodeify(twig.renderFile);
  const renderedTemplate = createTemplate(
    `src/views/${template}/cv.twig`,
    cvData,
  );

  renderedTemplate
    .then((html) => {
      console.log(chalk.green("Looks good, just a second..."));

      console.log(html);

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
