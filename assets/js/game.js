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

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack;

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

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;

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
                playerMoney = playerMoney - 10;
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

for(var i = 0; i < enemyNames.length; i++) {
    //If player is alive, keep fighting
    if (playerHealth > 0) {
        //Let player know what round they're in, array starts at 0 so needs 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        //Pick new enemy to fight
        var pickedEnemyName = enemyNames[i];
        //Reset enemy health before new fight
        enemyHealth = 50;
        // Use debugger here to pause script and check what's going on in the code
        // debugger;
        fight(pickedEnemyName);
    }
    //If player dies, stop the game
    else {
        window.alert("You have lost your roobt in battle! Game Over!");
        break;
    }
}