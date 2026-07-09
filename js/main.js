document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initHideOnScroll();
  initFAQAccordion();
  initScrollAnimations();
  initSmoothScroll();
  initVideoLazyLoad();
});

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');

  if (!menuToggle || !mobileOverlay) return;

  const closeMobileMenu = function () {
    mobileOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMobileMenu = function (e) {
    e.preventDefault();
    e.stopPropagation();
    mobileOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  menuToggle.addEventListener('click', openMobileMenu);

  if (mobileClose) {
    mobileClose.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  mobileOverlay.addEventListener('click', function (e) {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function initHideOnScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollTop = 0;
  const SCROLL_THRESHOLD_PX = 100;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    if (scrollTop > SCROLL_THRESHOLD_PX) {
      if (scrollTop > lastScrollTop) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop;
  });
}

function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      faqQuestions.forEach(function (otherQuestion) {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherQuestion.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
      });

      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        answer.classList.remove('active');
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('active');
      }
    });
  });
}

function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length === 0) return;

  const timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('timeline-animate');
          }, 100);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  timelineItems.forEach(function (item) {
    timelineObserver.observe(item);
  });
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.expertise-card, .process-card, .testimonial-card, .faq-item, .logo-slot, .partner, .calendly-wrapper, .final-cta'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  animatedElements.forEach(function (el) {
    el.classList.add('animate-ready');
    observer.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash.length < 2) return;

      let target = null;
      try {
        target = document.querySelector(hash);
      } catch (error) {
        return;
      }

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initVideoLazyLoad() {
  const videoContainers = document.querySelectorAll('.testimonial-video[data-video-src]');

  videoContainers.forEach(function (container) {
    const playButton = container.querySelector('.play-button');
    const thumbnail = container.querySelector('.video-thumbnail');
    const videoSrc = container.getAttribute('data-video-src');

    if (!playButton || !thumbnail || !videoSrc) return;

    playButton.addEventListener('click', function () {
      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = videoSrc;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';

      // Replace thumbnail with iframe
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  });
}
