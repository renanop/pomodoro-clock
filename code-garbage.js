function pomodoro() {
    let miliseconds = 5000;
    let minutes;
    let seconds;

    function decrement(miliseconds) {
        const interval = setInterval(() => {
            miliseconds = miliseconds - 1000;
            console.log(miliseconds);
            minutes = Math.floor(miliseconds / 60000)
            seconds = (miliseconds % 60000) / 1000;
            console.log(minutes);
            console.log(seconds);

            if (miliseconds === 0) {
                clearInterval(interval);
            }

        }, 1000);

    }

    decrement();
}

pomodoro();


