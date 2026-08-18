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

            showConfetti();
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

function showConfetti() {
    const script = document.createElement("script");

    script.src = "https://run.confettipage.com/here.js";

    script.setAttribute(
        "data-confetticode",
        "U2FsdGVkX18yXowCUnqJh2HvSq5kSw/iKnHvJGzweEmFfoKdpkKdvnuB4xHb41yo25zDcbcTw2LrxlqV0VPesmLaKvan6qT7ghWGoBW2NhSHhj2MAgN2IiTe0fTrrrMpz7/jaM03Fjs48WxsnPS+xJIT8Y/afPXKTGscvuDcsfsSh1fMhWhxg7z9ICAAa6+Sw0CleL6hJyw1VWKhSriBor66BNhZY9iAiNWrCYMO4KHns1VJWuRF3LP1hTlTKHs0X/YQEPjpyPhEZoRc+VrfdS4wwVDG9azgcr+AW3RSvF5NB2oPaIONbDrsFW404+Q59uhOLvJ6P4EPCh5WH+jKlRUVXchSf6lmspwN7m6yFwinNGTCBisXys+6bTPF21SVFJd5mYKbPA6kRUoPigzlS/nbnZrzRa9FGnFEQK2t3zBGqtyEqoUiyTbhL/CuNL8eGOGcotriILsjUOV+SFbqrhr/ZlNJ6yOH7AardhnpBvFl/RQ6OohG3QJbFtOkXxmSxkBRFRQhjXwJ605Dl7V0GBDMT4faeexUfOV4QfXhUDvDedtWRditzJXWXmGPQXoWfdYzeSqGfpYqrp4UHugk9yA1fu2h/q4AwaphIE11Gble2c6E0U74Sk/4fUs75xtccDsjXDB+dAn6SrpXgUc+J8R9PK2MxFDnIN4rxUC08Hwq6xUr8beRv8TOYL5tbvufjuTTCEXEmTmm20SmNhgMcpxgdc/fkrhBdxilNJf7Ue6BTeS2z3uWiXDo0XijXyAjP1XjhIPB9mm/oE/VX7U77v+93MvrOFsobSX1kSNvlqDQEafEWmei4mfh4pZ3bMt8"
    );

    document.body.appendChild(script);
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