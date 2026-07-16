
    /* ── 1. PARTICLE CANVAS ── */
    const canvas = document.getElementById('particles');
    const ctx    = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function initStars() {
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + .3,
        a: Math.random(),
        da: (Math.random() * .006 + .003) * (Math.random() < .5 ? 1 : -1),
        spd: Math.random() * .07 + .015,
      }));
    }
    function drawStars() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a = Math.max(.04, Math.min(1, s.a + s.da));
        if (s.a <= .04 || s.a >= 1) s.da *= -1;
        s.y = (s.y - s.spd + H) % H;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
      
    }
    window.addEventListener('resize', () => { resize(); initStars();});
    resize(); initStars(); drawStars();

    /* ── 2. FLOATING PETALS ── */
    const petalChars = ['🌸','✨','⭐','🌷','💫','🎀','🌺','💕','🌟','✦'];
    const wrap = document.getElementById('petalsWrap');
    function spawnPetal() {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
      const dur = Math.random() * 12 + 10;
      const del = Math.random() * 5;
      p.style.cssText = `left:${Math.random()*100}%;font-size:${Math.random()*.8+.8}rem;animation-duration:${dur}s;animation-delay:${del}s;`;
      wrap.appendChild(p);
      setTimeout(() => p.remove(), (dur + del) * 1000 + 600);
    }
    for (let i = 0; i < 20; i++) spawnPetal();
    setInterval(spawnPetal, 2000);

    /* ── 3. NAV DOTS ── */
    const SECTIONS = ['welcome','gallery','timeline','open-when','finale'];
    const dots = document.querySelectorAll('.nav-dot');
    function updateDots() {
      const mid = window.innerHeight / 2;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id); if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= mid && bottom >= mid) {
          dots.forEach(d => d.classList.remove('active'));
          if (dots[i]) dots[i].classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', updateDots, { passive: true });

    function goTo(id) { document.getElementById(id).scrollIntoView({ behavior:'smooth' }); }

    /* ── 4. SCROLL ANIMATIONS ── */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (e.target.classList.contains('polaroid')) io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.tl-item, .polaroid, .ow-btn').forEach(el => io.observe(el));

    /* ── 5. ENVELOPE ── */
    let envOpened = false;
    function openEnvelope() {
      if (envOpened) return;
      envOpened = true;
      document.getElementById('envScene').classList.add('open');
      setTimeout(() => document.getElementById('scrollHint').classList.add('show'), 1600);
      toggleAudio();

    }

    /* ── 6. MODAL ── */
    const modal      = document.getElementById('modal');
    const modalEmoji = document.getElementById('modalEmoji');
    const modalTitle = document.getElementById('modalTitle');
    const modalMsg   = document.getElementById('modalMsg');

    document.querySelectorAll('.ow-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modalEmoji.textContent = btn.dataset.emoji;
        modalTitle.textContent = btn.dataset.title;
        modalMsg.textContent   = btn.dataset.msg;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    /* ── 7. CONFETTI + DEDICATORIA ── */
    document.getElementById('wishBtn').addEventListener('click', function () {
      const btn = this;
      btn.disabled = true;

      const colors = ['#FAC8D8','#C8EAD3','#E5D5F5','#FFF3C0','#F4B8C4','#C0A0E0','#96C9A4','#90C8FF'];
      const rnd    = (a, b) => Math.random() * (b - a) + a;

      confetti({ particleCount:180, startVelocity:55, spread:360,
                 ticks:110, zIndex:9999, colors, origin:{x:.5, y:.55} });

      const end = Date.now() + 5000;
      const iv  = setInterval(() => {
        const left = end - Date.now();
        if (left <= 0) return clearInterval(iv);
        const pc = Math.ceil(60 * (left / 5000));
        confetti({ particleCount:pc, startVelocity:34, spread:360, ticks:80, zIndex:9999, colors, origin:{x:rnd(.05,.35), y:rnd(-.1,.2)} });
        confetti({ particleCount:pc, startVelocity:34, spread:360, ticks:80, zIndex:9999, colors, origin:{x:rnd(.65,.95), y:rnd(-.1,.2)} });
      }, 260);

      const ded = document.getElementById('dedication');
      ded.style.visibility = 'visible';
      requestAnimationFrame(() => requestAnimationFrame(() => ded.classList.add('show')));
      ded.scrollIntoView({ behavior:'smooth', block:'nearest' });

      btn.textContent = '🎉 ¡Deseo concedido!';
      btn.style.background = 'linear-gradient(135deg,#96C9A4,#90C8FF)';
      btn.style.boxShadow  = '0 8px 36px rgba(144,200,255,.4)';
    });


    

 const audio = document.getElementById('musica');
    const btn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const label = document.getElementById('label');

    function toggleAudio() {
      if (audio.paused) {
        audio.play();
        // Cambiar a ícono pause
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'flex';
        btn.classList.add('playing');
        label.textContent = 'Pausar música 🎵';
      } else {
        audio.pause();
        // Cambiar a ícono play
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        btn.classList.remove('playing');
        label.textContent = 'Reproducir música 🎵';
      }
    }
