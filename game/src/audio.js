// WRACKLINE HEAT — WebAudio synth: SFX + 3 radio stations. Everything is
// generated, no audio files. Context is created lazily on the first user
// gesture; every call is guarded so audio can never throw into the game loop.
let ctx = null, master = null, radioTimer = null, radioStep = 0, engineOsc = null, engineGain = null;

export const STATIONS = [
  { name: 'SURFLINE 102.5 FM', track: 'The Wrackline — “Low Water”', scale: [0, 3, 5, 7, 10], base: 196, tempo: 340 },
  { name: 'GLASSHULL 94.9', track: 'Neon Cannery — “Salt in the Wiring”', scale: [0, 2, 4, 7, 9], base: 220, tempo: 260 },
  { name: 'BEACON NIGHTS 88.3', track: 'Mira & The Herons — “High Water”', scale: [0, 3, 5, 8, 10], base: 174, tempo: 420 },
];
export let stationIndex = 0;

export function initAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume().catch(() => {}); return true; }
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
    startRadio();
    return true;
  } catch { ctx = null; return false; }
}
function tone(freq, dur, type, vol, when = 0, slideTo = 0) {
  if (!ctx || !master) return;
  try {
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
  } catch { /* audio is decorative; never break the game */ }
}
function startRadio() {
  stopRadio();
  if (!ctx) return;
  const st = STATIONS[stationIndex];
  radioTimer = setInterval(() => {
    if (!ctx) return;
    const deg = st.scale[radioStep % st.scale.length];
    const f = st.base * Math.pow(2, deg / 12);
    tone(f, 0.32, 'triangle', 0.05);
    if (radioStep % 4 === 0) tone(st.base / 2, 0.4, 'sine', 0.07);
    radioStep++;
  }, st.tempo);
}
function stopRadio() { if (radioTimer) { clearInterval(radioTimer); radioTimer = null; } }
export function cycleStation() {
  stationIndex = (stationIndex + 1) % STATIONS.length;
  if (ctx) startRadio();
  return STATIONS[stationIndex];
}
export function sfx(name) {
  if (!ctx) return;
  try {
    if (name === 'shot') { tone(160, 0.09, 'square', 0.16, 0, 60); tone(900, 0.05, 'sawtooth', 0.06); }
    else if (name === 'hit') tone(300, 0.07, 'square', 0.1, 0, 140);
    else if (name === 'stage') { tone(660, 0.12, 'sine', 0.12); tone(880, 0.16, 'sine', 0.12, 0.09); }
    else if (name === 'mission') { [523, 659, 784].forEach((f, i) => tone(f, 0.18, 'triangle', 0.12, i * 0.1)); }
    else if (name === 'fail') { tone(220, 0.25, 'sawtooth', 0.1, 0, 110); }
    else if (name === 'door') tone(140, 0.08, 'sine', 0.12, 0, 90);
    else if (name === 'siren') { tone(700, 0.16, 'sine', 0.045); tone(950, 0.16, 'sine', 0.045, 0.16); }
    else if (name === 'cash') { tone(1200, 0.07, 'square', 0.07); tone(1600, 0.1, 'square', 0.07, 0.06); }
  } catch { /* ignore */ }
}
export function setEngine(on, speedFrac) {
  if (!ctx || !master) return;
  try {
    if (on && !engineOsc) {
      engineOsc = ctx.createOscillator(); engineGain = ctx.createGain();
      engineOsc.type = 'sawtooth'; engineGain.gain.value = 0.0;
      const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 400;
      engineOsc.connect(flt); flt.connect(engineGain); engineGain.connect(master); engineOsc.start();
    }
    if (engineOsc) {
      engineOsc.frequency.value = 55 + Math.abs(speedFrac) * 130;
      engineGain.gain.value = on ? 0.028 + Math.abs(speedFrac) * 0.03 : 0.0;
    }
  } catch { /* ignore */ }
}
