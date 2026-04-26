// NU Vocal Club — Members & Join pages

function MembersPage({ theme, density }) {
  const D = density;
  const [hover, setHover] = useState(null);
  const groups = ['All', 'Vocalists', 'Instrumentalists', 'Ensembles'];
  const [group, setGroup] = useState('All');

  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:`${D.pad*1.4}px ${D.pad*0.4}px ${D.pad}px` }}>
        <div>
          <Tag theme={theme}>92 members</Tag>
          <h1 style={{
            margin:'10px 0 0', color:theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*1.05, lineHeight:0.95, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            The<br/>
            <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent, letterSpacing:'-.01em' }}>company</em>
          </h1>
        </div>
        <div style={{ display:'flex', gap:6, padding:4, borderRadius:999, background: theme.pillBg, border:`1px solid ${theme.border}` }}>
          {groups.map(g => (
            <Pill key={g} theme={theme} active={group===g} onClick={()=>setGroup(g)}>{g}</Pill>
          ))}
        </div>
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: D.gap,
      }}>
        {MEMBERS.map((m, i) => (
          <article key={m.id}
            onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
            style={{
              borderRadius: D.radius, overflow:'hidden',
              background: theme.cardBg, border:`1px solid ${hover===i ? theme.accent+'55' : theme.border}`,
              transition:'border-color .3s, transform .3s',
              transform: hover===i ? 'translateY(-3px)' : 'none',
              cursor:'pointer', position:'relative',
            }}>
            <div style={{ aspectRatio:'4/5', position:'relative' }}>
              <Photo src={m.img} label={m.name.toUpperCase()} theme={theme}
                color="#1a0e06" accent={theme.accent}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,8,7,0) 50%, rgba(10,8,7,0.85))' }}/>
              <div style={{ position:'absolute', top:14, left:14, display:'flex', gap:6 }}>
                <span style={{
                  padding:'4px 10px', borderRadius:999,
                  background:'rgba(10,8,7,0.55)', backdropFilter:'blur(8px)',
                  color:'#f3ece2',
                  fontFamily:'"Space Grotesk", sans-serif', fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
                }}>since {m.joined}</span>
              </div>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding: D.pad*0.8, color:'#f3ece2' }}>
                <div style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontSize:14, color: theme.accent, marginBottom:4 }}>
                  {m.focus}
                </div>
                <h3 style={{ margin:0, fontFamily:'"Bebas Neue", sans-serif', fontSize:30, letterSpacing:'.02em', lineHeight:1, textTransform:'uppercase' }}>
                  {m.name}
                </h3>
                <div style={{ marginTop:6, fontFamily:'"Space Grotesk", sans-serif', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'#d8c8a8' }}>
                  {m.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{
        marginTop: D.gap*1.5,
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: D.gap,
      }}>
        {[
          { n:'92', l:'Active members'},
          { n:'4', l:'Ensembles'},
          { n:'24', l:'Shows / season'},
          { n:'7', l:'Years on stage'},
        ].map((s,i)=>(
          <div key={i} style={{
            padding: D.pad, borderRadius: D.radius,
            background: theme.cardBg, border:`1px solid ${theme.border}`,
          }}>
            <div style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize: 64, lineHeight:1, color: theme.accent, letterSpacing:'.02em' }}>{s.n}</div>
            <div style={{ marginTop:8, fontFamily:'"Space Grotesk", sans-serif', fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color: theme.dim }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// JOIN — multi-step audition form
// ───────────────────────────────────────────────────────────
function JoinPage({ theme, density }) {
  const D = density;
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name:'', email:'', role:'vocalist', experience:'beginner',
    sample:'', slot:'', why:'',
  });
  const [errors, setErrors] = useState({});

  const update = (k, v) => setData(d => ({...d, [k]: v}));

  const validate = (s) => {
    const e = {};
    if (s===1) {
      if (!data.name.trim()) e.name = 'We need a name to call you by.';
      if (!data.email.includes('@')) e.email = 'A real email, please.';
    }
    if (s===3) {
      if (!data.slot) e.slot = 'Pick an audition slot.';
    }
    if (s===4) {
      if (data.why.trim().length < 20) e.why = 'A few more words — at least 20 characters.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s=>Math.min(5, s+1)); };
  const back = () => setStep(s=>Math.max(1, s-1));

  const slots = ['Apr 28 · 18:00', 'Apr 29 · 17:30', 'Apr 30 · 18:30', 'May 02 · 14:00', 'May 03 · 16:00'];

  return (
    <div style={{ padding:`8px ${D.pad}px ${D.pad}px` }}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1.2fr', gap: D.gap*2,
        padding:`${D.pad*1.4}px ${D.pad*0.4}px ${D.pad}px`,
      }}>
        <div>
          <Tag theme={theme}>Auditions · April / May</Tag>
          <h1 style={{
            margin:'10px 0 0', color:theme.text,
            fontFamily:'"Bebas Neue", sans-serif',
            fontSize: D.hero*1.05, lineHeight:0.95, letterSpacing:'-.005em',
            textTransform:'uppercase',
          }}>
            Join the<br/>
            <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent, letterSpacing:'-.01em' }}>company</em>
          </h1>
          <p style={{
            marginTop:18, color: theme.dim, maxWidth: 380,
            fontFamily:'"Space Grotesk", sans-serif', fontSize:14, lineHeight:1.7,
            textWrap:'pretty',
          }}>
            We hold open auditions twice a year. Come prepared with one piece you love
            and one you're scared of. Five minutes. The room is warm.
          </p>

          {/* Progress rail */}
          <div style={{ marginTop: 36 }}>
            {['Your details','Voice & instrument','Pick a slot','Tell us why','Confirmation'].map((label, i) => {
              const idx = i+1;
              const done = step > idx, active = step===idx;
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:14,
                  padding:'10px 0',
                  color: active ? theme.text : (done ? theme.dim : theme.dim),
                  opacity: done || active ? 1 : 0.5,
                }}>
                  <div style={{
                    width:28, height:28, borderRadius:'50%',
                    border:`1px solid ${active ? theme.accent : theme.border}`,
                    background: done ? theme.accent : 'transparent',
                    color: done ? '#0a0807' : (active ? theme.accent : theme.dim),
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'"Bebas Neue", sans-serif', fontSize:13,
                  }}>
                    {done ? <Icon name="check" size={12} stroke="#0a0807"/> : idx}
                  </div>
                  <div style={{
                    fontFamily:'"Space Grotesk", sans-serif', fontSize:12, letterSpacing:'.2em', textTransform:'uppercase',
                  }}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <div style={{
          padding: D.pad*1.4, borderRadius: D.radius,
          background: theme.cardBg, border:`1px solid ${theme.border}`,
          minHeight: 480,
          display:'flex', flexDirection:'column', justifyContent:'space-between',
        }}>
          {step === 1 && (
            <FormStep theme={theme} title="Who are you?" subtitle="The basics. We promise we'll remember.">
              <Field theme={theme} label="Full name" value={data.name} onChange={v=>update('name',v)} error={errors.name} placeholder="Aizada Karimova"/>
              <Field theme={theme} label="Email" value={data.email} onChange={v=>update('email',v)} error={errors.email} placeholder="you@nu.edu.kz"/>
            </FormStep>
          )}
          {step === 2 && (
            <FormStep theme={theme} title="What do you bring?" subtitle="No wrong answer. Many of us play more than one role.">
              <Choice theme={theme} label="Primary role" value={data.role} onChange={v=>update('role',v)}
                options={[
                  ['vocalist','Vocalist'],
                  ['guitar','Guitarist'],
                  ['piano','Pianist'],
                  ['drums','Drums / Percussion'],
                  ['bass','Bass'],
                  ['other','Something else'],
                ]}/>
              <Choice theme={theme} label="Experience" value={data.experience} onChange={v=>update('experience',v)}
                options={[
                  ['beginner','Beginner — eager'],
                  ['intermediate','Intermediate — gigging'],
                  ['advanced','Advanced — performed solo'],
                ]}/>
            </FormStep>
          )}
          {step === 3 && (
            <FormStep theme={theme} title="Pick an audition slot" subtitle="Five-minute window. Come ten minutes early — there's tea.">
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10 }}>
                {slots.map(s => (
                  <button key={s} onClick={()=>update('slot', s)} style={{
                    padding:'18px 16px', borderRadius:14, cursor:'pointer',
                    background: data.slot===s ? theme.accent : 'transparent',
                    color: data.slot===s ? '#0a0807' : theme.text,
                    border:`1px solid ${data.slot===s ? theme.accent : theme.border}`,
                    fontFamily:'"Bebas Neue", sans-serif', fontSize:18, letterSpacing:'.05em',
                    textAlign:'left',
                    transition:'background .2s',
                  }}>{s}</button>
                ))}
              </div>
              {errors.slot && <ErrorLine theme={theme}>{errors.slot}</ErrorLine>}
            </FormStep>
          )}
          {step === 4 && (
            <FormStep theme={theme} title="Why us?" subtitle="A paragraph is plenty. Honesty over polish.">
              <textarea value={data.why} onChange={e=>update('why', e.target.value)}
                placeholder="I sing in my room every night. I'd like to sing somewhere louder."
                rows={6}
                style={{
                  width:'100%', padding:'14px 16px', borderRadius:14,
                  background: theme.pillBg, color: theme.text,
                  border:`1px solid ${errors.why ? '#ef4444' : theme.border}`,
                  fontFamily:'"Space Grotesk", sans-serif', fontSize:14, lineHeight:1.6,
                  resize:'vertical', outline:'none',
                }}/>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.2em', textTransform:'uppercase' }}>
                {errors.why ? <ErrorLine theme={theme}>{errors.why}</ErrorLine> : <span style={{color:theme.dim}}>Min. 20 characters</span>}
                <span style={{color: data.why.length >= 20 ? theme.accent : theme.dim}}>{data.why.length}</span>
              </div>
            </FormStep>
          )}
          {step === 5 && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:18 }}>
              <div style={{
                width:64, height:64, borderRadius:'50%',
                background: theme.accent, color:'#0a0807',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name="check" size={28} stroke="#0a0807" sw={2}/>
              </div>
              <h2 style={{
                margin:0, color: theme.text,
                fontFamily:'"Bebas Neue", sans-serif',
                fontSize: 48, lineHeight:1, letterSpacing:'.005em',
                textTransform:'uppercase',
              }}>
                See you on<br/>
                <em style={{ fontFamily:'"Cormorant Garamond", serif', fontStyle:'italic', fontWeight:400, color: theme.accent }}>{data.slot || 'audition day'}</em>
              </h2>
              <p style={{ margin:0, color: theme.dim, fontFamily:'"Space Grotesk", sans-serif', fontSize:14, lineHeight:1.6, maxWidth: 420 }}>
                We've sent a confirmation to <span style={{color:theme.text}}>{data.email}</span>.
                Bring sheet music if you have it. If not, bring courage.
              </p>
            </div>
          )}

          {/* Step navigation */}
          {step < 5 && (
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 28 }}>
              <button onClick={back} disabled={step===1} style={{
                appearance:'none', border:'none', cursor: step===1 ? 'default' : 'pointer',
                padding:'10px 16px', borderRadius:999,
                background:'transparent', color: step===1 ? theme.dim : theme.text,
                opacity: step===1 ? 0.4 : 1,
                fontFamily:'"Space Grotesk", sans-serif', fontSize:12, letterSpacing:'.18em', textTransform:'uppercase',
                display:'inline-flex', alignItems:'center', gap:8,
              }}>
                <Icon name="arrow-l" size={12}/> Back
              </button>
              <span style={{ color: theme.dim, fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase' }}>
                Step {step} / 4
              </span>
              <button onClick={next} style={{
                appearance:'none', border:'none', cursor:'pointer',
                padding:'14px 22px', borderRadius:999,
                background: theme.accent, color:'#0a0807',
                fontFamily:'"Bebas Neue", sans-serif', fontSize:13, letterSpacing:'.12em',
                display:'inline-flex', alignItems:'center', gap:10,
              }}>
                {step === 4 ? 'Submit' : 'Continue'} <Icon name="arrow-ur" size={12} stroke="#0a0807"/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormStep({ theme, title, subtitle, children }) {
  return (
    <div>
      <h2 style={{
        margin:0, color:theme.text,
        fontFamily:'"Bebas Neue", sans-serif',
        fontSize: 38, lineHeight:1, letterSpacing:'.005em',
        textTransform:'uppercase',
      }}>{title}</h2>
      <p style={{ margin:'8px 0 24px', color: theme.dim, fontFamily:'"Space Grotesk", sans-serif', fontSize:14, lineHeight:1.6, fontStyle:'italic' }}>
        <span style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:18 }}>{subtitle}</span>
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:18 }}>{children}</div>
    </div>
  );
}

