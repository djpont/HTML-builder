const fs = require('fs');
const path = require('path');
const { stdin } = require('node:process');
const { Readable } = require('stream');

const writing = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});
const reading = Readable.from(stdin);

console.log(
  'Вводите текст, он будет сохранён в text.txt. Для завершения поставьте пустую строку:',
);

reading.on('data', (chunk) => {
  const text = `${chunk}`;
  if (text === '\n') {
    reading.destroy();
    return;
  }
  writing.write(text);
});

reading.on('end', () => {
  console.log('Текст сохранён в файл text.txt');
  writing.end();
});

process.on('SIGINT', () => {
  console.log(' Текст сохранён в файл text.txt');
  writing.end();
  process.exit();
});
