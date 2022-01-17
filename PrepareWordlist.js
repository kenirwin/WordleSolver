const config = require('config');
const fs = require('fs');
const path = require('path');

let wordfile = config.get('wordfile');
// read file
let wordlist = fs
  .readFileSync(path.join(__dirname, '.', 'wordlists', wordfile), 'utf8')
  .split('\n');

let wordlistIsAllCorrectLength = config.get('wordlistIsAllCorrectLength');
let wordLength = config.get('wordLength');
if (wordlistIsAllCorrectLength !== true) {
  console.log('limiting to: ', wordLength);
  wordlist = wordlist.filter((word) => {
    return word.length == wordLength;
  });
}

let needToRemoveProperNouns = config.get('needToRemoveProperNouns');
console.log('needToRemoveProperNouns: ', needToRemoveProperNouns);
if (needToRemoveProperNouns == 'true') {
  console.log('limiting to scrabble words');
  const scrabble = fs
    .readFileSync('./wordlists/scrabble.txt', 'utf8')
    .split('\n');
  // console.log('starting wordlist length: ' + wordlist.length);
  // find the overlap between wordlist and scrabble
  wordlist = wordlist.filter((word) => scrabble.includes(word));
  console.log('revised wordlist length: ' + wordlist.length);
}

module.exports = wordlist;
