/*
 * Shared behaviour for both pages.
 *
 * This lives in one file because it used to live in two: the copies drifted,
 * and the India contact form ended up returning the free-review confirmation
 * message. Anything that both pages need goes here.
 *
 * Per-page differences are expressed as data attributes in the markup rather
 * than as forked copies of the code.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Contact links — assembled at runtime so the address is not sitting
     in the static HTML for scrapers to lift.
     ------------------------------------------------------------------ */
  var CONTACT_EMAIL = ['mohitshakya797', 'gmail', 'com'].join(' ').replace(' ', '@').replace(' ', '.');

  Array.prototype.forEach.call(document.querySelectorAll('.email-link'), function (a) {
    a.href = 'mailto:' + CONTACT_EMAIL;
    if (a.dataset.fill === 'text') a.textContent = CONTACT_EMAIL;
  });

  /* ------------------------------------------------------------------
     Forms. Both pages post to the same endpoint; a hidden request_type
     field distinguishes them on arrival.
     ------------------------------------------------------------------ */
  function wireForm(formId, btnId, statusId, sentMessage) {
    var form = document.getElementById(formId);
    var btn = document.getElementById(btnId);
    var status = document.getElementById(statusId);
    if (!form || !btn || !status) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var original = btn.textContent;

      // Everything that disables the button sits inside the try, and the
      // restore sits in the finally — otherwise a throw between the two
      // leaves the form permanently stuck reading "Sending...".
      var restore = function () {
        btn.disabled = false;
        btn.textContent = original;
      };

      try {
        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.style.display = 'none';

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (res) {
          if (!res.ok) throw new Error('Server error');
          status.style.display = 'block';
          status.style.color = '#1e8449';
          status.textContent = sentMessage;
          form.reset();
        }).catch(function () {
          status.style.display = 'block';
          status.style.color = '#c0392b';
          status.textContent = 'Could not send. Please email directly: ' + CONTACT_EMAIL;
        }).then(restore, restore);
      } catch (err) {
        restore();
      }
    });
  }

  wireForm('reviewForm', 'reviewBtn', 'reviewStatus',
    "Got it. I'll reply within 3 hours during 10:00-19:00 IST.");
  wireForm('contactForm', 'submitBtn', 'formStatus',
    "Message sent. I'll reply within 3 hours during 10:00-19:00 IST.");

  /* ------------------------------------------------------------------
     Region suggestion.

     A suggestion, deliberately not a redirect: silently rerouting someone
     by location reads as concealment the moment they notice it, and the
     whole reason the two pages are separate is that the pricing has to
     survive being discovered.

     Timezone rather than an IP lookup — no external request, nothing for a
     privacy blocker to break, and no third party learning who reads the page.

     data-geo-mode="in"     show when the visitor IS on Indian time
     data-geo-mode="not-in" show when the visitor is NOT on Indian time
     ------------------------------------------------------------------ */
  (function () {
    var IN_ZONES = ['Asia/Kolkata', 'Asia/Calcutta'];
    var box = document.querySelector('.geo-suggest');
    if (!box) return;

    var close = box.querySelector('.geo-close');
    var mode = box.dataset.geoMode || 'in';
    var key = box.dataset.geoKey || 'geoSuggestDismissed';

    function dismissed() {
      try { return localStorage.getItem(key) === '1'; }
      catch (e) { return false; }   // private mode: just show it
    }

    var zone = '';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { zone = ''; }

    var isIndian = IN_ZONES.indexOf(zone) !== -1;
    // The "not-in" case additionally requires a readable zone: an unknown
    // timezone should not be treated as evidence of being outside India.
    var shouldShow = (mode === 'in') ? isIndian : (zone !== '' && !isIndian);

    if (shouldShow && !dismissed()) {
      // Held back a moment so it does not compete with the hero on arrival.
      setTimeout(function () { box.classList.add('visible'); }, 1800);
    }

    if (close) {
      close.addEventListener('click', function () {
        box.classList.remove('visible');
        try { localStorage.setItem(key, '1'); } catch (e) {}
      });
    }
  })();

  /* ------------------------------------------------------------------
     Scroll spy, back-to-top, and reveal-on-scroll.
     ------------------------------------------------------------------ */
  var sections = document.querySelectorAll('section');
  var navLinks = document.querySelectorAll('.nav-links a');
  var scrollTop = document.getElementById('scrollTop');
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var current = '';
      Array.prototype.forEach.call(sections, function (s) {
        if (window.scrollY >= s.offsetTop - 80) current = s.getAttribute('id');
      });
      Array.prototype.forEach.call(navLinks, function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      });
      if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 400);
      ticking = false;
    });
  }, { passive: true });

  if (scrollTop) {
    scrollTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  Array.prototype.forEach.call(
    document.querySelectorAll('.service-card, .project-card, .process-step, .pricing-card, .problem-card, .case-card, .working-item'),
    function (el) { el.classList.add('reveal'); observer.observe(el); }
  );
})();
