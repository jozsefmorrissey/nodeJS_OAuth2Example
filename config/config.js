const propertiesReader = require('properties-reader');

const env = process.argv[2] || 'dev';
const configFile = `./config/${env}.${process.argv[3] || 'user'}.properties`;
if (process.argv[2] && process.argv[3]) {
  console.info(`Starting with config '${configFile}'`)
} else {
  console.warn(`Environment and or config type not set. Defaulting to dev.user.
    To set values simply run \n\t\tnode.js index.js [env] [config type]\n`);
}
const properties = propertiesReader(configFile);
console.log(JSON.stringify(properties));

module.exports = properties;
