import SimpleMediaPlayer from './SimpleMediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

const video = document.querySelector('video.movie');
const button__play = document.querySelector('button');
const player = new SimpleMediaPlayer({el:video, plugins:[new AutoPlay()]});
const button__speaker = document.querySelector('.button__speaker');
function toggleMute(){
    if(player.media.muted){
        //toggle button class
        button__speaker.classList.remove('muted');
        button__speaker.classList.add('unmuted');
        //unmute
        player.unmute();
    } else{
        button__speaker.classList.remove('unmuted')
        button__speaker.classList.add('muted');
        //unmute
        player.mute();
    }
}
button__play.onclick = () => player.togglePlay();
button__speaker.onclick = () => toggleMute();

