let difficultyLevel = 1;
let tries = 3;
let userArray = [];
let machineArray = [];
let sameArray = false;

document.addEventListener("DOMContentLoaded", function() {
    let spanList = document.getElementsByTagName("span");
    let buttonList = document.getElementsByClassName("button");
    for (span of spanList) {
        span.addEventListener("click", function() {
            if (this.innerText === "Yes") {
                console.log("Yes");
                let h2 = document.getElementsByTagName("h2");
                h2[0].innerHTML = "Repeat the sequence of lights in the correct order";
                spanList[1].remove();
                this.innerHTML = "Start Game"

                
            } else if (this.innerText === "No") {
                console.log("No");
                document.getElementsByTagName("h2")[0].innerHTML = "Click below to start the game";
                this.innerHTML = "Start Game";
                spanList[0].remove();
            } else {
                console.log("Start Game");
                runGame();
            }
        })
    }

    for (button of buttonList) {
        button.addEventListener("click", function() {
            if (this.id === "b1") {
                userArray.push(1);
                console.log(userArray);
                this.style.backgroundColor = "red";
            } else if (this.id === "b2") {
                userArray.push(2);
                console.log(userArray);
                this.style.backgroundColor = "red";
            } else if (this.id === "b3") {
                userArray.push(3);
                console.log(userArray);
                this.style.backgroundColor = "red";
            } else {
                userArray.push(4);
                console.log(userArray);
                this.style.backgroundColor = "red";
            }
            setTimeout(revertBlack, 300);
            checkArray();
        })
    }
})



function runGame() {
    userArray = [];
    machineArray = generateArray(difficultyLevel);
    displaySequence(machineArray);
}

function generateArray(difLevel) {
    let array = [];
    let dif = difLevel + 3; 

    for (let i = 1; i <= dif; i++) {
        array.push(Math.floor(Math.random() * 4 + 1));
    }
    console.log(array);
    return array;
}

function checkArray() {
    if (machineArray.length === userArray.length && machineArray.length >= 4) {
        sameArray = true;
        for (let i = 0; i < machineArray.length; i++) {
            if (machineArray[i] !== userArray[i]) {
                sameArray = false;
                lives();
                console.log("Not the same")
                break;
                
            }
        }
    } else {
        return console.log("Not ready");
    }

    if (sameArray) {
        addLevel();
        console.log("level up");
    }

    if (tries === 0) {
        console.log("Game Over");
    }
}

function addLevel() {
    let level = document.getElementById("levelNumber");
    level.innerHTML = parseInt(level.textContent)+1;
    difficultyLevel++;
}

function lives() {
    let hearths = document.getElementById("tries").children;
    
    for (let i = 0; i < hearths.length; i++) {
        if (window.getComputedStyle(hearths[i]).color === "rgb(201, 13, 13)") {
            hearths[i].style.color = "black";
            break;
        } else {
            continue;
        }
    }

    tries = tries-1;
}

function gameOver() {

}

function displaySequence(array) {
    /*let buttons = document.getElementsByClassName("button");*/
    console.log("Running function");
    let i = 0;
    let rep1 = false;
    let lastNumber;
    let currentNumber;
    let oneSecond = false;
    function iteration() {
        currentNumber = array[i];
        if (rep1) {
            document.getElementById(`b${array[i-1]}`).style.backgroundColor = "black";
            lastNumber = array[i-1];

        } else {
            rep1 = true;
        }
        
        if (i < array.length && lastNumber !== currentNumber) {
            
            document.getElementById(`b${array[i]}`).style.backgroundColor = "red";
            i++;
            setTimeout(iteration, 1000);
        } else if (oneSecond && i < array.length) {
            document.getElementById(`b${array[i]}`).style.backgroundColor = "red";
            i++;
            oneSecond = false;
            setTimeout(iteration, 1000);
        } else {
            oneSecond = true;
            setTimeout(iteration, 1000);
        }
    }
    iteration();
}

function revertBlack() {
    button = document.getElementsByClassName("button");
    for (b of button) {
        b.style.backgroundColor = "black";
    }
}

function reset() {

}