# Blurrdle : A High-Difficulty Wordle Variant

Note: This is the server-side code. To actually play Blurrdle, you'll want to download and run the [Java CLI client.](https://github.com/christopher-capps/blurrdle-client)

Blurrdle is a project that I've built to have a little fun and to practice creating a Spring Boot RESTful API.


## How To Play
The goal of Blurrdle is simple: guess the word of the day in as few guesses as possible!
Inspired by the NYT Crossword, Blurrdle gets harder as the week goes on, and you are asked to guess longer and longer words.

| Day           | Number Of Letters |
| ------------- |:-----------------:|
| Monday        | 4                 |
| Tuesday       | 4                 |
| Wednesday     | 5                 |
| Thursday      | 5                 |
| Friday        | 6                 |
| Saturday      | 6                 |
| Sunday        | 7                 |

The primary difference between Blurrdle and Wordle is that you are given far less information from each of your guesses.  For each letter you guess, you are only told if that letter appears in either that position or a position adjacent to where you guessed it to be.  You are not told if the letter you guessed is not in the word at all.  Blurrdle does, however, track this information for you, and keeps a running log of the information you have gained about the word thus far (along with a history of all the guesses you've made).

For example:

Let's say the target word is "IRATE".
If you were to guess "RANTS", you would recieve the following feedback:

```bash

 A  A  T
 R  R  A  T  T
 ?  ?  ?  ?  ?

 R  A  N  T  S
```

The letters R, A, and T were all "hits" - meaning that the Target Word contained those letters in the same location or an adjacent location to the word that you guessed. Your job is to use this information to find the Target Word!
