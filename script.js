function showTooltip(msg) {
      const t = document.getElementById('tooltip');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2200);
    }

    function createRipple(btn, e) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    document.querySelectorAll('.link-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        createRipple(this, e);
        const url = this.dataset.url;
        const name = this.dataset.name;
        showTooltip('Abriendo ' + name + ' ↗');
        setTimeout(() => window.open(url, '_blank'), 350);
      });
    });

    function handleShare() {
      if (navigator.share) {
        navigator.share({
          title: 'Andes Maq Perú',
          text: 'Conoce a Andes Maq Perú en sus redes sociales',
          url: 'https://diffcam.com.pe'
        }).catch(() => fallbackCopy());
      } else {
        fallbackCopy();
      }
    }

    function fallbackCopy() {
      navigator.clipboard.writeText('https://diffcam.com.pe')
        .then(() => showTooltip('¡Enlace copiado al portapapeles!'))
        .catch(() => showTooltip('Diffcam.com.pe'));
    }

    // Animate view count on load
    let v = 0;
    const target = 1200;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      v = Math.min(v + step, target);
      const el = document.getElementById('views');
      el.textContent = v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v;
      if (v >= target) clearInterval(timer);
    }, 30);