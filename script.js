// ===== شريط التنقل يتغير عند التمرير =====
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== قائمة الهاتف (المنيو الجانبي) =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// إغلاق القائمة عند الضغط على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== تمييز الرابط النشط حسب القسم =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== تأثير ظهور العناصر عند التمرير (Fade-up) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.app-card, .section-header, .hero-text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ===== المودال: نافذة التحميل المنبثقة =====
const modal = document.getElementById('downloadModal');
const modalAppName = document.getElementById('modalAppName');
const modalDownloadLink = document.getElementById('modalDownloadLink');
const qrImg = document.getElementById('qrCodeImg');
const closeModal = document.querySelector('.close-modal');

// إضافة حدث النقر على كل بطاقة تطبيق
const cards = document.querySelectorAll('.app-card');
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    // منع إذا تم الضغط على رابط داخلي (لا يوجد هنا لكن احتياطاً)
    if (e.target.closest('a')) return;
    
    const appName = card.getAttribute('data-app-name');
    let appLink = card.getAttribute('data-app-link');
    
    // إذا كان الرابط # أو فارغاً، نعرض رسالة "قريباً"
    if (!appLink || appLink === '#') {
      alert('هذا التطبيق قيد الإعداد – سيتم توفيره قريباً');
      return;
    }
    
    modalAppName.innerText = appName;
    modalDownloadLink.href = appLink;
    // إنشاء رمز QR من رابط التحميل (خدمة مجانية)
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(appLink)}`;
    modal.style.display = 'flex';
  });
});

// إغلاق المودال
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ===== إرسال نموذج الاتصال عبر Formspree =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      formStatus.innerHTML = '<p style="color: #4ade80; margin-top:1rem;">✅ تم إرسال رسالتك بنجاح</p>';
      contactForm.reset();
    } else {
      formStatus.innerHTML = '<p style="color: #f87171; margin-top:1rem;">❌ حدث خطأ، حاول مرة أخرى</p>';
    }
    setTimeout(() => formStatus.innerHTML = '', 5000);
  });
}