// NU Vocal Club — Events page

function EventsPage({ theme, density, onPlay, onStop, playingId }) {
  const D = density;
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.tag.toLowerCase() === filter);

  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:`${D.pad*1.4}px ${D.pad*0.4}px ${D.pad*0.6}px`, gap: 28, flexWrap:'wrap' }}>
        <div>
          <Tag theme={theme}>Season VII · 2026</Tag>
          <h1 style={{
            margin:'10px 0 0', color:theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*1.05, lineHeight:0.95, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            Upcoming<br/>
            <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent, letterSpacing:'-.01em' }}>nights, in order</em>
          </h1>
        </div>
        <div style={{ display:'flex', gap: 4, padding:4, borderRadius:999, background: theme.pillBg, border:`1px solid ${theme.border}`, flexWrap:'wrap' }}>
          {['all','headline','themed','open','showcase'].map(f => (
            <Pill key={f} theme={theme} active={filter===f} onClick={()=>setFilter(f)}>
              {f === 'all' ? 'All shows' : f[0].toUpperCase()+f.slice(1)}
            </Pill>
          ))}
        </div>
      </div>

      {/* Event cards */}
      <div style={{ display:'flex', flexDirection:'column', gap: D.gap }}>
        {filtered.map((e, i) => (
          <EventCard key={e.id} event={e} index={i+1} theme={theme} density={D}
            onPlay={onPlay} onStop={onStop} playing={playingId === e.id}/>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, index, theme, density, onPlay, onStop, playing }) {
  const D = density;
  const [hover, setHover] = useState(false);

  // Auto-play preview on hover
  useEffect(() => {
    if (hover && !playing) onPlay(event);
    if (!hover && playing) onStop();
  }, [hover]); // eslint-disable-line

  return (
    <article
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        display:'grid', gridTemplateColumns:'80px 1.2fr 1fr 220px',
        gap: D.gap*1.5,
        alignItems:'stretch',
        padding: D.pad, borderRadius: D.radius,
        background: theme.cardBg, border:`1px solid ${hover ? theme.accent+'55' : theme.border}`,
        transition:'border-color .3s, transform .3s',
        transform: hover ? 'translateY(-2px)' : 'none',
        position:'relative', overflow:'hidden',
      }}
    >
      {/* Index */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{
          fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic',
          fontSize: 14, color: theme.dim,
        }}>nº {String(index).padStart(2,'0')}</div>
        <div style={{
          fontFamily:'"Bebas Neue", sans-serif', fontSize: 56, lineHeight:1,
          color: hover ? theme.accent : theme.text, transition:'color .3s',
        }}>
          {event.date.split(' ')[1].replace(',','')}
          <div style={{ fontSize:13, letterSpacing:'.22em', color:theme.dim }}>{event.date.split(' ')[0].toUpperCase()}</div>
        </div>
      </div>

      {/* Title block */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <Tag theme={theme}>{event.tag}</Tag>
        <div>
          <h3 style={{
            margin:0, color: theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: 34, lineHeight:1, letterSpacing:'.005em',
            textTransform:'uppercase',
          }}>{event.title}</h3>
          <div style={{
            marginTop:6,
            fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic',
            fontSize:15, color: theme.accent,
          }}>{event.subtitle}</div>
        </div>
        <div style={{
          display:'flex', gap:14, color: theme.dim, marginTop:'auto',
          fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase',
          flexWrap:'wrap',
        }}>
          <span style={{display:'inline-flex', alignItems:'center', gap:5}}><Icon name="clock" size={11}/> {event.time}</span>
          <span style={{display:'inline-flex', alignItems:'center', gap:5}}><Icon name="pin" size={11}/> {event.venue}</span>
        </div>
      </div>

      {/* Blurb + sold meter */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', gap:12 }}>
        <p style={{ margin:0, color: theme.dim, fontSize:14, lineHeight:1.6, fontFamily:'"Space Grotesk", sans-serif', textWrap:'pretty' }}>
          {event.blurb}
        </p>
        <div>
          <div style={{
            display:'flex', justifyContent:'space-between',
            fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.2em', textTransform:'uppercase',
            color: theme.dim, marginBottom:6,
          }}>
            <span>Reserved</span>
            <span style={{color: theme.accent}}>{event.soldPct}%</span>
          </div>
          <div style={{ height:3, background: theme.pillBg, borderRadius:999, overflow:'hidden' }}>
            <div style={{ width: `${event.soldPct}%`, height:'100%', background: theme.accent, transition:'width .6s' }}/>
          </div>
        </div>
      </div>

      {/* Right: play preview + reserve */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end', gap:12 }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'6px 12px', borderRadius:999,
          background: theme.pillBg, border:`1px solid ${theme.border}`,
          color: playing ? theme.accent : theme.dim,
          fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          {playing ? <PlayingBars color={theme.accent}/> : <Icon name="play" size={10}/>}
          {playing ? 'Previewing' : 'Hover to preview'}
        </div>
        <button style={{
          appearance:'none', border:'none', cursor:'pointer',
          padding:'14px 22px', borderRadius:999,
          background: hover ? theme.accent : theme.text,
          color: hover ? '#0a0807' : theme.pageBg,
          fontFamily:'"Bebas Neue", sans-serif', fontSize:13, letterSpacing:'.12em',
          transition:'background .3s, color .3s',
          display:'inline-flex', alignItems:'center', gap:10,
        }}>
          Reserve seat <Icon name="arrow-ur" size={12} stroke={hover?'#0a0807':theme.pageBg}/>
        </button>
      </div>
    </article>
  );
}

// Animated bars while previewing
function PlayingBars({ color = '#d4a14a' }) {
  return (
    <span style={{ display:'inline-flex', gap:2, alignItems:'flex-end', height:10 }}>
      {[0.5, 1, 0.7, 1.1, 0.6].map((d, i) => (
        <span key={i} style={{
          width:2, height:'100%', background: color, borderRadius:1,
          animation:`barPulse ${0.6+i*0.05}s ease-in-out ${i*0.08}s infinite alternate`,
        }}/>
      ))}
    </span>
  );
}

Object.assign(window, { EventsPage, EventCard, PlayingBars });
