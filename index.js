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
console.log(solver.GetLowScore());

/* everything after this is custom code to solve a particular puzzle */
solver.ExcludeLetterFromWordlist('r');
solver.ExcludeLetterFromWordlist('n');
solver.RequireLetterInPosition('a', 0);
solver.RequireLetterFromWordlist('e');
solver.ExcludeLetterFromPosition('e', 2);
console.log(solver.GetLowScore());
solver.RequireLetterInPosition('e', 3);
solver.ExcludeLetterFromWordlist('s');
solver.ExcludeLetterFromWordlist('t');
console.log(solver.GetLowScore());
solver.ExcludeLetterFromWordlist('i');
solver.ExcludeLetterFromWordlist('m');
solver.ExcludeLetterFromWordlist('d');
console.log(solver.GetLowScore());
solver.ExcludeLetterFromWordlist('l');
solver.RequireLetterInPosition('y', 4);
console.log(solver.GetLowScore());
