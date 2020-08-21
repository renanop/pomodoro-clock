export default function createPomodoro() {
    var state = { timer: 5000 };


    function decrement() {
        state.timer = state.timer - 1000

    }

    function toString() {
        let minutes = Math.floor(state.timer / 60000)
        let seconds = (state.timer % 60000) / 1000;

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
    }
}


