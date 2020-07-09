const diceware = require('diceware');

function getPassword(count) {
  const words = diceware(count).split(' ');
  for(let index = 0; index < words.length; index += 1) {
    words[index] = words[index][0].toUpperCase() + words[index].substring(1);
  }
  return words.join('');
}

module.exports = getPassword;
