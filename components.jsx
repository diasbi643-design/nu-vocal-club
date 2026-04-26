// NU Vocal Club — shared UI components

// ───────────────────────────────────────────────────────────
// Icons (inline SVG, monoline)
// ───────────────────────────────────────────────────────────
function Icon({ name, size = 16, stroke = 'currentColor', sw = 1.5 }) {
  const s = { width: size, height: size, fill: 'none', stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'arrow-ur': return <svg viewBox="0 0 24 24" {...s}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case 'arrow-r':  return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-l':  return <svg viewBox="0 0 24 24" {...s}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
    case 'play':     return <svg viewBox="0 0 24 24" {...s} style={{...s, fill:stroke}}><path d="M8 5v14l11-7z"/></svg>;
    case 'pause':    return <svg viewBox="0 0 24 24" {...s} style={{...s, fill:stroke}}><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>;
    case 'menu':     return <svg viewBox="0 0 24 24" {...s}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close':    return <svg viewBox="0 0 24 24" {...s}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'mic':      return <svg viewBox="0 0 24 24" {...s}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    case 'note':     return <svg viewBox="0 0 24 24" {...s}><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>;
    case 'star':     return <svg viewBox="0 0 24 24" {...s}><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3.1 9.4l6.1-.9L12 3z"/></svg>;
    case 'check':    return <svg viewBox="0 0 24 24" {...s}><path d="M5 12l5 5 9-12"/></svg>;
    case 'pin':      return <svg viewBox="0 0 24 24" {...s}><path d="M12 21s7-7.5 7-12a7 7 0 0 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'clock':    return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    default: return null;
  }
}

// ───────────────────────────────────────────────────────────
// Pill button / icon button / chip
// ───────────────────────────────────────────────────────────
function Pill({ children, active, onClick, theme, style, ...rest }) {
  return (
    <button onClick={onClick} {...rest}
      style={{
        appearance:'none', border:'none', cursor:'pointer',
        padding:'10px 18px', borderRadius:999,
        background: active ? theme.accent : 'transparent',
        color: active ? '#0a0807' : theme.pillText,
        fontFamily:'"Space Grotesk", system-ui, sans-serif',
        fontSize:13, letterSpacing:'.02em',
        transition:'background .25s, color .25s',
        ...style,
      }}>{children}</button>
  );
}

function CircleBtn({ children, onClick, theme, size=44, filled=false, style, ...rest }) {
  return (
    <button onClick={onClick} {...rest}
      style={{
        width:size, height:size, borderRadius:'50%',
        border: `1px solid ${theme.border}`,
        background: filled ? theme.accent : 'transparent',
        color: filled ? '#0a0807' : theme.text,
        cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center',
        transition:'background .2s, transform .2s, border-color .2s',
        ...style,
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='scale(1.06)'; if(!filled) e.currentTarget.style.borderColor=theme.accent; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='scale(1)'; if(!filled) e.currentTarget.style.borderColor=theme.border; }}
    >{children}</button>
  );
}

function Tag({ children, theme }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'5px 10px', borderRadius:999,
      background: theme.pillBg, color: theme.dim,
      fontFamily:'"Space Grotesk", system-ui, sans-serif',
      fontSize:10, letterSpacing:'.18em', textTransform:'uppercase',
    }}>
      <span style={{width:5, height:5, borderRadius:'50%', background: theme.accent }}/>
      {children}
    </span>
  );
}

// ───────────────────────────────────────────────────────────
// SVG photo placeholder (used as fallback if Unsplash 404s)
// ───────────────────────────────────────────────────────────
function PhotoFallback({ label, color = '#2a1810', accent='#d4a14a' }) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ display:'block' }}>
      <defs>
        <pattern id={`p-${label}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="14" height="14" fill={color}/>
          <line x1="0" y1="0" x2="0" y2="14" stroke={accent} strokeWidth="0.5" opacity="0.25"/>
        </pattern>
        <radialGradient id={`g-${label}`} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#p-${label})`}/>
      <rect width="400" height="300" fill={`url(#g-${label})`}/>
      <text x="200" y="155" textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize="11"
        fill={accent} opacity="0.85" letterSpacing="2">
        [ {label} ]
      </text>
    </svg>
  );
}

// Smart photo: tries unsplash, falls back to placeholder. With optional tint.
function Photo({ src, label, color, accent, theme, style, children, fit='cover' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background: color || theme.cardBg, ...style }}>
      {!failed && src ? (
        <img src={src} alt={label}
          onError={()=>setFailed(true)}
          style={{
            width:'100%', height:'100%', objectFit:fit,
            display:'block',
            filter: theme.photoTint,
          }}/>
      ) : (
        <PhotoFallback label={label || 'photograph'} color={color || theme.cardBg} accent={accent || theme.accent}/>
      )}
      {children}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Wordmark
