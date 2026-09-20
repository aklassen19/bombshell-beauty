const navbar = `
<nav class="navbar">
  <a href="index.html" class="nav-logo">
    <img src="images/logo.png" alt="Blonde Bombshell Beauty" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
    <span class="nav-logo-text" style="display:none">Blonde Bombshell Beauty</span>
  </a>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-links">
    <a href="about.html">About</a>
    <a href="services.html">Services & Pricing</a>
    <a href="faq.html">FAQ</a>
    <a href="book.html" class="nav-book">Book Your Date</a>
  </div>
</nav>`;

const footer = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-col">
      <img src="images/logo.png" alt="Blonde Bombshell Beauty" style="height: 80px; width: auto; max-width: 160px; mix-blend-mode: multiply; margin-bottom: 8px;">
      <p class="footer-tagline">Bridal hair & makeup artistry<br>by Krista Matthews</p>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Navigate</p>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="faq.html">FAQ</a>
      <a href="book.html">Book Your Date</a>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Contact</p>
      <a href="mailto:BlondeBBeauty@gmail.com">BlondeBBeauty@gmail.com</a>
      <a href="tel:7809373022">780-937-3022</a>
      <a href="https://www.instagram.com/blondebombshell_beauty/" target="_blank">Instagram</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2024–2026 Blonde Bombshell Beauty. All Rights Reserved.</p>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('navbar').innerHTML = navbar;
  document.getElementById('footer').innerHTML = footer;

  // Highlight active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === path.split('/').pop() || 
        (path === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });
});
