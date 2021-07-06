import MediaPlayer from './MediaPlayer.js'

const video = document.querySelector('video.movie');
const button__play = document.querySelector('button');
const player = new MediaPlayer({el:video});

button__play.onclick = () => player.togglePlay();

