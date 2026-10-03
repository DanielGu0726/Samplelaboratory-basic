// DentWide 치과기공소 — Basic plan sample
(function () {
  'use strict';

  /* Mobile navigation */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    var label = menuBtn.querySelector('.sr');
    var setOpen = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (label) label.textContent = open ? '메뉴 닫기' : '메뉴 열기';
    };
    menuBtn.addEventListener('click', function () {
      setOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
    });
  }

  /* Shade guide readout (home) */
  var tabs = document.querySelectorAll('.guide .tab');
  var codeEl = document.getElementById('readout-code');
  var noteEl = document.getElementById('readout-note');
  if (tabs.length && codeEl) {
    var groups = { A: 'A 계열, 적갈색 기조', B: 'B 계열, 적황색 기조', C: 'C 계열, 회색 기조', D: 'D 계열, 적회색 기조' };
    var current = document.querySelector('.guide .tab.is-active');
    var show = function (tab) {
      codeEl.textContent = tab.dataset.code;
      noteEl.textContent = groups[tab.dataset.group];
    };
    var activate = function (tab) {
      if (current) current.classList.remove('is-active');
      current = tab;
      tab.classList.add('is-active');
      show(tab);
    };
    tabs.forEach(function (tab) {
      tab.setAttribute('aria-label', '쉐이드 ' + tab.dataset.code + ', ' + groups[tab.dataset.group]);
      tab.addEventListener('mouseenter', function () { activate(tab); });
      tab.addEventListener('focus', function () { activate(tab); });
      tab.addEventListener('click', function () { activate(tab); });
    });
  }

  /* Gallery filter + lightbox */
  var sheet = document.getElementById('sheet');
  if (sheet) {
    var filters = document.querySelectorAll('.filter');
    var cases = sheet.querySelectorAll('.case');
    var count = document.getElementById('case-count');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.dataset.filter, n = 0;
        filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        cases.forEach(function (c) {
          var on = f === 'all' || c.dataset.cat === f;
          c.hidden = !on;
          if (on) n++;
        });
        count.textContent = (f === 'all' ? '' : btn.textContent + ' ') + n + '건';
      });
    });

    var lb = document.getElementById('lightbox');
    var opener = null;
    var $ = function (id) { return document.getElementById(id); };
    sheet.addEventListener('click', function (e) {
      var b = e.target.closest('.case-btn');
      if (!b || !lb.showModal) return;
      opener = b;
      var d = b.dataset;
      $('lb-field').style.setProperty('--shade', b.style.getPropertyValue('--shade'));
      $('lb-tooth').textContent = d.tooth;
      $('lb-code').textContent = d.code;
      $('lb-use').setAttribute('href', '#sym-' + d.sym);
      $('lb-title').textContent = b.querySelector('.case-title').textContent;
      $('lb-d-tooth').textContent = d.tooth;
      $('lb-d-cat').textContent = d.catLabel;
      $('lb-d-mat').textContent = d.material;
      $('lb-d-code').textContent = d.code;
      $('lb-d-memo').textContent = d.memo;
      lb.showModal();
      $('lb-close').focus();
    });
    $('lb-close').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
  }
})();
