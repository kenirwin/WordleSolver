const inquirer = require('inquirer');
const Interpreter = require('./ResultsInterpreter');
const Solver = require('./Solver');
const wordlist = require('./PrepareWordlist');
const solver = new Solver(wordlist);
let weWon = false;

console.log('Start at: ' + 'https://www.powerlanguage.co.uk/wordle/');
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
