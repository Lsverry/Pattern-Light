/*Global variables to be used by several functions*/ 
let spanList = document.getElementsByTagName("span");
let buttonList = document.getElementsByClassName("button");
let h2 = document.getElementsByTagName("h2")[0];
let difficultyLevel = 1;
let lastDifficulty = 1;
let tries = 3;
let userArray = [];
let machineArray = [];
let sameArray = false;
let h2paragraph = document.getElementById("h2p");
//Event listener inspired by Code Institute's Love Maths project.
/**Event listener to be executed when the dom is loaded.
 * Allows for interaction with the spans and for them to respond appropriately.
 * Makes the buttons respond when clicked.
 * Each time a button is pressed it changes colour. 
 * Adds a value to the user's array.
 * Use the setTimeout function to change the colour of that button to its original colour after some time.
 * And call the checkArrays function to verify if the random array and the user array match.
 */
document.addEventListener("DOMContentLoaded", function() {
    for (span of spanList) {
        span.addEventListener("click", function() { //Apply an event listener to spans
            if (this.innerText === "Yes") {
                h2.innerHTML = "";
                h2paragraph.innerHTML = "Pay attention to the buttons below and repeat the sequence";
                spanList[1].remove();
                this.innerHTML = "Next";
            } else if (this.innerText === "Next") {
                h2paragraph.innerHTML = "Wait for the sequence to finish before starting";
                this.innerHTML = "Start Game";
            } else if (this.innerText === "No") {
                h2.innerHTML = "Click below to start the game";
                this.remove();
                spanList[0].innerHTML = "Start Game";
            } else if (this.innerText === "Play Again") {
                let lastRecord = document.getElementById("record");
                lastRecord.style.display = "inline";
                lastDifficulty = difficultyLevel > lastDifficulty ? difficultyLevel : lastDifficulty;
                lastRecord.innerHTML = `Highest level: ${lastDifficulty}`;
                reset();
                runGame();
            } else {
                runGame();
            }
        })
    }

    for (button of buttonList) {
        button.addEventListener("click", function() {
            if (this.id === "b1") {
                userArray.push(1);
                this.style.backgroundColor = "red";
            } else if (this.id === "b2") {
                userArray.push(2);
                this.style.backgroundColor = "red";
            } else if (this.id === "b3") {
                userArray.push(3);
                this.style.backgroundColor = "red";
            } else {
                userArray.push(4);
                this.style.backgroundColor = "red";
            }
            setTimeout(revertBlack, 500);
            checkArray();
        })
    }
})


/**Function that initiates the sequence of lights.
 * Clear the game screen to avoid distractions.
 * Empty the user array in case it has been filled before.
 * Call the function that generates a random array.
 * Use the random array with the function that displays the sequence to the user.
*/
function runGame() {
    h2paragraph.innerHTML = "";
    h2.innerHTML = "Wait";
    spanList[0].style.display = "none";
    userArray = [];
    machineArray = generateArray(difficultyLevel); //Create a random array for machineArray.
    displaySequence(machineArray); //Use the array to display the sequence.
}

/**Function that generates a random array.
 * Takes as parameter a number for array difficulty.
 * Use Math.floor and Math.random to create numbers between 1 and 4.
 * Returns a finalised array.
*/
function generateArray(difLevel) {
    let array = [];
    let dif = difLevel + 3; //Determines the difficulty of the array with 3 base numbers and adds a number for each level of difficulty.

    for (let i = 1; i <= dif; i++) { //Determines the length of the array according to the number it contains dif
        array.push(Math.floor(Math.random() * 4 + 1));
    }
    return array;
}