function Field({ theme, label, value, onChange, error, placeholder }) {
  return (
    <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <span style={{ fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color: theme.dim }}>{label}</span>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{
          padding:'14px 16px', borderRadius:14,
          background: theme.pillBg, color: theme.text,
          border:`1px solid ${error ? '#ef4444' : theme.border}`,
          fontFamily:'"Space Grotesk", sans-serif', fontSize:14,
          outline:'none',
        }}/>
      {error && <ErrorLine theme={theme}>{error}</ErrorLine>}
    </label>
  );
}

function Choice({ theme, label, value, onChange, options }) {
  return (
    <div>
      <div style={{ fontFamily:'"Space Grotesk", sans-serif', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color: theme.dim, marginBottom:10 }}>{label}</div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {options.map(([v, l]) => (
          <button key={v} onClick={()=>onChange(v)} style={{
            appearance:'none', cursor:'pointer',
            padding:'10px 14px', borderRadius:999,
            background: value===v ? theme.accent : 'transparent',
            color: value===v ? '#0a0807' : theme.text,
            border:`1px solid ${value===v ? theme.accent : theme.border}`,
            fontFamily:'"Space Grotesk", sans-serif', fontSize:12, letterSpacing:'.04em',
            transition:'background .2s',
          }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function ErrorLine({ theme, children }) {
  return (
    <span style={{
      color:'#ef4444',
      fontFamily:'"Space Grotesk", sans-serif', fontSize:11, letterSpacing:'.04em',
      fontStyle:'italic',
    }}>{children}</span>
  );
}

Object.assign(window, { MembersPage, JoinPage });
