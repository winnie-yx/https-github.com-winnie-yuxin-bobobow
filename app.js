const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function updateSceneScale() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );

  document.documentElement.style.setProperty(
    "--scene-scale",
    String(Math.min(scale, 1))
  );
}

updateSceneScale();
window.addEventListener("resize", updateSceneScale);

const loginCard = document.querySelector(".login-card");
const tabButtons = document.querySelectorAll(".login-tabs__button[data-mode-target]");
const loginPanels = document.querySelectorAll(".login-panel");
const primaryActionButtons = document.querySelectorAll(".action-button--primary");
const screenNodes = document.querySelectorAll(".scene[data-screen]");
const navButtons = document.querySelectorAll("[data-nav-target]");
const passwordToggles = document.querySelectorAll("[data-password-toggle]");
const registerCard = document.querySelector(".register-card");
const registerTabButtons = document.querySelectorAll(
  ".register-card__tab[data-register-mode-target]"
);
const registerPanels = document.querySelectorAll(".register-panel");
let lastLoginMode = loginCard?.dataset.mode || "password";
const genderButtons = document.querySelectorAll("[data-gender-option]");
const ageDragSurface = document.querySelector("[data-age-drag-surface]");
const ageCurrent = document.querySelector("[data-age-current]");
const ageStepButtons = document.querySelectorAll("[data-age-step]");
const petCard = document.querySelector(".pet-card");
const petButtons = document.querySelectorAll("[data-pet-option]");
const petDragSurface = document.querySelector("[data-pet-drag-surface]");
const sculptCanvases = document.querySelectorAll("[data-sculpt-canvas]");
const questCard = document.querySelector(".quest-card");
const questIntensityButtons = document.querySelectorAll("[data-quest-intensity]");
const questCharacter = document.querySelector("[data-quest-character]");
const questBubble = document.querySelector("[data-quest-bubble]");
const trainingScene = document.querySelector("[data-training-scene]");
const trainingTimerValue = document.querySelector("[data-training-timer]");
const trainingProgressTrack = document.querySelector(".training-scene__progress-track");
const trainingProgressComplete = document.querySelector("[data-training-progress-complete]");
const trainingProgressActive = document.querySelector("[data-training-progress-active]");
const trainingMonsters = Array.from(
  document.querySelectorAll(".training-scene__monster")
);
const trainingProgressMarkerCurrent = document.querySelector(
  "[data-training-progress-marker-current]"
);
const trainingProgressMarkerNext = document.querySelector(
  "[data-training-progress-marker-next]"
);
const trainingProgressMarkerCurrentImage = document.querySelector(
  "[data-training-progress-marker-current-image]"
);
const trainingProgressMarkerNextImage = document.querySelector(
  "[data-training-progress-marker-next-image]"
);
const SCREEN_TRANSITION_MS = 320;
const TRAINING_DURATION_SECONDS = 40;
const TRAINING_PAW_ACTIVE_SRC = "./assets/training-paw-active.svg";
const TRAINING_PAW_NEXT_SRC = "./assets/training-paw-next.svg";
const TRAINING_MONSTER_BREAK_DURATION_MS = 920;
let screenTransitionTimer = 0;
let questCharacterTimer = 0;
let trainingTickTimer = 0;
const trainingMonsterBreakTimers = new WeakMap();
let selectedGender = null;
let currentAge = Number(ageCurrent?.textContent || 8);
let currentPet = Number(petCard?.dataset.petIndex || 0);
let currentQuestIntensity = questCard?.dataset.intensity || "standard";
let trainingRemainingSeconds = TRAINING_DURATION_SECONDS;
let trainingBrokenMonsterCount = 0;

