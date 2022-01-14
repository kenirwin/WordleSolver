To-Do:

- create a scrabble-reduced 20k list
- create reduction script
- allow for dynamic reduction
- set up a config file instead of config in the index
- dynamic frequency adjustment
- dynamic (or static) letters-in-place discernment (in the remaining list, what's the most likely first letter)

Wordlists:

20k from Google:
https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt

10k from here, contains a bunch of proper nouns:
https://englishgrammarhere.com/vocabulary/10000-most-common-words-in-english/

Wordle has used words from the 20k list that aren't in the 10k list, so that's what I'm using for now.

Scrabble word list:
https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt

Starting wordlist is compared against the scrabble list to exclude proper nouns.
