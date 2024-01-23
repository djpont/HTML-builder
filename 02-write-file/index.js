const fs = require('fs');
const path = require('path');
const { stdin } = require('node:process');
const { Readable } = require('stream');

try {
  const writing = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
    encoding: 'utf8',
  });
  const reading = Readable.from(stdin);

  console.log(
    'Вводите текст, он будет сохранён в text.txt. Для завершения напишите exit:',
  );

  reading.on('data', (chunk) => {
    const text = `${chunk}`;
    if (text.trim() === 'exit') {
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
} catch (err) {
  console.error(err);
}
