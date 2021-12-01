'use strict';

// ----- VARIABLES

// DOM
const announcement   = document.querySelector ('.resultat h2');
const battleScreen   = document.querySelector('.bataille');
const choices        = document.getElementsByClassName('choix');
const computerChoice = document.getElementById('choix-ordinateur');
const introScreen    = document.querySelector('.selection');
const modal          = document.querySelector('.modal')
const playAgainBtn   = document.querySelector('.resultat button');
const playerChoice   = document.getElementById('choix-joueur');
const resultScreen   = document.querySelector('.resultat');
const hideRulesBtn   = document.querySelector('.modal-nav img');
const showRulesBtn   = document.querySelector('footer button');
const scoreDisplay   = document.getElementById('score');

// INIT
let possibilities = ['pierre', 'papier', 'ciseaux'];
let randomPick;
let result;


// ----- FONCTIONS

function play(e){
    displayBattle(e.target.dataset.name);
    setTimeout(function(){
        displayResults(e.target.dataset.name, randomPick)
        updateScore(result);
    }, 3000);
}

function displayBattle(playerPick){

    //Player 
    let divPlayer = document.createElement('div');
    divPlayer.classList.add(playerPick);
    divPlayer.classList.add('round-img');
    playerChoice.prepend(divPlayer)

    //Animation
    computerAnimation();
    
    //Display
    introScreen.style.display = 'none';
    showRulesBtn.style.display = 'none';
    battleScreen.style.display = 'flex';

    // Final Computer Pick
    setTimeout(function(){
        randomPick = possibilities[Math.floor(Math.random()*3)];
        let divComputer = document.createElement('div');
        divComputer.classList.add(randomPick);
        divComputer.classList.add('round-img');
        computerChoice.prepend(divComputer);
    }, 3000); 
}

function displayResults (player, computer){

    // Calcul du gagnant
    if (computer === player){
        result = 'draw';
    }
    else {
        switch (player) {
            case 'papier':
                if (computer == 'pierre'){
                    result = 'you win';
                }
                else {
                    result = 'you lose';
                }
                break;
                
            case 'ciseaux': 
                if (computer == 'papier'){
                    result = 'you win';
                }
                else {
                    result = 'you lose';
                }
                break;

            case 'pierre': 
                if (computer == 'ciseaux'){
                    result = 'you win';
                }
                else {
                    result = 'you lose';
                } 
                break;
        }
    } 

    //Affichage
    announcement.textContent = result;
    resultScreen.style.display = 'block';  
}

function computerAnimation(){
    let delay = 100;
    let animationDiv = document.createElement('div');
    animationDiv.classList.add('round-img');
    computerChoice.prepend(animationDiv);

    let animation = setInterval(function(){
        for (let i = 0; i < possibilities.length; i++){
            setTimeout(function(){
                animationDiv.classList.add(possibilities[i]);
            },delay)
            setTimeout(function(){
                animationDiv.classList.remove(possibilities[i]);
            }, delay + 100)
            delay += 100;
        }
    },100);
    
    setTimeout(function(){
        clearInterval(animation)
        computerChoice.removeChild(computerChoice.firstChild);
    }, 3000);    
}

function playAgain(){

    // Reset Bataille
    playerChoice.removeChild(playerChoice.firstChild); 
    computerChoice.removeChild(computerChoice.firstChild); 

    // Display
    resultScreen.style.display = 'none';
    battleScreen.style.display = 'none';
    showRulesBtn.style.display = 'inline';
    introScreen.style.display = 'block';
}

function updateScore(result){
    let currentScore = parseInt(scoreDisplay.textContent);
    (result == 'gagné') ? scoreDisplay.textContent = currentScore + 1 : null;
}

function showRules(){
    modal.style.display = 'block';
}

function hideRules(){
    modal.style.display = 'none';
}

// ----- EVENEMENTS

for (let choice of choices){
    choice.addEventListener('click', play);
}

if (playAgainBtn){
    playAgainBtn.addEventListener('click', playAgain);
}

showRulesBtn.addEventListener('click', showRules);
hideRulesBtn.addEventListener('click', hideRules);
window.addEventListener('click',  function(e){
    if (e.target == modal){
        hideRules();
    }
})
