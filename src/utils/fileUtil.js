const fs = require('fs');
const { promisify } = require('util');
const readFilePromisify = promisify(fs.readFile);

class FileUtil {

  static async readFile(file) {
    const content = await readFilePromisify(file);
    return JSON.parse(content);
  }

}

module.exports = FileUtil;