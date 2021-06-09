import fs from "fs";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * PhantomJS prefers paths starting with file:///...
 */
function getFileProtocolPath() {
  if (os.platform() === "win32") {
    var path = __dirname.split("\\");
  } else {
    var path = __dirname.split("/");
  }
  path[0] = "file://";
  return path.join("/");
}

const loadCvData = (cvPath = "./data/cv.json", template, devMode) => {
  const cvData = fs.readFileSync(cvPath, "utf-8");
  const personalData = fs.readFileSync("./data/personal_data.json", "utf-8");

  /**
   * Helper stuff for template
   */
  const meta = {
    template,
    devMode,
    root: devMode ? template : `${getFileProtocolPath()}/views/${template}`,
  };

  return {
    ...JSON.parse(cvData),
    ...JSON.parse(personalData),
    meta,
  };
};

export default loadCvData;
