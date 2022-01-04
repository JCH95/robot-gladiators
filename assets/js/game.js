// Fight function
var fight = function(enemy) {
    // Repeat and execute as long as enemy is still alive
    while(playerInfo.health > 0 && enemy.health > 0){
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");
        // If player chose to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // Generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            
            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                
                //Award money to player for winning
                playerInfo.money = playerInfo.money + 20;
                //Leave while loop since enemy died
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // Generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log (
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //Leave while loop if player died
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                // Subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }

            // If no (false), ask question again by running fight() again
            else {
                fight();
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

// Function to start a new game
var startGame = function () {

    // reset player stats
    playerInfo.reset ();

    for(var i = 0; i < enemyInfo.length; i++) {
        //If player is alive, keep fighting
        if (playerInfo.health > 0) {
            //Let player know what round they're in, array starts at 0 so needs 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //Pick new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
            //Reset enemy health before new fight, math where its any integer from 0-20.xx (floor rounds it down to whole number) plus 40
            pickedEnemyObj.health = randomNumber(40, 60);
            // Use debugger here to pause script and check what's going on in the code
            // debugger;
            fight(pickedEnemyObj);

            // If player is still alive and we're not at the last enemy in array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // Ask player if they want to use store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // If yes, take them to the store function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // If player is not alive, break out of the loop and let endGame function run
        else {
            window.alert("You have lost your roobt in battle! Game Over!");
            break;
        }
    }

    //After loop ends, we are either out of playerInfo.health or enemis to fight, run endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
    } else {
      window.alert("You've lost your robot in battle!");
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm('Would you like to play again?');
  
    if (playAgainConfirm) {
      startGame();
    } else {
      window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
};
  
// go to shop between battles function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
       'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
    );
  
    // use switch case to carry out action
    switch (shopOptionPrompt) {
        case 'REFILL':
        case 'refill':
            playerInfo.refillHealth();
            break;
        case 'UPGRADE':
        case 'upgrade':
            playerInfo.upgradeAttack();
            break;
        case 'LEAVE':
        case 'leave':
            window.alert('Leaving the store.');
  
            // do nothing, so function will end
            break;
        default:
            window.alert('You did not pick a valid option. Try again.');
  
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// Function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value ;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    }, // comma!
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, // comma!
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
];

// CALL: Start first game when page loads
startGame();