function setLoginMode(mode) {
  if (!loginCard) {
    return;
  }

  loginCard.dataset.mode = mode;
  lastLoginMode = mode;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.modeTarget === mode;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  loginPanels.forEach((panel) => {
    const isActive = panel.id === `panel-${mode}`;

    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
}

function setScreen(screen, options = {}) {
  const nextScreen = Array.from(screenNodes).find(
    (node) => node.dataset.screen === screen
  );

  if (!nextScreen) {
    return;
  }

  const activeScreen = document.querySelector(".scene.is-active");
  const immediate = Boolean(options.immediate);

  clearTimeout(screenTransitionTimer);

  screenNodes.forEach((node) => {
    if (node !== activeScreen && node !== nextScreen) {
      node.classList.remove("is-active", "is-entering", "is-leaving");
    }
  });

  if (immediate || !activeScreen || activeScreen === nextScreen) {
    screenNodes.forEach((node) => {
      const isTarget = node === nextScreen;
      node.classList.toggle("is-active", isTarget);
      node.classList.remove("is-entering", "is-leaving");
    });
    syncSceneRuntime(screen);
    return;
  }

  activeScreen.classList.remove("is-active");
  activeScreen.classList.add("is-leaving");

  nextScreen.classList.add("is-active", "is-entering");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextScreen.classList.remove("is-entering");
    });
  });

  syncSceneRuntime(screen);

  screenTransitionTimer = window.setTimeout(() => {
    activeScreen.classList.remove("is-leaving");
    nextScreen.classList.remove("is-entering");
  }, SCREEN_TRANSITION_MS + 60);
}

function getActiveScreen() {
  return document.querySelector(".scene.is-active")?.dataset.screen || null;
}

