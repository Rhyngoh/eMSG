const fs = require('fs');
const path = require('path');

function addDoubleSlashes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = content.replace(/console\.log\(/g, (match, offset, fullString) => {
    const previousTwoChars = fullString.slice(offset - 3, offset);
    if (previousTwoChars === '// ') {
      return match; // If the line is already commented out, keep it unchanged.
    }
    return '// console.log('; // Otherwise, add double slashes to comment out the line.
  });
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
const srcDirectory = path.join(projectDirectory, 'src');

// Start processing files within the 'src' directory and its subdirectories.
processFiles(srcDirectory);
