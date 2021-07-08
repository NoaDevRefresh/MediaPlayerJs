function AutoPlay(){

}
AutoPlay.prototype.run = function(player){
    if(!player.muted){
        player.mute();
    }//browser won't let it play on charging for accessibility, unless it is muted
    player.play();
    console.log(player.muted);
 
}
export default AutoPlay;