// ───────────────────────────────────────────────────────────
function Wordmark({ theme, size = 16 }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap:10, color: theme.text }}>
      <span style={{
        fontFamily:'"Bebas Neue", "Arial Narrow", sans-serif',
        fontSize: size+8, letterSpacing:'.08em',
      }}>NU VOCAL</span>
      <span style={{
        fontFamily:'"Space Grotesk", system-ui, sans-serif',
        fontSize: size-4, letterSpacing:'.32em', color: theme.dim,
        textTransform:'uppercase',
      }}>club</span>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Top nav
// ───────────────────────────────────────────────────────────
function TopNav({ theme, route, onRoute }) {
  return (
    <header style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'18px 22px', position:'relative', zIndex:5,
    }}>
      <div onClick={()=>onRoute('home')} style={{ cursor:'pointer' }}>
        <Wordmark theme={theme}/>
      </div>
      <nav style={{
        display:'flex', alignItems:'center', gap:2,
        background: theme.pillBg, borderRadius:999, padding:4,
        border:`1px solid ${theme.border}`,
      }}>
        {NAV.map(n => (
          <Pill key={n.id} theme={theme} active={route===n.id} onClick={()=>onRoute(n.id)}>
            {n.label}
          </Pill>
        ))}
      </nav>
      <div style={{ minWidth: 110 }}/>
    </header>
  );
}

// ───────────────────────────────────────────────────────────
// Sticky concert ticker
// ───────────────────────────────────────────────────────────
function CountdownPill({ theme, target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{
    const t = setInterval(()=>setNow(Date.now()), 1000);
    return ()=>clearInterval(t);
  },[]);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  const cell = (n, label) => (
    <span style={{
      display:'inline-flex', flexDirection:'column', alignItems:'center',
      minWidth: 38,
    }}>
      <span style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:22, lineHeight:1, color: theme.accent, letterSpacing:'.04em' }}>{String(n).padStart(2,'0')}</span>
      <span style={{ fontFamily:'"Space Grotesk", sans-serif', fontSize:8, letterSpacing:'.2em', color:theme.dim, textTransform:'uppercase', marginTop:3 }}>{label}</span>
    </span>
  );
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:14 }}>
      {cell(d,'days')}
      <span style={{color:theme.dim}}>:</span>
      {cell(h,'hrs')}
      <span style={{color:theme.dim}}>:</span>
      {cell(m,'min')}
      <span style={{color:theme.dim}}>:</span>
      {cell(s,'sec')}
    </div>
  );
}

function Ticker({ theme, onCta, target, eventTitle, venue }) {
  const items = [
    `🎤 ${eventTitle}`,
    `📍 ${venue}`,
    'EARLY ACCESS — MEMBERS',
    'DOORS · 19:00',
    'LIVE BAND · 4 SETS',
    'Alive Concert ',
  ];
  const stream = [...items, ...items, ...items];
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:18,
      padding:'10px 14px',
      background: theme.cardBg,
      border:`1px solid ${theme.border}`,
      borderRadius:999,
      overflow:'hidden',
    }}>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:8,
        padding:'6px 12px', borderRadius:999,
        background: theme.accent, color:'#0a0807',
        fontFamily:'"Bebas Neue", sans-serif', fontSize:12, letterSpacing:'.12em',
        flexShrink:0,
      }}>
        <span style={{
          width:8, height:8, borderRadius:'50%', background:'#0a0807',
          animation:'tickerPulse 1.2s ease-in-out infinite',
        }}/>
        NEXT SHOW
      </div>
      <CountdownPill theme={theme} target={target}/>
      <div style={{
        flex:1, overflow:'hidden', position:'relative',
        maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}>
        <div style={{
          display:'inline-flex', gap:36, whiteSpace:'nowrap',
          animation:'tickerScroll 38s linear infinite',
          fontFamily:'"Space Grotesk", sans-serif', fontSize:11,
          letterSpacing:'.22em', textTransform:'uppercase', color: theme.dim,
        }}>
          {stream.map((t,i)=>(
            <span key={i} style={{display:'inline-flex', alignItems:'center', gap:18}}>
              {t}
              <span style={{color:theme.accent, opacity:0.5}}>✦</span>
            </span>
          ))}
        </div>
      </div>
      <button onClick={onCta} style={{
        appearance:'none', border:'none', cursor:'pointer',
        padding:'10px 18px', borderRadius:999,
        background: theme.text, color: theme.pageBg,
        fontFamily:'"Bebas Neue", sans-serif', fontSize:13, letterSpacing:'.12em',
        flexShrink:0,
        display:'inline-flex', alignItems:'center', gap:8,
      }}>
        Reserve <Icon name="arrow-ur" size={12}/>
      </button>
    </div>
  );
}

Object.assign(window, {
  Icon, Pill, CircleBtn, Tag, PhotoFallback, Photo, Wordmark, TopNav, Ticker, CountdownPill,
});
