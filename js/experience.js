/**
 * experience.js
 * Stage orchestration, chapter content, and 2D UI wiring.
 * Edit the CHAPTERS object below to update content.
 */

// ════════════════════════════════════════════════════════════
//  CHAPTER CONTENT — edit this object with the real FCV data
// ════════════════════════════════════════════════════════════
const CHAPTERS = {

  0: {
    title: 'Momentos Históricos',
    color: '#c62828',
    type: 'timeline',
    items: [
      {
        year: '1986',
        title: 'Fundación de la FCV',
        desc: 'Nació la Fundación Cardiovascular de Colombia con el sueño de salvar corazones y transformar vidas.'
      },
      {
        year: '1992',
        title: 'Primer trasplante cardíaco',
        desc: 'Realizamos el primer trasplante de corazón exitoso en la región Caribe, marcando un hito histórico.'
      },
      {
        year: '2000',
        title: 'Expansión regional',
        desc: 'Abrimos nuevas sedes para acercar la cardiología de alta complejidad a más colombianos.'
      },
      {
        year: '2010',
        title: 'Premio Nacional de Calidad',
        desc: 'Reconocidos como la institución de salud más innovadora del país en atención cardiovascular.'
      },
      {
        year: '2018',
        title: 'Centro de Investigación',
        desc: 'Inauguramos nuestro laboratorio de investigación clínica con alianzas internacionales.'
      },
      {
        year: '2024',
        title: '38 años salvando vidas',
        desc: 'Más de 500.000 pacientes atendidos. La FCV sigue siendo sinónimo de excelencia y amor por la vida.'
      }
    ]
  },

  1: {
    title: 'Nuestros Valores',
    color: '#1b5e20',
    type: 'values',
    items: [
      {
        icon: '❤️',
        name: 'Humanización',
        desc: 'El paciente y su familia son el centro de cada decisión que tomamos.'
      },
      {
        icon: '🔬',
        name: 'Innovación',
        desc: 'Buscamos la tecnología más avanzada para salvar más vidas.'
      },
      {
        icon: '🤝',
        name: 'Compromiso',
        desc: 'Respondemos con responsabilidad ante cada reto clínico y humano.'
      },
      {
        icon: '⭐',
        name: 'Excelencia',
        desc: 'Estándares de calidad que superan expectativas en todo momento.'
      },
      {
        icon: '🌱',
        name: 'Sostenibilidad',
        desc: 'Cuidamos el planeta que cuida a nuestros pacientes y familias.'
      },
      {
        icon: '🧠',
        name: 'Aprendizaje',
        desc: 'Formamos los mejores especialistas cardiovasculares de Colombia.'
      }
    ]
  },

  2: {
    title: 'Nuestro Futuro',
    color: '#e65100',
    type: 'future',
    items: [
      {
        num: '01',
        title: 'Centro de Innovación 2025',
        desc: 'Inauguramos nuestro nuevo campus de investigación cardiovascular, un espacio donde la ciencia y la compasión convergen para crear los tratamientos del mañana.'
      },
      {
        num: '02',
        title: 'FCV 2030: Referente Latinoamericano',
        desc: 'Nuestra visión es convertirnos en el centro cardiovascular de referencia de Latinoamérica, llevando excelencia médica a 10 países de la región.'
      },
      {
        num: '03',
        title: 'Tu rol es el corazón de todo',
        desc: 'Cada colaborador es parte esencial de esta visión. Juntos escribimos el futuro de la salud cardiovascular en Colombia. Gracias por ser parte de esta historia.'
      }
    ],
    cta: {
      text: 'Ver agenda del evento →',
      url: '#'  // Reemplaza con la URL real del evento
    }
  }

};

// ════════════════════════════════════════════════════════════
//  CHAPTER PANEL RENDERER
// ════════════════════════════════════════════════════════════

function renderTimeline(data) {
  const items = data.items.map(function (item) {
    return '<div class="timeline-item">' +
      '<div class="timeline-dot"></div>' +
      '<div class="timeline-year">' + item.year + '</div>' +
      '<div class="timeline-event">' + item.title + '</div>' +
      '<div class="timeline-desc">' + item.desc + '</div>' +
      '</div>';
  }).join('');
  return '<div class="timeline">' + items + '</div>';
}

function renderValues(data) {
  const cards = data.items.map(function (item) {
    return '<div class="value-card">' +
      '<div class="value-icon">' + item.icon + '</div>' +
      '<div class="value-name">' + item.name + '</div>' +
      '<div class="value-desc">' + item.desc + '</div>' +
      '</div>';
  }).join('');
  return '<div class="values-grid">' + cards + '</div>';
}

