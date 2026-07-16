// ============================================================
    //    JAVASCRIPT
//   ============================================================ 
 
    /* --------------------------------------------------------
       1. PARTICLE CANVAS — mini stars
    -------------------------------------------------------- */
    const canvas = document.getElementById('particles');
    const ctx    = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: 130 }, () => ({
        x:   Math.random() * W,
        y:   Math.random() * H,
        r:   Math.random() * 1.4 + .3,
        a:   Math.random(),
        da:  (Math.random() * .007 + .003) * (Math.random() < .5 ? 1 : -1),
        spd: Math.random() * .08 + .02,
      }));
    }

    function drawStars() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a  = Math.max(.05, Math.min(1, s.a + s.da));
        if (s.a <= .05 || s.a >= 1) s.da *= -1;
        s.y  = (s.y - s.spd + H) % H;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', () => { resize(); initStars(); });
    resize(); initStars(); drawStars();


    /* --------------------------------------------------------
       2. FLOATING PETALS
    -------------------------------------------------------- */
    const petalChars = ['🌸','✨','⭐','🌷','💫','🎀','🌺','💕'];
    const wrap = document.getElementById('petalsWrap');

    function spawnPetal() {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
      const size  = Math.random() * .8 + .8;
      const dur   = Math.random() * 12 + 10;
      const delay = Math.random() * 6;
      p.style.cssText = `
        left: ${Math.random()*100}%;
        font-size: ${size}rem;
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;
      wrap.appendChild(p);
      setTimeout(() => p.remove(), (dur + delay) * 1000 + 500);
    }

    for (let i = 0; i < 18; i++) spawnPetal();
    setInterval(spawnPetal, 2200);


    /* --------------------------------------------------------
       3. COUNTDOWN LOGIC
    -------------------------------------------------------- */
    const TARGET = new Date('2026-07-18T12:00:00');
    // const TARGET = new Date('2026-07-15T20:04:00');

    const elD = document.getElementById('cd-d');
    const elH = document.getElementById('cd-h');
    const elM = document.getElementById('cd-m');
    const elS = document.getElementById('cd-s');

    let prevD = -1, prevH = -1, prevM = -1, prevS = -1;

    function pad(n) { return String(n).padStart(2, '0'); }

    function flip(el, val, prev) {
      if (val === prev) return;
      el.textContent = pad(val);
      el.classList.remove('flip-anim');
      void el.offsetWidth; // reflow
      el.classList.add('flip-anim');
    }

    function tick() {
      const now  = new Date();
      const diff = TARGET - now;

      if (diff <= 0) {
        showReveal();
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);

      flip(elD, d, prevD); prevD = d;
      flip(elH, h, prevH); prevH = h;
      flip(elM, m, prevM); prevM = m;
      flip(elS, s, prevS); prevS = s;
    }
    

    tick();
    const timer = setInterval(tick, 1000);


    /* --------------------------------------------------------
       4. REVEAL SEQUENCE
    -------------------------------------------------------- */


    let revealed = false;

    function showReveal() {
      console.log('inicio')
      if (revealed)return;
      revealed = true;
      clearInterval(timer);

      const cdScreen  = document.getElementById('countdown-screen');
      const revScreen = document.getElementById('reveal-screen');

      /* Fade out countdown */
      cdScreen.style.opacity  = '0';
      cdScreen.style.transform = 'scale(.97)';
      cdScreen.style.transition = 'opacity .8s ease, transform .8s ease';

      setTimeout(() => {
        cdScreen.classList.add('hidden');
        revScreen.classList.remove('hidden');

        /* Confetti burst */
        const colors = ['#F9C6D0','#C8EAD3','#E5D5F5','#FFF3C0','#F4B8C4','#C0A0E0','#96C9A4','#90C8FF'];
        const rnd = (a, b) => Math.random() * (b - a) + a;

        confetti({ particleCount:200, startVelocity:60, spread:360,
                   ticks:120, zIndex:9999, colors, origin:{x:.5, y:.55} });

        const end = Date.now() + 3500;
        const iv  = setInterval(() => {
          if (Date.now() > end) return clearInterval(iv);
          const pc = 40;
          confetti({ particleCount:pc, startVelocity:35, spread:360,
                     ticks:80, zIndex:9999, colors, origin:{x:rnd(.05,.3), y:rnd(-.1,.2)} });
          confetti({ particleCount:pc, startVelocity:35, spread:360,
                     ticks:80, zIndex:9999, colors, origin:{x:rnd(.7,.95), y:rnd(-.1,.2)} });
        }, 300);

      }, 850);
    }
    // DEV SHORTCUT: quita el comentario para saltar al reveal
    // setTimeout(showReveal, 1200);
    // setTimeout(showReveal, 2000);



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

    
//   </script>