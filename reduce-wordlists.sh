#!/bin/bash

infile=$1
outfile="${infile%.*}-reduced.txt"

# compare infile and outfile and print out the intersection
comm -12 <(sort wordlists/scrabble.txt)  <( tr -d '\r' < $infile | sort ) > $outfile
