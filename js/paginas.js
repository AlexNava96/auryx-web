/* =========================================================
   AURYX — Interacciones de las páginas internas
   Filtros (blog y casos), formularios y botón de copiar enlace
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    initContactForm();
    initSubscribeForms();
    initCopyLink();
  });

  /* ---------- Filtros por categoría ---------- */
  function initFilters() {
    document.querySelectorAll('[data-filters]').forEach(function (group) {
      var target = document.querySelector(group.dataset.filters);
      if (!target) return;
      var chips = Array.prototype.slice.call(group.querySelectorAll('[data-filter]'));
      var items = Array.prototype.slice.call(target.querySelectorAll('[data-category]'));
      var status = document.querySelector(group.dataset.status || '');

      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          var value = chip.dataset.filter;
          chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
          var shown = 0;
          items.forEach(function (item) {
            var match = value === 'todos' || item.dataset.category.split(' ').indexOf(value) !== -1;
            item.classList.toggle('is-hidden', !match);
            if (match) shown++;
          });
          if (status) {
            status.textContent = value === 'todos'
              ? ''
              : shown === 1 ? 'Se muestra 1 resultado.' : 'Se muestran ' + shown + ' resultados.';
          }
        });
      });
    });
  }

  /* ---------- Formulario de contacto ----------
     El sitio no tiene servidor: al enviar, se abre el correo del visitante
     con el mensaje ya escrito, dirigido al correo de data-email. */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var status = form.querySelector('.form__status');

    // Preselecciona el servicio o plan que viene en la URL (?servicio=web o ?plan=crecimiento)
    var params = new URLSearchParams(window.location.search);
    var preset = params.get('servicio') || params.get('plan');
    var select = form.querySelector('select[name="servicio"]');
    if (preset && select) {
      var option = select.querySelector('option[value="' + preset + '"]');
      if (option) select.value = preset;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = validate(form);
      if (errors.length) {
        setStatus(status, 'Revisa los campos marcados: ' + errors.join(', ') + '.', 'is-error');
        var first = form.querySelector('.has-error input, .has-error textarea, .has-error select');
        if (first) first.focus();
        return;
      }
      var data = new FormData(form);
      var servicio = select ? select.options[select.selectedIndex].text : '';
      var body = [
        'Nombre: ' + data.get('nombre'),
        'Correo: ' + data.get('correo'),
        'Teléfono: ' + (data.get('telefono') || '—'),
        'Empresa: ' + (data.get('empresa') || '—'),
        'Servicio de interés: ' + servicio,
        '',
        data.get('mensaje')
      ].join('\n');
      var subject = 'Nuevo proyecto · ' + servicio + ' · ' + data.get('nombre');
      window.location.href = 'mailto:' + form.dataset.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      setStatus(status, 'Abrimos tu correo con el mensaje listo. Solo tienes que enviarlo.', 'is-ok');
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field, .check');
      if (field) field.classList.remove('has-error');
    });
  }

  function validate(form) {
    var errors = [];
    form.querySelectorAll('[required]').forEach(function (input) {
      var wrap = input.closest('.field, .check');
      var ok = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
      if (ok && input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (wrap) wrap.classList.toggle('has-error', !ok);
      if (!ok) errors.push(input.dataset.label || input.name);
    });
    return errors;
  }

  function setStatus(el, text, cls) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-error', 'is-ok');
    if (cls) el.classList.add(cls);
  }

  /* ---------- Suscripción (recursos) ---------- */
  function initSubscribeForms() {
    document.querySelectorAll('[data-subscribe-form]').forEach(function (form) {
      var status = form.querySelector('.form__status');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input[type="email"]');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
          setStatus(status, 'Escribe un correo válido.', 'is-error');
          email.focus();
          return;
        }
        window.location.href = 'mailto:' + form.dataset.email +
          '?subject=' + encodeURIComponent('Quiero recibir los recursos de Auryx') +
          '&body=' + encodeURIComponent('Por favor, agréguenme a la lista: ' + email.value.trim());
        setStatus(status, 'Abrimos tu correo con la solicitud lista para enviar.', 'is-ok');
      });
    });
  }

  /* ---------- Copiar enlace del artículo ---------- */
  function initCopyLink() {
    document.querySelectorAll('[data-copy-link]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var label = btn.getAttribute('aria-label');
        var done = function () {
          btn.setAttribute('aria-label', 'Enlace copiado');
          btn.setAttribute('title', 'Enlace copiado');
          setTimeout(function () { btn.setAttribute('aria-label', label); btn.removeAttribute('title'); }, 2000);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).then(done, function () {});
      });
    });
  }
})();
