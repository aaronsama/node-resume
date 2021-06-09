import express from 'express';
import chalk from 'chalk';

const port = 9999;

const startDevMode = (cvData, template) => {
  const app = express();

  app.use(express.static('src/views'));
  app.set('views', 'src/views');

  app.get("/", (_req, res) => {
    res.render(`${template}/cv.twig`, cvData)
  });

  app.listen(port, () => {
    console.log(chalk.green(`Dev server running on http://localhost:${port}`));
  });

  app.set("twig options", {
    strict_variables: false,
    cache: false,
    auto_reload: true,
  });

  return; // don't render anything from now on
};

export default startDevMode;
