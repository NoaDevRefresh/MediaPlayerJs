function AutoPlay(){}

AutoPlay.prototype.run = function(player){
    if(!player.muted){
        player.muted = true;
    }//browser won't let it play on charging for accessibility, unless it is muted
    player.play();
};
export default AutoPlay;