function setRegisterMode(mode) {
  if (!registerCard) {
    return;
  }

  registerCard.dataset.mode = mode;

  registerTabButtons.forEach((button) => {
    const isActive = button.dataset.registerModeTarget === mode;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  registerPanels.forEach((panel) => {
    const isActive = panel.id === `register-panel-${mode}`;

    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
}

function setQuestIntensity(intensity) {
  if (!questCard) {
    return;
  }

  currentQuestIntensity = intensity;
  questCard.dataset.intensity = intensity;

  questIntensityButtons.forEach((button) => {
    const isActive = button.dataset.questIntensity === intensity;
    button.setAttribute("aria-checked", String(isActive));
  });
}

function resetQuestTilt() {
  if (!questCard) {
    return;
  }

  questCard.classList.remove("is-tilting");
  questCard.style.setProperty("--quest-tilt-x", "0deg");
  questCard.style.setProperty("--quest-tilt-y", "0deg");
}

function triggerQuestCharacterAnimation() {
  if (!questCharacter || !questBubble) {
    return;
  }

  clearTimeout(questCharacterTimer);
  questCharacter.classList.remove("is-walking");
  questBubble.classList.remove("is-visible");

  void questCharacter.offsetWidth;

  questCharacter.classList.add("is-walking");
  questBubble.classList.add("is-visible");

  questCharacterTimer = window.setTimeout(() => {
    questCharacter.classList.remove("is-walking");
    questBubble.classList.remove("is-visible");
  }, 2200);
}

function formatTrainingTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getTrainingMarkerThreshold(markerNode) {
  if (!trainingProgressTrack || !markerNode) {
    return 100;
  }

  const trackStart = trainingProgressTrack.offsetLeft;
  const trackWidth = trainingProgressTrack.offsetWidth || 1;
  const markerCenter = markerNode.offsetLeft + markerNode.offsetWidth / 2;

  return ((markerCenter - trackStart) / trackWidth) * 100;
}

function breakTrainingMonster(monsterNode) {
  if (!monsterNode || monsterNode.classList.contains("is-gone")) {
    return;
  }

  window.clearTimeout(trainingMonsterBreakTimers.get(monsterNode));
  monsterNode.classList.remove("is-breaking");
  void monsterNode.offsetWidth;
  monsterNode.classList.add("is-breaking");

  const breakTimer = window.setTimeout(() => {
    monsterNode.classList.remove("is-breaking");
    monsterNode.classList.add("is-gone");
  }, TRAINING_MONSTER_BREAK_DURATION_MS);

  trainingMonsterBreakTimers.set(monsterNode, breakTimer);
}

function syncTrainingMonsters() {
  if (!trainingMonsters.length) {
    return;
  }

  const monsterBreakStep = TRAINING_DURATION_SECONDS / trainingMonsters.length;
  const targetBrokenCount = Math.min(
    trainingMonsters.length,
    Math.floor(
      (TRAINING_DURATION_SECONDS - Math.max(trainingRemainingSeconds, 0)) /
        monsterBreakStep
    )
  );

  while (trainingBrokenMonsterCount < targetBrokenCount) {
    breakTrainingMonster(trainingMonsters[trainingBrokenMonsterCount]);
    trainingBrokenMonsterCount += 1;
  }

  if (trainingRemainingSeconds <= 0) {
    while (trainingBrokenMonsterCount < trainingMonsters.length) {
      breakTrainingMonster(trainingMonsters[trainingBrokenMonsterCount]);
      trainingBrokenMonsterCount += 1;
    }
  }
}

function resetTrainingMonsters() {
  trainingBrokenMonsterCount = 0;

  trainingMonsters.forEach((monsterNode) => {
    window.clearTimeout(trainingMonsterBreakTimers.get(monsterNode));
    monsterNode.classList.remove("is-breaking", "is-gone");
  });
}

function updateTrainingScene() {
  if (!trainingScene || !trainingTimerValue || !trainingProgressComplete || !trainingProgressActive) {
    return;
  }

  const elapsed = TRAINING_DURATION_SECONDS - trainingRemainingSeconds;
  const elapsedRatio = elapsed / TRAINING_DURATION_SECONDS;
  const progressPercent = elapsedRatio * 100;
  const activePercent = progressPercent;

  trainingTimerValue.textContent = formatTrainingTime(trainingRemainingSeconds);
  trainingTimerValue.classList.remove("is-ticking");
  void trainingTimerValue.offsetWidth;
  trainingTimerValue.classList.add("is-ticking");

  trainingScene.style.setProperty(
    "--training-progress-complete",
    "0%"
  );
  trainingScene.style.setProperty(
    "--training-progress-active-left",
    "0%"
  );
  trainingScene.style.setProperty(
    "--training-progress-active-width",
    `${activePercent.toFixed(2)}%`
  );

  const currentMarkerThreshold = getTrainingMarkerThreshold(
    trainingProgressMarkerCurrent
  );
  const nextMarkerThreshold = getTrainingMarkerThreshold(trainingProgressMarkerNext);

  if (trainingProgressMarkerCurrentImage) {
    trainingProgressMarkerCurrentImage.src =
      progressPercent >= currentMarkerThreshold
        ? TRAINING_PAW_ACTIVE_SRC
        : TRAINING_PAW_NEXT_SRC;
  }

  if (trainingProgressMarkerNextImage) {
    trainingProgressMarkerNextImage.src =
      progressPercent >= nextMarkerThreshold
        ? TRAINING_PAW_ACTIVE_SRC
        : TRAINING_PAW_NEXT_SRC;
  }

  syncTrainingMonsters();
  trainingScene.classList.toggle("is-complete", trainingRemainingSeconds <= 0);
}

function stopTrainingTimer() {
  clearInterval(trainingTickTimer);
  trainingTickTimer = 0;
}

function resetTrainingScene() {
  if (!trainingScene) {
    return;
  }

  trainingRemainingSeconds = TRAINING_DURATION_SECONDS;
  trainingScene.classList.remove("is-complete");
  resetTrainingMonsters();
  updateTrainingScene();
}

function startTrainingTimer() {
  if (!trainingScene) {
    return;
  }

  stopTrainingTimer();
  updateTrainingScene();

  trainingTickTimer = window.setInterval(() => {
    if (getActiveScreen() !== "training") {
      stopTrainingTimer();
      return;
    }

    if (trainingRemainingSeconds <= 0) {
      stopTrainingTimer();
      trainingScene.classList.add("is-complete");
      return;
    }

    trainingRemainingSeconds -= 1;
    updateTrainingScene();
  }, 1000);
}

function syncSceneRuntime(screen) {
  if (screen === "training") {
    resetTrainingScene();
    startTrainingTimer();
    return;
  }

  stopTrainingTimer();
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLoginMode(button.dataset.modeTarget);
  });
});

registerTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setRegisterMode(button.dataset.registerModeTarget);
  });
});

questIntensityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setQuestIntensity(button.dataset.questIntensity || "standard");
  });
});

if (questCharacter) {
  questCharacter.addEventListener("click", triggerQuestCharacterAnimation);
  questCharacter.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    triggerQuestCharacterAnimation();
  });
}

