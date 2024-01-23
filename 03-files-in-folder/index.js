const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, 'secret-folder');

try {
  fs.promises.readdir(folderPath).then((fileNames) => {
    fileNames.forEach((fileName) => {
      const absoluteFilePath = path.join(folderPath, fileName);
      fs.stat(absoluteFilePath, (_, stats) => {
        if (stats.isFile()) {
          console.log(
            `${fileName.split('.')[0]} - ${path
              .extname(fileName)
              .slice(1)} - ${Math.round(stats.size / 1024)}kB`,
          );
        }
      });
    });
  });
} catch (err) {
  console.error(err);
}
