import SimpleMediaPlayer from './SimpleMediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

//FUNCTIONS///////
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
function handleRangeUpdate() {
    video[this.name] = this.value;
  }
  function moveProgress(e) {
      console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
  //DEFINITIONS/////////
const playerSchema = document.querySelector('.player');
const video = document.querySelector('video.movie');
const player = new SimpleMediaPlayer({el:video, plugins:[
    //Commented for development 
    //new AutoPlay()
]});

//CONTROLS///////
const button__play = document.querySelector('.button__player');
const button__speaker = document.querySelector('.button__speaker');
const progress = playerSchema.querySelector('.progress');
const progressBar = playerSchema.querySelector('.progress__filled');
const skipButtons = playerSchema.querySelectorAll('[data-skip]');
const ranges = playerSchema.querySelectorAll('.player__slider');

//EVENTS////////
//play/pause button
button__play.onclick = () => {
    player.togglePlay();
    toggleButtonPlay();
}
//Muted button
button__speaker.onclick = () => {
    player.toggleMute();
    toggleButtonMute();
}
video.addEventListener('timeupdate', handleProgress);
//Ranges for volume and progress
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))
//Handle calcs and change of progress
let mousedown = false;
console.log(progressBar);
progress.addEventListener('click', moveProgress);
progress.addEventListener('mousemove', (e) => mousedown && moveProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
