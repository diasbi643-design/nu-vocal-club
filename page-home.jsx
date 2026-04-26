// NU Vocal Club — Home page
// Bento grid hero in three variants

function HomePage({ theme, density, variant, onRoute, onPlay, onStop, playingId }) {
  const D = density;
  const heroEvent = EVENTS[1]; // "Jazz, After Dark" — moodiest one for hero

  // Headline copy by variant
  const headlines = {
    bento: ["The campus", "after dark"],
    split: ["A room of", "voices, after", "the lights go down"],
    poster: ["Voices,", "Live."],
  };

 if (variant === 'poster') return (
  <div>
    <HomeHeroPoster {...{theme, density, onRoute, onPlay, onStop, playingId}}/>
    <YouTubeSection theme={theme} density={density}/>
  </div>
);
  if (variant === 'split')  return <HomeHeroSplit  {...{theme, density, onRoute, onPlay, onStop, playingId}}/>;
  return <HomeHeroBento {...{theme, density, onRoute, onPlay, onStop, playingId}}/>;
}

// ───────────────────────────────────────────────────────────
// VARIANT 1 — BENTO (reference-style)
// ───────────────────────────────────────────────────────────
function HomeHeroBento({ theme, density, onRoute, onPlay, onStop, playingId }) {
  const D = density;
  const headline = (
    <h1 style={{
      fontFamily:'"Bebas Neue", "Arial Narrow", sans-serif',
      fontSize: D.hero, lineHeight:0.92, letterSpacing:'-.005em',
      margin:0, textAlign:'center', color: theme.text,
      textTransform:'uppercase',
    }}>
      Voices in the<br/>
      <em style={{ fontStyle:'italic', fontFamily:'"Cormorant Garamond", serif', fontWeight:400, letterSpacing:'-.02em', color: theme.accent }}>after-hours</em> light
    </h1>
  );

  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      {/* Headline */}
      <div style={{ padding:`${D.pad*1.2}px 0 ${D.pad}px` }}>
        {headline}
        <div style={{
          display:'flex', justifyContent:'center', alignItems:'center', gap:14,
          marginTop:18, color: theme.dim,
          fontFamily:'"Space Grotesk", sans-serif', fontSize:12, letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          <span>NU Vocal Club</span>
          <span style={{color:theme.accent}}>✦</span>
          <span>Est. 2019 · Astana</span>
          <span style={{color:theme.accent}}>✦</span>
          <span>Season VII</span>
        </div>
      </div>

      {/* Bento */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1.55fr 1fr 1fr',
        gridTemplateRows:`${D.hero*2.6}px`,
        gap: D.gap,
      }}>
        {/* LEFT — flagship */}
        <BentoFlagship theme={theme} density={D} onRoute={onRoute}/>
        {/* MIDDLE column — stack of 2 */}
        <div style={{ display:'grid', gridTemplateRows:'1fr 1fr', gap: D.gap }}>
          <BentoVocalist theme={theme} density={D}/>
          <BentoMicroCard theme={theme} density={D} onRoute={onRoute}/>
        </div>
        {/* RIGHT — venue card */}
        <BentoVenue theme={theme} density={D} onRoute={onRoute}/>
      </div>

      {/* Body strip */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap: D.gap*2.5,
        padding:`${D.pad*1.1}px ${D.pad*0.4}px ${D.pad*0.6}px`,
        alignItems:'start',
      }}>
        <p style={{
          margin:0, color: theme.dim, fontSize:14, lineHeight:1.7,
          fontFamily:'"Space Grotesk", sans-serif',
          gridColumn:'1 / 3',
          maxWidth: 560, textWrap:'pretty',
        }}>
          NU Vocal Club is a student-run live music collective at Nazarbayev University.
          Ninety members, four ensembles, and one shared belief — that the most
          honest performance is the one shared in a room full of friends.
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:10, color:theme.text }}>
          <Icon name="mic" size={18}/>
          <div style={{fontFamily:'"Bebas Neue", sans-serif', fontSize:18, letterSpacing:'.05em'}}>
            50 members<br/>
            <span style={{color:theme.dim, fontSize:11, letterSpacing:'.18em'}}>VOCALISTS · INSTRUMENTALISTS</span>
          </div>
        </div>
        <CircleBtn theme={theme} size={56} onClick={()=>onRoute('events')}>
          <Icon name="arrow-ur" size={20}/>
        </CircleBtn>
      </div>
    </div>
  );
}

