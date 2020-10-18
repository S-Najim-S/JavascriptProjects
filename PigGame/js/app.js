var scores, roundscore, activePlayer, gamePlay;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

  if (gamePlay) {
    // Generate Random number for the dice
    var dice = Math.floor(Math.random() *6 + 1);

    // Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    if(dice !== 1 ){

      roundscore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundscore;

    } else {

      nextPlayer();
    }
  }

});

  document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlay) {
      scores[activePlayer] += roundscore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      if(scores[activePlayer] >= 20){
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

    roundscore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  gamePlay = true;
  scores = [0,0];
  roundscore = 0;
  activePlayer = 0;

  document.getElementById('name-0').textContent = "Player 1";
  document.getElementById('name-1').textContent = "Player 2";
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
  document.querySelector('.dice').style.display = 'none';

}
