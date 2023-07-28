const fs = require('fs');
const path = require('path');

function addDoubleSlashes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = content.replace(/console\.log\(/g, '// // console.log(');
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
}

function processFiles(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.js')) {
      addDoubleSlashes(filePath);
    }
  });
}

const projectDirectory = process.cwd(); // Use the current working directory as the project directory.
processFiles(projectDirectory);
