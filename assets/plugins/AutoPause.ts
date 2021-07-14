import SimpleMediaPlayer from '../SimpleMediaPlayer';

class AutoPause {
  private threshold: number;
  private player: SimpleMediaPlayer;

    constructor() {
      this.threshold = 0.25;
      this.handleIntersection = this.handleIntersection.bind(this);
      this.handleVisibility = this.handleVisibility.bind(this);    }
  
    run(player) {
      this.player = player;
  
      const observer = new IntersectionObserver(this.handleIntersection, {
        threshold: this.threshold,
      });
  
      observer.observe(this.player.media);

      document.addEventListener('visibilitychange', this.handleVisibility);
    }
  
    private handleIntersection(entries: IntersectionObserverEntry[]) {
      const entry = entries[0];
  
      const isVisible = entry.intersectionRatio >= this.threshold;
  
      isVisible ? this.player.play() : this.player.pause();
      
    }

    private handleVisibility(){
        const isVisible = document.visibilityState === 'visible';
        isVisible ? this.player.play() : this.player.pause();
    }
  }
  
  export default AutoPause;
  