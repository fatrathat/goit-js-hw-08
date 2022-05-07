import Player from '@vimeo/player';
const _ = require('lodash');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const refs = {
  iframe: document.querySelector('iframe'),
};

const player = new Player(refs.iframe);

const saveCurrentTime = (key, value) => {
  try {
    const stateNow = JSON.stringify(value);
    localStorage.setItem(key, stateNow);
  } catch (error) {
    console.log(error.message);
  }
};
const loadCurrentTime = key => {
  try {
    const stateNow = localStorage.getItem(key);
    return stateNow === null ? undefined : JSON.parse(stateNow);
  } catch (error) {
    console.log(error.message);
  }
};

const onPlay = data => {
  saveCurrentTime(LOCALSTORAGE_KEY, data.seconds);
};

player.setCurrentTime(loadCurrentTime(LOCALSTORAGE_KEY));
player.on(
  'timeupdate',
  _.throttle(data => {
    onPlay(data);
  }, 1000),
);
