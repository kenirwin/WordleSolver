const fs = require('fs');
const Solver = require('./Solver');

// read file synchronously into an array of lines
/* the wordlist contains the top 10000 most common words in English 
   and is then limited to non-proper nouns
   five letters long
   with no repeating letters
*/
const wordlist = fs.readFileSync('./wordlists/top-20k.txt', 'utf8').split('\n');

let solver = new Solver(wordlist);
console.log(solver.GetLowScore(false));

/* everything after this is custom code to solve a particular puzzle */
solver.ExcludeLetterFromWordlist('r');
solver.ExcludeLetterFromWordlist('s');
solver.ExcludeLetterFromWordlist('i');
solver.RequireLetterInPosition('a', 0);
solver.RequireLetterInWordlist('e');
solver.ExcludeLetterFromPosition('e', 4);
console.log(solver.GetLowScore(false));
// console.log(solver.GetLowScore());
solver.RequireLetterInPosition('e', 3);
solver.ExcludeLetterFromWordlist('c');
solver.ExcludeLetterFromWordlist('t');
solver.ExcludeLetterFromWordlist('d');
console.log(solver.GetLowScore(false));
solver.ExcludeLetterFromWordlist('n');
solver.ExcludeLetterFromWordlist('g');
solver.ExcludeLetterFromWordlist('l');
console.log(solver.GetLowScore());
// solver.ExcludeLetterFromWordlist('l');
// solver.RequireLetterInPosition('y', 4);
// console.log(solver.GetLowScore());
