function SimpleMediaPlayer(config){
    this.media = config.el;
    this.plugins = config.plugins || [];//Default value of empty array to prevent wrong state.

    this._initPlugins();
  }
  SimpleMediaPlayer.prototype._initPlugins = function(){
    this.plugins.forEach(plugin => {
      plugin.run(this);//Method run must be implemented for each active plugin
    });
  }
  SimpleMediaPlayer.prototype.play = function(){
    this.media.play();
  }
  SimpleMediaPlayer.prototype.pause = function(){
    this.media.pause();
  }
  SimpleMediaPlayer.prototype.togglePlay = function(){
    this.media.paused ? this.play() : this.pause();
  }
  SimpleMediaPlayer.prototype.mute = function(){
    this.media.muted = true;
  }
  SimpleMediaPlayer.prototype.unmute = function(){
    this.media.muted = false;
  }
  SimpleMediaPlayer.prototype.toggleMuted = function(){
    this.media.muted = !this.media.muted;
  }
  export default SimpleMediaPlayer;