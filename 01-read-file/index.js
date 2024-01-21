const fs = require('fs');
const path = require('path');

const content = fs.createReadStream(path.join(__dirname, 'text.txt'));
content.setEncoding('UTF8');
content.forEach((chunk) => {
  console.log(chunk);
});
