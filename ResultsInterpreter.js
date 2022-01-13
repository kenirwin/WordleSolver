module.exports = class ResultsInterpreter {
  constructor(word, results) {
    this.word = word.split('');
    this.results = results.split('');
    let lettersToExclude = this.getLettersToExclude();
    // console.log('exclude', lettersToExclude);
    let lettersToRequire = this.getLettersToRequire();
    // console.log('require', lettersToRequire);
    let letterstoRequirePosition = this.getLettersToRequirePosition();
    // console.log('require position', letterstoRequirePosition);
    return { lettersToExclude, lettersToRequire, letterstoRequirePosition };
  }

  getLettersToExclude() {
    // find each underscore in results
    let underscoreIndexes = [];
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i] === '_') {
        underscoreIndexes.push(i);
      }
    }
    // for each underscoreIndex get the matching letter in word
    let lettersToExclude = underscoreIndexes.map((index) => this.word[index]);
    return lettersToExclude;
  }

  getLettersToRequire() {
    // find each lowercase letter in results
    let lowercaseIndexes = [];
    for (let i = 0; i < this.results.length; i++) {
      // if results[i] matches regex /[a-z]/
      if (this.results[i].match(/[a-z]/)) {
        lowercaseIndexes.push(i);
      }
    }
    // for each uppercaseIndex get the matching letter in word
    let lettersToRequire = lowercaseIndexes.map((index) => this.word[index]);
    return lettersToRequire;
  }

  getLettersToRequirePosition() {
    // find each uppercase letter in results
    let uppercaseIndexes = [];
    for (let i = 0; i < this.results.length; i++) {
      // if results[i] matches regex /[A-Z]/
      if (this.results[i].match(/[A-Z]/)) {
        uppercaseIndexes.push(i);
      }
    }
    // for each uppercaseIndex get the matching letter in word
    let lettersToRequirePosition = uppercaseIndexes.map((index) => {
      return { letter: this.word[index], position: index };
    });
    return lettersToRequirePosition;
  }
};
