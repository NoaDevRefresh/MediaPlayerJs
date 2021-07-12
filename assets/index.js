import SimpleMediaPlayer from './SimpleMediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';
import AutoPause from './plugins/AutoPause.js';

  //DEFINITIONS/////////
  const playerSchema = document.querySelector('.player');
  const video = document.querySelector('video.movie');
  const player = new SimpleMediaPlayer({
    el: video, 
    plugins: [new AutoPlay(), new AutoPause()],
    });
  
//FUNCTIONS///////
function initMediaPlayer(){
  //toggleButtons
  toggleButtonPlay();
  toggleButtonMute();
}
function toggleButtonMute(){
    const icon = player.media.muted ? '🔇' : '🔈';
    button__speaker.textContent = icon;
}
function handleProgress(){
    const percent = (player.media.currentTime / player.media.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function toggleButtonPlay(){
    const icon = player.media.paused ? '►' : '❚ ❚';
    button__play.textContent = icon;
}
//Volume and speed ranges
function handleRangeUpdate() {
    video[this.name] = this.value;
  }
  function moveProgress(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
  function skip(){
    video.currentTime += parseFloat(this.dataset.skip);;
}

//CONTROLS///////
const button__play = document.querySelector('.button__player');
const button__speaker = document.querySelector('.button__speaker');
const progress = playerSchema.querySelector('.progress');
const progressBar = playerSchema.querySelector('.progress__filled');
const skipButtons = playerSchema.querySelectorAll('[data-skip]');
const ranges = playerSchema.querySelectorAll('.player__slider');
const fullScreenButton = document.querySelector('.full__screen');

//EVENTS////////
//Page charges
document.addEventListener("DOMContentLoaded", initMediaPlayer());
//play/pause button
button__play.onclick = () => {
    player.togglePlay();
    toggleButtonPlay();
}
//Muted button
button__speaker.onclick = () => {
    if (player.media.muted) {
        player.unmute();
      } else {
        player.mute();
      }
    toggleButtonMute();
}
function toggleFullScreen(){
  fullScreen = !fullScreen;
  fullScreen ? video.requestFullscreen() : video.exitFullscreen();
}

video.addEventListener('timeupdate', handleProgress);
video.onclick = () => {
  player.togglePlay();
  toggleButtonPlay();
}
//Ranges for volume and progress
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))
//Handle calcs and change of progress
let mousedown = false;
progress.addEventListener('click', moveProgress);
progress.addEventListener('mousemove', (e) => mousedown && moveProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
skipButtons.forEach(button => button.addEventListener('click', skip));
let fullScreen = false;
fullScreenButton.addEventListener('click', toggleFullScreen);
