"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createPomodoro;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createPomodoro(document) {
  var _ref;

  var state = {
    timer: 1500000,
    "break": 300000,
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
    document.getElementById('currentBreak').innerHTML = 'Current break time: ' + toString2(state["break"]);
  }

  function setBreak(time) {
    state["break"] = parseFloat(time) * 60000;
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
    timerToScreen();
    var audio = new Audio('./soundeffects/reset.mp3');
    audio.play();
  }

  function pause(interval) {
    clearInterval(interval);
    state.running = false;
    var audio = new Audio('./soundeffects/pause.mp3');
    audio.play();
  }

  function start() {
    state.running = true;
    var cooldown = true;
    var interval = setInterval(function () {
      decrement();
      timerToScreen();

      if (timeIsUp() && cooldown) {
        state.timer = state["break"];
        timerToScreen();
        cooldown = false;
        notifyBreak();
        var audio = new Audio('./soundeffects/stage-clear.mp3');
        audio.play();
      } else if (timeIsUp() && !cooldown) {
        clearInterval(interval);
        state.running = false;
        timerToScreen();
        removeBreakNotification();

        var _audio = new Audio('./soundeffects/break-is-over.mp3');

        _audio.play();
      }
    }, 1000);
    state.intervalId = interval;
  }

  function decrement() {
    state.timer = state.timer - 1000;
  }

  function toString2(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = time % 60000 / 1000;

    if (seconds <= 9) {
      seconds = '0' + seconds;
    }

    if (minutes <= 9) {
      minutes = '0' + minutes;
    }

    var string = "".concat(minutes, ": ").concat(seconds);
    console.log(string);
    return string;
  }

  function toString() {
    var minutes = Math.floor(state.timer / 60000);
    var seconds = state.timer % 60000 / 1000;

    if (seconds <= 9) {
      seconds = '0' + seconds;
    }

    if (minutes <= 9) {
      minutes = '0' + minutes;
    }

    var time = "".concat(minutes, ": ").concat(seconds);
    console.log(time);
    return time;
  }

  function timeIsUp() {
    if (state.timer === 0) {
      return true;
    }

    return false;
  }

  return _ref = {
    state: state,
    decrement: decrement,
    toString: toString,
    timeIsUp: timeIsUp,
    start: start,
    pause: pause,
    reset: reset,
    isRunning: isRunning,
    getIntervalId: getIntervalId,
    setTimer: setTimer,
    setBreak: setBreak,
    timerToScreen: timerToScreen,
    breakToScreen: breakToScreen
  }, _defineProperty(_ref, "reset", reset), _defineProperty(_ref, "pause", pause), _ref;
}