/**This function checks which random array and the user's array match. 
 * This function is executed each time a button is clicked.
 * Returns a message to the console before terminating while the first if is not satisfied.
 * Once the random array and the user's random array match in length and if the random array is at least 4 elements.
 * Enter the if and check if the values of both arrays match.
 * If they match, it enters the second if, displays a message to the user and moves up a level.
 * If they do not match, it enters the inner if of the first if, displays a message to the user and reduces a life.
 * If the variable tries reaches 0, it enters the last if, displays a message to the user and ends the game.
*/
function checkArray() {
    if (machineArray.length === userArray.length && machineArray.length >= 4) {
        sameArray = true;
        for (let i = 0; i < machineArray.length; i++) {
            if (machineArray[i] !== userArray[i]) {
                spanList[0].style.display = "inline";
                spanList[0].innerHTML = "Try again";
                sameArray = false;
                lives();
                h2.innerHTML = tries === 1 ? `Failure, you have ${tries} more life` : `Failure, you have ${tries} more lives`;
                break;
                
            }
        }
    } else {
        return console.log("Not ready");
    }

    if (sameArray) {
        h2.innerHTML = "Right! let's up the difficulty"
        spanList[0].style.display = "inline";
        spanList[0].innerHTML = "Continue";
        addLevel();
    }

    if (tries === 0) {
        h2.innerHTML = "Game Over"
        spanList[0].innerHTML = "Play Again";
    }
}

/**Function that adds a level of difficulty each time it is called.
 * Adds a level to the difficultyLevel variable. 
 * Adds a level to the span of the HTML file so that the level can be seen by the user.
 */
function addLevel() {
    let level = document.getElementById("levelNumber");
    level.innerHTML = parseInt(level.textContent)+1;
    difficultyLevel++;
}

/**Function in charge of reducing the user's lives.
 * Subtracts 1 from the tries variable each time it is called.
 * Change the colour of a heart to black to represent each failure.
*/
function lives() {
    let hearths = document.getElementById("tries").children;
    
    for (let i = 0; i < hearths.length; i++) {
        if (window.getComputedStyle(hearths[i]).color === "rgb(201, 13, 13)") { //Checks if the heart has a certain colour.
            hearths[i].style.color = "black"; //If so, it changes it to black.
            break;
        } else {
            continue;
        }
    }

    tries = tries-1;
}

/**Function in charge of displaying the sequence that the user must follow.
 * Take as parameter an array of numbers between 1 and 4.
 * Use the setTimeout function to achieve a delay in the sequence so that the user is able to see it.
 * It has an inner function that creates a visual delay between div colour changes.
 * This function calls itself to create the visual effect.
 */
function displaySequence(array) {
    let i = 0; //This variable represents the index of the array
    let rep1 = false;
    let lastNumber;
    let currentNumber;
    let oneSecond = false;

    function iteration() {
        currentNumber = array[i];
        if (rep1) { //This if takes care of changing the colour of the previous div, after the iteration function has been executed once.
            document.getElementById(`b${array[i-1]}`).style.backgroundColor = "black";
            lastNumber = array[i-1]; //Save the previous value to make a check with the current value.
        } else {
            rep1 = true;
        }
        
        if (array.length === i) {
            h2.innerHTML = "Now it's your turn";
        } else if (i < array.length && lastNumber !== currentNumber) { //This if checks if the index is less than the length of the array and if the last value is different from the current value. 
            document.getElementById(`b${array[i]}`).style.backgroundColor = "red"; //If so, use the index to change the colour of the respective div.
            i++; //Add 1 to the index value.
            setTimeout(iteration, 1000);
        } else if (oneSecond && i < array.length) { //If the variable oneSecond is true and the index is less than the length of the array it will enter this else if.
            document.getElementById(`b${array[i]}`).style.backgroundColor = "red"; //And it will change the colour of the current div.
            i++;
            oneSecond = false;
            setTimeout(iteration, 1000);
        } else { //If there are two equal values in a row, change the oneSecond variable to true, and rerun the iteration function.
            oneSecond = true;
            setTimeout(iteration, 1000);
        }
    }
    iteration();
}

/**This function changes any button the user presses to black.
*/
function revertBlack() {
    button = document.getElementsByClassName("button");
    for (b of button) {
        b.style.backgroundColor = "black";
    }
}

/**Function in charge of restoring lives 3 and level to 1.
*/
function reset() {
    tries = 3;
    difficultyLevel = 1;

    let iElements = document.getElementsByTagName("i"); 
    for (y of iElements) { //Returns the original colour to the hearts in the HTML file.
        y.style.color = "rgb(201, 13, 13)";
    }

    document.getElementById("levelNumber").innerHTML = "1"; //Changes the level to its original value of 1.
}