

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
            } else {
                console.log("Start Game");
            }
        })
    }
})


