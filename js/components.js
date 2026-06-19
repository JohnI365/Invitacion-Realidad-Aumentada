/**
 * stage-controller
 * Attached to the MindAR image target root entity.
 * Manages the 3-stage AR experience sequence triggered by targetFound.
 */
AFRAME.registerComponent('stage-controller', {
  init: function () {
    const self = this;
    const el = this.el;
    let stage = 0;
    let timers = [];

    function getEl(id) { return document.getElementById(id); }

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    function addTimer(fn, delay) {
      timers.push(setTimeout(fn, delay));
    }

    // ── Stage 1: Building emerges ──────────────────────────
    function runStage1() {
      stage = 1;
      const scanningUI = getEl('ui-scanning');
      if (scanningUI) scanningUI.style.display = 'none';

      const building = getEl('building');
      building.setAttribute('visible', 'true');

      // Rise from below
      building.setAttribute('animation__rise', {
        property: 'position',
        from: '0 -0.3 0',
        to: '0 0 0',
        dur: 1400,
        easing: 'easeOutQuart'
      });
      // Scale up with elastic bounce
      building.setAttribute('animation__emerge', {
        property: 'scale',
        from: '0 0 0',
        to: '1 1 1',
        dur: 1800,
        easing: 'easeOutElastic'
      });

      addTimer(runStage2, 2400);
    }

    // ── Stage 2: Avatar appears ────────────────────────────
    function runStage2() {
      stage = 2;
      const avatar = getEl('avatar');
      avatar.setAttribute('visible', 'true');
      avatar.setAttribute('animation__appear', {
        property: 'scale',
        from: '0 0 0',
        to: '1 1 1',
        dur: 700,
        easing: 'easeOutBack'
      });

      // Start cycling speech bubble text
      window.startSpeechCycle();

      // Confetti + mensaje de bienvenida
      if (typeof window.triggerWelcomeConfetti === 'function') {
        window.triggerWelcomeConfetti();
      }

      addTimer(runStage3, 2200);
    }

    // ── Stage 3: Chapter orbs appear ──────────────────────
    function runStage3() {
      stage = 3;
      const orbsRoot = getEl('chapter-orbs');
      orbsRoot.setAttribute('visible', 'true');

      // Stagger each orb
      const orbs = orbsRoot.querySelectorAll('.chapter-orb');
      orbs.forEach(function (orb, i) {
        addTimer(function () {
          orb.setAttribute('visible', 'true');
          orb.setAttribute('animation__pop', {
            property: 'scale',
            from: '0 0 0',
            to: '1 1 1',
            dur: 500,
            easing: 'easeOutBack'
          });
        }, i * 280);
      });

      // Show 2D chapter buttons bar
      addTimer(function () {
        const chaptersUI = getEl('ui-chapters');
        if (chaptersUI) chaptersUI.classList.add('visible');
      }, orbs.length * 280 + 200);
    }

    // ── Event listeners ────────────────────────────────────
    el.addEventListener('targetFound', function () {
      if (stage === 0) {
        runStage1();
      }
    });

    el.addEventListener('targetLost', function () {
      // Intentionally left empty — freeze current state, do not reset.
      // The experience continues as the user moves the card.
    });

    // Expose for demo mode
    window.triggerARExperience = function () {
      if (stage === 0) runStage1();
    };
  }
});


/**
 * pulse-glow
 * Adds a continuous breathing scale animation to an entity.
 */
AFRAME.registerComponent('pulse-glow', {
  init: function () {
    this.el.setAttribute('animation__pulse', {
      property: 'scale',
      from: '0.93 0.93 0.93',
      to: '1.07 1.07 1.07',
      dur: 1300,
      dir: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }
});


/**
 * chapter-orb
 * Handles tap/click events on the 3D chapter orbs.
 * Opens the corresponding 2D chapter detail panel.
 */
AFRAME.registerComponent('chapter-orb', {
  init: function () {
    const el = this.el;
    let isAnimating = false;

    el.addEventListener('click', function () {
      if (isAnimating) return;
      isAnimating = true;

      const chapterIndex = parseInt(el.dataset.chapter || el.getAttribute('data-chapter'), 10);

      // Pop animation feedback
      el.setAttribute('animation__tap', {
        property: 'scale',
        from: '1 1 1',
        to: '1.35 1.35 1.35',
        dur: 140,
        easing: 'easeOutQuad'
      });
      setTimeout(function () {
        el.setAttribute('animation__tap', {
          property: 'scale',
          from: '1.35 1.35 1.35',
          to: '1 1 1',
          dur: 140,
          easing: 'easeInQuad'
        });
        isAnimating = false;
      }, 140);

      // Open 2D panel
      if (typeof window.openChapter === 'function') {
        window.openChapter(chapterIndex);
      }
    });
  }
});


// ─── Speech Bubble Cycle ───────────────────────────────────
// Cycles through welcome phrases on the avatar's speech bubble.
const SPEECHES = [
  '¡Bienvenido/a a la FCV!',
  'Explora nuestra historia',
  'Toca los capitulos'
];
let speechIdx = 0;
let speechTimer = null;

window.startSpeechCycle = function () {
  const textEl = document.getElementById('speech-text');
  if (!textEl) return;
  textEl.setAttribute('value', SPEECHES[0]);

  speechTimer = setInterval(function () {
    speechIdx = (speechIdx + 1) % SPEECHES.length;
    if (textEl) textEl.setAttribute('value', SPEECHES[speechIdx]);
  }, 3200);
};
