const fs = require('fs').promises;
const path = require('path');

async function copyDir(fromFolder, toFolder) {
  const copyFrom = path.join(__dirname, fromFolder);
  const copyTo = path.join(__dirname, toFolder);

  try {
    await fs.rm(copyTo, { recursive: true, force: true });
    await fs.mkdir(copyTo, { recursive: true });

    const filePaths = await fs.readdir(copyFrom);

    for (const filePath of filePaths) {
      const fullFilePath = path.join(copyFrom, filePath);
      const newFilePath = path.join(copyTo, filePath);
      const stats = await fs.stat(fullFilePath);

      if (stats.isFile()) {
        await fs.copyFile(fullFilePath, newFilePath);
      } else {
        await copyDir(fullFilePath, newFilePath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir('files', 'files-copy');
