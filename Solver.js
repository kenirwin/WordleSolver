module.exports = class Solver {
  constructor(wordlist) {
    // frequency based on: https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html
    let frequencyString = 'EARIOTNSLCUDPMHGBFYWKVXZJQ'.toLowerCase();
    // split frequencyString into an array of characters
    this.frequencyArray = frequencyString.split('');
    // split wordlist into an array of words
    this.wordlist = wordlist;
  }

  GetStringScore(str) {
    str = str.toLowerCase();
    // for each character in str, find the index of the character in frequencyArray
    // and return the index
    let score = 0;
    for (let i = 0; i < str.length; i++) {
      score += this.frequencyArray.indexOf(str[i]);
    }
    return score;
  }

  ExcludeLetterFromWordlist(letter) {
    this.wordlist = this.wordlist.filter((word) => word.indexOf(letter) === -1);
  }

  RequireLetterFromWordlist(letter) {
    this.wordlist = this.wordlist.filter((word) => word.indexOf(letter) !== -1);
  }

  ExcludeLetterFromPosition(letter, position) {
    this.wordlist = this.wordlist.filter((word) => word[position] !== letter);
  }
  RequireLetterInPosition(letter, position) {
    this.wordlist = this.wordlist.filter((word) => word[position] === letter);
  }

  GetLowScore() {
    let lowscore = 100;
    let lowword = '';
    this.wordlist.forEach((word) => {
      let score = this.GetStringScore(word);
      if (score < lowscore && score > 0) {
        lowscore = score;
        lowword = word;
      }
    });
    return lowword;
  }
};
