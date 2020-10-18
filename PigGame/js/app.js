var scores, roundScore, activePlayer, gamePlaying, dice, winningScore;
var lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){

  if (gamePlaying) {
    // Generate Random number for the dice
     dice = Math.floor(Math.random() *6 + 1);
    // Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    if(dice ===6 && lastDice === 6 ){
      //Lose all the points
    scores[activePlayer] = 0;
    document.querySelector('#score-' +activePlayer).textContent = 0;
    nextPlayer();
    }

  else  if(dice >= 1 ){
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      // alert(roundScore);

    } else {

      nextPlayer();
    }
  }
  lastDice = dice;

});

  document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var userInput = document.querySelector('.winning-score').value;
      if(userInput){
        winningScore = userInput;
      }else{
        winningScore = 20;
      }

      if(scores[activePlayer] >= winningScore){
        document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
        gamePlay = false;
      }else{
        nextPlayer();

      }
    }


});


function nextPlayer() {

    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
