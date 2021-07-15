import SimpleMediaPlayer from './SimpleMediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';
import Ads from './plugins/Ads';

  //DEFINITIONS/////////
  const playerSchema: HTMLElement = document.querySelector('.player');
  const video: HTMLMediaElement = document.querySelector('video.movie');
  const player: SimpleMediaPlayer = new SimpleMediaPlayer({
    el: video, 
    plugins: [new AutoPlay(), new AutoPause(), new Ads()],
    });
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js').catch(error => {
        console.log(error.message);
      });
    }
    
//FUNCTIONS///////
function toggleButtonMute(){
    const icon = player.media.muted ? '🔇' : '🔈';
    button__speaker.textContent = icon;
}
function handleProgress(){
    const percent: number = (player.media.currentTime / player.media.duration) * 100;
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
const button__play: HTMLElement = document.querySelector('.button__player');
const button__speaker: HTMLElement = document.querySelector('.button__speaker');
const progress: HTMLElement = playerSchema.querySelector('.progress');
const progressBar: HTMLElement = playerSchema.querySelector('.progress__filled');
const skipButtons: NodeListOf<Element> = playerSchema.querySelectorAll('[data-skip]');
const ranges: NodeListOf<Element> = playerSchema.querySelectorAll('.player__slider');
const fullScreenButton: HTMLElement = document.querySelector('.full__screen');

//EVENTS////////
//Page charges
window.onload = () => {
  toggleButtonPlay();
  toggleButtonMute();
};
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
  if(fullScreen)  video.requestFullscreen();
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

if('serviceWorker' in Navigator){
  navigator.serviceWorker.register('/serviceWorker.js')
  .catch(error => {
    console.log(error.message);
  });
}
