/**
 * HarmonicAudioEngine
 * Procedural Web Audio API sound synthesis tailored to The Mirror of Spheres cosmological acts.
 */

export class HarmonicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private activeNodes: { stop: () => void }[] = [];
  private currentActNumber: number = 1;
  private polarity: number = 0.5; // 0 = Pure Angelic, 0.5 = Equilibrium, 1 = Pure Chthonic
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private intervalId: any = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 256;
      this.analyserNode.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setAct(actNumber: number, gateId?: number, isBreachMode: boolean = false) {
    this.currentActNumber = actNumber;
    if (!this.ctx) return;
    this.stopCurrentActNodes();

    if (isBreachMode) {
      this.startOphiuchusBreachSound();
    } else {
      switch (actNumber) {
        case 1:
          this.startAct1FireOfIgnition();
          break;
        case 2:
          this.startAct2EarthOfMateriality();
          break;
        case 3:
          this.startAct3AirOfDuality();
          break;
        case 4:
          this.startAct4WaterOfAbyss();
          break;
        case 5:
          this.startAct5FireOfSovereignty();
          break;
        case 6:
          this.startAct6EarthOfPerfection();
          break;
        case 7:
          this.startAct7AirOfEquilibrium();
          break;
        case 8:
          this.startAct8WaterOfTransformation(gateId === 48);
          break;
        case 9:
          this.startAct9FireOfSeeker();
          break;
        case 10:
          this.startAct10EarthOfArchitecture();
          break;
        case 11:
          this.startAct11AirOfCosmos();
          break;
        case 12:
          this.startAct12WaterOfDissolution();
          break;
        default:
          this.startAct1FireOfIgnition();
          break;
      }
    }
  }

  public setPolarity(val: number) {
    this.polarity = Math.max(0, Math.min(1, val));
    // Dynamic tweak of master filter or active nodes
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getAnalyserData(): { frequencies: Uint8Array; waveform: Uint8Array } {
    if (!this.analyserNode) {
      return { frequencies: new Uint8Array(64), waveform: new Uint8Array(64) };
    }
    const freq = new Uint8Array(this.analyserNode.frequencyBinCount);
    const wave = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(freq);
    this.analyserNode.getByteTimeDomainData(wave);
    return { frequencies: freq, waveform: wave };
  }

  private stopCurrentActNodes() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.activeNodes.forEach(n => {
      try {
        n.stop();
      } catch (e) {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  // Act 1: 40Hz sub-bass rhythm & cymatic fire fractals
  private startAct1FireOfIgnition() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // 40Hz Sub-bass
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(40, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.4 + this.polarity * 0.3, now);

    // Pulse rhythm (LFO on gain)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2, now); // 2Hz pulse rhythm
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.2, now);
    lfo.connect(lfoGain.gain);

    // Cymatic fire overtone (angelic harmonic)
    const fireOsc = this.ctx.createOscillator();
    fireOsc.type = 'triangle';
    fireOsc.frequency.setValueAtTime(528, now); // Solfeggio 528Hz celestial ignition
    const fireGain = this.ctx.createGain();
    fireGain.gain.setValueAtTime(0.08 * (1 - this.polarity * 0.5), now);

    subOsc.connect(subGain);
    fireOsc.connect(fireGain);
    subGain.connect(this.masterGain);
    fireGain.connect(this.masterGain);

    subOsc.start(now);
    fireOsc.start(now);
    lfo.start(now);

    this.activeNodes.push({
      stop: () => {
        subOsc.stop();
        fireOsc.stop();
        lfo.stop();
      },
    });
  }

  // Act 2: Deep Earth drone (55Hz / 110Hz resonant)
  private startAct2EarthOfMateriality() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);
    filter.Q.setValueAtTime(4, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);

    this.activeNodes.push({
      stop: () => {
        osc1.stop();
        osc2.stop();
      },
    });
  }

  // Act 3: Rapidly panning binaural whispers (air currents & dual prisms)
  private startAct3AirOfDuality() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const oscLeft = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(612, now); // Act 3 Angel frequency

    const oscRight = this.ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(620, now); // 8Hz binaural theta beat

    const pannerLeft = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    const pannerRight = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    if (pannerLeft && pannerRight) {
      pannerLeft.pan.setValueAtTime(-0.8, now);
      pannerRight.pan.setValueAtTime(0.8, now);
    }

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);

    // Airy flutter
    const noise = this.createAirNoiseNode();

    if (pannerLeft && pannerRight) {
      oscLeft.connect(pannerLeft);
      oscRight.connect(pannerRight);
      pannerLeft.connect(gain);
      pannerRight.connect(gain);
    } else {
      oscLeft.connect(gain);
      oscRight.connect(gain);
    }

    if (noise) {
      noise.node.connect(gain);
    }

    gain.connect(this.masterGain);
    oscLeft.start(now);
    oscRight.start(now);

    this.activeNodes.push({
      stop: () => {
        oscLeft.stop();
        oscRight.stop();
        if (noise) noise.stop();
      },
    });
  }

  // Act 4: Filtered aqua reverb & sub-aquatic swells
  private startAct4WaterOfAbyss() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    filter.Q.setValueAtTime(6, now);

    // Aqua LFO swell
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3, now); // Slow 0.3Hz watery swell
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, now);
    lfo.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    lfo.start(now);

    this.activeNodes.push({
      stop: () => {
        osc.stop();
        lfo.stop();
      },
    });
  }

  // Act 5: Majestic brass swells & lion roar sub-bass
  private startAct5FireOfSovereignty() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Brass chord (sawtooth triad)
    const brass1 = this.ctx.createOscillator();
    brass1.type = 'sawtooth';
    brass1.frequency.setValueAtTime(220, now); // A3

    const brass2 = this.ctx.createOscillator();
    brass2.type = 'sawtooth';
    brass2.frequency.setValueAtTime(277.18, now); // C#4

    // Lion roar sub-growl
    const subGrowl = this.ctx.createOscillator();
    subGrowl.type = 'triangle';
    subGrowl.frequency.setValueAtTime(50, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);

    brass1.connect(filter);
    brass2.connect(filter);
    subGrowl.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    brass1.start(now);
    brass2.start(now);
    subGrowl.start(now);

    this.activeNodes.push({
      stop: () => {
        brass1.stop();
        brass2.stop();
        subGrowl.stop();
      },
    });
  }

  // Act 6: Mathematical sine oscillations (Pythagorean clean ratio)
  private startAct6EarthOfPerfection() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const baseFreq = 432;
    const ratios = [1, 9 / 8, 4 / 3, 3 / 2];
    const oscs: OscillatorNode[] = [];
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);

    ratios.forEach((r, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * r * 0.5, now);
      const subG = this.ctx.createGain();
      subG.gain.setValueAtTime(0.25 / (idx + 1), now);
      osc.connect(subG);
      subG.connect(gain);
      osc.start(now);
      oscs.push(osc);
    });

    gain.connect(this.masterGain);

    this.activeNodes.push({
      stop: () => {
        oscs.forEach(o => o.stop());
      },
    });
  }

  // Act 7: Perfect Fifth synth harmonics (1.5 ratio: 220Hz + 330Hz)
  private startAct7AirOfEquilibrium() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const tonic = this.ctx.createOscillator();
    tonic.type = 'sine';
    tonic.frequency.setValueAtTime(220, now); // A3

    const fifth = this.ctx.createOscillator();
    fifth.type = 'sine';
    fifth.frequency.setValueAtTime(330, now); // E4 (1.5 ratio)

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);

    tonic.connect(gain);
    fifth.connect(gain);
    gain.connect(this.masterGain);

    tonic.start(now);
    fifth.start(now);

    this.activeNodes.push({
      stop: () => {
        tonic.stop();
        fifth.stop();
      },
    });
  }

  // Act 8: 40Hz sub-bass heartbeat pulse & Gate 48 breach alert
  private startAct8WaterOfTransformation(isGate48: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(40, now); // 40Hz heartbeat

    const heartGain = this.ctx.createGain();
    heartGain.gain.setValueAtTime(0.05, now);

    subOsc.connect(heartGain);
    heartGain.connect(this.masterGain);
    subOsc.start(now);

    // Heartbeat lub-dub timer
    let pulseState = false;
    this.intervalId = setInterval(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      heartGain.gain.cancelScheduledValues(t);
      // Double pulse
      heartGain.gain.setValueAtTime(0.4, t);
      heartGain.gain.exponentialRampToValueAtTime(0.02, t + 0.12);
      heartGain.gain.setValueAtTime(0.28, t + 0.22);
      heartGain.gain.exponentialRampToValueAtTime(0.02, t + 0.38);
    }, 1200);

    // If gate 48, add dissonant seam breach resonance
    let tearOsc: OscillatorNode | null = null;
    if (isGate48) {
      tearOsc = this.ctx.createOscillator();
      tearOsc.type = 'sawtooth';
      tearOsc.frequency.setValueAtTime(108, now); // 108° Zen Shield frequency
      const tearGain = this.ctx.createGain();
      tearGain.gain.setValueAtTime(0.15, now);
      tearOsc.connect(tearGain);
      tearGain.connect(this.masterGain);
      tearOsc.start(now);
    }

    this.activeNodes.push({
      stop: () => {
        subOsc.stop();
        if (tearOsc) tearOsc.stop();
        if (this.intervalId) clearInterval(this.intervalId);
      },
    });
  }

  // Act 9: Galloping rhythmic transients & light arrow drive
  private startAct9FireOfSeeker() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const drone = this.ctx.createOscillator();
    drone.type = 'triangle';
    drone.frequency.setValueAtTime(164.81, now); // E3

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);

    drone.connect(gain);
    gain.connect(this.masterGain);
    drone.start(now);

    // Gallop 16th transients
    const tempoMs = 180;
    this.intervalId = setInterval(() => {
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const click = this.ctx.createOscillator();
      click.type = 'sine';
      click.frequency.setValueAtTime(320 + Math.random() * 80, t);
      const cGain = this.ctx.createGain();
      cGain.gain.setValueAtTime(0.15, t);
      cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      click.connect(cGain);
      cGain.connect(this.masterGain);
      click.start(t);
      click.stop(t + 0.08);
    }, tempoMs);

    this.activeNodes.push({
      stop: () => {
        drone.stop();
        if (this.intervalId) clearInterval(this.intervalId);
      },
    });
  }

  // Act 10: Cavernous deep resonance & subterranean sub-drones
  private startAct10EarthOfArchitecture() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const sub = this.ctx.createOscillator();
    sub.type = 'sawtooth';
    sub.frequency.setValueAtTime(45, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, now);

    // Cavern echo delay
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.4, now);
    const feedback = this.ctx.createGain();
    feedback.gain.setValueAtTime(0.6, now);
    delay.connect(feedback);
    feedback.connect(delay);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);

    sub.connect(filter);
    filter.connect(gain);
    filter.connect(delay);
    delay.connect(gain);
    gain.connect(this.masterGain);

    sub.start(now);

    this.activeNodes.push({
      stop: () => {
        sub.stop();
      },
    });
  }

  // Act 11: Bitcrushed digital circuit feedback & neural modular synth
  private startAct11AirOfCosmos() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(8, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);

    // Modular arpeggio modulation
    const notes = [180, 240, 270, 360, 480, 540, 720];
    this.intervalId = setInterval(() => {
      if (!this.ctx) return;
      const pick = notes[Math.floor(Math.random() * notes.length)];
      osc.frequency.setValueAtTime(pick, this.ctx.currentTime);
    }, 140);

    this.activeNodes.push({
      stop: () => {
        osc.stop();
        if (this.intervalId) clearInterval(this.intervalId);
      },
    });
  }

  // Act 12: 432Hz synth pad wash slowly pitching down, loop closure
  private startAct12WaterOfDissolution() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const pad = this.ctx.createOscillator();
    pad.type = 'sine';
    pad.frequency.setValueAtTime(432, now);
    // Slowly ramps down towards 40Hz over 50 seconds
    pad.frequency.exponentialRampToValueAtTime(108, now + 48);

    const pad2 = this.ctx.createOscillator();
    pad2.type = 'triangle';
    pad2.frequency.setValueAtTime(216, now);
    pad2.frequency.exponentialRampToValueAtTime(54, now + 48);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);

    pad.connect(gain);
    pad2.connect(gain);
    gain.connect(this.masterGain);

    pad.start(now);
    pad2.start(now);

    this.activeNodes.push({
      stop: () => {
        pad.stop();
        pad2.stop();
      },
    });
  }

  // Special Ophiuchus Void Breach sound
  private startOphiuchusBreachSound() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(108, now); // 108Hz Zen Shield

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(108 * 1.618, now); // Golden Ratio harmonic (174.74Hz)

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(440, now);
    filter.Q.setValueAtTime(12, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);

    this.activeNodes.push({
      stop: () => {
        osc1.stop();
        osc2.stop();
      },
    });
  }

  private createAirNoiseNode(): { node: AudioNode; stop: () => void } | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    whiteNoise.start();

    return {
      node: gain,
      stop: () => whiteNoise.stop(),
    };
  }
}

export const soundEngine = new HarmonicAudioEngine();
