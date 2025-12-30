import 'dotenv/config';
import fs from 'fs-extra';
import path from 'path';

function separateWords(input) {
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Add underscore between camelCase parts
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') // Handle cases like "XMLHttpRequest"
    .replace(/[-\s]+/g, '_') // Replace hyphens and spaces with underscores
    .trim(); // Remove trailing spaces
}

function toCamelCase(input) {
  return input
    .toLowerCase()
    .split('_')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

function toPascalCase(input) {
  return input
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toKebabCase(input) {
  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add a hyphen between camelCase words
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase();
}
function toSnakeCase(input) {
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Add an underscore between camelCase words
    .replace(/[\s\-]+/g, '_') // Replace spaces and hyphens with underscores
    .toLowerCase();
}


function toUpperCase(input) {
  return separateWords(input).toUpperCase();
}

const perform = (moduleName, replacingDir, fileExtension) => {
  const files = fs.readdirSync(replacingDir);
  const module_Name = separateWords(moduleName);
  const moduleNamePascal = toPascalCase(module_Name);
  const moduleNameKebab = toKebabCase(module_Name);
  const moduleNameSnakeCase = toSnakeCase(module_Name);
  const moduleNameCamel = toCamelCase(module_Name);
  const moduleNameConst = toUpperCase(module_Name);

  // Rename each file, replace placeholders, and replace extension
  files.forEach((file) => {
    let newFile = file.replace('X', moduleNamePascal);
    newFile = newFile.replace('stub', fileExtension);
    fs.renameSync(replacingDir + '/' + file, replacingDir + '/' + newFile);

    fs.readFile(replacingDir + '/' + newFile, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data
        .replace(/_X_/g, moduleNamePascal)
        .replace(/_XX_/g, moduleNameCamel)
        .replace(/_x-x_/g, moduleNameKebab)
        .replace(/_x_x_/g, moduleNameSnakeCase)
        .replace(/_XXXX_/g, moduleNameConst)
        .replace(/useReadX/g, `useRead${moduleNamePascal}`);

      fs.writeFile(
        replacingDir + '/' + newFile,
        result,
        'utf8',
        function (err) {
          if (err) return console.log(err);
        }
      );
    });
  });
};

const renameAndReplaceHooks = (moduleName, destDir) => {
  const hooksDir = destDir + '/hooks';
  perform(moduleName, hooksDir, 'ts');
};

const renameAndReplaceTypes = (moduleName, destDir) => {
  const typesDir = destDir + '/types';
  perform(moduleName, typesDir, 'ts');
};

const renameAndReplaceRoutes = (moduleName, destDir) => {
  const routesDir = destDir + '/routes';
  perform(moduleName, routesDir, 'tsx');
};

const renameAndReplacePages = (moduleName, destDir) => {
  const pagesDir = destDir + '/pages';
  perform(moduleName, pagesDir, 'tsx');
};

const renameAndReplaceConstants = (moduleName, destDir) => {
  const constantsDir = destDir + '/constants';
  perform(moduleName, constantsDir, 'ts');
};

// Command-line interface logic
const runCommandLine = () => {
  const args = process.argv.slice(2);

  const moduleName = args[0];

  if (!moduleName) {
    console.log('Error: moduleName is required.');
    return;
  }

  const destination = path.resolve(
    `${process.env.FRONTEND_PATH}/src/modules/${process.env.DESTINATION_MODULE_NAME}`
  );
  const templatesDir = path.resolve(__dirname, 'templates');

  const destDir = path.resolve(destination + '/' + moduleName);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copySync(templatesDir, destDir);

  // Rename all files
  renameAndReplaceHooks(moduleName, destDir);
  renameAndReplaceTypes(moduleName, destDir);
  renameAndReplaceRoutes(moduleName, destDir);
  renameAndReplacePages(moduleName, destDir);
  renameAndReplaceConstants(moduleName, destDir);

  console.log('Module generation completed.');
};

runCommandLine();
