const { useState, useEffect, useRef } = React;

// ---------- Design tokens ----------
const TOKENS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#A6F23F",
  "ink": "#0A0A0A",
  "paper": "#FFFFFF",
  "highlightStyle": "block",
  "heroTracking": -3,
  "showTweaks": true
}/*EDITMODE-END*/;

// ---------- Wordmark ----------
function Wordmark({ ink = "#0A0A0A" }) {
  return (
    <div style={{
      fontFamily: '"Geist Mono", ui-monospace, monospace',
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: '0.02em',
      color: ink,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <span style={{
        display: 'inline-block',
        width: 8, height: 8,
        background: ink,
        borderRadius: 2,
      }} />
      Takeoff
    </div>
  );
}

// ---------- Highlight box (the signature move) ----------
function Highlight({ children, accent, style = "block" }) {
  if (style === "block") {
    return (
      <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
        <span style={{
          position: 'absolute',
          top: '0.08em',
          bottom: '0.12em',
          left: '-0.06em',
          right: '-0.06em',
          background: accent,
          transform: 'rotate(-0.6deg)',
          zIndex: 0,
          borderRadius: 2,
        }} />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </span>
    );
  }
  if (style === "underline") {
    return (
      <span style={{
        backgroundImage: `linear-gradient(${accent}, ${accent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 88%',
        backgroundSize: '100% 0.18em',
        paddingBottom: '0.02em',
      }}>{children}</span>
    );
  }
  return <span>{children}</span>;
}

// ---------- Primary button ----------
function CTA({ children, accent, ink, onClick, big = false, type = "button" }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: accent,
        color: ink,
        border: 'none',
        fontFamily: '"Geist", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: big ? 19 : 17,
        letterSpacing: '-0.01em',
        padding: big ? '22px 36px' : '16px 28px',
        borderRadius: 999,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover
          ? `0 12px 30px -10px ${accent}aa`
          : `0 6px 18px -8px ${accent}88`,
      }}
    >
      {children}
      <span style={{
        display: 'inline-block',
        transition: 'transform 180ms ease',
        transform: hover ? 'translateX(3px)' : 'translateX(0)',
      }}>→</span>
    </button>
  );
}

// ---------- Striped placeholder ----------
function StripedPlaceholder({ label, w, h, ratio, dark = false, style = {} }) {
  const stripeA = dark ? '#171717' : '#F4F4F4';
  const stripeB = dark ? '#1f1f1f' : '#ECECEC';
  const ink = dark ? '#888' : '#777';
  return (
    <div style={{
      width: w || '100%',
      height: h,
      aspectRatio: ratio,
      backgroundImage: `repeating-linear-gradient(135deg, ${stripeA} 0 14px, ${stripeB} 14px 28px)`,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Geist Mono", ui-monospace, monospace',
      fontSize: 12,
      color: ink,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: 20,
      ...style,
    }}>
      {label}
    </div>
  );
}

// ---------- 1. HERO ----------
function Hero({ T }) {
  const scrollToBook = () => {
    const el = document.getElementById('book');
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };
  return (
    <section style={{
      minHeight: '100vh',
      padding: '32px 48px 56px',
      display: 'flex',
      flexDirection: 'column',
      background: T.paper,
      color: T.ink,
      position: 'relative',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Wordmark ink={T.ink} />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        paddingTop: 'clamp(40px, 8vh, 100px)',
        paddingBottom: 'clamp(40px, 8vh, 100px)',
      }}>
        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#999',
          marginBottom: 'clamp(28px, 5vh, 48px)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, background: T.accent,
            boxShadow: `0 0 0 4px ${T.accent}33`,
          }} />
          Free 45-min AI assessment
        </div>

        <h1 style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(48px, 8.6vw, 136px)',
          lineHeight: 0.94,
          letterSpacing: `${T.heroTracking / 100}em`,
          margin: 0,
          textWrap: 'balance',
          maxWidth: '14ch',
        }}>
          Get back 5+ hours every week,{' '}
          <Highlight accent={T.accent} style={T.highlightStyle}>for free</Highlight>.
        </h1>

        <p style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontSize: 'clamp(17px, 1.5vw, 22px)',
          lineHeight: 1.5,
          color: '#3a3a3a',
          maxWidth: '52ch',
          marginTop: 'clamp(28px, 4vh, 44px)',
          marginBottom: 'clamp(36px, 5vh, 56px)',
          textWrap: 'pretty',
        }}>
          And if I can't help you save 5 hours/week with a free 45-minute AI assessment,
          I'll pay you $50 for wasting your time.
        </p>

        <div>
          <CTA accent={T.accent} ink={T.ink} big onClick={scrollToBook}>
            Book a free assessment
          </CTA>
        </div>
      </div>

      <div style={{
        fontFamily: '"Geist Mono", ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#bbb',
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
      }}>
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </section>
  );
}

// ---------- 2. PROOF ----------
function TextMessageArtifact({ src, rotate = -1.6, maxWidth = 460, zIndex = 1 }) {
  return (
    <div style={{
      transform: `rotate(${rotate}deg)`,
      filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.18)) drop-shadow(0 8px 18px rgba(0,0,0,0.08))',
      maxWidth,
      width: '100%',
      borderRadius: 22,
      overflow: 'hidden',
      background: '#1c1c1e',
      position: 'relative',
      zIndex,
    }}>
      <img
        src={src}
        alt="Text message from Champ"
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  );
}

function Proof({ T }) {
  const stats = [
    { big: '5×', label: 'more inbound leads' },
    { big: '16 → 85+', label: 'leads in 60 days' },
    { big: '2× → 2×', label: 'clicks MoM, Feb & Mar' },
  ];
  return (
    <section style={{
      padding: 'clamp(100px, 14vh, 180px) 48px',
      background: T.paper,
      color: T.ink,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="proof-bridge" style={{
          marginBottom: 'clamp(64px, 9vh, 120px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          maxWidth: 900,
        }}>
          <h2 style={{
            fontFamily: '"Geist", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            textWrap: 'balance',
          }}>
            Time back is just the floor.
          </h2>
          <p style={{
            fontFamily: '"Geist", system-ui, sans-serif',
            fontSize: 'clamp(17px, 1.4vw, 21px)',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#555',
            margin: '24px auto 0',
            maxWidth: '46ch',
            textWrap: 'pretty',
          }}>
            Champ used his hours to 5× his agency's leads in 60 days.
          </p>
        </div>

        <div className="proof-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center',
        }}>
          <div className="proof-stack" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 480,
          }}>
            <div className="proof-text-1" style={{
              position: 'absolute',
              top: '8%',
              left: '4%',
              width: '62%',
            }}>
              <TextMessageArtifact src="assets/text-1.jpg" rotate={-3.2} zIndex={1} />
            </div>
            <div className="proof-text-2" style={{
              position: 'absolute',
              bottom: '4%',
              right: '2%',
              width: '58%',
            }}>
              <TextMessageArtifact src="assets/text-2.jpg" rotate={2.4} zIndex={2} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid #ECECEC', paddingTop: i === 0 ? 0 : 28 }}>
                <div style={{
                  fontFamily: '"Geist", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 5.5vw, 80px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: 10,
                }}>
                  {s.big}
                </div>
                <div style={{
                  fontFamily: '"Geist", system-ui, sans-serif',
                  fontSize: 18,
                  color: '#555',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <blockquote style={{
          margin: 'clamp(80px, 10vh, 140px) 0 0',
          padding: 0,
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(28px, 3.6vw, 52px)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: '22ch',
          textWrap: 'balance',
        }}>
          <span style={{ color: '#bbb' }}>“</span>I have more than 5x'd this channel via Organic / Paid / LinkedIn. This sh*t is fire.<span style={{ color: '#bbb' }}>”</span>
          <footer style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <img
              src="assets/champ.jpeg"
              alt="Champ"
              style={{
                width: 44, height: 44, borderRadius: 999,
                objectFit: 'cover', display: 'block',
                border: '1px solid #ECECEC',
              }}
            />
            <span style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#999',
            }}>
              Champ&nbsp;·&nbsp;Agency owner
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ---------- 3. HOW IT WORKS ----------
function HowItWorks({ T }) {
  const steps = [
    { n: '01', t: 'Apply.', d: '60-second form below.' },
    { n: '02', t: 'Assessment call.', d: '45 minutes on Zoom. We dig into where your time actually goes.' },
    { n: '03', t: 'I build your plan.', d: 'Custom AI implementation plan delivered in 2–3 days.' },
    { n: '04', t: 'Plan review call.', d: '30 minutes together. You walk away with a 4-day implementation plan to save at least 5+ hours/week.' },
  ];
  return (
    <section style={{
      padding: 'clamp(100px, 14vh, 180px) 48px',
      background: T.paper,
      color: T.ink,
      borderTop: '1px solid #F0F0F0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 5.4vw, 80px)',
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          margin: '0 0 clamp(60px, 9vh, 120px)',
          maxWidth: '14ch',
        }}>
          Here's how it works.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 200px) 1fr',
              gap: 'clamp(24px, 4vw, 64px)',
              alignItems: 'baseline',
              padding: 'clamp(28px, 4vh, 48px) 0',
              borderTop: '1px solid #ECECEC',
              borderBottom: i === steps.length - 1 ? '1px solid #ECECEC' : 'none',
            }}>
              <div style={{
                fontFamily: '"Geist", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(56px, 7vw, 110px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: T.accent,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {s.n}
              </div>
              <div>
                <div style={{
                  fontFamily: '"Geist", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3.2vw, 46px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  marginBottom: 12,
                }}>
                  {s.t}
                </div>
                <div style={{
                  fontFamily: '"Geist", system-ui, sans-serif',
                  fontSize: 'clamp(16px, 1.3vw, 19px)',
                  lineHeight: 1.5,
                  color: '#555',
                  maxWidth: '52ch',
                }}>
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 4. GUARANTEE (full-bleed black) ----------
function Guarantee({ T }) {
  return (
    <section style={{
      background: '#0A0A0A',
      color: '#fff',
      padding: 'clamp(140px, 22vh, 260px) 48px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(36px, 5.2vw, 84px)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          margin: 0,
          textWrap: 'balance',
        }}>
          If I can't show you <em style={{
            fontFamily: '"Geist", system-ui, sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
          }}>at least 5 hours a week</em> of AI leverage on the call,
          I'll send you{' '}
          <span style={{
            color: T.accent,
            fontWeight: 700,
            letterSpacing: '-0.035em',
          }}>$50</span>.
        </h2>

        <p style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontSize: 'clamp(17px, 1.4vw, 21px)',
          color: '#aaa',
          marginTop: 'clamp(36px, 5vh, 56px)',
          marginBottom: 0,
        }}>
          Amazon gift card, Venmo, whatever you want.
        </p>

        <p style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#555',
          marginTop: 28,
        }}>
          No fine print.
        </p>
      </div>
    </section>
  );
}

// ---------- 5. FORM ----------
function BookingForm({ T }) {
  const [form, setForm] = useState({ name: '', email: '', biz: '', time: '' });
  const [focus, setFocus] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      window.open('https://cal.com/zachdoesai/assessment', '_blank');
    }, 600);
  };

  const fields = [
    { k: 'name', label: 'Name', placeholder: 'Zach Smith' },
    { k: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email' },
    { k: 'biz', label: 'Business + website', placeholder: 'Acme Co · acme.com' },
    { k: 'time', label: "What's eating your time?", placeholder: 'Manual proposals, inbox triage, lead follow-ups…', textarea: true },
  ];

  return (
    <section id="book" style={{
      padding: 'clamp(100px, 14vh, 180px) 48px',
      background: T.paper,
      color: T.ink,
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 5.4vw, 80px)',
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          margin: 0,
        }}>
          Book your free assessment.
        </h2>

        <p style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontSize: 'clamp(17px, 1.4vw, 20px)',
          color: '#666',
          marginTop: 20,
          marginBottom: 'clamp(48px, 7vh, 72px)',
        }}>
          Only taking 3 businesses this month.
        </p>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {fields.map((f) => (
            <label key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#888',
              }}>
                {f.label}
              </span>
              {f.textarea ? (
                <textarea
                  value={form[f.k]}
                  onChange={onChange(f.k)}
                  onFocus={() => setFocus(f.k)}
                  onBlur={() => setFocus(null)}
                  placeholder={f.placeholder}
                  rows={3}
                  style={inputStyle(focus === f.k, T)}
                />
              ) : (
                <input
                  type={f.type || 'text'}
                  value={form[f.k]}
                  onChange={onChange(f.k)}
                  onFocus={() => setFocus(f.k)}
                  onBlur={() => setFocus(null)}
                  placeholder={f.placeholder}
                  style={inputStyle(focus === f.k, T)}
                />
              )}
            </label>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20, marginTop: 16 }}>
            <CTA accent={T.accent} ink={T.ink} big type="submit">
              {submitted ? 'Redirecting to Cal.com…' : 'Submit & book my call'}
            </CTA>
            <div style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#999',
            }}>
              Free · 60 seconds · No card required
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function inputStyle(focused, T) {
  return {
    fontFamily: '"Geist", system-ui, sans-serif',
    fontSize: 19,
    color: T.ink,
    background: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${focused ? T.ink : '#DEDEDE'}`,
    padding: '12px 0',
    outline: 'none',
    width: '100%',
    resize: 'none',
    transition: 'border-color 180ms ease',
    fontWeight: 400,
    letterSpacing: '-0.005em',
  };
}

// ---------- 6. FOUNDER BLOCK ----------
function Founder({ T }) {
  const socials = [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'TikTok', href: '#', icon: 'tiktok' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'Skool', href: '#', icon: 'skool' },
  ];
  return (
    <section style={{
      padding: 'clamp(100px, 14vh, 180px) 48px',
      background: T.paper,
      color: T.ink,
      borderTop: '1px solid #F0F0F0',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div style={{
          width: 'clamp(220px, 24vw, 300px)',
          aspectRatio: '1 / 1',
          marginBottom: 'clamp(36px, 5vh, 56px)',
          borderRadius: 999,
          overflow: 'hidden',
          background: '#F4F4F4',
        }}>
          <img
            src="assets/zach.jpeg"
            alt="Zach"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <h2 style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4.4vw, 64px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          margin: 0,
        }}>
          Hey, I'm Zach.
        </h2>

        <p style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontSize: 'clamp(17px, 1.4vw, 20px)',
          lineHeight: 1.55,
          color: '#444',
          marginTop: 24,
          marginBottom: 28,
          maxWidth: '40ch',
          textWrap: 'pretty',
        }}>
          I help business owners get their time back with AI. No fluff. Just systems that work.
        </p>

        <a href="https://zachdoesai.com" target="_blank" rel="noreferrer" style={{
          fontFamily: '"Geist", system-ui, sans-serif',
          fontSize: 17,
          fontWeight: 500,
          color: T.ink,
          textDecoration: 'none',
          borderBottom: `1.5px solid ${T.ink}`,
          paddingBottom: 2,
          marginBottom: 18,
        }}>
          Check out my stuff →
        </a>

        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#999',
          marginBottom: 36,
        }}>
          5,500+ followers across platforms
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
        }}>
          {socials.map((s) => (
            <SocialPill key={s.label} {...s} ink={T.ink} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ name, size = 16, color = 'currentColor' }) {
  const s = { width: size, height: size, display: 'block', flexShrink: 0 };
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill={color} stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill={color} style={s}>
          <path d="M16.5 3c.3 1.6 1.2 2.9 2.6 3.7.8.5 1.7.7 2.6.7v3.2c-1.7 0-3.3-.5-4.7-1.4v6.6c0 3.5-2.8 6.3-6.3 6.3S4.4 19.3 4.4 15.8s2.8-6.3 6.3-6.3c.4 0 .7 0 1.1.1v3.3c-.3-.1-.7-.2-1.1-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3h2.7z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill={color} style={s}>
          <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.5v-7l5.2 3.5-5.2 3.5z" />
        </svg>
      );
    case 'skool':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M7 9.2v4.3c0 .6.3 1.2.9 1.5 1.3.7 2.9 1.2 4.1 1.2s2.8-.5 4.1-1.2c.6-.3.9-.9.9-1.5V9.2" />
          <path d="M21 7v6" />
        </svg>
      );
    default:
      return null;
  }
}

