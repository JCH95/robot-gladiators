var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// Fight function
var fight = function(enemyName) {
    // Repeat and execute as long as enemy is still alive
    while(playerHealth > 0 && enemyHealth > 0){
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");
        // If player chose to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // Generate random damage value based on player's attack power
            var damage = randomNumber(playerAttack - 3, playerAttack);

            enemyHealth = Math.max(0, enemyHealth - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            
            // Check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                
                //Award money to player for winning
                playerMoney = playerMoney + 20;
                //Leave while loop since enemy died
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Generate random damage value based on enemy's attack power
            var damage = randomNumber(enemyAttack - 3, enemyAttack);

            playerHealth = Math.max(0, playerHealth - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log (
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            //Check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                //Leave while loop if player died
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
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
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        //If player is alive, keep fighting
        if (playerHealth > 0) {
            //Let player know what round they're in, array starts at 0 so needs 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //Pick new enemy to fight
            var pickedEnemyName = enemyNames[i];
            //Reset enemy health before new fight, math where its any integer from 0-20.xx (floor rounds it down to whole number) plus 40
            enemyHealth = randomNumber(40, 60);
            // Use debugger here to pause script and check what's going on in the code
            // debugger;
            fight(pickedEnemyName);

            // If player is still alive and we're not at the last enemy in array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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

    //After loop ends, we are either out of playerHealth or enemis to fight, run endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // if player is still alive, player wins!
    if (playerHealth > 0) {
      window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + '.');
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
            if (playerMoney >= 7) {
             window.alert("Refilling player's health by 20 for 7 dollars.");
  
            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
            break;
        case 'UPGRADE':
        case 'upgrade':
            if (playerMoney >= 7) {
             window.alert("Upgrading player's attack by 6 for 7 dollars.");
  
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
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

// Start first game when page loads
startGame();