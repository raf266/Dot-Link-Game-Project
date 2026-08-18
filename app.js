const purpleDots = [0, 12]
const blueDots = [3, 6]
const greenDots = [4, 19]
const pinkDots = [7, 16]
const yellowDots = [15, 24]

let clickedOnSquare = null;
let isDrawing = false;
let currentPath = [];
let time = 20
let timeInterval = null;
let gameOver = false;
const connectedColors = new Set();
const TOTAL_PAIRS = 5;

const squareElements = document.querySelectorAll('.sqr');
const startButtonElement = document.querySelector('#start');
const resetButtonElement = document.querySelector("#reset");
const timerElement = document.querySelector(".timer");
const messageElement = document.querySelector("#message");


console.log(squareElements)



// 1. add event listener to each square so when I click it it becomes the clickedonSquare
// 2. When we click on it then all the other elements should get another event lisenet for them for onMouseOver
// 3. In the mouseOver event make it so the hovered over box becomes the color of the clickedOnSquare

console.log(squareElements)
purpleDots.forEach(id => {
    document.getElementById(id).style.backgroundColor = "#D1B9D9";
});

blueDots.forEach(id => {
    document.getElementById(id).style.backgroundColor = "#B4E2F9";
});

greenDots.forEach(id => {
    document.getElementById(id).style.backgroundColor = "#D3EACE";
});

pinkDots.forEach(id => {
    document.getElementById(id).style.backgroundColor = "#F7CADE";
});

yellowDots.forEach(id => {
    document.getElementById(id).style.backgroundColor = "#FAF7C0";
});



squareElements.forEach(dot => {
    dot.dataset.originalColor = dot.style.backgroundColor;
});

squareElements.forEach(dot => {
    dot.addEventListener("mousedown", () => {
        event.preventDefault();
        if (gameOver) 
            return;

        console.log('MOUSE DOWN')
        if (currentPath.at(-1))
            if (clickedOnSquare) {
                clickedOnSquare.classList.remove("selected");
            }
        clickedOnSquare = dot;
        isDrawing = true;

        currentPath = [dot.id];

        clickedOnSquare.classList.add("selected");


        console.log("Mouse Down:", dot.id);
        console.log("Current path:", currentPath);
    });

    dot.addEventListener("mouseover", (event) => {

        console.log("Mouse Over:", dot.id);

        const targetIsBlank = !event.target.dataset.originalColor;
        const targetIsMatchingDot = clickedOnSquare && getDotColor(dot.id) === getDotColor(clickedOnSquare.id);

        if (isDrawing && clickedOnSquare && dot !== clickedOnSquare && (targetIsBlank || targetIsMatchingDot) && !currentPath.includes(dot.id)) {
            dot.style.backgroundColor =
                clickedOnSquare.style.backgroundColor;

            currentPath.push(dot.id);

            console.log("Current Path:", currentPath);
        }

    });
});

document.addEventListener("mouseup", () => {
    if (isDrawing) {
        console.log("Mouse Up");

        const finalSquare =
            currentPath[currentPath.length - 1];

        const startColor =
            getDotColor(clickedOnSquare.id);

        const lastColor =
            getDotColor(clickedOnSquare.id);

        console.log("Start Color:", startColor);
        console.log("Last Color:", lastColor);

        if (startColor && lastColor && startColor === lastColor && clickedOnSquare.id !== finalSquare) {
            connectedColors.add(startColor);
            
        if (connectedColors.size === TOTAL_PAIRS) {
            messageElement.textContent = "Congratulations, You won!";
            console.log("Congratualtions!");
            clearInterval(timeInterval);
            gameOver = true;
        } else {
            messageElement.textContent = "Correct Connection!";
            console.log("Correct Connection!");
        }
        }
        else {
            messageElement.textContent = "Wrong Connection!";
            console.log("Wrong connection!");

            currentPath.forEach(id => {
                const sqr = document.getElementById(id);
                if (!sqr.dataset.originalColor) {
                    sqr.style.backgroundColor = "";
                }
            });
        }

        console.log("Final square:", finalSquare);
    }

    isDrawing = false;

});

function getDotColor(squareId) {
    const id = Number(squareId);

    if (purpleDots.includes(Number(squareId))) {
        return "#D1B9D9";
    }

    if (blueDots.includes(Number(squareId))) {
        return "#B4E2F9";
    }

    if (greenDots.includes(Number(squareId))) {
        return "#D3EACE";
    }

    if (pinkDots.includes(Number(squareId))) {
        return "#F7CADE";
    }

    if (yellowDots.includes(Number(squareId))) {
        return "#FAF7C0";
    }
    return null;
}


function startGame() {
    console.log('Game Started');

    timeInterval = setInterval(() => {
        time--
        console.log(time)

        timerElement.textContent = `${time}s`;
        messageElement.textContent = "Playing...";

        timerElement.textContent = `${time}s`;

        if (time <= 0) {
            clearInterval(timeInterval);
            messageElement.textContent = "Time's Up! You lost.";
            isDrawing = false;
            gameOver = true;
            return;
        }
    }, 1000);
}

function resetGame() {
    console.log("Game Reset");

    clearInterval(timeInterval);

    time = 20;
    timerElement.textContent = "20s";
    messageElement.textContent = "Click on Start";

    clickedOnSquare = null;
    isDrawing = false;
    currentPath = [];
    connectedColors.clear();
    gameOver = false;

    squareElements.forEach(dot => {
        dot.classList.remove("selected");

        if (dot.dataset.originalColor) {
            dot.style.backgroundColor = dot.dataset.originalColor;
        } else {
            dot.style.backgroundColor = "";
        }
    });
}



startButtonElement.addEventListener('click', startGame);
resetButtonElement.addEventListener("click", resetGame);