function SocialPill({ label, href, icon, ink }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: '"Geist", system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 500,
        color: hover ? '#fff' : ink,
        background: hover ? ink : 'transparent',
        border: `1.5px solid ${ink}`,
        padding: '10px 18px',
        borderRadius: 999,
        textDecoration: 'none',
        transition: 'all 180ms ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
      }}
    >
      <SocialIcon name={icon} size={16} color={hover ? '#fff' : ink} />
      {label}
    </a>
  );
}

// ---------- FOOTER ----------
function Footer({ T }) {
  return (
    <footer style={{
      padding: '48px',
      background: T.paper,
      color: T.ink,
      borderTop: '1px solid #ECECEC',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) auto',
        gap: 32,
        alignItems: 'start',
      }}>
        <div>
          <Wordmark ink={T.ink} />
          <div style={{
            fontFamily: '"Geist", system-ui, sans-serif',
            fontSize: 14,
            color: '#666',
            marginTop: 14,
            maxWidth: '36ch',
          }}>
            Helping business owners get their time back with AI.
          </div>
        </div>

        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: '#666',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <a href="mailto:zach@takeoff.llc" style={{ color: '#0A0A0A', textDecoration: 'none' }}>zach@takeoff.llc</a>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy</a>
            <span>·</span>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>

        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: '#999',
          textTransform: 'uppercase',
          textAlign: 'right',
        }}>
          © 2026 Takeoff LLC
        </div>
      </div>
    </footer>
  );
}

