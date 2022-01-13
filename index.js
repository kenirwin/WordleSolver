const fs = require('fs');
let wordlist = fs.readFileSync('./wordlists/top-20k.txt', 'utf8').split('\n');
const scrabble = fs
  .readFileSync('./wordlists/scrabble.txt', 'utf8')
  .split('\n');
// console.log('starting wordlist length: ' + wordlist.length);
// find the overlap between wordlist and scrabble
wordlist = wordlist.filter((word) => scrabble.includes(word));
// console.log('revised wordlist length: ' + wordlist.length);
const inquirer = require('inquirer');
const Interpreter = require('./ResultsInterpreter');
const Solver = require('./Solver');
const solver = new Solver(wordlist);
let weWon = false;

results = solver.GetLowScore(false);
console.log('List Length: ' + results.listLength);
console.log('TRY: ' + results.nextWordToTry);
OneRound(results.nextWordToTry);

function OneRound(wordToTry) {
  inquirer
    .prompt([{ name: 'correct', message: 'What is the correct answer (y/n)?' }])
    .then((answers) => {
      if (answers.correct === 'y') {
        console.log('Correct!');
        weWon = true;
      } else {
        inquirer
          .prompt([
            {
              name: 'results',
              message:
                'Results (uppercase for Correct, - for Wrong, lowercase for Wrong Place)?',
            },
          ])
          .then((answers) => {
            let instructions = new Interpreter(wordToTry, answers.results);
            console.log(instructions);
            // always require before exluding
            instructions.lettersToRequire.forEach((letter) => {
              solver.RequireLetterInWordlist(letter);
            });
            instructions.lettersToRequirePosition.forEach((letter) => {
              solver.RequireLetterInPosition(letter.letter, letter.position);
            });
            instructions.lettersToExcludeFromPosition.forEach((item) => {
              solver.ExcludeLetterFromPosition(item.letter, item.position);
            });
            instructions.lettersToExclude.forEach((letter) => {
              solver.ExcludeLetterFromWordlist(letter);
            });
            results = solver.GetLowScore();
            console.log('List Length: ' + results.listLength);
            console.log('TRY: ' + results.nextWordToTry);
            OneRound(results.nextWordToTry);
          });
      }
    });
}
