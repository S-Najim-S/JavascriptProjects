let maxHealth = 100;

const playerAttackValue = 5;
const monsterAttackValue = 8;
const strongAttackValue = 12;
const healValue = 15;
let hasBounsLife = true;

let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;

adjustHealthBars(maxHealth);

function endRound() {
    const intialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <=0 && hasBounsLife){
        hasBounsLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerHealth;
        setPlayerHealth(intialPlayerHealth); 
        alert("The bouns life saved your ass!!!");
    }
    if (currentMonsterHealth <=0 && currentPlayerHealth > 0) {
        alert("You won!!");
    }
    else if(currentPlayerHealth <= 0  && currentMonsterHealth >0){
        alert("You lost!!!");
    }
    else if(currentMonsterHealth <=0 && currentPlayerHealth <= 0 ){
        alert("You draw with the monster!");
    }
    if (currentPlayerHealth<=0 || currentMonsterHealth<=0) {
        reset();
    }
};

function attackMonster(mode) {
    let maxDamage;
        if(mode === 'ATTACK'){
            maxDamage = playerAttackValue;
        }else if(mode === 'STRONG'){
            maxDamage = strongAttackValue;
        }
        const damage = dealMonsterDamage(maxDamage);
        currentMonsterHealth -= damage;
        endRound();
};

function attackHandler() {
    attackMonster('ATTACK'); 
};

function strongAttackHandler() {
    attackMonster('STRONG');
};

function playerHealHandler(){
    let playerHealValue;
    if (currentPlayerHealth >= maxHealth - healValue) {
        alert("You are fully recovered!");
        playerHealValue = maxHealth - currentPlayerHealth;
    } else{
        playerHealValue = healValue;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
};

function reset() {
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
    resetGame(maxHealth);
};



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', playerHealHandler);