function BentoFlagship({ theme, density, onRoute }) {
  return (
    <article style={{
      borderRadius: density.radius, overflow:'hidden', position:'relative',
      background: theme.cardBg, cursor:'pointer',
    }} onClick={()=>onRoute('events')}>
      <Photo
        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80"
        label="STAGE / BACKLIT VOCALIST"
        color="#1a0e06" accent={theme.accent}
        theme={theme}
      />
      {/* Overlay gradient */}
      <div style={{
        position:'absolute', inset:0,
        background: theme.overlay,
        pointerEvents:'none',
      }}/>
      {/* Content */}
      <div style={{ position:'absolute', inset:0, padding: density.pad+4, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div>
          <Tag theme={theme}>Headlining · May 14</Tag>
        </div>
        <div>
          <h2 style={{
            margin:0, color:'#f3ece2',
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: 48, lineHeight:0.95, letterSpacing:'.005em',
            maxWidth: '90%',
            textTransform:'uppercase',
          }}>
            Alive VII<br/>
            <span style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent, letterSpacing:'-.01em', fontSize:34, textTransform:'none' }}>twelve acts, one night</span>
          </h2>
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            marginTop:16, gap:12, flexWrap:'wrap',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:14, color:'#d8c8a8',
              fontFamily:'"Space Grotesk", sans-serif', fontSize:11, letterSpacing:'.22em', textTransform:'uppercase',
            }}>
              <span><Icon name="pin" size={11}/> Atrium Hall</span>
              <span style={{opacity:.4}}>·</span>
              <span><Icon name="clock" size={11}/> 20:00 · Doors 19:30</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <CircleBtn theme={{...theme, text:'#f3ece2', border:'rgba(255,255,255,0.25)'}} size={42}>
                <Icon name="play" size={14}/>
              </CircleBtn>
              <CircleBtn theme={{...theme, text:'#f3ece2', border:'rgba(255,255,255,0.25)'}} size={42}>
                <Icon name="arrow-ur" size={14}/>
              </CircleBtn>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BentoVocalist({ theme, density }) {
  return (
    <div style={{ borderRadius: density.radius, overflow:'hidden', position:'relative' }}>
      <Photo
        src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80"
        label="VOCALIST · CLOSE"
        color="#2a1810" accent={theme.accent}
        theme={theme}
      />
      <div style={{
        position:'absolute', top:14, left:14,
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'5px 10px', borderRadius:999,
        background:'rgba(10,8,7,0.55)', backdropFilter:'blur(8px)',
        color:'#f3ece2', fontFamily:'"Space Grotesk", sans-serif',
        fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <span style={{ width:5, height:5, borderRadius:'50%', background:'#ef4444', animation:'tickerPulse 1.2s infinite' }}/>
        Live tonight
      </div>
    </div>
  );
}

function BentoMicroCard({ theme, density, onRoute }) {
  return (
    <div style={{
      borderRadius: density.radius, padding: density.pad,
      background: theme.cardBg, border:`1px solid ${theme.border}`,
      display:'flex', flexDirection:'column', justifyContent:'space-between',
      position:'relative',
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        {/* Stacked thumbs */}
        <div style={{ display:'flex' }}>
          {['#3a2410','#5a3a13','#8a5a1f'].map((c,i)=>(
            <div key={i} style={{
              width:36, height:36, borderRadius:'50%',
              background:c, border:`2px solid ${theme.cardBg}`,
              marginLeft: i? -12 : 0,
              backgroundImage: `radial-gradient(circle at 30% 30%, ${theme.accent}40, transparent 60%)`,
            }}/>
          ))}
        </div>
        <CircleBtn theme={theme} size={32} onClick={()=>onRoute('archive')}>
          <Icon name="arrow-ur" size={12}/>
        </CircleBtn>
      </div>
      <div>
        <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:20, color:theme.text, lineHeight:1.2, marginBottom:4 }}>
          Six seasons of<br/>live performance
        </div>
        <div style={{ fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:theme.dim }}>
          Browse the archive →
        </div>
      </div>
    </div>
  );
}

function BentoVenue({ theme, density, onRoute }) {
  return (
    <article style={{
      borderRadius: density.radius, overflow:'hidden', position:'relative',
      background: theme.cardBg,
    }}>
      <Photo
        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80"
        label="HALL · CHAIRS"
        color="#22180c" accent={theme.accent}
        theme={theme}
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,8,7,0.6), rgba(10,8,7,0.2) 40%, rgba(10,8,7,0.85))' }}/>
      <div style={{ position:'absolute', inset:0, padding: density.pad, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div style={{
            color:'#d8c8a8',
            fontFamily:'"Space Grotesk", sans-serif',
            fontSize:11, letterSpacing:'.22em', textTransform:'uppercase',
            lineHeight:1.5,
          }}>
            Astana,<br/>Nazarbayev<br/>University
          </div>
          <CircleBtn theme={{...theme, text:'#f3ece2', border:'rgba(255,255,255,0.3)'}} size={36} onClick={()=>onRoute('events')}>
            <Icon name="arrow-ur" size={12}/>
          </CircleBtn>
        </div>
        <div>
          <div style={{
            fontFamily:'"Bebas Neue", sans-serif', fontSize:32, color:'#f3ece2',
            letterSpacing:'.02em', lineHeight:1, textTransform:'uppercase',
          }}>
            The Atrium<br/>Hall
          </div>
          <div style={{
            marginTop:6,
            fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic',
            fontSize:14, color: theme.accent,
          }}>
            our home stage
          </div>
        </div>
      </div>
    </article>
  );
}

// ───────────────────────────────────────────────────────────
// VARIANT 2 — SPLIT
// ───────────────────────────────────────────────────────────
function HomeHeroSplit({ theme, density, onRoute }) {
  const D = density;
  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      <div style={{
        display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: D.gap,
        height: D.hero*5,
        marginTop: 4,
      }}>
        {/* LEFT — type slab */}
        <div style={{
          padding: D.pad*1.3, borderRadius: D.radius,
          background: theme.cardBg, border:`1px solid ${theme.border}`,
          display:'flex', flexDirection:'column', justifyContent:'space-between',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            color: theme.dim, fontFamily:'"Space Grotesk", sans-serif',
            fontSize:10, letterSpacing:'.28em', textTransform:'uppercase',
          }}>
            <span>Season VII · 2025–26</span>
            <span>↓ scroll</span>
          </div>
          <h1 style={{
            margin:0, color:theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*1.4, lineHeight:0.86, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            A room of<br/>
            <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color:theme.accent, letterSpacing:'-.02em' }}>voices,</em><br/>
            after the<br/>
            lights go<br/>
            down.
          </h1>
          <div style={{ display:'flex', alignItems:'center', gap:14, justifyContent:'space-between' }}>
            <p style={{ margin:0, maxWidth:380, color: theme.dim, fontFamily:'"Space Grotesk", sans-serif', fontSize:13, lineHeight:1.6 }}>
              Singers and instrumentalists at Nazarbayev University,
              putting on the kind of shows you remember.
            </p>
            <button onClick={()=>onRoute('join')} style={{
              padding:'14px 22px', borderRadius:999,
              background: theme.accent, color:'#0a0807',
              border:'none', cursor:'pointer',
              fontFamily:'"Bebas Neue", sans-serif', fontSize:14, letterSpacing:'.12em',
              display:'inline-flex', alignItems:'center', gap:10, whiteSpace:'nowrap',
            }}>
              Join the Club <Icon name="arrow-ur" size={14} stroke="#0a0807"/>
            </button>
          </div>
        </div>
        {/* RIGHT — full photo */}
        <div style={{ borderRadius: D.radius, overflow:'hidden', position:'relative' }}>
          <Photo
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80"
            label="STAGE WIDE"
            color="#1a0e06" accent={theme.accent}
            theme={theme}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,8,7,0.3), rgba(10,8,7,0.85))' }}/>
          <div style={{ position:'absolute', inset:0, padding: D.pad, display:'flex', flexDirection:'column', justifyContent:'flex-end', color:'#f3ece2' }}>
            <Tag theme={theme}>Next show</Tag>
            <div style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:48, letterSpacing:'.02em', marginTop:10, lineHeight:1 }}>
              Alive Concert
            </div>
            <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:16, color: theme.accent, marginTop:4 }}>
              March 28 · Main Hall
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// VARIANT 3 — POSTER
// ───────────────────────────────────────────────────────────
function HomeHeroPoster({ theme, density, onRoute }) {
  const D = density;
  return (
    <div style={{ padding:`0 ${D.pad}px ${D.pad}px`, position:'relative' }}>
      <div style={{
        position:'relative', borderRadius: D.radius, overflow:'hidden',
        height: D.hero*6.2,
      }}>
        <Photo
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80"
          label="STAGE / SMOKE / LIGHTS"
          color="#0e0805" accent={theme.accent}
          theme={theme}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,8,7,0.2) 0%, rgba(10,8,7,0.4) 50%, rgba(10,8,7,0.95) 100%)' }}/>
        {/* Top bar */}
        <div style={{
          position:'absolute', top: D.pad, left: D.pad, right: D.pad,
          display:'flex', justifyContent:'space-between',
          color:'#d8c8a8',
          fontFamily:'"Space Grotesk", sans-serif',
          fontSize:11, letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          <span>Season VII Showcase</span>
          <span>NU · Astana · 2026</span>
        </div>
        {/* Centerpiece */}
        <div style={{
          position:'absolute', inset:0,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          color:'#f3ece2', textAlign:'center',
        }}>
          <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:22, color:theme.accent, marginBottom:8 }}>
            an evening with
          </div>
          <h1 style={{
            margin:0, fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*2.2, lineHeight:0.9, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            Voices,<br/>Live.
          </h1>
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:18, fontFamily:'"Space Grotesk", sans-serif', fontSize:11, letterSpacing:'.22em', textTransform:'uppercase' }}>
            <span>50 Members</span>
            <span style={{color:theme.accent}}>✦</span>
            <span style={{color:theme.accent}}>✦</span>
            <span>One Stage</span>
          </div>
        </div>
        {/* Bottom row */}
        <div style={{
          position:'absolute', left: D.pad, right: D.pad, bottom: D.pad,
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
          color:'#f3ece2',
        }}>
          <div>
            <div style={{ fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#d8c8a8' }}>Now playing</div>
            <div style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:24, letterSpacing:'.04em' }}>Alive Concert · March 28</div>
          </div>
          <button onClick={()=>onRoute('events')} style={{
            padding:'14px 22px', borderRadius:999,
            background: theme.accent, color:'#0a0807',
            border:'none', cursor:'pointer',
            fontFamily:'"Bebas Neue", sans-serif', fontSize:13, letterSpacing:'.12em',
            display:'inline-flex', alignItems:'center', gap:10,
          }}>
            See full season <Icon name="arrow-ur" size={12} stroke="#0a0807"/>
          </button>
        </div>
      </div>
    </div>
  );
}
// ───────────────────────────────────────────────────────────
// YouTube Section
// ───────────────────────────────────────────────────────────
function YouTubeSection({ theme, density }) {
  const D = density;
  // ↓ CHANGE THIS to your YouTube video ID
  // e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ → ID is dQw4w9WgXcQ
  const VIDEO_ID = '1b406Ewkn5c';

  return (
    <div style={{ padding:`${D.gap*2}px ${D.pad}px` }}>
      <div style={{ marginBottom: D.gap*1.2 }}>
        <div style={{
          fontFamily:'"Space Grotesk", sans-serif', fontSize:10,
          letterSpacing:'.22em', textTransform:'uppercase', color: theme.accent,
          marginBottom:10,
        }}>
          On stage
        </div>
        <h2 style={{
          margin:0, fontFamily:'"Bebas Neue", sans-serif',
          fontSize: D.hero*0.9, lineHeight:0.95, letterSpacing:'-.005em',
          textTransform:'uppercase', color: theme.text,
        }}>
          Watch the <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent }}>show</em>
        </h2>
      </div>
      <div style={{
        borderRadius: D.radius, overflow:'hidden',
        border:`1px solid ${theme.border}`,
        position:'relative', width:'100%',
        paddingTop:'56.25%', // 16:9 ratio
        background: theme.cardBg,
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
          title="NU Vocal Club"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position:'absolute', top:0, left:0,
            width:'100%', height:'100%',
            border:'none',
          }}
        />
      </div>
    </div>
  );
}
Object.assign(window, { HomePage, YouTubeSection });
