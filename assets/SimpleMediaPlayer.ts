class SimpleMediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;

  constructor(config) {
    this.media = config.el;
    this.plugins = config.plugins || []; //Default value of empty array to prevent wrong state.

    this.initPlugins();
  }
  private initPlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this); //Method run must be implemented for each active plugin
    });
  }
  play() {
    this.media.play();
  }
  pause() {
    this.media.pause();
  }
  togglePlay() {
    this.media.paused ? this.play() : this.pause();
  }
  mute() {
    this.media.muted = true;
  }
  unmute() {
    this.media.muted = false;
  }
}
  // SimpleMediaPlayer.prototype.toggleMute = function(){
  //   this.media.muted = !this.media.muted;
  //}
  
  export default SimpleMediaPlayer;