# Node resume
This projects helps to generate a PDF resume based on a JSON file. By default two designs are supplied. This is a fork of node-resume by Tibor Szász (https://github.com/tiborsaas/node-resume).

This fork adds the possibility to add your publications from a BiBTeX file.

[Check out my CV as an example](cv.pdf)

## Usage
Just edit a json, use the command line and you are ready to go.

### Step 1

Install dependenceis with `npm install`.

### Step 2

Edit the contents of `data/cv-empty.json` and save it as `data/cv.json`. Copy the file `data/personal_data_empty.json` into a new file called `data/personal_data.json` and fill in your personal data. This file is always merged with the main cv file and it is gitignored so that you don't inadvertently share your personal data with the rest of the world.

### Step 2b (optional)

Edit or add your publications to `data/bibliography.bib`

### Step 3

Type `npm start` in command line. That will render the default template called "basic". You can render other templates by adding the template name that you can find the the `views` folder, like `npm start classic`.

### Advanced Usage

#### Skipping sections

You can skip sections to generate custom CVs for different employers by typing

```
npm start [template_name] -- --skip=<comma separated section names>
```

#### Using different source files

You can specify a JSON file different than `data/cv.json` by typing

```
npm start [template_name] -- --cv=<path/to/cv_file>
```

DONE :)

## Making changes to the template

For convinence, I've added a dev server that can be launched with the `npm start dev` command. `npm start dev [templatename]` will launch the desired template.

### Important
If you make changes to the template, the dev server needs to be re-launched.

## Used technologies
 * Twig template engine
 * html-pdf
 * Phantom JS
