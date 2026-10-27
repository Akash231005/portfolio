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
    'Full-Stack Software Developer',
    'AI/ML Engineer',
    'Computer Science Undergraduate'
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
    // Programming Languages
    { name:'Java', icon:'fa-brands fa-java', level:'Core', pct:84, cat:'lang' },
    { name:'Python', icon:'fa-brands fa-python', level:'Core', pct:88, cat:'lang' },
    { name:'JavaScript', icon:'fa-brands fa-square-js', level:'Core', pct:86, cat:'lang' },
    { name:'C', icon:'fa-solid fa-code', level:'Proficient', pct:76, cat:'lang' },

    // Full-Stack Development
    { name:'React', icon:'fa-brands fa-react', level:'Core', pct:88, cat:'fullstack' },
    { name:'Node.js', icon:'fa-brands fa-node-js', level:'Core', pct:85, cat:'fullstack' },
    { name:'Express.js', icon:'fa-solid fa-server', level:'Core', pct:85, cat:'fullstack' },
    { name:'Spring Boot', icon:'fa-solid fa-leaf', level:'Proficient', pct:74, cat:'fullstack' },
    { name:'Flask', icon:'fa-solid fa-fire', level:'Proficient', pct:78, cat:'fullstack' },
    { name:'HTML5', icon:'fa-brands fa-html5', level:'Core', pct:90, cat:'fullstack' },
    { name:'CSS3', icon:'fa-brands fa-css3-alt', level:'Core', pct:88, cat:'fullstack' },
    { name:'REST APIs', icon:'fa-solid fa-network-wired', level:'Core', pct:88, cat:'fullstack' },

    // AI and Machine Learning
    { name:'Scikit-learn', icon:'fa-solid fa-brain', level:'Core', pct:84, cat:'ml' },
    { name:'TensorFlow', icon:'fa-solid fa-cube', level:'Proficient', pct:80, cat:'ml' },
    { name:'Keras', icon:'fa-solid fa-layer-group', level:'Proficient', pct:78, cat:'ml' },
    { name:'YOLOv8', icon:'fa-solid fa-eye', level:'Proficient', pct:82, cat:'ml' },
    { name:'OpenCV', icon:'fa-solid fa-camera', level:'Proficient', pct:80, cat:'ml' },
    { name:'NumPy', icon:'fa-solid fa-chart-line', level:'Core', pct:85, cat:'ml' },
    { name:'Pandas', icon:'fa-solid fa-table-cells', level:'Core', pct:85, cat:'ml' },

    // Databases
    { name:'MongoDB', icon:'fa-solid fa-database', level:'Core', pct:85, cat:'db' },
    { name:'MySQL', icon:'fa-solid fa-database', level:'Proficient', pct:82, cat:'db' },
    { name:'Oracle SQL', icon:'fa-solid fa-database', level:'Proficient', pct:78, cat:'db' },
    { name:'SQLite', icon:'fa-solid fa-database', level:'Proficient', pct:76, cat:'db' },

    // Testing and Quality Engineering
    { name:'Playwright', icon:'fa-solid fa-vial', level:'Proficient', pct:80, cat:'testing' },
    { name:'Jest', icon:'fa-solid fa-vial-circle-check', level:'Proficient', pct:78, cat:'testing' },
    { name:'Supertest', icon:'fa-solid fa-flask', level:'Proficient', pct:76, cat:'testing' },
    { name:'Newman', icon:'fa-solid fa-box-archive', level:'Proficient', pct:75, cat:'testing' },
    { name:'Postman', icon:'fa-solid fa-paper-plane', level:'Core', pct:85, cat:'testing' },

    // DevOps and Deployment
    { name:'Docker', icon:'fa-brands fa-docker', level:'Proficient', pct:72, cat:'devops' },
    { name:'Git', icon:'fa-brands fa-git-alt', level:'Core', pct:88, cat:'devops' },
    { name:'GitHub Actions', icon:'fa-brands fa-github', level:'Proficient', pct:78, cat:'devops' },
    { name:'Vercel', icon:'fa-solid fa-cloud-arrow-up', level:'Core', pct:85, cat:'devops' },
    { name:'Render', icon:'fa-solid fa-server', level:'Core', pct:82, cat:'devops' },
    { name:'CI/CD', icon:'fa-solid fa-arrows-spin', level:'Proficient', pct:78, cat:'devops' },

    // Computer Science Fundamentals
    { name:'Data Structures & Algorithms', icon:'fa-solid fa-diagram-project', level:'Core', pct:86, cat:'cs' },
    { name:'Object-Oriented Programming', icon:'fa-solid fa-cubes', level:'Core', pct:88, cat:'cs' },
    { name:'DBMS', icon:'fa-solid fa-database', level:'Core', pct:85, cat:'cs' },
    { name:'Operating Systems', icon:'fa-solid fa-microchip', level:'Core', pct:82, cat:'cs' },
    { name:'Computer Networks', icon:'fa-solid fa-network-wired', level:'Core', pct:80, cat:'cs' },
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
  const DEST_EMAIL = 'akashs231005@gmail.com';
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening mail app...';
    btn.disabled = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio enquiry';
    const message = form.message.value.trim();

    const body =
`${message}

—
From: ${name}
Reply to: ${email}`;

    const mailtoUrl = `mailto:${DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      note.textContent = `Thanks${name ? ', ' + name : ''} — your mail app should open with this message ready to send. If it didn't, email me directly at ${DEST_EMAIL}.`;
      btn.innerHTML = original;
      btn.disabled = false;
      form.reset();
    }, 500);
  });
})();

/* ============================================
   PROJECT IMAGE LIGHTBOX MODAL
   ============================================ */
(function lightbox(){
  const modal = document.getElementById('imageLightbox');
  if(!modal) return;
  const imgEl = document.getElementById('lightboxImage') || document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const rawLinkEl = document.getElementById('lightboxRawLink');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');

  function openLightbox(src, title, fallback){
    if(!src) return;
    imgEl.src = src;
    imgEl.onerror = () => {
      if(fallback && imgEl.src !== fallback){
        imgEl.src = fallback;
      }
    };
    if(titleEl) titleEl.textContent = title || 'Project Showcase';
    if(rawLinkEl) rawLinkEl.href = src;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if(imgEl) imgEl.src = '';
    }, 250);
  }

  document.querySelectorAll('.view-full-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.dataset.fullImg || btn.getAttribute('href');
      const title = btn.dataset.title || 'Project Showcase';
      const fallback = btn.dataset.fallbackImg;
      openLightbox(src, title, fallback);
    });
  });

  // Clicking directly on project image preview opens lightbox
  document.querySelectorAll('.project-media .project-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = img.closest('.project-media');
      const viewBtn = parent ? parent.querySelector('.view-full-btn') : null;
      const src = viewBtn ? (viewBtn.dataset.fullImg || viewBtn.getAttribute('href')) : img.src;
      const title = viewBtn ? (viewBtn.dataset.title || 'Project Showcase') : img.alt;
      const fallback = viewBtn ? viewBtn.dataset.fallbackImg : null;
      openLightbox(src, title, fallback);
    });
  });

  if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if(backdrop) backdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('active')){
      closeLightbox();
    }
  });
})();

