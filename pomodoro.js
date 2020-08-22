export default function createPomodoro(document) {
    var state = {
        timer: 1500000,
        break: 300000,
        intervalId: null,
        running: false
    };

    function notifyBreak() {
        var para = document.createElement("p");
        para.id = 'break-notification';
        var node = document.createTextNode("\u2606 Congratulations! Starting break time! \u2606");
        para.appendChild(node);

        var clockView = document.getElementById('clock-view');
        clockView.appendChild(para); 
    }

    function removeBreakNotification() {
        var para = document.getElementById('break-notification');
        para.parentNode.removeChild(para);
    }

    function timerToScreen() {
        document.getElementById('timer').innerHTML = toString2(state.timer);
    }

    function breakToScreen() {
        document.getElementById('currentBreak').innerHTML = 'Current break time: ' + toString2(state.break);
    }

    function setBreak(time) {
        state.break = parseFloat(time) * 60000;
    }

    function setTimer(time) {
        state.timer = parseFloat(time) * 60000;
    }

    function isRunning() {
        return state.running;
    }

    function getIntervalId() {
        return state.intervalId;
    }

    function reset(interval) {
        clearInterval(interval);
        state.running = false;
        state.timer = 1500000;
        timerToScreen()

        let audio = new Audio('./soundeffects/reset.mp3');
        audio.play();

    }

    function pause(interval) {
        clearInterval(interval);
        state.running = false;

        let audio = new Audio('./soundeffects/pause.mp3');
        audio.play();
    }


    function start() {
        state.running = true;
        var cooldown = true;
        var interval = setInterval(() => {
            decrement();
            timerToScreen();


            if (timeIsUp() && cooldown) {
                state.timer = state.break;
                timerToScreen();
                cooldown = false;
                notifyBreak();

                let audio = new Audio('./soundeffects/stage-clear.mp3');
                audio.play();

            } else if (timeIsUp() && !cooldown) {
                clearInterval(interval);
                state.running = false;
                timerToScreen();
                removeBreakNotification();

                let audio = new Audio('./soundeffects/break-is-over.mp3');
                audio.play();

            }

        }, 1000);

        state.intervalId = interval;
    }

    function decrement() {
        state.timer = state.timer - 1000

    }

    function toString2(time) {
        let minutes = Math.floor(time / 60000)
        let seconds = (time % 60000) / 1000;

        if (seconds <= 9) {
            seconds = '0' + seconds;
        }

        if (minutes <= 9) {
            minutes = '0' + minutes;
        }

        let string = `${minutes}: ${seconds}`;
        console.log(string);

        return string;
    }

    function toString() {
        let minutes = Math.floor(state.timer / 60000)
        let seconds = (state.timer % 60000) / 1000;

        if (seconds <= 9) {
            seconds = '0' + seconds;
        }

        if (minutes <= 9) {
            minutes = '0' + minutes;
        }

        let time = `${minutes}: ${seconds}`;
        console.log(time);

        return time;
    }

    function timeIsUp() {
        if (state.timer === 0) {
            return true;
        }
        return false;
    }

    return {
        state,
        decrement,
        toString,
        timeIsUp,
        start,
        pause,
        reset,
        isRunning,
        getIntervalId,
        setTimer,
        setBreak,
        timerToScreen,
        breakToScreen,
        reset,
        pause
    }
}


