/**
 * V. R. Sharma & Associates - Legal Advocacy Landing Page
 * Vanilla JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurable Business Details
  const CONFIG = {
    whatsappNumber: '919960503700', // Country code without '+' followed by number
    secondaryNumber: '917067470145',
    businessName: 'V. R. Sharma & Associates',
    primaryEmail: 'contact@vrsharmalaw.com'
  };

  // 1. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50
    });
  }

  // 2. Sticky Navbar Blur & Shrink on Scroll
  const mainNavbar = document.getElementById('mainNavbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar state
    if (scrollPos > 60) {
      mainNavbar.classList.add('navbar-scrolled');
    } else {
      mainNavbar.classList.remove('navbar-scrolled');
    }

    // Back to top button state
    if (scrollPos > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // 3. Smooth Mobile Menu Auto-close on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 4. Back To Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Animated Statistics Counters
  const counterElements = document.querySelectorAll('.counter-number');
  let animated = false;

  const startCounters = () => {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  };

  // Trigger counters with IntersectionObserver
  const counterSection = document.querySelector('.about-counters');
  if (counterSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          startCounters();
          animated = true;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterSection);
  }

  // 6. Interactive Practice Area "Consult On..." Click Pre-selection
  const serviceLinks = document.querySelectorAll('.service-link');
  const formPracticeArea = document.getElementById('formPracticeArea');
  const modalCategory = document.getElementById('modalCategory');

  serviceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      let matchedVal = '';

      if (text.includes('Civil')) {
        matchedVal = 'Civil Litigation & Injunctions';
      } else if (text.includes('Criminal')) {
        matchedVal = 'Criminal Defense & Urgent Bail';
      } else if (text.includes('Corporate')) {
        matchedVal = 'Corporate & Commercial Litigation';
      } else if (text.includes('Property')) {
        matchedVal = 'Real Estate & RERA Disputes';
      } else if (text.includes('Family')) {
        matchedVal = 'Family, Custody & Matrimonial';
      } else if (text.includes('Arbitration')) {
        matchedVal = 'Arbitration & Mediation';
      }

      if (matchedVal && formPracticeArea) {
        formPracticeArea.value = matchedVal;
      }
    });
  });

  // 7. Gallery Category Filtering
  const filterButtons = document.querySelectorAll('.gallery-filters .btn-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. Lightbox Image Preview Modal
  const galleryViewBtns = document.querySelectorAll('.btn-gallery-view');
  const lightboxModalEl = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  let lightboxModalInstance = null;
  if (lightboxModalEl && typeof bootstrap !== 'undefined') {
    lightboxModalInstance = new bootstrap.Modal(lightboxModalEl);
  }

  galleryViewBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const fullSrc = this.getAttribute('data-full');
      const caption = this.getAttribute('data-caption') || '';

      if (lightboxImg && lightboxCaption) {
        lightboxImg.src = fullSrc;
        lightboxCaption.textContent = caption;
        if (lightboxModalInstance) {
          lightboxModalInstance.show();
        }
      }
    });
  });

  // 9. Contact Enquiry Form Validation & WhatsApp Redirection
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      if (!enquiryForm.checkValidity()) {
        enquiryForm.classList.add('was-validated');
        return;
      }

      enquiryForm.classList.add('was-validated');

      // Extract Form Data
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const practiceArea = document.getElementById('formPracticeArea').value;
      const isUrgent = document.getElementById('urgentMatter').checked ? 'YES (URGENT BAIL/ORDER)' : 'Standard';
      const message = document.getElementById('formMessage').value.trim();

      // Submit feedback button state
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Transmitting Confidential Dossier...';

      // Simulate secure transmission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
        }

        // WhatsApp query formulation
        const waText = encodeURIComponent(
          `*CONFIDENTIAL LEGAL ENQUIRY - ${CONFIG.businessName}*\n\n` +
          `*Client Name:* ${name}\n` +
          `*Contact:* ${phone}\n` +
          `*Email:* ${email}\n` +
          `*Matter Category:* ${practiceArea}\n` +
          `*Urgent Action Required:* ${isUrgent}\n` +
          `*Case Summary:*\n${message}`
        );

        // Offer immediate WhatsApp connectivity
        const sendToWhatsapp = confirm(
          "Your enquiry has been securely logged! Would you like to connect directly on WhatsApp with Senior Advocate V. R. Sharma's desk right now?"
        );

        if (sendToWhatsapp) {
          window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`, '_blank');
        }

        enquiryForm.reset();
        enquiryForm.classList.remove('was-validated');
      }, 1200);
    });
  }

  // 10. Quick Consultation Modal Form
  const modalEnquiryForm = document.getElementById('modalEnquiryForm');
  const modalSuccessAlert = document.getElementById('modalSuccessAlert');

  if (modalEnquiryForm) {
    modalEnquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const modalName = document.getElementById('modalName').value.trim();
      const modalPhone = document.getElementById('modalPhone').value.trim();
      const category = document.getElementById('modalCategory').value;
      const modalNotes = document.getElementById('modalNotes').value.trim();

      if (!modalName || !modalPhone || !category) {
        alert('Please fill all required fields.');
        return;
      }

      if (modalSuccessAlert) {
        modalSuccessAlert.classList.remove('d-none');
      }

      setTimeout(() => {
        modalEnquiryForm.reset();
        if (modalSuccessAlert) {
          modalSuccessAlert.classList.add('d-none');
        }
        const modalEl = document.getElementById('consultationModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
      }, 2200);
    });
  }

  // 11. Auto Update Current Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