function renderFuture(data) {
  const items = data.items.map(function (item) {
    return '<div class="future-item">' +
      '<div class="future-num">' + item.num + '</div>' +
      '<div class="future-title">' + item.title + '</div>' +
      '<div class="future-desc">' + item.desc + '</div>' +
      '</div>';
  }).join('');
  const cta = data.cta
    ? '<a class="cta-button" href="' + data.cta.url + '" target="_blank" rel="noopener">' + data.cta.text + '</a>'
    : '';
  return items + cta;
}

function renderChapterBody(data) {
  if (data.type === 'timeline') return renderTimeline(data);
  if (data.type === 'values')   return renderValues(data);
  if (data.type === 'future')   return renderFuture(data);
  return '';
}

// ════════════════════════════════════════════════════════════
//  PUBLIC API
// ════════════════════════════════════════════════════════════

window.openChapter = function (index) {
  const data = CHAPTERS[index];
  if (!data) return;

  const detail  = document.getElementById('ui-chapter-detail');
  const titleEl = document.getElementById('chapter-title');
  const bodyEl  = document.getElementById('chapter-body');

  titleEl.textContent = data.title;
  titleEl.style.color = data.color;
  bodyEl.innerHTML = renderChapterBody(data);
  detail.classList.add('visible');

  // Scroll body to top
  bodyEl.scrollTop = 0;
};

function closeChapter() {
  const detail = document.getElementById('ui-chapter-detail');
  detail.classList.remove('visible');
}

// ════════════════════════════════════════════════════════════
//  CONFETTI + BIENVENIDA
// ════════════════════════════════════════════════════════════

window.triggerWelcomeConfetti = function () {
  var FCV_COLORS = ['#c62828', '#ffd700', '#1a237e', '#ffffff', '#e53935'];

  // Mostrar tarjeta de bienvenida
  var welcomeEl = document.getElementById('ui-welcome');
  if (welcomeEl) {
    welcomeEl.classList.add('visible');
    setTimeout(function () { welcomeEl.classList.remove('visible'); }, 4000);
  }

  // Confetti si la librería está disponible
  if (typeof confetti === 'undefined') return;

  // Lluvia central
  confetti({
    particleCount: 160,
    spread: 80,
    origin: { x: 0.5, y: 0.45 },
    colors: FCV_COLORS,
    scalar: 1.1
  });

  // Cañones laterales con retraso
  setTimeout(function () {
    confetti({
      particleCount: 90,
      angle: 55,
      spread: 60,
      origin: { x: 0, y: 0.65 },
      colors: FCV_COLORS
    });
    confetti({
      particleCount: 90,
      angle: 125,
      spread: 60,
      origin: { x: 1, y: 0.65 },
      colors: FCV_COLORS
    });
  }, 350);

  // Última lluvia suave
  setTimeout(function () {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.3 },
      colors: FCV_COLORS,
      gravity: 0.6,
      scalar: 0.8
    });
  }, 750);
};

// ════════════════════════════════════════════════════════════
//  DEMO MODE DESDE LOADING SCREEN
// ════════════════════════════════════════════════════════════

// Muestra el botón de demo en la pantalla de carga si MindAR
// tarda más de 18 segundos en inicializar.
var loadingDemoTimer = setTimeout(function () {
  var btn  = document.getElementById('demo-loading-btn');
  var hint = document.getElementById('demo-loading-hint');
  if (btn)  btn.style.display  = 'block';
  if (hint) hint.style.display = 'block';
}, 18000);

window.activateDemoFromLoading = function () {
  clearTimeout(loadingDemoTimer);

  // Ocultar loading screen manualmente
  var loadingEl = document.getElementById('ui-loading');
  if (loadingEl) loadingEl.style.display = 'none';

  // Ocultar demo button superior
  var demoUI = document.getElementById('ui-demo');
  if (demoUI) demoUI.style.display = 'none';

  // Disparar la secuencia de etapas
  var targetRoot = document.getElementById('target-root');
  if (targetRoot) {
    targetRoot.emit('targetFound');
  }
};

// ════════════════════════════════════════════════════════════
//  DOM WIRING
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // 2D chapter buttons in the bottom bar
  document.querySelectorAll('.chapter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.openChapter(parseInt(btn.dataset.chapter, 10));
    });
  });

  // Close button inside the chapter panel
  const closeBtn = document.getElementById('chapter-close');
  if (closeBtn) closeBtn.addEventListener('click', closeChapter);

  // Backdrop tap closes the panel
  const backdrop = document.querySelector('.chapter-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeChapter);

  // Demo mode button — simulates targetFound without the physical card
  const demoBtn = document.getElementById('demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', function () {
      demoBtn.parentElement.style.display = 'none';
      const targetRoot = document.getElementById('target-root');
      if (targetRoot) {
        targetRoot.emit('targetFound');
      }
    });
  }

});
