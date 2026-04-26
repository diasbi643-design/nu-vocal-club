// NU Vocal Club — luxury jazz lounge prototype
// Main app: routing + layout shell

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ───────────────────────────────────────────────────────────
// Theme tokens (mood-aware)
// ───────────────────────────────────────────────────────────
const MOODS = {
  dark: {
    name: 'Midnight',
    pageBg: '#0a0807',
    cardBg: '#15110e',
    text: '#f3ece2',
    dim: '#a89a86',
    border: 'rgba(243, 236, 226, 0.08)',
    pillBg: 'rgba(243, 236, 226, 0.06)',
    pillText: '#f3ece2',
    accent: '#d4a14a',  // brass
    accentDeep: '#8a5a1f',
    overlay: 'linear-gradient(180deg, rgba(10,8,7,0.0) 30%, rgba(10,8,7,0.85) 100%)',
    photoTint: 'sepia(0.35) saturate(1.1) brightness(0.9) contrast(1.05)',
  },
  sepia: {
    name: 'Lounge',
    pageBg: '#1a1208',
    cardBg: '#241808',
    text: '#f5e8d0',
    dim: '#b8a382',
    border: 'rgba(245, 232, 208, 0.1)',
    pillBg: 'rgba(245, 232, 208, 0.08)',
    pillText: '#f5e8d0',
    accent: '#e8b86a',
    accentDeep: '#9c6a23',
    overlay: 'linear-gradient(180deg, rgba(26,18,8,0.0) 30%, rgba(26,18,8,0.85) 100%)',
    photoTint: 'sepia(0.6) saturate(1.2) brightness(0.85) contrast(1.05)',
  },
  light: {
    name: 'Ivory',
    pageBg: '#f4ede0',
    cardBg: '#ebe2d0',
    text: '#1a1208',
    dim: '#6b5a3e',
    border: 'rgba(26, 18, 8, 0.1)',
    pillBg: 'rgba(26, 18, 8, 0.06)',
    pillText: '#1a1208',
    accent: '#8a5a1f',
    accentDeep: '#5a3a13',
    overlay: 'linear-gradient(180deg, rgba(26,18,8,0.0) 40%, rgba(26,18,8,0.7) 100%)',
    photoTint: 'sepia(0.25) saturate(1.05) brightness(0.95)',
  },
};

const DENSITY = {
  cozy:    { gap: 14, pad: 22, radius: 22, hero: 84 },
  regular: { gap: 18, pad: 28, radius: 28, hero: 104 },
  airy:    { gap: 24, pad: 36, radius: 32, hero: 128 },
};

// ───────────────────────────────────────────────────────────
// Tweakable defaults (persistable via host)
// ───────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "sepia",
  "density": "airy",
  "heroVariant": "poster",
  "showTicker": true
}/*EDITMODE-END*/;

// ───────────────────────────────────────────────────────────
// Audio: synthesized music snippets (notes per event "song")
// ───────────────────────────────────────────────────────────
const audioCtxRef = { current: null };
function getAC() {
  if (!audioCtxRef.current) {
    try { audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { return null; }
  }
  return audioCtxRef.current;
}
function noteFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

// Plays a short progression. Returns a stop fn.
function playProgression(notes, opts={}) {
  const ac = getAC();
  if (!ac) return () => {};
  if (ac.state === 'suspended') ac.resume();
  const { tempo = 110, type = 'sine', gain = 0.08 } = opts;
  const beat = 60 / tempo;
  const masterGain = ac.createGain();
  masterGain.gain.value = gain;
  masterGain.connect(ac.destination);
  const oscs = [];
  let t = ac.currentTime + 0.02;
  notes.forEach(([midi, dur]) => {
    if (midi === null) { t += dur * beat; return; }
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = noteFreq(midi);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(1, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur * beat);
    o.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t + dur * beat + 0.05);
    oscs.push(o);
    t += dur * beat;
  });
  return () => {
    oscs.forEach(o => { try { o.stop(); } catch(e){} });
    try { masterGain.disconnect(); } catch(e){}
  };
}

// ───────────────────────────────────────────────────────────
// Data
// ───────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'alive-vii',
    title: 'Alive VII',
    subtitle: 'Annual flagship concert',
    date: 'May 14, 2026',
    time: '20:00',
    venue: 'Atrium Hall · NU',
    tag: 'Headline',
    blurb: 'Twelve acts. Three hours. One night where the entire campus becomes a stage.',
    color: '#3a2410',
    progression: [[60,1],[64,0.5],[67,0.5],[72,1.5],[null,0.5],[71,0.5],[69,0.5],[67,1]],
    style: 'piano',
    soldPct: 78,
  },
  {
    id: 'jazz-after-dark',
    title: 'Jazz, After Dark',
    subtitle: 'Intimate lounge night',
    date: 'Apr 30, 2026',
    time: '21:30',
    venue: 'Block 8 Lounge',
    tag: 'Themed',
    blurb: 'Smoke, stand-up bass, and standards reimagined. Limited seating, candle-lit.',
    color: '#2a1810',
    progression: [[57,0.75],[60,0.75],[63,1],[65,1.5],[63,0.5],[60,1.5]],
    style: 'sax',
    soldPct: 92,
  },
  {
    id: 'open-mic-iv',
    title: 'Open Mic IV',
    subtitle: 'Members + guests',
    date: 'Apr 26, 2026',
    time: '19:00',
    venue: 'Main Library Steps',
    tag: 'Open',
    blurb: 'Bring a song, a poem, an instrument. Sign-ups at the door.',
    color: '#22180c',
    progression: [[64,0.5],[67,0.5],[72,1],[71,0.5],[67,0.5],[64,1.5]],
    style: 'guitar',
    soldPct: 45,
  },
  {
    id: 'spring-showcase',
    title: 'Spring Showcase',
    subtitle: 'Ensemble graduation set',
    date: 'May 28, 2026',
    time: '19:30',
    venue: 'Atrium Hall · NU',
    tag: 'Showcase',
    blurb: 'Senior vocalists pass the mic. A bittersweet farewell in three movements.',
    color: '#2e1c0e',
    progression: [[62,1],[65,1],[69,1],[72,1.5],[null,0.5],[69,1]],
    style: 'piano',
    soldPct: 30,
  },
];

const ARCHIVE = [
{ id: 'a1', title: 'Spotify Vol 3', date: 'October 2025', tag: 'Headline', img: 'https://ibb.co.com/fhGhCdX' },
  { id: 'a2', title: 'Jazz Nigth', date: 'February 2026', tag: 'Jazz Night', img: 'https://ibb.co.com/twCbBFTk' },
  { id: 'a3', title: 'Alive Concert', date: 'March 2026', tag: 'Open', img: 'https://ibb.co.com/3mKg9d0d' },
];

const MEMBERS = [
];

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Events' },
  { id: 'archive', label: 'Archive' },
  { id: 'members', label: 'Members' },
  { id: 'join', label: 'Join' },
];

// Make everything global so other script files can pick it up
Object.assign(window, {
  React, MOODS, DENSITY, TWEAK_DEFAULTS,
  EVENTS, ARCHIVE, MEMBERS, NAV,
  playProgression, useState, useEffect, useRef, useMemo, useCallback,
});
