async function handleForm(formId, btnId, successId) {
    const form = document.getElementById(formId);
    const btn = document.getElementById(btnId);
    const success = document.getElementById(successId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      btn.disabled = true;
      const bt = btn.querySelector('.btext');
      if (bt) bt.textContent = 'Enviando...';
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
        if (res.ok) { form.style.display = 'none'; success.style.display = 'block'; }
        else { btn.disabled = false; if (bt) bt.textContent = 'Intentá de nuevo'; alert('Error al enviar. Intentá de nuevo.'); }
      } catch { btn.disabled = false; if (bt) bt.textContent = 'Intentá de nuevo'; alert('Error al enviar. Intentá de nuevo.'); }
    });
  }
  handleForm('contact-form','c-btn','c-success');
  handleForm('e-form','e-btn','e-success');

(function() {
  // Carrusel testimonios inline
  const inlineTrack = document.getElementById('inlineTrack');
  const inlineDots = document.getElementById('inlineDots');
  if (inlineTrack && inlineDots) {
    const inlineCards = inlineTrack.querySelectorAll('.testi-inline-card');
    let inlineCurrent = 0;
    inlineCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'testi-inline-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goInline(i));
      inlineDots.appendChild(dot);
    });
    function goInline(idx) {
      inlineCurrent = (idx + inlineCards.length) % inlineCards.length;
      inlineTrack.style.transform = `translateX(-${inlineCurrent * 100}%)`;
      inlineDots.querySelectorAll('.testi-inline-dot').forEach((d, i) => d.classList.toggle('active', i === inlineCurrent));
    }
    setInterval(() => goInline(inlineCurrent + 1), 5000);
  }

  // Carrusel casos de éxito
  const casosTrack = document.getElementById('casosTrack');
  const casosDots = document.getElementById('casosDots');
  if (casosTrack && casosDots) {
    const casosCards = casosTrack.querySelectorAll('.caso-exito-card');
    let casosCurrent = 0;
    casosCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'casos-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goCaso(i));
      casosDots.appendChild(dot);
    });
    function goCaso(idx) {
      casosCurrent = (idx + casosCards.length) % casosCards.length;
      casosTrack.style.transform = `translateX(-${casosCurrent * 100}%)`;
      casosDots.querySelectorAll('.casos-dot').forEach((d, i) => d.classList.toggle('active', i === casosCurrent));
    }
    document.getElementById('casosPrev').addEventListener('click', () => goCaso(casosCurrent - 1));
    document.getElementById('casosNext').addEventListener('click', () => goCaso(casosCurrent + 1));
    setInterval(() => goCaso(casosCurrent + 1), 5000);
  }
})();