document.addEventListener('DOMContentLoaded', () => {

  /* ============ DYNAMIC CONTENT INJECTION ============ */
  const services = [
    ['Dental Check-up','Routine exams and digital X-rays to catch problems before they start.','M4 12l6 6L20 6'],
    ['Root Canal Treatment','Gentle, single-sitting endodontic treatment to save an infected tooth.','M12 3v18M3 12h18'],
    ['Dental Implants','Titanium implants that look, feel, and function like natural teeth.','M12 2v6M12 16v6M2 12h6M16 12h6'],
    ['Braces','Traditional metal and ceramic braces for lasting alignment.','M4 20h16M6 20V10l6-6 6 6v10'],
    ['Invisible Aligners','Clear, removable aligners that straighten teeth discreetly.','M12 2a10 10 0 100 20 10 10 0 000-20z'],
    ['Teeth Whitening','Professional in-clinic whitening for a noticeably brighter smile.','M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17.5 6.5 21 8 13.5 3 9l6.5-.5z'],
    ['Smile Makeover','A fully personalised plan combining multiple treatments for your ideal smile.','M8 12s1.5 3 4 3 4-3 4-3M9 9h.01M15 9h.01'],
    ['Dental Veneers','Ultra-thin porcelain shells that correct shape, colour, and gaps.','M6 4h12v16l-6-3-6 3z'],
    ['Dental Crown','Custom-fit caps that restore strength and shape to damaged teeth.','M4 10l8-6 8 6-2 10H6z'],
    ['Bridge','A fixed replacement that closes the gap left by missing teeth.','M2 18h20M6 18v-4h12v4M8 14V8h8v6'],
    ['Wisdom Tooth Removal','Safe, precise extraction of impacted or problematic wisdom teeth.','M12 3l3 7-3 11-3-11z'],
    ['Kids Dentistry','A gentle, friendly approach that builds lifelong dental confidence.','M12 21C7 21 3 17 3 12S7 3 12 3s9 4 9 9-4 9-9 9zM9 10h.01M15 10h.01M9 15s1.5 2 3 2 3-2 3-2'],
    ['Gum Treatment','Deep cleaning and periodontal care to treat and prevent gum disease.','M4 4c4 8 12 8 16 0M4 20c4-8 12-8 16 0'],
    ['Tooth Filling','Tooth-coloured composite fillings that blend naturally with your smile.','M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v8M8 12h8'],
    ['Tooth Extraction','Comfortable removal of teeth that cannot be saved or restored.','M9 3l6 18M15 3l-6 18'],
    ['Scaling & Cleaning','Professional plaque and tartar removal for healthier gums.','M4 12h16M4 6h16M4 18h16'],
    ['Emergency Dental Care','Same-day relief for sudden pain, trauma, or breakages.','M12 8v5l3 2M12 21a9 9 0 110-18 9 9 0 010 18z'],
    ['Cosmetic Dentistry','Aesthetic treatments designed around how your smile should feel to you.','M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17.5 6.5 21 8 13.5 3 9l6.5-.5z'],
  ];
  const svgIcon = (path) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="${path}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  document.querySelector('.services-grid').innerHTML = services.map(([title, desc, path]) => `
    <div class="service-card will-reveal">
      <div class="service-icon">${svgIcon(path)}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <a href="#book" class="sc-link">Book this treatment →</a>
    </div>`).join('');

  const doctors = [
    ['Dr. Ananya Rao','Cosmetic & Restorative Dentistry','12 yrs experience','https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500&auto=format&fit=crop'],
    ['Dr. Vikram Sethi','Implantology & Oral Surgery','16 yrs experience','https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500&auto=format&fit=crop'],
    ['Dr. Priya Nair','Orthodontics','10 yrs experience','https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500&auto=format&fit=crop'],
    ['Dr. Karan Mehta','Pediatric Dentistry','9 yrs experience','https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=500&auto=format&fit=crop'],
  ];
  document.querySelector('.doctors-grid').innerHTML = doctors.map(([name, spec, exp, img]) => `
    <div class="doctor-card will-reveal">
      <div class="doctor-photo"><img src="${img}" alt="${name}" loading="lazy"></div>
      <div class="doctor-info">
        <h3>${name}</h3>
        <div class="spec">${spec}</div>
        <div class="exp">${exp}</div>
        <a href="#book" class="btn btn-primary">Book Appointment</a>
      </div>
    </div>`).join('');

  /* ============ SCROLL REVEAL ============ */
  const revealEls = document.querySelectorAll('.will-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ============ HERO IN-VIEW TRIGGER ============ */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelector('.hero').classList.add('in-view');
  }));

  /* ============ COUNTER ANIMATION ============ */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimal || '0');
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-IN');
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countIO.observe(c));

  /* ============ NAVBAR SCROLL STATE ============ */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ============ MOBILE MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* ============ THEME TOGGLE ============ */
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });

  /* ============ LANGUAGE TOGGLE (demo) ============ */
  const langToggle = document.getElementById('langToggle');
  let isHindi = false;
  const translations = {
    en: { heroTitle1: 'Creating Beautiful', heroTitle2: 'Healthy Smiles.', heroSub: "Advanced dentistry, gentle hands, and a clinic built around how it feels to be a patient — not just how it looks to be a provider." },
    hi: { heroTitle1: 'खूबसूरत बनाना', heroTitle2: 'स्वस्थ मुस्कान।', heroSub: 'उन्नत दंत चिकित्सा, कोमल देखभाल — मरीज़ के अनुभव को ध्यान में रखकर बनाया गया क्लिनिक।' }
  };
  langToggle.addEventListener('click', () => {
    isHindi = !isHindi;
    const t = isHindi ? translations.hi : translations.en;
    const lines = document.querySelectorAll('.reveal-inner');
    if (lines[0]) lines[0].textContent = t.heroTitle1;
    if (lines[1]) lines[1].innerHTML = isHindi ? t.heroTitle2 : 'Healthy <em>Smiles.</em>';
    document.querySelector('.hero-sub').textContent = t.heroSub;
    langToggle.textContent = isHindi ? 'हिं / EN' : 'EN / हिं';
  });

  /* ============ CURSOR RING + MAGNETIC BUTTONS ============ */
  const ring = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    ring.style.opacity = 1;
  });
  window.addEventListener('mouseleave', () => ring.style.opacity = 0);
  function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mouseenter', () => { ring.style.width='64px'; ring.style.height='64px'; ring.style.background='rgba(14,165,233,0.15)'; });
    btn.addEventListener('mouseleave', () => {
      ring.style.width='34px'; ring.style.height='34px'; ring.style.background='transparent';
      btn.style.transform='translate(0,0)';
    });
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.3;
      const y = (e.clientY - r.top - r.height/2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  /* ============ BEFORE/AFTER SLIDER ============ */
  const slider = document.getElementById('baSlider');
  const before = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');
  let dragging = false;
  function setSlider(pct){
    pct = Math.max(4, Math.min(96, pct));
    before.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  function pctFromEvent(e){
    const r = slider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - r.left) / r.width) * 100;
  }
  slider.addEventListener('mousedown', (e) => { dragging = true; setSlider(pctFromEvent(e)); });
  window.addEventListener('mousemove', (e) => { if (dragging) setSlider(pctFromEvent(e)); });
  window.addEventListener('mouseup', () => dragging = false);
  slider.addEventListener('touchstart', (e) => { dragging = true; setSlider(pctFromEvent(e)); });
  window.addEventListener('touchmove', (e) => { if (dragging) setSlider(pctFromEvent(e)); });
  window.addEventListener('touchend', () => dragging = false);
  setSlider(50);

  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      document.querySelector('.ba-after img').src = thumb.dataset.after;
      document.querySelector('.ba-before img').src = thumb.dataset.before;
      setSlider(50);
    });
  });

  /* ============ FAQ ACCORDION + SEARCH ============ */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
      if (!isOpen){ item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });
  const faqSearch = document.getElementById('faqSearch');
  faqSearch.addEventListener('input', () => {
    const q = faqSearch.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.classList.toggle('hide', q.length > 0 && !text.includes(q));
    });
  });

  /* ============ BOOKING FLOW ============ */
  let currentStep = 1;
  const steps = document.querySelectorAll('.bstep');
  const panels = document.querySelectorAll('.bpanel');
  function goToStep(n){
    currentStep = n;
    steps.forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('active', sn === n);
      s.classList.toggle('done', sn < n);
    });
    panels.forEach(p => p.classList.toggle('active', parseInt(p.dataset.panel) === n));
  }
  document.querySelectorAll('.step-next').forEach(btn => btn.addEventListener('click', () => goToStep(Math.min(currentStep + 1, 4))));
  document.querySelectorAll('.step-back').forEach(btn => btn.addEventListener('click', () => goToStep(Math.max(currentStep - 1, 1))));
  steps.forEach(s => s.addEventListener('click', () => { if (parseInt(s.dataset.step) < currentStep || s.classList.contains('done')) goToStep(parseInt(s.dataset.step)); }));

  document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
  }));
  document.querySelectorAll('.doc-chip').forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll('.doc-chip').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
  }));
  document.querySelectorAll('.time-chip').forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll('.time-chip').forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
  }));

  // build next 7 days
  const dateRow = document.getElementById('dateRow');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  for (let i = 0; i < 7; i++){
    const d = new Date(today); d.setDate(today.getDate() + i);
    const chip = document.createElement('button');
    chip.className = 'date-chip' + (i === 0 ? ' selected' : '');
    chip.innerHTML = `<small>${i === 0 ? 'Today' : days[d.getDay()]}</small><strong>${d.getDate()}</strong>`;
    chip.addEventListener('click', () => {
      dateRow.querySelectorAll('.date-chip').forEach(x => x.classList.remove('selected'));
      chip.classList.add('selected');
    });
    dateRow.appendChild(chip);
  }

  document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.style.display = 'none';
    document.getElementById('bookingSuccess').classList.add('show');
  });

  /* ============ AI ASSISTANT ============ */
  const aiFab = document.getElementById('aiFab');
  const aiPanel = document.getElementById('aiPanel');
  const aiClose = document.getElementById('aiClose');
  const aiBody = document.getElementById('aiBody');
  const aiInput = document.getElementById('aiInput');
  const aiSend = document.getElementById('aiSend');

  aiFab.addEventListener('click', () => aiPanel.classList.toggle('open'));
  aiClose.addEventListener('click', () => aiPanel.classList.remove('open'));

  const aiResponses = {
    hours: "We're open Mon–Sat, 9:00 AM–8:30 PM, and Sunday 10:00 AM–2:00 PM for emergencies only.",
    pricing: "Pricing varies by treatment — a check-up starts free with our consultation offer, and we always share a clear estimate before any procedure. Want me to connect you with a specific treatment's pricing?",
    emergency: "For a dental emergency, call us right now at +91 120 456 7890 — we hold same-day emergency slots every day, including Sundays.",
    book: "I can take you straight to our booking flow — scroll down to 'Book Appointment' or tap the button below.",
  };
  function addMsg(text, who){
    const div = document.createElement('div');
    div.className = 'ai-msg ai-' + who;
    div.textContent = text;
    aiBody.appendChild(div);
    aiBody.scrollTop = aiBody.scrollHeight;
  }
  function botReply(q){
    const key = q.toLowerCase();
    let reply = "Thanks for asking — for anything specific to your case, our front desk can help directly at +91 120 456 7890, or I can guide you to booking an appointment.";
    if (key.includes('hour') || key.includes('time') || key.includes('open')) reply = aiResponses.hours;
    else if (key.includes('price') || key.includes('cost') || key.includes('fee')) reply = aiResponses.pricing;
    else if (key.includes('emergency') || key.includes('pain') || key.includes('urgent')) reply = aiResponses.emergency;
    else if (key.includes('book') || key.includes('appointment')) reply = aiResponses.book;
    else if (key.includes('insurance')) reply = "We support cashless treatment with most major insurers — bring your policy details to your first visit and our desk will verify coverage.";
    else if (key.includes('doctor')) reply = "We have 7 specialist dentists across implants, orthodontics, cosmetic, and pediatric dentistry — you can pick one directly in the booking flow.";
    setTimeout(() => addMsg(reply, 'bot'), 500);
  }
  document.querySelectorAll('.ai-quick button').forEach(btn => {
    btn.addEventListener('click', () => {
      addMsg(btn.textContent, 'user');
      botReply(btn.dataset.q);
    });
  });
  function sendAiMsg(){
    const val = aiInput.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    aiInput.value = '';
    botReply(val);
  }
  aiSend.addEventListener('click', sendAiMsg);
  aiInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendAiMsg(); });

  /* ============ SMOOTH ANCHOR SCROLL OFFSET ============ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        const target = document.querySelector(id);
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

});
