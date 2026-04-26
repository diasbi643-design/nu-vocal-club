// NU Vocal Club — Archive page (with lightbox)

function ArchivePage({ theme, density }) {
  const D = density;
  const [open, setOpen] = useState(null); // index
  const [filter, setFilter] = useState('all');

  const tags = ['all', ...Array.from(new Set(ARCHIVE.map(a => a.tag.toLowerCase())))];
  const filtered = filter === 'all' ? ARCHIVE : ARCHIVE.filter(a => a.tag.toLowerCase() === filter);

  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:`${D.pad*1.4}px ${D.pad*0.4}px ${D.pad}px`, gap: 28 }}>
        <div>
          <Tag theme={theme}>Six seasons · 2019 — 2026</Tag>
          <h1 style={{
            margin:'10px 0 0', color:theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*1.05, lineHeight:0.95, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            The<br/>
            <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent, letterSpacing:'-.01em' }}>archive</em>
          </h1>
        </div>
        <p style={{
          margin:0, maxWidth: 380, color:theme.dim,
          fontFamily:'"Space Grotesk", sans-serif', fontSize:13, lineHeight:1.6,
          textWrap:'pretty', textAlign:'right',
        }}>
          Every show we've put on, every voice that's stood at the front of a darkened hall.
          Tap any night to revisit it.
        </p>
      </div>

      <div style={{ display:'flex', gap:6, padding:4, borderRadius:999, background: theme.pillBg, border:`1px solid ${theme.border}`, width:'fit-content', marginBottom: D.gap }}>
        {tags.map(t => (
          <Pill key={t} theme={theme} active={filter===t} onClick={()=>setFilter(t)}>
            {t === 'all' ? 'All' : t[0].toUpperCase()+t.slice(1)}
          </Pill>
        ))}
      </div>

      {/* Mosaic grid */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(4, 1fr)',
        gridAutoRows: D.hero*1.7,
        gap: D.gap,
      }}>
        {filtered.map((item, i) => {
          // Asymmetric pattern
          const big = i % 5 === 0;
          const wide = i % 7 === 3;
          return (
            <div key={item.id} onClick={()=>setOpen(i)}
              style={{
                gridColumn: big ? 'span 2' : (wide ? 'span 2' : 'span 1'),
                gridRow: big ? 'span 2' : 'span 1',
                borderRadius: D.radius, overflow:'hidden',
                position:'relative', cursor:'pointer',
                background: theme.cardBg,
              }}
              onMouseEnter={e=>e.currentTarget.querySelector('img,svg').style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.querySelector('img,svg').style.transform='scale(1)'}
            >
              <div style={{ width:'100%', height:'100%', transition:'transform .6s', display:'block' }}>
                <Photo src={item.img} label={item.title.toUpperCase()} theme={theme}
                  color="#1a0e06" accent={theme.accent}/>
              </div>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,8,7,0) 50%, rgba(10,8,7,0.92))' }}/>
              <div style={{ position:'absolute', inset:0, padding: D.pad*0.8, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div style={{
                  alignSelf:'flex-start',
                  padding:'4px 10px', borderRadius:999,
                  background:'rgba(10,8,7,0.55)', backdropFilter:'blur(8px)',
                  color:'#d8c8a8',
                  fontFamily:'"Space Grotesk", sans-serif', fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
                }}>{item.tag}</div>
                <div style={{ color:'#f3ece2' }}>
                  <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:13, color: theme.accent, marginBottom:4 }}>
                    {item.date}
                  </div>
                  <div style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize: big? 40 : 24, lineHeight:1, letterSpacing:'.02em', textTransform:'uppercase' }}>
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <Lightbox theme={theme} items={filtered} index={open} onClose={()=>setOpen(null)} onIndex={setOpen}/>
      )}
    </div>
  );
}

function Lightbox({ theme, items, index, onClose, onIndex }) {
  const item = items[index];
  useEffect(()=>{
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index+1)%items.length);
      if (e.key === 'ArrowLeft') onIndex((index-1+items.length)%items.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index]);

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:99,
      background:'rgba(8,6,4,0.92)', backdropFilter:'blur(18px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'40px 80px',
    }}>
      <button onClick={(e)=>{e.stopPropagation(); onClose();}} style={{
        position:'absolute', top:24, right:24,
        width:48, height:48, borderRadius:'50%',
        background:'rgba(243,236,226,0.08)', border:`1px solid rgba(243,236,226,0.15)`,
        color:'#f3ece2', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon name="close" size={18}/>
      </button>

      <button onClick={(e)=>{e.stopPropagation(); onIndex((index-1+items.length)%items.length);}} style={{
        position:'absolute', left:24, top:'50%', transform:'translateY(-50%)',
        width:48, height:48, borderRadius:'50%',
        background:'rgba(243,236,226,0.08)', border:`1px solid rgba(243,236,226,0.15)`,
        color:'#f3ece2', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon name="arrow-l" size={18}/>
      </button>
      <button onClick={(e)=>{e.stopPropagation(); onIndex((index+1)%items.length);}} style={{
        position:'absolute', right:24, top:'50%', transform:'translateY(-50%)',
        width:48, height:48, borderRadius:'50%',
        background:'rgba(243,236,226,0.08)', border:`1px solid rgba(243,236,226,0.15)`,
        color:'#f3ece2', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon name="arrow-r" size={18}/>
      </button>

      <div onClick={e=>e.stopPropagation()} style={{
        display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:28,
        maxWidth:1080, width:'100%', maxHeight:'85vh',
      }}>
        <div style={{ borderRadius:24, overflow:'hidden', height:520 }}>
          <Photo src={item.img} label={item.title.toUpperCase()} theme={theme}
            color="#1a0e06" accent={theme.accent}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', color:'#f3ece2', padding:'20px 0' }}>
          <div>
            <div style={{
              display:'inline-block',
              padding:'5px 10px', borderRadius:999,
              background:'rgba(243,236,226,0.08)',
              fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase',
              color: theme.accent,
            }}>{item.tag}</div>
            <h2 style={{
              margin:'14px 0 8px',
              fontFamily:'"Bebas Neue", sans-serif',
              fontSize:84, lineHeight:0.92, letterSpacing:'.005em',
              textTransform:'uppercase',
            }}>{item.title}</h2>
            <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:22, color: theme.accent }}>
              {item.date}
            </div>
            <p style={{
              marginTop:24, maxWidth:380,
              fontFamily:'"Space Grotesk", sans-serif', fontSize:14, lineHeight:1.7,
              color:'rgba(243,236,226,0.7)', textWrap:'pretty',
            }}>
           {item.blurb}
            </p>
          </div>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            color:'rgba(243,236,226,0.5)',
            fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase',
          }}>
            <span>{String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span>
            <span>← → to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ArchivePage, Lightbox });
