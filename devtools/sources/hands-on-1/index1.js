setTimeout(() => {
    let x = 0;
    const intervalId = setInterval(() => {
        console.log(x);
        x++;
        if (x >= 60) {
            clearInterval(intervalId);
        }
    }, 1000);
}, 2000);