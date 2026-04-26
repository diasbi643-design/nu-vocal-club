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
  { id: 'a1', title: 'Alive VI', date: 'Nov 2025', tag: 'Headline', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=80' },
  { id: 'a2', title: 'Smoke & Strings', date: 'Oct 2025', tag: 'Jazz Night', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80' },
  { id: 'a3', title: 'Open Mic III', date: 'Sep 2025', tag: 'Open', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80' },
  { id: 'a4', title: 'Winter Reverie', date: 'Dec 2025', tag: 'Themed', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80' },
  { id: 'a5', title: 'Acoustic Hour', date: 'Aug 2025', tag: 'Intimate', img: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=900&q=80' },
  { id: 'a6', title: 'Brass & Velvet', date: 'Jul 2025', tag: 'Jazz Night', img: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80' },
  { id: 'a7', title: 'First Light', date: 'May 2025', tag: 'Showcase', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80' },
  { id: 'a8', title: 'Alive V', date: 'Apr 2025', tag: 'Headline', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80' },
];

const MEMBERS = [
  { id: 'm1', name: 'Aizada K.', role: 'Lead Vocalist', joined: '2023', focus: 'Jazz · Soul', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
  { id: 'm2', name: 'Daulet B.', role: 'Pianist · Arranger', joined: '2022', focus: 'Bossa · Standards', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { id: 'm3', name: 'Madina S.', role: 'Vocalist', joined: '2024', focus: 'R&B · Indie', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80' },
  { id: 'm4', name: 'Yerlan T.', role: 'Guitarist', joined: '2023', focus: 'Acoustic · Funk', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80' },
  { id: 'm5', name: 'Aliya N.', role: 'Drummer', joined: '2024', focus: 'Latin · Fusion', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80' },
  { id: 'm6', name: 'Rauan I.', role: 'Bassist', joined: '2022', focus: 'Jazz · Soul', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80' },
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