// ---------- TWEAKS ----------
function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Color">
        <TweakColor label="Accent" value={tweaks.accent} onChange={(v) => setTweak('accent', v)} />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakRadio
          label="Highlight style"
          value={tweaks.highlightStyle}
          options={[
            { label: 'Block', value: 'block' },
            { label: 'Underline', value: 'underline' },
            { label: 'None', value: 'none' },
          ]}
          onChange={(v) => setTweak('highlightStyle', v)}
        />
        <TweakSlider
          label="Headline tracking"
          value={tweaks.heroTracking}
          min={-6} max={2} step={0.5}
          format={(v) => `${v / 100}em`}
          onChange={(v) => setTweak('heroTracking', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- APP ----------
function App() {
  const [tweaks, setTweaks] = useTweaks(TOKENS_DEFAULTS);
  const setTweak = (k, v) => {
    if (typeof k === 'object') setTweaks((prev) => ({ ...prev, ...k }));
    else setTweaks((prev) => ({ ...prev, [k]: v }));
  };

  const T = tweaks;

  return (
    <div style={{
      background: T.paper,
      color: T.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <Hero T={T} />
      <Proof T={T} />
      <HowItWorks T={T} />
      <Guarantee T={T} />
      <BookingForm T={T} />
      <Founder T={T} />
      <Footer T={T} />

      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
