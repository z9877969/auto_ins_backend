const path = require('path');
const fs = require('fs/promises');

const pathToLogsDir = path.resolve('logs');

const addLog = async (error = { message: 'errorMEssage' }) => {
  try {
    const dateStr = new Date().toLocaleString().split(',')[0];

    const dirInside = await fs.readdir(pathToLogsDir);
    const curDateErrorsFile = dateStr + '.json';

    if (!dirInside.includes(curDateErrorsFile)) {
      await fs.writeFile(
        path.join(pathToLogsDir, curDateErrorsFile),
        JSON.stringify([error], null, 2)
      );
    } else {
      const errorDataBuffer =
        (await fs.readFile(path.join(pathToLogsDir, curDateErrorsFile))) || [];
      const errorData = JSON.parse(errorDataBuffer);
      await fs.writeFile(
        path.join(pathToLogsDir, curDateErrorsFile),

        JSON.stringify([...errorData, error], null, 2)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addLog,
};
