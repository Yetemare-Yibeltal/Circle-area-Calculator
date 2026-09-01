/**
 * Interactive Spatial Audio & Harmonic Frequency Synthesizer
 */
export class AudioSynthesizer {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
  }

  /**
   * Play frequency pitch relative to current radius scale
   * @param {number} radius Target circle radius
   */
  playRadiusPitch(radius) {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Map radius scale (1 to 300) to pitch frequency (220Hz to 880Hz)
    const frequency = 220 + (radius / 300) * 660;

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}