if (questCard) {
  questCard.addEventListener("pointermove", (event) => {
    const bounds = questCard.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width;
    const offsetY = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (offsetX - 0.5) * 12;
    const rotateX = (0.5 - offsetY) * 10;

    questCard.classList.add("is-tilting");
    questCard.style.setProperty("--quest-tilt-x", `${rotateX.toFixed(2)}deg`);
    questCard.style.setProperty("--quest-tilt-y", `${rotateY.toFixed(2)}deg`);
  });

  questCard.addEventListener("pointerleave", resetQuestTilt);
  questCard.addEventListener("pointercancel", resetQuestTilt);
  questCard.addEventListener("pointerup", () => {
    window.setTimeout(resetQuestTilt, 80);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.navTarget;
    const currentScreen = getActiveScreen();

    if (target === "register") {
      setRegisterMode("face");
      setScreen("register");
      return;
    }

    if (target === "profile") {
      if (currentScreen === "register") {
        resetProfileState();
      }
      setScreen("profile");
      return;
    }

    if (target === "pet") {
      setScreen("pet");
      return;
    }

    if (target === "quest") {
      setScreen("quest");
      return;
    }

    if (target === "training") {
      setScreen("training");
      return;
    }

    if (target === "login") {
      setRegisterMode("face");
      setScreen("login");
      setLoginMode(lastLoginMode);
      return;
    }

    if (target === "register-face") {
      setRegisterMode("face");
      setScreen("register");
      return;
    }

    if (target === "register-password") {
      setRegisterMode("password");
      setScreen("register");
    }
  });
});

passwordToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const inputId = toggle.dataset.passwordTarget;
    const input = inputId ? document.getElementById(inputId) : null;

    if (!input) {
      return;
    }

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    toggle.classList.toggle("is-visible", isHidden);
    toggle.setAttribute("aria-pressed", String(isHidden));
    toggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  });
});

function updateAgeDisplay(age) {
  currentAge = age;

  if (ageCurrent) {
    ageCurrent.textContent = String(age);
  }

  const values = document.querySelectorAll("[data-age-offset]");

  values.forEach((node) => {
    const offset = Number(node.getAttribute("data-age-offset") || 0);
    const value = age + offset;
    node.textContent = value >= 6 && value <= 10 ? String(value) : "";
  });
}

function clampAge(age) {
  return Math.max(6, Math.min(10, age));
}

function clampPet(index) {
  return Math.max(0, Math.min(1, index));
}

function setPetIndex(index) {
  if (!petCard) {
    return;
  }

  currentPet = clampPet(index);
  petCard.dataset.petIndex = String(currentPet);

  petButtons.forEach((button) => {
    const isActive = Number(button.dataset.petOption) === currentPet;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setGenderSelection(gender) {
  selectedGender = gender;

  genderButtons.forEach((button) => {
    const isActive = Boolean(gender) && button.dataset.genderOption === gender;
    button.classList.toggle("is-selected", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function resetProfileState() {
  setGenderSelection(null);
}

genderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setGenderSelection(button.dataset.genderOption || null);
  });
});

ageStepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const delta = Number(button.dataset.ageStep || 0);
    updateAgeDisplay(clampAge(currentAge + delta));
  });
});

if (ageDragSurface) {
  let dragPointerId = null;
  let dragStartX = 0;
  let dragMoved = false;

  ageDragSurface.addEventListener("pointerdown", (event) => {
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragMoved = false;
    ageDragSurface.classList.add("is-dragging");
  });

  ageDragSurface.addEventListener("pointermove", (event) => {
    if (dragPointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragStartX;

    if (Math.abs(delta) < 42) {
      return;
    }

    const steps = Math.trunc(Math.abs(delta) / 42);

    if (steps < 1) {
      return;
    }

    dragMoved = true;
    const direction = delta < 0 ? 1 : -1;
    updateAgeDisplay(clampAge(currentAge + direction * steps));
    dragStartX = event.clientX;
  });

  const stopAgeDrag = () => {
    dragPointerId = null;
    dragStartX = 0;
    ageDragSurface.classList.remove("is-dragging");
  };

  ageDragSurface.addEventListener("pointerup", stopAgeDrag);
  ageDragSurface.addEventListener("pointercancel", stopAgeDrag);
  ageDragSurface.addEventListener("pointerleave", () => {
    if (!dragMoved || dragPointerId === null) {
      return;
    }

    stopAgeDrag();
  });
}

petButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPetIndex(Number(button.dataset.petOption || 0));
  });
});

