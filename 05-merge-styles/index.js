const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(distFolder, 'bundle.css');

function isCssFile(file) {
  return path.extname(file) === '.css';
}

function compileStyles() {
  try {
    const files = fs.readdirSync(stylesFolder);
    const cssFiles = files.filter(isCssFile);

    const cssContentArray = [];

    cssFiles.forEach((file) => {
      const filePath = path.join(stylesFolder, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      cssContentArray.push(fileContent);
    });

    const bundleContent = cssContentArray.join('\n');

    if (!fs.existsSync(distFolder)) {
      fs.mkdirSync(distFolder);
    }

    fs.writeFileSync(outputFile, bundleContent, 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

// Run the compilation
compileStyles();
