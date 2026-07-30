/* ============================================
   YEAR
   ============================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   LOADER
   ============================================ */
(function loader(){
  const el = document.getElementById('loaderText');
  const loader = document.getElementById('loader');
  const msg = 'npm run dev';
  let i = 0;
  const type = setInterval(() => {
    el.textContent += msg[i];
    i++;
    if(i >= msg.length){
      clearInterval(type);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 500);
    }
  }, 70);
})();

/* ============================================
   PARTICLE CANVAS BACKGROUND (hero)
   ============================================ */
(function particles(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particlesArr = [];
  const COUNT = window.innerWidth < 700 ? 35 : 70;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  function rand(min,max){ return Math.random()*(max-min)+min; }

  function Particle(){
    this.x = rand(0,w); this.y = rand(0,h);
    this.r = rand(0.6,2.1);
    this.vx = rand(-0.15,0.15);
    this.vy = rand(-0.15,0.15);
    this.alpha = rand(0.2,0.7);
  }
  Particle.prototype.update = function(){
    this.x += this.vx; this.y += this.vy;
    if(this.x < 0 || this.x > w) this.vx *= -1;
    if(this.y < 0 || this.y > h) this.vy *= -1;
  };

  function init(){
    resize();
    particlesArr = Array.from({length: COUNT}, () => new Particle());
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    particlesArr.forEach(p => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
      ctx.fill();
    });
    // connecting lines
    for(let i=0;i<particlesArr.length;i++){
      for(let j=i+1;j<particlesArr.length;j++){
        const a = particlesArr[i], b = particlesArr[j];
        const dist = Math.hypot(a.x-b.x, a.y-b.y);
        if(dist < 110){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist/110)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  init();
  window.addEventListener('resize', init);
  if(!reduceMotion) draw();
})();

/* ============================================
   HERO TYPING EFFECT
   ============================================ */
(function typedHero(){
  const el = document.getElementById('typedText');
  if(!el) return;
  const phrases = [
    'full-stack products.',
    'secure REST APIs.',
    'tested backend systems.',
    'JWT-authenticated apps.',
    'ML-powered tools.'
  ];
  let pIndex = 0, cIndex = 0, deleting = false;

  function tick(){
    const current = phrases[pIndex];
    if(!deleting){
      el.textContent = current.slice(0, cIndex+1);
      cIndex++;
      if(cIndex === current.length){
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      el.textContent = current.slice(0, cIndex-1);
      cIndex--;
      if(cIndex === 0){
        deleting = false;
        pIndex = (pIndex+1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
})();

/* ============================================
   NAV: scroll state, active link, mobile toggle
   ============================================ */
(function nav(){
  const navEl = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 30);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  }));

  const sections = document.querySelectorAll('main section[id]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinkEls.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if(active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
})();

/* ============================================
   SCROLL PROGRESS + SCROLL TOP + CURSOR
   ============================================ */
(function scrollFx(){
  const bar = document.getElementById('scrollProgress');
  const topBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
    topBtn.classList.toggle('visible', h.scrollTop > 600);
  });
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  document.getElementById('scrollIndicator').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({behavior:'smooth'});
  });

  const dot = document.getElementById('cursorDot');
  window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  document.querySelectorAll('a, button, summary, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => dot.style.transform += ' scale(1.8)');
  });
})();

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
(function reveal(){
  const items = document.querySelectorAll('.reveal-up, .skill-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => io.observe(i));
})();

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
(function counters(){
  const nums = document.querySelectorAll('.counter-num, .metric-value[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimal || '0');
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();
      function step(now){
        const progress = Math.min((now-startTime)/duration, 1);
        const eased = 1 - Math.pow(1-progress, 3);
        const val = target * eased;
        el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val) + suffix;
        if(progress < 1) requestAnimationFrame(step);
        else el.textContent = (decimals ? target.toFixed(decimals) : target) + suffix;
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  nums.forEach(n => io.observe(n));
})();

/* ============================================
   SKILLS DATA + RENDER + FILTER
   ============================================ */
(function skills(){
  const data = [
    { name:'JavaScript', icon:'fa-brands fa-square-js', level:'Advanced', pct:88, cat:'lang' },
    { name:'Python', icon:'fa-brands fa-python', level:'Advanced', pct:85, cat:'lang' },
    { name:'Java', icon:'fa-solid fa-mug-hot', level:'Intermediate', pct:75, cat:'lang' },
    { name:'C', icon:'fa-solid fa-c', level:'Intermediate', pct:72, cat:'lang' },

    { name:'React', icon:'fa-brands fa-react', level:'Advanced', pct:87, cat:'frontend' },
    { name:'Redux Toolkit', icon:'fa-solid fa-diagram-project', level:'Advanced', pct:82, cat:'frontend' },
    { name:'Tailwind CSS', icon:'fa-brands fa-css3-alt', level:'Advanced', pct:85, cat:'frontend' },
    { name:'HTML / CSS', icon:'fa-brands fa-html5', level:'Advanced', pct:90, cat:'frontend' },
    { name:'Bootstrap', icon:'fa-brands fa-bootstrap', level:'Intermediate', pct:75, cat:'frontend' },

    { name:'Node.js', icon:'fa-brands fa-node-js', level:'Advanced', pct:86, cat:'backend' },
    { name:'Express.js', icon:'fa-solid fa-server', level:'Advanced', pct:85, cat:'backend' },
    { name:'REST APIs', icon:'fa-solid fa-network-wired', level:'Advanced', pct:88, cat:'backend' },
    { name:'JWT Auth', icon:'fa-solid fa-key', level:'Advanced', pct:84, cat:'backend' },
    { name:'Spring Boot', icon:'fa-solid fa-leaf', level:'Intermediate', pct:65, cat:'backend' },

    { name:'MongoDB', icon:'fa-solid fa-leaf', level:'Advanced', pct:85, cat:'db' },
    { name:'MySQL', icon:'fa-solid fa-database', level:'Intermediate', pct:78, cat:'db' },
    { name:'Oracle SQL', icon:'fa-solid fa-database', level:'Intermediate', pct:72, cat:'db' },

    { name:'Playwright', icon:'fa-solid fa-vial', level:'Intermediate', pct:78, cat:'testing' },
    { name:'Jest', icon:'fa-solid fa-vial-circle-check', level:'Intermediate', pct:76, cat:'testing' },
    { name:'Supertest', icon:'fa-solid fa-flask', level:'Intermediate', pct:74, cat:'testing' },
    { name:'Postman / Newman', icon:'fa-solid fa-paper-plane', level:'Advanced', pct:82, cat:'testing' },

    { name:'Docker', icon:'fa-brands fa-docker', level:'Intermediate', pct:68, cat:'devops' },
    { name:'GitHub Actions', icon:'fa-brands fa-github', level:'Intermediate', pct:73, cat:'devops' },
    { name:'Vercel / Render', icon:'fa-solid fa-cloud-arrow-up', level:'Advanced', pct:83, cat:'devops' },
    { name:'Git & GitHub', icon:'fa-brands fa-git-alt', level:'Advanced', pct:88, cat:'devops' },

    { name:'Scikit-learn', icon:'fa-solid fa-brain', level:'Intermediate', pct:76, cat:'ml' },
    { name:'Pandas / NumPy', icon:'fa-solid fa-table-cells', level:'Intermediate', pct:78, cat:'ml' },
    { name:'Flask', icon:'fa-solid fa-fire', level:'Intermediate', pct:74, cat:'ml' },
  ];

  const grid = document.getElementById('skillsGrid');
  const tabs = document.getElementById('skillsTabs');

  function render(cat){
    grid.innerHTML = '';
    const filtered = cat === 'all' ? data : data.filter(s => s.cat === cat);
    filtered.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.style.transitionDelay = (idx * 40) + 'ms';
      card.innerHTML = `
        <div class="skill-card-top">
          <div class="skill-icon"><i class="${s.icon}"></i></div>
          <div>
            <div class="skill-name">${s.name}</div>
            <div class="skill-level">${s.level}</div>
          </div>
        </div>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${s.pct}%"></div></div>
      `;
      grid.appendChild(card);
    });

    // re-observe for reveal + animate bars
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.skill-card').forEach(c => io.observe(c));
  }

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.skills-tab');
    if(!btn) return;
    tabs.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.cat);
  });

  render('all');
})();

/* ============================================
   CONTACT FORM (client-side demo submit)
   ============================================ */
(function contactForm(){
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      const name = form.name.value.trim();
      note.textContent = `Thanks${name ? ', ' + name : ''} — this demo form isn't wired to a mail service yet. Please reach out directly at akashs231005@gmail.com.`;
      btn.innerHTML = original;
      btn.disabled = false;
      form.reset();
    }, 900);
  });
})();
