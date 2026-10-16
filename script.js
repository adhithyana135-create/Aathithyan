/**
 * Portfolio Website Interactive Script & Dynamic Content Engine
 * Connects directly to content.js so all content can be edited in one single file.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Grab configuration data
  const data = window.portfolioData;
  if (!data) {
    console.warn('portfolioData not found in content.js. Using existing static markup.');
  } else {
    renderPortfolioContent(data);
  }

  // Initialize interactive features
  initThemePalette();
  initScrollFeatures();
  initMobileNav();
  initTypewriter(data ? data.personal.typewriterRoles : null);
  initCanvasParticles();
  initScrollRevealAndCounters();
  initTiltCards();
  initProjectFilters();
  initTimelineTabs();
  initProjectModal(data ? data.projects : []);
  initContactForm();
  initResumeButton(data ? data.personal.resumeUrl : '#');
});

/**
 * Render all content from portfolioData into the DOM
 */
function renderPortfolioContent(data) {
  const p = data.personal;

  // 1. Page Title & Meta
  if (p.name && p.role) {
    document.title = `${p.name} | ${p.role} Portfolio`;
  }
  const metaDesc = document.getElementById('meta-desc');
  if (metaDesc && p.headline) {
    metaDesc.setAttribute('content', `${p.name} - ${p.role}. ${p.headline}`);
  }

  // 2. Navbar Logo
  const logoIcon = document.getElementById('nav-logo-icon');
  const logoName = document.getElementById('nav-logo-name');
  if (logoIcon && p.initials) logoIcon.textContent = p.initials;
  if (logoName && p.name) logoName.textContent = p.name;

  // 3. Status Badge
  const statusBadge = document.getElementById('status-badge');
  const statusText = document.getElementById('status-text');
  if (statusBadge && p.status) {
    if (!p.status.available) {
      statusBadge.style.display = 'none';
    } else if (statusText && p.status.text) {
      statusText.textContent = p.status.text;
    }
  }

  // 4. Hero Section
  const heroName = document.getElementById('hero-name');
  if (heroName && p.name) heroName.textContent = p.name;

  const heroShortBio = document.getElementById('hero-short-bio');
  if (heroShortBio && p.shortBio) heroShortBio.textContent = p.shortBio;

  // Hero Social Links
  const heroSocials = document.getElementById('hero-socials');
  if (heroSocials && p.socials) {
    const s = p.socials;
    heroSocials.innerHTML = `
      ${s.github ? `<a href="${s.github}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub Profile">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>` : ''}
      ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>` : ''}
      ${s.twitter ? `<a href="${s.twitter}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter Profile">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>` : ''}
      ${p.email ? `<a href="mailto:${p.email}" class="social-link" aria-label="Email Me">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>` : ''}
    `;
  }

  // Hero Visual Card
  const heroCardImg = document.getElementById('hero-avatar-img');
  if (heroCardImg) {
    if (p.profilePhoto && p.profilePhoto.trim() !== '') {
      heroCardImg.innerHTML = `<img src="${p.profilePhoto}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else {
      heroCardImg.innerHTML = `
        <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      `;
    }
  }

  const heroCardName = document.getElementById('hero-card-name');
  if (heroCardName && p.name) heroCardName.textContent = p.name;

  const heroCardRole = document.getElementById('hero-card-role');
  if (heroCardRole && p.role) heroCardRole.textContent = p.role;

  const heroCardLocation = document.getElementById('hero-card-location');
  if (heroCardLocation && p.location) heroCardLocation.textContent = p.location;

  const heroCardExp = document.getElementById('hero-card-experience');
  const heroCardExpLabel = heroCardExp ? heroCardExp.previousElementSibling : null;
  if (heroCardExp) {
    if (data.aboutStats && data.aboutStats.length > 0 && data.aboutStats[0].value) {
      heroCardExp.textContent = data.aboutStats[0].value;
    } else {
      if (heroCardExpLabel) heroCardExpLabel.textContent = "Education";
      heroCardExp.textContent = "B.E. ECE (2026)";
    }
  }

  // 5. About Section Bio
  const aboutHeadline = document.getElementById('about-headline');
  if (aboutHeadline && p.headline) aboutHeadline.textContent = p.headline;

  const aboutBioContainer = document.getElementById('about-bio-container');
  if (aboutBioContainer && p.aboutBio) {
    aboutBioContainer.innerHTML = p.aboutBio.map(paragraph => `<p>${paragraph}</p>`).join('');
  }

  // About Stats
  const aboutStatsContainer = document.getElementById('about-stats-container');
  if (aboutStatsContainer) {
    if (data.aboutStats && data.aboutStats.length > 0) {
      aboutStatsContainer.style.display = 'grid';
      aboutStatsContainer.innerHTML = data.aboutStats.map(stat => `
        <div class="stat-card">
          <div class="stat-number" data-target="${stat.targetNumber}">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    } else {
      aboutStatsContainer.style.display = 'none';
    }
  }

  // Value Pillars
  const valuePillarsContainer = document.getElementById('value-pillars-container');
  if (valuePillarsContainer && data.valuePillars) {
    const iconSvgs = {
      code: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
      zap: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
      layout: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />'
    };

    valuePillarsContainer.innerHTML = data.valuePillars.map(pillar => `
      <div class="value-item">
        <div class="value-icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            ${iconSvgs[pillar.icon] || iconSvgs.code}
          </svg>
        </div>
        <div>
          <h3 class="value-title">${pillar.title}</h3>
          <p class="value-desc">${pillar.description}</p>
        </div>
      </div>
    `).join('');
  }

  // 6. Skills Section
  const skillsContainer = document.getElementById('skills-grid-container');
  if (skillsContainer && data.skills) {
    const categoryIcons = {
      layout: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
      server: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />',
      database: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />',
      tool: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
    };

    skillsContainer.innerHTML = data.skills.map(group => `
      <div class="skill-category-card">
        <div class="category-header">
          <div class="category-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              ${categoryIcons[group.icon] || categoryIcons.layout}
            </svg>
          </div>
          <h3 class="category-title">${group.category}</h3>
        </div>
        <div class="skills-tags">
          ${group.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // 7. Projects Section
  const projectsContainer = document.getElementById('projects-grid-container');
  if (projectsContainer && data.projects) {
    projectsContainer.innerHTML = data.projects.map(project => `
      <article class="project-card interactive-tilt reveal-on-scroll" data-category="${project.category}">
        <div class="project-thumbnail">
          <span class="project-badge">${project.categoryBadge || 'Project'}</span>
          ${project.image && project.image.trim() !== '' ? 
            `<img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">` :
            `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>`
          }
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-stack">
            ${project.technologies.map(t => `<span class="stack-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.demoUrl ? `
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <span>Live Demo</span>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <span>GitHub</span>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </a>
            ` : ''}
            <button class="project-link-btn quick-view-btn" data-project-id="${project.id}" style="margin-left:auto; color:var(--accent-primary);">Details</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 8. Experience Timeline
  const expTimeline = document.getElementById('experience-timeline');
  if (expTimeline && data.experience) {
    expTimeline.innerHTML = data.experience.map(exp => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <div class="timeline-organization">${exp.company} • ${exp.location}</div>
          <div class="timeline-body">
            <p>${exp.description}</p>
            <ul>
              ${exp.points.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 9. Education Timeline
  const eduTimeline = document.getElementById('education-timeline');
  if (eduTimeline && data.education) {
    eduTimeline.innerHTML = data.education.map(edu => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <h3 class="timeline-role">${edu.degree}</h3>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <div class="timeline-organization">${edu.institution} • ${edu.location}</div>
          <div class="timeline-body">
            <p>${edu.description}</p>
            <ul>
              ${edu.points.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 10. Achievements Timeline
  const achTimeline = document.getElementById('achievements-timeline');
  if (achTimeline && data.achievements) {
    achTimeline.innerHTML = data.achievements.map(ach => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <h3 class="timeline-role">${ach.title}</h3>
            <span class="timeline-period">${ach.year}</span>
          </div>
          <div class="timeline-organization">${ach.issuer}</div>
          <div class="timeline-body">
            <p>${ach.description}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 11. Contact Info Cards (Email, Phone, Location, Profiles)
  const contactList = document.getElementById('contact-info-list');
  if (contactList) {
    contactList.innerHTML = `
      ${p.email ? `
        <div class="contact-info-card">
          <div class="contact-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div class="contact-label">Email Address</div>
            <a href="mailto:${p.email}" class="contact-value">${p.email}</a>
          </div>
        </div>
      ` : ''}

      ${p.phone ? `
        <div class="contact-info-card">
          <div class="contact-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <div class="contact-label">Phone</div>
            <a href="tel:${p.phone}" class="contact-value">${p.phone}</a>
          </div>
        </div>
      ` : ''}

      ${p.location ? `
        <div class="contact-info-card">
          <div class="contact-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div class="contact-label">Location</div>
            <div class="contact-value">${p.location}</div>
          </div>
        </div>
      ` : ''}

      <div class="contact-info-card">
        <div class="contact-icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <div>
          <div class="contact-label">Online Profiles</div>
          <div class="contact-value">
            ${p.socials.github ? `<a href="${p.socials.github}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary);">GitHub</a>` : ''}
            ${p.socials.github && p.socials.linkedin ? ' • ' : ''}
            ${p.socials.linkedin ? `<a href="${p.socials.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary);">LinkedIn</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // 12. Footer Copyright
  const footerCopy = document.getElementById('footer-copy');
  if (footerCopy && p.name) {
    const year = new Date().getFullYear();
    footerCopy.innerHTML = `&copy; ${year} ${p.name}. All rights reserved. Designed for speed, accessibility, and elegance.`;
  }
}

/**
 * 1. Multi-Theme Palette Engine
 */
function initThemePalette() {
  const paletteBtn = document.getElementById('palette-btn');
  const paletteDropdown = document.getElementById('palette-dropdown');
  const themeChoiceBtns = document.querySelectorAll('.theme-choice-btn');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  if (paletteBtn && paletteDropdown) {
    paletteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      paletteDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!paletteDropdown.contains(e.target) && e.target !== paletteBtn) {
        paletteDropdown.classList.remove('show');
      }
    });
  }

  themeChoiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-theme-choice');
      setTheme(choice);
      if (paletteDropdown) paletteDropdown.classList.remove('show');
    });
  });

  function setTheme(themeName) {
    htmlElement.setAttribute('data-theme', themeName);
    localStorage.setItem('portfolio-theme', themeName);

    themeChoiceBtns.forEach(b => {
      if (b.getAttribute('data-theme-choice') === themeName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (window.updateCanvasPalette) {
      window.updateCanvasPalette();
    }
  }
}

/**
 * 2. Scroll Progress & Sticky Navbar
 */
function initScrollFeatures() {
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight > 0 && scrollProgress) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    if (scrollY > 40 && navbar) {
      navbar.classList.add('scrolled');
    } else if (navbar) {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400 && backToTopBtn) {
      backToTopBtn.classList.add('visible');
    } else if (backToTopBtn) {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', !isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * 4. Dynamic Typewriter Animation
 */
function initTypewriter(customRoles) {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = customRoles && customRoles.length > 0 ? customRoles : [
    '[Your Role / Profession]',
    'Full Stack Developer',
    'UI/UX Craftsman',
    'Creative Technologist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

/**
 * 5. Interactive Particle Canvas
 */
function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 55);

  let particleColor = 'rgba(99, 102, 241, 0.4)';
  let lineColor = 'rgba(139, 92, 246, 0.12)';

  window.updateCanvasPalette = () => {
    const computed = getComputedStyle(document.documentElement);
    particleColor = computed.getPropertyValue('--canvas-particle').trim() || 'rgba(99, 102, 241, 0.4)';
    lineColor = computed.getPropertyValue('--canvas-line').trim() || 'rgba(139, 92, 246, 0.12)';
  };
  window.updateCanvasPalette();

  const mouse = { x: null, y: null, maxDistance: 130 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDistance) {
          const force = (mouse.maxDistance - dist) / mouse.maxDistance;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();
}

/**
 * 6. 3D Tilt Card Physics
 */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.interactive-tilt');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/**
 * 7. Scroll Reveal & Number Counter
 */
function initScrollRevealAndCounters() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        if (!statsCounted && entry.target.closest('#about')) {
          startCountingStats();
          statsCounted = true;
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  function startCountingStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 1500;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          stat.textContent = target === 99 ? `${target}%` : `[${target}+]`;
        } else {
          stat.textContent = `[${Math.floor(current)}+]`;
        }
      }, stepTime);
    });
  }
}

/**
 * 8. Project Filters
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 9. Experience / Education / Achievements Tabs
 */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${tabTarget}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/**
 * 10. Project Quick View Modal
 */
function initProjectModal(projectsList) {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  const openModal = (projectId) => {
    const project = projectsList.find(p => String(p.id) === String(projectId));
    if (!project || !modalBody) return;

    const details = project.modalDetails || {
      badge: project.categoryBadge || 'Project Details',
      longDescription: project.description,
      highlights: []
    };

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="project-badge" style="position:static; display:inline-block; margin-bottom:0.5rem; background:rgba(99,102,241,0.2); color:var(--accent-primary);">${details.badge}</span>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${project.title}</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${details.longDescription}</p>
      </div>

      ${details.highlights && details.highlights.length > 0 ? `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Key Architectural Highlights:</h4>
          <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
            ${details.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Technologies Leveraged:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${project.technologies.map(t => `<span class="stack-tag">${t}</span>`).join('')}
        </div>
      </div>

      ${(project.demoUrl || project.githubUrl) ? `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid var(--border-color);">
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <span>View Live Site</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          ` : ''}
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <span>Source Code</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </a>
          ` : ''}
        </div>
      ` : ''}
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-view-btn');
    if (btn) {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 11. Contact Form Handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please provide a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        `;
        showStatus('Thank you! Your message has been received. I will get back to you shortly.', 'success');
        contactForm.reset();
      }, 900);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    setTimeout(() => {
      if (type === 'success') {
        formStatus.style.display = 'none';
      }
    }, 6000);
  }
}

/**
 * 12. Resume Download Button
 */
function initResumeButton(resumeUrl) {
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    if (resumeUrl && resumeUrl !== '#' && resumeUrl.trim() !== '') {
      cvBtn.setAttribute('href', resumeUrl);
      cvBtn.setAttribute('target', '_blank');
      cvBtn.setAttribute('download', '');
    } else {
      cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('To enable your resume download, set resumeUrl: "resume.pdf" (or link to your CV) in content.js!');
      });
    }
  }
}
