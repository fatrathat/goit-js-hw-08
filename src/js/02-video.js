import Player from '@vimeo/player';
const _ = require('lodash');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

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
  saveCurrentTime('videoplayer-current-time', data.seconds);
};

player.setCurrentTime(loadCurrentTime('videoplayer-current-time'));
player.on(
  'timeupdate',
  _.throttle(data => {
    onPlay(data);
  }, 1000),
);