if (petDragSurface) {
  let dragPointerId = null;
  let dragStartX = 0;

  const stopPetDrag = () => {
    dragPointerId = null;
    dragStartX = 0;
    petDragSurface.classList.remove("is-dragging");
  };

  petDragSurface.addEventListener("pointerdown", (event) => {
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    petDragSurface.classList.add("is-dragging");
  });

  petDragSurface.addEventListener("pointermove", (event) => {
    if (dragPointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragStartX;

    if (Math.abs(delta) < 54) {
      return;
    }

    setPetIndex(currentPet + (delta < 0 ? 1 : -1));
    dragStartX = event.clientX;
  });

  petDragSurface.addEventListener("pointerup", stopPetDrag);
  petDragSurface.addEventListener("pointercancel", stopPetDrag);
  petDragSurface.addEventListener("pointerleave", () => {
    if (dragPointerId === null) {
      return;
    }

    stopPetDrag();
  });
}

function setupSculptCanvas(canvas) {
  const context = canvas.getContext("2d");
  const sourceCanvas = document.createElement("canvas");
  const sourceContext = sourceCanvas.getContext("2d");
  const image = new Image();
  const grid = { columns: 28, rows: 30 };
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    points: [],
    pointerId: null,
    lastX: 0,
    lastY: 0,
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createPoints() {
    state.points = [];

    for (let row = 0; row <= grid.rows; row += 1) {
      for (let column = 0; column <= grid.columns; column += 1) {
        const baseX = (state.width * column) / grid.columns;
        const baseY = (state.height * row) / grid.rows;

        state.points.push({ baseX, baseY, offsetX: 0, offsetY: 0 });
      }
    }
  }

  function pointAt(column, row) {
    return state.points[row * (grid.columns + 1) + column];
  }

  function render() {
    if (!state.width || !state.height) {
      return;
    }

    context.clearRect(0, 0, state.width, state.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    function drawTriangle(sourceA, sourceB, sourceC, targetA, targetB, targetC) {
      const denominator =
        sourceA.x * (sourceB.y - sourceC.y) +
        sourceB.x * (sourceC.y - sourceA.y) +
        sourceC.x * (sourceA.y - sourceB.y);

      if (Math.abs(denominator) < 0.0001) {
        return;
      }

      const a =
        (targetA.x * (sourceB.y - sourceC.y) +
          targetB.x * (sourceC.y - sourceA.y) +
          targetC.x * (sourceA.y - sourceB.y)) /
        denominator;
      const b =
        (targetA.x * (sourceC.x - sourceB.x) +
          targetB.x * (sourceA.x - sourceC.x) +
          targetC.x * (sourceB.x - sourceA.x)) /
        denominator;
      const c =
        (targetA.x * (sourceB.x * sourceC.y - sourceC.x * sourceB.y) +
          targetB.x * (sourceC.x * sourceA.y - sourceA.x * sourceC.y) +
          targetC.x * (sourceA.x * sourceB.y - sourceB.x * sourceA.y)) /
        denominator;
      const d =
        (targetA.y * (sourceB.y - sourceC.y) +
          targetB.y * (sourceC.y - sourceA.y) +
          targetC.y * (sourceA.y - sourceB.y)) /
        denominator;
      const e =
        (targetA.y * (sourceC.x - sourceB.x) +
          targetB.y * (sourceA.x - sourceC.x) +
          targetC.y * (sourceB.x - sourceA.x)) /
        denominator;
      const f =
        (targetA.y * (sourceB.x * sourceC.y - sourceC.x * sourceB.y) +
          targetB.y * (sourceC.x * sourceA.y - sourceA.x * sourceC.y) +
          targetC.y * (sourceA.x * sourceB.y - sourceB.x * sourceA.y)) /
        denominator;

      context.save();
      context.beginPath();
      context.moveTo(targetA.x, targetA.y);
      context.lineTo(targetB.x, targetB.y);
      context.lineTo(targetC.x, targetC.y);
      context.closePath();
      context.clip();
      context.transform(a, d, b, e, c, f);
      context.drawImage(sourceCanvas, 0, 0);
      context.restore();
    }

    function sourcePoint(point) {
      return { x: point.baseX, y: point.baseY };
    }

    function targetPoint(point) {
      return {
        x: point.baseX + point.offsetX,
        y: point.baseY + point.offsetY,
      };
    }

    for (let row = 0; row < grid.rows; row += 1) {
      for (let column = 0; column < grid.columns; column += 1) {
        const topLeft = pointAt(column, row);
        const topRight = pointAt(column + 1, row);
        const bottomLeft = pointAt(column, row + 1);
        const bottomRight = pointAt(column + 1, row + 1);

        drawTriangle(
          sourcePoint(topLeft),
          sourcePoint(topRight),
          sourcePoint(bottomLeft),
          targetPoint(topLeft),
          targetPoint(topRight),
          targetPoint(bottomLeft)
        );
        drawTriangle(
          sourcePoint(topRight),
          sourcePoint(bottomRight),
          sourcePoint(bottomLeft),
          targetPoint(topRight),
          targetPoint(bottomRight),
          targetPoint(bottomLeft)
        );
      }
    }
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * dpr));
    const height = Math.max(1, Math.round(bounds.height * dpr));

    if (state.width === width && state.height === height && state.dpr === dpr) {
      render();
      return;
    }

    state.width = width;
    state.height = height;
    state.dpr = dpr;
    canvas.width = width;
    canvas.height = height;
    sourceCanvas.width = width;
    sourceCanvas.height = height;
    sourceContext.clearRect(0, 0, width, height);
    sourceContext.imageSmoothingEnabled = true;
    sourceContext.imageSmoothingQuality = "high";
    sourceContext.drawImage(image, 0, 0, width, height);
    createPoints();
    render();
  }

  function localPoint(event) {
    const bounds = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - bounds.left) * state.dpr,
      y: (event.clientY - bounds.top) * state.dpr,
    };
  }

  function sculptAt(x, y, deltaX, deltaY) {
    const radius = 82 * state.dpr;
    const maxPull = 42 * state.dpr;

    state.points.forEach((point) => {
      const distance = Math.hypot(point.baseX - x, point.baseY - y);

      if (distance > radius) {
        return;
      }

      const influence = (1 - distance / radius) ** 2;
      point.offsetX = clamp(point.offsetX + deltaX * influence * 0.72, -maxPull, maxPull);
      point.offsetY = clamp(point.offsetY + deltaY * influence * 0.72, -maxPull, maxPull);
    });

    render();
  }

  function resetShape() {
    state.points.forEach((point) => {
      point.offsetX = 0;
      point.offsetY = 0;
    });

    render();
  }

  image.addEventListener("load", resizeCanvas, { once: true });
  image.src = canvas.dataset.sculptSrc || "";

  canvas.addEventListener("pointerdown", (event) => {
    if (!image.complete) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    resizeCanvas();

    const point = localPoint(event);
    state.pointerId = event.pointerId;
    state.lastX = point.x;
    state.lastY = point.y;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-sculpting");
  });

  canvas.addEventListener("pointermove", (event) => {
    if (state.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const point = localPoint(event);
    sculptAt(point.x, point.y, point.x - state.lastX, point.y - state.lastY);
    state.lastX = point.x;
    state.lastY = point.y;
  });

  const stopSculpting = (event) => {
    if (state.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    state.pointerId = null;
    canvas.classList.remove("is-sculpting");
  };

  canvas.addEventListener("pointerup", stopSculpting);
  canvas.addEventListener("pointercancel", stopSculpting);
  canvas.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  canvas.addEventListener("dblclick", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetShape();
  });
  window.addEventListener("resize", resizeCanvas);
}

sculptCanvases.forEach(setupSculptCanvas);

primaryActionButtons.forEach((button) => {
  button.addEventListener("pointerenter", () => {
    button.classList.add("is-armed");
  });

  button.addEventListener("pointerleave", () => {
    button.classList.remove("is-armed");
    button.style.setProperty("--pointer-x", "50%");
    button.style.setProperty("--pointer-y", "50%");
  });

  button.addEventListener("pointermove", (event) => {
    const bounds = button.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    button.style.setProperty("--pointer-x", `${x}%`);
    button.style.setProperty("--pointer-y", `${y}%`);
  });
});

setLoginMode(loginCard?.dataset.mode || "password");
setRegisterMode(registerCard?.dataset.mode || "face");
setQuestIntensity(currentQuestIntensity);
resetProfileState();
setPetIndex(currentPet);
updateAgeDisplay(currentAge);
setScreen("login", { immediate: true });
