

document.addEventListener("DOMContentLoaded", function() {
    let spanList = document.getElementsByTagName("span");

    for (span of spanList) {
        span.addEventListener("click", function() {
            if (this.innerText === "Yes") {
                console.log("Yes");
                let h2 = document.getElementsByTagName("h2");
                h2[0].innerHTML = "Repeat the light pattern in the correct order";
                spanList[1].remove();
                this.innerHTML = "Start Game"

                
            } else if (this.innerText === "No") {
                console.log("No");
                document.getElementsByTagName("h2")[0].innerHTML = "Let's start!";
                this.remove();
                spanList[0].remove();
                runGame();
            } else {
                console.log("Start Game");
                runGame();
            }
        })
    }
})



function runGame() {
}

function generateArray(difLevel) {
    let array = [];
    let dif = difLevel * 2 + 2; //Add two numbers for each difficulty level.

    for (let i = 1; i <= dif; i++) {
        array.push(Math.floor(Math.random() * 4 + 1));
    }
    console.log(array);
    return array;
}

function checkArray(array1,array2) {

}

function addLevel() {
    let level = document.getElementById("levelNumber");
    level.innerHTML = parseInt(level.textContent)+1;
    return parseInt(level.textContent);
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

    return -1;
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

function reset() {

}