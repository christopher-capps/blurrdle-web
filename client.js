
let theTracker = {
    "guess" : " ",
    "columns" : [],
    "guessHistory" : [],
    "correct" : false,
    "clueRows" : []
}

const congrats = 'CONGRATULATIONS! YOU GUESSED ';

let currentGuess = '';
let lettersGuessed = 0;
let displayedOnce = false;

function clickLetter(event) {
    const guessLetter = event.target.value;

    if (lettersGuessed <= theTracker.columns.length) {
        const slotId = 'slot' + lettersGuessed;
        const guessSlot = document.getElementById(slotId);
        guessSlot.innerText = guessLetter
        guessSlot.classList.add('filled-guess');
        currentGuess += guessLetter;
        lettersGuessed += 1;
    }
}

function clickBackspace() {

    if (lettersGuessed > 0) {
        
        const slotId = 'slot' + (lettersGuessed - 1);
        const slotToDelete = document.getElementById(slotId);
        slotToDelete.innerText = '?';
        slotToDelete.classList.remove('filled-guess');

        if (lettersGuessed === 1) {
            currentGuess = '';
        } else {
                    currentGuess = currentGuess.substring(0, lettersGuessed - 1);
        }

        lettersGuessed -= 1; 
        
    }
}

function sendGuess() {
    const url = 'https://blurrdle.herokuapp.com/puzzle';

    theTracker.guess = currentGuess;
    currentGuess = '';
    lettersGuessed = 0;

    const options = {
        method: 'POST',
        body: JSON.stringify(theTracker),
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    fetch(url, options)
        .then(processResponse).then(mapResponse).then(displayTracker);
}

function displayTracker(theTracker) {
   const mainContainer = document.querySelector('#main-container');

   if (!theTracker.correct) {

    if (displayedOnce) {
        for (let i = 0; i < theTracker.columns.length; i++) {
            let columnToDeleteId = 'column' + i;
            let columnToDelete = document.getElementById(columnToDeleteId);
            mainContainer.removeChild(columnToDelete);
        }
    }
 
    for (let i = 0; i < theTracker.columns.length; i++) {
     const newColumn = document.createElement('div');
 
     const slot1 = document.createElement('span');
     const slot2 = document.createElement('span');
     const slot3 = document.createElement('span');
     const slot4 = document.createElement('span');
     const slot5 = document.createElement('span');
     const slot6 = document.createElement('span');
 
     if (theTracker.columns[i].possibleLetters.length > 0) {
         slot5.innerText = theTracker.columns[i].possibleLetters[0];
         slot5.classList.add('filled-clue')
     } else {
         slot5.innerText = '_';
     }
 
     if (theTracker.columns[i].possibleLetters.length > 1) {
      slot4.innerText = theTracker.columns[i].possibleLetters[1];
      slot4.classList.add('filled-clue')
      } else {
      slot4.innerText = '_';
      }
 
      if (theTracker.columns[i].possibleLetters.length > 2) {
          slot3.innerText = theTracker.columns[i].possibleLetters[2];
          slot3.classList.add('filled-clue')
      } else {
          slot3.innerText = '_';
      }
 
      if (theTracker.columns[i].possibleLetters.length > 3) {
          slot2.innerText = theTracker.columns[i].possibleLetters[3];
          slot2.classList.add('filled-clue')
      } else {
          slot2.innerText = '_';
      }
 
      if (theTracker.columns[i].possibleLetters.length > 4) {
          slot1.innerText = theTracker.columns[i].possibleLetters[4];
          slot1.classList.add('filled-clue')
      } else {
          slot1.innerText = '_';
      }
 
      let slotId = 'slot';
      slotId += i;
      slot6.innerText = '?';
      slot6.id = slotId;
 
      newColumn.appendChild(slot1);
      newColumn.appendChild(slot2);
      newColumn.appendChild(slot3);
      newColumn.appendChild(slot4);
      newColumn.appendChild(slot5);
      newColumn.appendChild(slot6);
      newColumn.classList.add('column');
 
      let columnId = 'column';
      columnId += i;
 
      newColumn.id = columnId;
 
 
      mainContainer.appendChild(newColumn);
    }
 
    const recentGuess = document.getElementById('recent-guess');
    recentGuess.innerText = 'Most Recent Guess: ';
    if (theTracker.guessHistory.length > 0) {
        recentGuess.innerText += theTracker.guessHistory[theTracker.guessHistory.length - 1];
    }

    displayedOnce = true;

   } else {
        
        for (let i = 0; i < theTracker.columns.length; i++) {
        let columnToDeleteId = 'column' + i;
        let columnToDelete = document.getElementById(columnToDeleteId);
        mainContainer.removeChild(columnToDelete);
        }

        let congratsFull = congrats + theTracker.guessHistory[theTracker.guessHistory.length - 1] + ' IN ONLY ' + theTracker.guessHistory.length + ' GUESS';
        if (theTracker.guessHistory.length > 1) {
            congratsFull + 'es';
        }

        congratsFull + '!'

        let congratsMessageElement = document.createElement('p');
        congratsMessageElement.innerText = congratsFull;
        mainContainer.appendChild(congratsMessageElement);
        
    }


}


function mapResponse(guessTracker) {
    theTracker.guess = guessTracker.guess;
    theTracker.columns = guessTracker.columns;
    theTracker.guessHistory = guessTracker.guessHistory;
    theTracker.correct = guessTracker.correct;
    theTracker.clueRows = guessTracker.clueRows;
    return theTracker;
}

function processResponse(response) {
    return response.json();
}

function startGame() {
    const url = 'https://blurrdle.herokuapp.com/puzzle';

    fetch(url).then(processResponse).then(mapResponse).then(displayTracker);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    const allLetters = document.querySelectorAll('.letter');
    allLetters.forEach( (letter) => {
        letter.addEventListener('click', clickLetter)
    });

    const backspaceButtonElement = document.querySelector('.back');
    backspaceButtonElement.addEventListener('click', clickBackspace);

    const enterButtonElement = document.getElementById('enter-btn');
    enterButtonElement.addEventListener('click', sendGuess);
})