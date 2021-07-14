import SimpleMediaPlayer from "../SimpleMediaPlayer";

class AutoPlay{
    constructor(){}
    run(player: SimpleMediaPlayer){
        if(!player.media.muted){
            player.mute();
        }//browser won't let it play on charging for accessibility, unless it is muted
        player.play();
    };
}
export default AutoPlay;
