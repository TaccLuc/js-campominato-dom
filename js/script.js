const playButton = document.getElementById('playButton');
const difficulty100 = document.getElementById('difficulty_100');
const difficulty81 = document.getElementById('difficulty_81');
const difficulty49 = document.getElementById('difficulty_49');
const resetButton = document.getElementById('resetButton');
const cellContainer = document.querySelector('.cell_container');
const scoreBoard = document.querySelector('.scoreBoard');
const bombs = [];

// SCORE
let score = 0;

// DIFFICULTY BUTTONS
let difficulty = 0;

difficulty100.addEventListener('click', function(){
    difficulty = 100;
});

difficulty81.addEventListener('click', function(){
    difficulty = 81;
});

difficulty49.addEventListener('click', function(){
    difficulty = 49;
});

// PLAY BUTTON
let resetCounter = 0;
playButton.addEventListener('click', function(){

    randomNotRepeatedNumber(16, difficulty, bombs);
    console.log(bombs);

    if (difficulty == 0){
        alert('Seleziona una difficoltà!');
    }
    else if (resetCounter == 1){
        cellContainer.innerHTML = '';
        generateTable(difficulty);
    }
    else{
        generateTable(difficulty)
        resetCounter = 1;
    }
});

// RESET BUTTON
resetButton.addEventListener('click', function(){
    cellContainer.innerHTML = '';
    difficulty = 0;
    score = 0;
    cellContainer.classList.remove('lostBoard');
});

// FUNCTIONS
function generateTable(x) { 
    for (let i = 1; i <= x; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell_' + x);
        cell.innerHTML = i;
        let clicked = false;
        
        cell.addEventListener('click', function(){
            comparison(i, bombs, cell)
            this.classList.add('active');
            if(score === x - 17 || bombs.includes(i)){
                cellContainer.classList.add('lostBoard');
            }
            else if (!clicked && !bombs.includes(i)) {
                score++;
                clicked = true;
                document.getElementById('score').innerHTML = score;
            }

        });
        cellContainer.append(cell);
    }
}

function randomNumber (min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNotRepeatedNumber(x, y, randomNumbersArray){
    do{
        const aNumber = randomNumber(1, y);
    
        if (!randomNumbersArray.includes(aNumber)) {
            randomNumbersArray.push(aNumber);
        }
    }
    while (randomNumbersArray.length < x) {
    }

    return randomNumbersArray;
}

function comparison(x, y, singleElement) {
    if (y.includes(x)) {
        singleElement.classList.add('lost');
        singleElement.innerHTML = 'HAI PERSO!';
    }
}

