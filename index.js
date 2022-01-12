const fs = require('fs');
const Solver = require('./Solver');

// read file synchronously into an array of lines
/* the wordlist contains the top 10000 most common words in English 
   and is then limited to non-proper nouns
   five letters long
   with no repeating letters
*/
const wordlist = fs.readFileSync('five-letter-words.txt', 'utf8').split('\n');

let solver = new Solver(wordlist);
console.log(solver.GetLowScore());

/* everything after this is custom code to solve a particular puzzle */
solver.ExcludeLetterFromWordlist('i');
solver.ExcludeLetterFromWordlist('s');
solver.ExcludeLetterFromWordlist('e');
solver.RequireLetterFromWordlist('a');
solver.RequireLetterFromWordlist('r');
solver.ExcludeLetterFromPosition('a', 0);
solver.ExcludeLetterFromPosition('r', 1);
console.log(solver.GetLowScore());
solver.ExcludeLetterFromWordlist('c');
solver.ExcludeLetterFromWordlist('l');
solver.ExcludeLetterFromPosition('r', 2);
solver.RequireLetterInPosition('a', 1);
solver.RequireLetterInPosition('o', 3);
console.log(solver.GetLowScore());
solver.RequireLetterInPosition('r', 4);
solver.ExcludeLetterFromWordlist('m');
solver.ExcludeLetterFromWordlist('n');
console.log(solver.GetLowScore());
