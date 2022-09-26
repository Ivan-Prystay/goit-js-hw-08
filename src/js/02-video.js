import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALE_STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate({ seconds }) {
  localStorage.setItem(LOCALE_STORAGE_KEY, seconds);
  console.log('Поточний час: ', seconds);
}

console.log('Збережений час: ', +localStorage.getItem(LOCALE_STORAGE_KEY));

player
  .setCurrentTime(+localStorage.getItem(LOCALE_STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
