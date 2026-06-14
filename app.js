// Keep the scene scaled proportionally to the original mockup size.
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
const sideTabButtons = Array.from(document.querySelectorAll(".quest-side-tab__item"));
const questCard = document.querySelector(".quest-card");
const questIntensityButtons = document.querySelectorAll("[data-quest-intensity]");
const questCharacter = document.querySelector("[data-quest-character]");
const questBubble = document.querySelector("[data-quest-bubble]");
const clothesScene = document.querySelector("[data-clothes-scene]");
const clothesAvatar = document.querySelector("[data-clothes-avatar]");
const clothesTabButtons = Array.from(document.querySelectorAll("[data-clothes-tab]"));
const clothesPanels = Array.from(document.querySelectorAll("[data-clothes-panel]"));
const clothesItemButtons = Array.from(document.querySelectorAll("[data-clothes-item]"));
const clothesAvatarBody = document.querySelector(".clothes-avatar__body");
const clothesPreviewHeadwear = document.querySelector("[data-clothes-preview-headwear]");
const clothesPreviewOutfit = document.querySelector("[data-clothes-preview-outfit]");
const movementOptionButtons = Array.from(
  document.querySelectorAll("[data-movement-option]")
);
const sideTabNodes = Array.from(document.querySelectorAll("[data-side-tab]"));
const sideTabEdges = Array.from(document.querySelectorAll("[data-side-tab-edge]"));
const circlePostTriggers = Array.from(
  document.querySelectorAll("[data-circle-post-trigger]")
);
const circleChatTriggers = Array.from(
  document.querySelectorAll("[data-circle-chat-trigger]")
);
const circleCheerButtons = Array.from(document.querySelectorAll("[data-circle-cheer]"));
const circlePostBackButtons = Array.from(
  document.querySelectorAll("[data-circle-post-back]")
);
const circleChatBackButtons = Array.from(
  document.querySelectorAll("[data-circle-chat-back]")
);
const circlePostDetailTitle = document.querySelector("[data-circle-post-detail-title]");
const circlePostDetailCaption = document.querySelector(
  "[data-circle-post-detail-caption]"
);
const circlePostDetailAvatar = document.querySelector(
  "[data-circle-post-detail-avatar]"
);
const circlePostDetailImage = document.querySelector(
  "[data-circle-post-detail-image]"
);
const circlePostDropzone = document.querySelector("[data-circle-post-dropzone]");
const circlePostStickersLayer = document.querySelector(
  "[data-circle-post-stickers-layer]"
);
const circlePostStickerButtons = Array.from(
  document.querySelectorAll("[data-circle-sticker]")
);
const circleCheerTimers = new WeakMap();
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
const trainingCameraLayer = document.querySelector("[data-training-camera-layer]");
const trainingPoseVideo = document.querySelector("[data-training-pose-video]");
const trainingPoseCanvas = document.querySelector("[data-training-pose-canvas]");
const trainingFeedbackNode = document.querySelector("[data-training-feedback]");
const trainingHintNode = document.querySelector("[data-training-hint]");
const trainingCameraStatus = document.querySelector("[data-training-camera-status]");
const trainingPassMeter = document.querySelector("[data-training-pass-meter]");
const trainingCameraAction = document.querySelector("[data-training-camera-action]");
const rewardingConfetti = document.querySelector("[data-rewarding-confetti]");
const reportSyncButton = document.querySelector("[data-report-sync]");
const reportSyncLabel = document.querySelector("[data-report-sync-label]");
const reportSyncToast = document.querySelector("[data-report-sync-toast]");
const SCREEN_TRANSITION_MS = 320;
const QUEST_SIDE_TAB_WIDTH = 136;
const QUEST_SIDE_TAB_OPEN_THRESHOLD = 68;
const TRAINING_DURATION_SECONDS = 40;
const TRAINING_PAW_ACTIVE_SRC = "./assets/training-paw-active.svg";
const TRAINING_PAW_NEXT_SRC = "./assets/training-paw-next.svg";
const TRAINING_MONSTER_BREAK_DURATION_MS = 920;
const TRAINING_POSE_PASS_SECONDS = 5;
const TRAINING_POSE_FRAME_WIDTH = 640;
const TRAINING_POSE_FRAME_HEIGHT = 440;
const TRAINING_POSE_CONFIDENCE_THRESHOLD = 0.58;
const TRAINING_POSE_FRONT_KNEE_MAX_DEGREES = 128;
const TRAINING_POSE_FRONT_KNEE_MIN_DEGREES = 65;
const TRAINING_POSE_FRONT_KNEE_OFFSET_LIMIT = 0.12;
const TRAINING_POSE_ARM_LEVEL_TOLERANCE = 0.12;
const TRAINING_POSE_ARM_STRAIGHT_MIN_DEGREES = 154;
const TRAINING_POSE_TORSO_TILT_LIMIT = 0.07;
const TRAINING_POSE_VALID_STREAK_FRAMES = 4;
const TRAINING_POSE_ISSUE_STREAK_FRAMES = 5;
const TRAINING_POSE_SKELETON_CONNECTIONS = [
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [11, 12],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [24, 26],
  [26, 28],
];
const TRAINING_POSE_LANDMARKS = {
  nose: 0,
  leftShoulder: 11,
  rightShoulder: 12,
  leftElbow: 13,
  rightElbow: 14,
  leftWrist: 15,
  rightWrist: 16,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
  leftAnkle: 27,
  rightAnkle: 28,
};
const TRAINING_POSE_ISSUE_PRIORITY = [
  "no_person_detected",
  "bend_front_knee",
  "raise_arms_level",
  "straighten_arms",
  "keep_torso_upright",
];
const TRAINING_FEEDBACK_MESSAGES = {
  camera_permission_prompt: "Enable your camera and I will check your warrior pose.",
  camera_loading: "Camera is getting ready. Step into the tracking frame.",
  camera_permission_denied: "Camera permission was denied. Allow access so I can coach your pose.",
  camera_not_found: "No camera was found. Try another device or check your camera settings.",
  camera_browser_unsupported: "This browser environment cannot open the camera. Try a system browser instead.",
  camera_secure_context_required: "This page cannot access the camera in the current environment. Open it in a secure browser page.",
  pose_library_unavailable: "The pose tracking module did not load. Refresh with a network connection and try again.",
  no_person_detected: "Step into the frame so I can see your full skeleton.",
  bend_front_knee: "Bend your front knee a little more.",
  raise_arms_level: "Raise both arms until they are level.",
  straighten_arms: "Straighten both arms like a warrior.",
  keep_torso_upright: "Keep your torso upright. Do not lean forward or back.",
  great_job_hold_it: "Great job. Keep holding that warrior pose.",
  pose_passed: "Amazing. Your warrior pose looks correct now!",
  time_up_try_again: "Time is up. Let's try again and make it steadier.",
};
const TRAINING_STATUS_MESSAGES = {
  idle: "Skeleton tracking will appear here during training.",
  requesting_permission: "Requesting camera permission...",
  loading: "Starting warrior pose tracking...",
  tracking: "Tracking: keep your full body inside the frame.",
  no_person: "No full body detected yet.",
  passed: "Pose approved. Nice hold.",
  timeout: "Training finished. You can try again.",
  error: "Camera unavailable. Tap the button above and check browser permissions.",
};
const TRAINING_ERROR_STATUS_MESSAGES = {
  camera_permission_denied: "Permission denied: please allow this page to use the camera.",
  camera_not_found: "No available camera was detected.",
  camera_browser_unsupported: "This browser environment does not support getUserMedia.",
  camera_secure_context_required: "This page is not running in a camera-safe secure context.",
  pose_library_unavailable: "The pose tracking script did not load successfully.",
};
const TRAINING_HINT_VISIBLE_MESSAGE_KEYS = new Set([
  "no_person_detected",
  "bend_front_knee",
  "raise_arms_level",
  "straighten_arms",
  "keep_torso_upright",
  "time_up_try_again",
]);
let screenTransitionTimer = 0;
let questCharacterTimer = 0;
let trainingTickTimer = 0;
let rewardingTransitionTimer = 0;
const trainingMonsterBreakTimers = new WeakMap();
let selectedGender = null;
let currentAge = Number(ageCurrent?.textContent || 8);
let currentPet = Number(petCard?.dataset.petIndex || 0);
let currentQuestIntensity = questCard?.dataset.intensity || "standard";
let currentClothesTab = clothesScene?.dataset.mode || "clothes";
let currentMovement = clothesAvatar?.dataset.movement || "idle";
let currentCircleSticker =
  circlePostStickerButtons.find((button) => button.classList.contains("is-active")) ||
  null;
let circleStickerDrag = null;
const clothesSelection = {
  headwear: null,
  outfit: null,
};
const sideTabStates = new Map(
  sideTabNodes.map((node) => [
    node.dataset.sideTabScreen || "",
    {
      screen: node.dataset.sideTabScreen || "",
      node,
      edge:
        sideTabEdges.find(
          (edge) => edge.dataset.sideTabScreen === node.dataset.sideTabScreen
        ) || null,
      isOpen: false,
      pointerId: null,
      startX: 0,
      startReveal: 0,
      reveal: 0,
    },
  ])
);
let trainingRemainingSeconds = TRAINING_DURATION_SECONDS;
let trainingBrokenMonsterCount = 0;
let trainingPoseRuntime = createTrainingPoseRuntime();
let reportSyncTimer = 0;

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
    if (screen === "rewarding") {
      triggerRewardingConfettiBurst();
    }
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
  if (screen === "rewarding") {
    window.setTimeout(triggerRewardingConfettiBurst, 180);
  }

  screenTransitionTimer = window.setTimeout(() => {
    activeScreen.classList.remove("is-leaving");
    nextScreen.classList.remove("is-entering");
  }, SCREEN_TRANSITION_MS + 60);
}

function getActiveScreen() {
  return document.querySelector(".scene.is-active")?.dataset.screen || null;
}

function getInitialScreen() {
  const params = new URLSearchParams(window.location.search);
  const requestedScreen = params.get("screen");
  const versionHint = params.get("v") || "";
  const availableScreens = new Set(
    Array.from(screenNodes).map((node) => node.dataset.screen)
  );

  if (availableScreens.has(requestedScreen)) {
    return requestedScreen;
  }

  if (versionHint.startsWith("circle-post")) {
    return "circle-post";
  }

  if (versionHint.startsWith("circle-chat")) {
    return "circle-chat";
  }

  if (versionHint.startsWith("clothes")) {
    return "clothes";
  }

  return "login";
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

function setClothesTab(mode) {
  if (!clothesScene) {
    return;
  }

  currentClothesTab = mode;
  clothesScene.dataset.mode = mode;

  clothesTabButtons.forEach((button) => {
    const isActive = button.dataset.clothesTab === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  clothesPanels.forEach((panel) => {
    const isActive = panel.dataset.clothesPanel === mode;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function renderClothesSelection() {
  const selectedHeadwear = clothesSelection.headwear;
  const selectedOutfit = clothesSelection.outfit;
  const hasHeadwear = Boolean(selectedHeadwear);
  const hasOutfit = Boolean(selectedOutfit);
  const selectedHeadwearButton = clothesItemButtons.find(
    (button) => button.dataset.clothesId === selectedHeadwear
  );
  const selectedOutfitButton = clothesItemButtons.find(
    (button) => button.dataset.clothesId === selectedOutfit
  );
  const selectedHeadwearBodySrc = selectedHeadwearButton?.dataset.bodySrc || "";

  clothesItemButtons.forEach((button) => {
    const slot = button.dataset.clothesSlot;
    const id = button.dataset.clothesId;
    const isSelected = clothesSelection[slot] === id;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (clothesAvatar) {
    clothesAvatar.dataset.headwearSelected = String(hasHeadwear);
    clothesAvatar.dataset.outfitSelected = String(hasOutfit);
  }

  if (clothesAvatarBody) {
    const defaultBodySrc =
      clothesAvatarBody.dataset.clothesBodyDefaultSrc || "./assets/clothes-ip-base.png";
    clothesAvatarBody.src = selectedHeadwearBodySrc || defaultBodySrc;
  }

  if (clothesPreviewHeadwear) {
    if (selectedHeadwear && !selectedHeadwearBodySrc) {
      clothesPreviewHeadwear.src = selectedHeadwearButton?.dataset.previewSrc || "";
      clothesPreviewHeadwear.alt = selectedHeadwearButton?.dataset.itemName || "Selected headwear";
      clothesPreviewHeadwear.parentElement?.classList.add("is-visible");
    } else {
      clothesPreviewHeadwear.src = "";
      clothesPreviewHeadwear.alt = "";
      clothesPreviewHeadwear.parentElement?.classList.remove("is-visible");
    }
  }

  if (clothesPreviewOutfit) {
    if (selectedOutfit) {
      clothesPreviewOutfit.src = selectedOutfitButton?.dataset.previewSrc || "";
      clothesPreviewOutfit.alt = selectedOutfitButton?.dataset.itemName || "Selected outfit";
      clothesPreviewOutfit.parentElement?.classList.add("is-visible");
    } else {
      clothesPreviewOutfit.src = "";
      clothesPreviewOutfit.alt = "";
      clothesPreviewOutfit.parentElement?.classList.remove("is-visible");
    }
  }
}

function setClothesItem(button) {
  const slot = button?.dataset.clothesSlot;
  const id = button?.dataset.clothesId;

  if (!slot || !id) {
    return;
  }

  clothesSelection[slot] = id;
  renderClothesSelection();
}

function setMovement(value) {
  currentMovement = value;

  if (clothesAvatar) {
    clothesAvatar.dataset.movement = value;
  }

  movementOptionButtons.forEach((button) => {
    const isActive = button.dataset.movementOption === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function clampQuestSideTabReveal(value) {
  return Math.max(0, Math.min(QUEST_SIDE_TAB_WIDTH, value));
}

function getSideTabState(screen) {
  return sideTabStates.get(screen) || null;
}

function applySideTabReveal(screen, reveal) {
  const state = getSideTabState(screen);

  if (!state) {
    return;
  }

  state.reveal = clampQuestSideTabReveal(reveal);
  state.node.style.setProperty(
    "--quest-side-tab-reveal",
    `${state.reveal}px`
  );
}

function setSideTabOpen(screen, isOpen) {
  const state = getSideTabState(screen);

  if (!state) {
    return;
  }

  state.isOpen = Boolean(isOpen);
  applySideTabReveal(screen, state.isOpen ? QUEST_SIDE_TAB_WIDTH : 0);
  state.node.classList.toggle("is-open", state.isOpen);
}

function resetSideTab(screen) {
  const state = getSideTabState(screen);

  if (!state) {
    return;
  }

  state.pointerId = null;
  state.startX = 0;
  state.startReveal = state.isOpen
    ? QUEST_SIDE_TAB_WIDTH
    : 0;
  state.node.classList.remove("is-dragging");
}

function closeAllSideTabs() {
  sideTabStates.forEach((state) => {
    setSideTabOpen(state.screen, false);
    resetSideTab(state.screen);
  });
}

function closeCircleDetail() {
  if (getActiveScreen() !== "circle-post") {
    return;
  }

  setScreen("circle");
}

function openCircleChat() {
  setScreen("circle-chat");
}

function closeCircleChat() {
  if (getActiveScreen() !== "circle-chat") {
    return;
  }

  setScreen("circle");
}

function openCircleDetail(button) {
  if (!button) {
    return;
  }

  if (circlePostDetailTitle) {
    circlePostDetailTitle.textContent = button.dataset.postTitle || "Post";
  }

  if (circlePostDetailCaption) {
    circlePostDetailCaption.textContent = button.dataset.postCaption || "";
  }

  if (circlePostDetailAvatar) {
    circlePostDetailAvatar.src =
      button.dataset.postDetailAvatar || "./assets/circle-detail-leo-avatar.png";
  }

  if (circlePostDetailImage) {
    circlePostDetailImage.src =
      button.dataset.postDetailImage ||
      button.dataset.postImage ||
      "./assets/circle-detail-leo-post.png";
    circlePostDetailImage.alt = button.dataset.postTitle
      ? `${button.dataset.postTitle} post detail`
      : "Post detail";
  }

  setScreen("circle-post");
}

function setCircleSticker(button) {
  if (!button) {
    return;
  }

  currentCircleSticker = button;

  circlePostStickerButtons.forEach((stickerButton) => {
    const isActive = stickerButton === button;
    stickerButton.classList.toggle("is-active", isActive);
    stickerButton.setAttribute("aria-pressed", String(isActive));
  });

}

function createCircleStickerDragGhost(button) {
  const sourceImage = button.querySelector("img");
  const ghost = document.createElement("img");

  ghost.className = "circle-post-sticker-drag-ghost";
  ghost.src = button.dataset.stickerSrc || sourceImage?.src || "";
  ghost.alt = "";
  ghost.setAttribute("aria-hidden", "true");
  document.body.appendChild(ghost);

  return ghost;
}

function moveCircleStickerDragGhost(x, y) {
  if (!circleStickerDrag?.ghost) {
    return;
  }

  circleStickerDrag.ghost.style.left = `${x}px`;
  circleStickerDrag.ghost.style.top = `${y}px`;
}

function placeCircleSticker(button, clientX, clientY) {
  if (!circlePostDropzone || !circlePostStickersLayer || !button) {
    return;
  }

  const rect = circlePostDropzone.getBoundingClientRect();

  if (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return;
  }

  const placedSticker = document.createElement("img");
  const xPercent = ((clientX - rect.left) / rect.width) * 100;
  const yPercent = ((clientY - rect.top) / rect.height) * 100;

  placedSticker.className = "circle-post-detail-card__placed-sticker";
  placedSticker.src = button.dataset.stickerSrc || "";
  placedSticker.alt = button.dataset.stickerName || "Sticker";
  placedSticker.style.left = `${xPercent}%`;
  placedSticker.style.top = `${yPercent}%`;
  circlePostStickersLayer.appendChild(placedSticker);
}

function startCircleStickerDrag(button, event) {
  if (!button || event.button !== 0) {
    return;
  }

  setCircleSticker(button);
  button.setPointerCapture?.(event.pointerId);
  circleStickerDrag = {
    button,
    ghost: createCircleStickerDragGhost(button),
    pointerId: event.pointerId,
  };
  moveCircleStickerDragGhost(event.clientX, event.clientY);
  document.body.classList.add("is-dragging-circle-sticker");
  event.preventDefault();
}

function updateCircleStickerDrag(button, event) {
  if (!circleStickerDrag || circleStickerDrag.pointerId !== event.pointerId) {
    return;
  }

  moveCircleStickerDragGhost(event.clientX, event.clientY);
}

function endCircleStickerDrag(button, event) {
  if (!circleStickerDrag || circleStickerDrag.pointerId !== event.pointerId) {
    return;
  }

  placeCircleSticker(circleStickerDrag.button, event.clientX, event.clientY);
  circleStickerDrag.ghost?.remove();
  button.releasePointerCapture?.(event.pointerId);
  circleStickerDrag = null;
  document.body.classList.remove("is-dragging-circle-sticker");
}

function triggerCircleCheer(button) {
  const card = button?.closest(".circle-post-card");
  const overlay = card?.querySelector("[data-circle-cheer-overlay]");
  const symbol = button?.dataset.circleCheerSymbol || "👍";

  if (!card || !overlay) {
    return;
  }

  card.querySelectorAll(".circle-post-card__cheer-symbol, .circle-post-card__cheer-burst").forEach((node) => {
    node.textContent = symbol;
  });

  clearTimeout(circleCheerTimers.get(overlay));
  overlay.classList.remove("is-active");
  void overlay.offsetWidth;
  overlay.classList.add("is-active");

  const timer = window.setTimeout(() => {
    overlay.classList.remove("is-active");
  }, 760);

  circleCheerTimers.set(overlay, timer);
}

function resetReportSyncFeedback() {
  clearTimeout(reportSyncTimer);

  if (reportSyncButton) {
    reportSyncButton.classList.remove("is-success");
  }

  if (reportSyncLabel) {
    reportSyncLabel.textContent = "Sync to Doctor";
  }

  if (reportSyncToast) {
    reportSyncToast.classList.remove("is-visible");
  }
}

function createTrainingPoseRuntime() {
  return {
    state: "idle",
    sessionToken: 0,
    stream: null,
    pose: null,
    rafId: 0,
    processingFrame: false,
    lastFrameTimestamp: 0,
    validFrameStreak: 0,
    passHoldMs: 0,
    issueCounts: Object.fromEntries(
      TRAINING_POSE_ISSUE_PRIORITY.map((issue) => [issue, 0])
    ),
    lastStableIssue: "no_person_detected",
    candidateFrontSide: null,
    candidateFrontSideCount: 0,
    stableFrontSide: null,
    didPass: false,
    lastLandmarks: null,
  };
}

function setTrainingFeedbackMessage(messageKey) {
  if (!trainingFeedbackNode) {
    return;
  }

  trainingFeedbackNode.textContent =
    TRAINING_FEEDBACK_MESSAGES[messageKey] || TRAINING_FEEDBACK_MESSAGES.camera_loading;

  if (trainingHintNode) {
    trainingHintNode.classList.toggle(
      "is-visible",
      TRAINING_HINT_VISIBLE_MESSAGE_KEYS.has(messageKey)
    );
  }
}

function setTrainingStatusMessage(state) {
  if (!trainingCameraStatus) {
    return;
  }

  trainingCameraStatus.textContent =
    TRAINING_STATUS_MESSAGES[state] || TRAINING_STATUS_MESSAGES.idle;
}

function setTrainingErrorStatus(messageKey) {
  if (!trainingCameraStatus) {
    return;
  }

  trainingCameraStatus.textContent =
    TRAINING_ERROR_STATUS_MESSAGES[messageKey] || TRAINING_STATUS_MESSAGES.error;
}

function setTrainingPoseState(state) {
  trainingPoseRuntime.state = state;

  if (trainingCameraLayer) {
    trainingCameraLayer.dataset.trainingState = state;
  }

  if (trainingCameraAction) {
    trainingCameraAction.disabled =
      state === "requesting_permission" || state === "loading";
    trainingCameraAction.textContent =
      state === "tracking" || state === "passed"
        ? "Restart Camera"
        : "Enable Camera";
  }

  setTrainingStatusMessage(state);
}

function updateTrainingPassMeter() {
  if (!trainingPassMeter) {
    return;
  }

  const holdSeconds = Math.min(
    TRAINING_POSE_PASS_SECONDS,
    trainingPoseRuntime.passHoldMs / 1000
  );

  trainingPassMeter.textContent =
    trainingPoseRuntime.didPass
      ? "Hold complete 5.0 / 5.0s"
      : `Hold ${holdSeconds.toFixed(1)} / ${TRAINING_POSE_PASS_SECONDS.toFixed(1)}s`;
}

function resetTrainingPoseCanvas() {
  if (!trainingPoseCanvas) {
    return;
  }

  const context = trainingPoseCanvas.getContext("2d");
  if (!context) {
    return;
  }

  context.clearRect(0, 0, trainingPoseCanvas.width, trainingPoseCanvas.height);
}

function resetTrainingPoseUi() {
  trainingPoseRuntime.validFrameStreak = 0;
  trainingPoseRuntime.passHoldMs = 0;
  trainingPoseRuntime.lastStableIssue = "no_person_detected";
  trainingPoseRuntime.didPass = false;
  trainingPoseRuntime.lastLandmarks = null;
  trainingPoseRuntime.candidateFrontSide = null;
  trainingPoseRuntime.candidateFrontSideCount = 0;
  trainingPoseRuntime.stableFrontSide = null;
  trainingPoseRuntime.issueCounts = Object.fromEntries(
    TRAINING_POSE_ISSUE_PRIORITY.map((issue) => [issue, 0])
  );
  resetTrainingPoseCanvas();
  setTrainingPoseState("idle");
  setTrainingFeedbackMessage("camera_permission_prompt");
  updateTrainingPassMeter();
}

function getPoseLandmark(landmarks, index) {
  const landmark = landmarks?.[index];

  if (!landmark || (landmark.visibility ?? 1) < TRAINING_POSE_CONFIDENCE_THRESHOLD) {
    return null;
  }

  return landmark;
}

function getAngleDegrees(a, b, c) {
  if (!a || !b || !c) {
    return 0;
  }

  const abX = a.x - b.x;
  const abY = a.y - b.y;
  const cbX = c.x - b.x;
  const cbY = c.y - b.y;
  const dot = abX * cbX + abY * cbY;
  const magnitude = Math.hypot(abX, abY) * Math.hypot(cbX, cbY);

  if (!magnitude) {
    return 0;
  }

  const normalized = Math.min(1, Math.max(-1, dot / magnitude));
  return (Math.acos(normalized) * 180) / Math.PI;
}

function getMidpoint(a, b) {
  if (!a || !b) {
    return null;
  }

  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function determineTrainingFrontSide(leftKneeAngle, rightKneeAngle) {
  const directChoice =
    leftKneeAngle <= rightKneeAngle ? "left" : "right";

  if (trainingPoseRuntime.candidateFrontSide !== directChoice) {
    trainingPoseRuntime.candidateFrontSide = directChoice;
    trainingPoseRuntime.candidateFrontSideCount = 1;
  } else {
    trainingPoseRuntime.candidateFrontSideCount += 1;
  }

  if (trainingPoseRuntime.candidateFrontSideCount >= 4) {
    trainingPoseRuntime.stableFrontSide = directChoice;
  }

  return trainingPoseRuntime.stableFrontSide || directChoice;
}

function evaluateWarriorPose(landmarks) {
  const leftShoulder = getPoseLandmark(
    landmarks,
    TRAINING_POSE_LANDMARKS.leftShoulder
  );
  const rightShoulder = getPoseLandmark(
    landmarks,
    TRAINING_POSE_LANDMARKS.rightShoulder
  );
  const leftElbow = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.leftElbow);
  const rightElbow = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.rightElbow);
  const leftWrist = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.leftWrist);
  const rightWrist = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.rightWrist);
  const leftHip = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.leftHip);
  const rightHip = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.rightHip);
  const leftKnee = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.leftKnee);
  const rightKnee = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.rightKnee);
  const leftAnkle = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.leftAnkle);
  const rightAnkle = getPoseLandmark(landmarks, TRAINING_POSE_LANDMARKS.rightAnkle);

  const requiredPoints = [
    leftShoulder,
    rightShoulder,
    leftElbow,
    rightElbow,
    leftWrist,
    rightWrist,
    leftHip,
    rightHip,
    leftKnee,
    rightKnee,
    leftAnkle,
    rightAnkle,
  ];

  if (requiredPoints.some((point) => !point)) {
    return {
      isPoseValid: false,
      primaryIssue: "no_person_detected",
      issues: ["no_person_detected"],
      confidence: 0,
    };
  }

  const leftKneeAngle = getAngleDegrees(leftHip, leftKnee, leftAnkle);
  const rightKneeAngle = getAngleDegrees(rightHip, rightKnee, rightAnkle);
  const leftElbowAngle = getAngleDegrees(leftShoulder, leftElbow, leftWrist);
  const rightElbowAngle = getAngleDegrees(rightShoulder, rightElbow, rightWrist);
  const frontSide = determineTrainingFrontSide(leftKneeAngle, rightKneeAngle);
  const frontHip = frontSide === "left" ? leftHip : rightHip;
  const frontKnee = frontSide === "left" ? leftKnee : rightKnee;
  const frontAnkle = frontSide === "left" ? leftAnkle : rightAnkle;
  const frontKneeAngle = frontSide === "left" ? leftKneeAngle : rightKneeAngle;
  const shouldersMid = getMidpoint(leftShoulder, rightShoulder);
  const hipsMid = getMidpoint(leftHip, rightHip);
  const issues = [];

  if (
    frontKneeAngle > TRAINING_POSE_FRONT_KNEE_MAX_DEGREES ||
    frontKneeAngle < TRAINING_POSE_FRONT_KNEE_MIN_DEGREES ||
    Math.abs(frontKnee.x - frontAnkle.x) > TRAINING_POSE_FRONT_KNEE_OFFSET_LIMIT ||
    Math.abs(frontKnee.x - frontHip.x) < 0.03
  ) {
    issues.push("bend_front_knee");
  }

  if (
    Math.abs(leftWrist.y - leftShoulder.y) > TRAINING_POSE_ARM_LEVEL_TOLERANCE ||
    Math.abs(rightWrist.y - rightShoulder.y) > TRAINING_POSE_ARM_LEVEL_TOLERANCE
  ) {
    issues.push("raise_arms_level");
  }

  if (
    leftElbowAngle < TRAINING_POSE_ARM_STRAIGHT_MIN_DEGREES ||
    rightElbowAngle < TRAINING_POSE_ARM_STRAIGHT_MIN_DEGREES
  ) {
    issues.push("straighten_arms");
  }

  if (
    !shouldersMid ||
    !hipsMid ||
    Math.abs(shouldersMid.x - hipsMid.x) > TRAINING_POSE_TORSO_TILT_LIMIT
  ) {
    issues.push("keep_torso_upright");
  }

  const primaryIssue = TRAINING_POSE_ISSUE_PRIORITY.find((issue) =>
    issues.includes(issue)
  ) || null;
  const confidence =
    requiredPoints.reduce(
      (sum, point) => sum + Math.max(point.visibility ?? 1, TRAINING_POSE_CONFIDENCE_THRESHOLD),
      0
    ) / requiredPoints.length;

  return {
    isPoseValid: issues.length === 0,
    primaryIssue,
    issues,
    confidence,
  };
}

function smoothTrainingIssue(nextIssue) {
  TRAINING_POSE_ISSUE_PRIORITY.forEach((issue) => {
    trainingPoseRuntime.issueCounts[issue] =
      issue === nextIssue ? trainingPoseRuntime.issueCounts[issue] + 1 : 0;
  });

  const stableIssue = TRAINING_POSE_ISSUE_PRIORITY.find(
    (issue) => trainingPoseRuntime.issueCounts[issue] >= TRAINING_POSE_ISSUE_STREAK_FRAMES
  );

  if (stableIssue) {
    trainingPoseRuntime.lastStableIssue = stableIssue;
  }

  return trainingPoseRuntime.lastStableIssue;
}

function drawTrainingPose(landmarks, evaluation) {
  if (!trainingPoseCanvas) {
    return;
  }

  const context = trainingPoseCanvas.getContext("2d");
  if (!context) {
    return;
  }

  context.clearRect(0, 0, trainingPoseCanvas.width, trainingPoseCanvas.height);

  if (!landmarks?.length) {
    context.save();
    context.strokeStyle = "rgba(94, 70, 45, 0.16)";
    context.lineWidth = 4;
    context.setLineDash([16, 14]);
    context.strokeRect(92, 44, 456, 342);
    context.restore();
    return;
  }

  const project = (landmark) => ({
    x: (1 - landmark.x) * trainingPoseCanvas.width,
    y: landmark.y * trainingPoseCanvas.height,
  });

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = evaluation.isPoseValid ? "#70c92c" : "#5fb0ff";
  context.lineWidth = 8;

  TRAINING_POSE_SKELETON_CONNECTIONS.forEach(([startIndex, endIndex]) => {
    const start = landmarks[startIndex];
    const end = landmarks[endIndex];

    if (
      !start ||
      !end ||
      (start.visibility ?? 1) < 0.35 ||
      (end.visibility ?? 1) < 0.35
    ) {
      return;
    }

    const from = project(start);
    const to = project(end);
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  });

  landmarks.forEach((landmark, index) => {
    if ((landmark.visibility ?? 1) < 0.45) {
      return;
    }

    const point = project(landmark);
    context.fillStyle =
      index >= 23 ? "#ff9e29" : evaluation.isPoseValid ? "#70c92c" : "#6b63ff";
    context.beginPath();
    context.arc(point.x, point.y, 7, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function applyTrainingEvaluation(evaluation, timestamp) {
  const delta = trainingPoseRuntime.lastFrameTimestamp
    ? timestamp - trainingPoseRuntime.lastFrameTimestamp
    : 0;
  trainingPoseRuntime.lastFrameTimestamp = timestamp;

  if (evaluation.primaryIssue === "no_person_detected") {
    trainingPoseRuntime.validFrameStreak = 0;
    trainingPoseRuntime.passHoldMs = 0;
    smoothTrainingIssue("no_person_detected");
    setTrainingPoseState("no_person");
    setTrainingFeedbackMessage("no_person_detected");
    updateTrainingPassMeter();
    return;
  }

  if (evaluation.isPoseValid) {
    trainingPoseRuntime.validFrameStreak += 1;
    if (trainingPoseRuntime.validFrameStreak >= TRAINING_POSE_VALID_STREAK_FRAMES) {
      trainingPoseRuntime.passHoldMs += delta;
      trainingPoseRuntime.lastStableIssue = "great_job_hold_it";
      setTrainingFeedbackMessage("great_job_hold_it");
    }
  } else {
    trainingPoseRuntime.validFrameStreak = 0;
    trainingPoseRuntime.passHoldMs = 0;
    const stableIssue = smoothTrainingIssue(evaluation.primaryIssue);
    setTrainingFeedbackMessage(stableIssue);
  }

  setTrainingPoseState("tracking");
  updateTrainingPassMeter();

  if (
    !trainingPoseRuntime.didPass &&
    trainingPoseRuntime.passHoldMs >= TRAINING_POSE_PASS_SECONDS * 1000
  ) {
    completeTrainingPoseSuccess();
  }
}

function handleTrainingPoseResults(results) {
  if (getActiveScreen() !== "training" || trainingPoseRuntime.didPass) {
    return;
  }

  const landmarks = results?.poseLandmarks || null;
  const evaluation = evaluateWarriorPose(landmarks);
  trainingPoseRuntime.lastLandmarks = landmarks;
  drawTrainingPose(landmarks, evaluation);
  applyTrainingEvaluation(evaluation, performance.now());
}

async function startTrainingPoseSession() {
  if (!trainingScene || !trainingPoseVideo) {
    return;
  }

  stopTrainingPoseSession();
  resetTrainingPoseUi();
  setTrainingPoseState("requesting_permission");

  const sessionToken = trainingPoseRuntime.sessionToken + 1;
  trainingPoseRuntime.sessionToken = sessionToken;

  try {
    if (!window.isSecureContext) {
      throw new Error("Secure context required");
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("getUserMedia unsupported");
    }

    if (!window.Pose) {
      throw new Error("Pose library unavailable");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: TRAINING_POSE_FRAME_WIDTH },
        height: { ideal: TRAINING_POSE_FRAME_HEIGHT },
        frameRate: { ideal: 24, max: 30 },
      },
    });

    if (trainingPoseRuntime.sessionToken !== sessionToken) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    trainingPoseRuntime.stream = stream;
    trainingPoseVideo.srcObject = stream;
    trainingPoseVideo.muted = true;
    setTrainingPoseState("loading");
    setTrainingFeedbackMessage("camera_loading");

    await trainingPoseVideo.play();

    const pose = new window.Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.55,
      minTrackingConfidence: 0.55,
    });
    pose.onResults(handleTrainingPoseResults);

    if (trainingPoseRuntime.sessionToken !== sessionToken) {
      pose.close();
      return;
    }

    trainingPoseRuntime.pose = pose;
    trainingPoseRuntime.lastFrameTimestamp = 0;
    setTrainingPoseState("tracking");
    if (!trainingTickTimer) {
      startTrainingTimer();
    }

    const step = async () => {
      if (
        trainingPoseRuntime.sessionToken !== sessionToken ||
        getActiveScreen() !== "training" ||
        !trainingPoseRuntime.pose
      ) {
        return;
      }

      if (
        !trainingPoseRuntime.processingFrame &&
        trainingPoseVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        trainingPoseRuntime.processingFrame = true;
        try {
          await trainingPoseRuntime.pose.send({ image: trainingPoseVideo });
        } catch (error) {
          console.error(error);
          failTrainingPoseSession("pose_library_unavailable");
          return;
        } finally {
          trainingPoseRuntime.processingFrame = false;
        }
      }

      trainingPoseRuntime.rafId = window.requestAnimationFrame(step);
    };

    trainingPoseRuntime.rafId = window.requestAnimationFrame(step);
  } catch (error) {
    console.error(error);
    const messageKey =
      error?.name === "NotAllowedError" || error?.name === "SecurityError"
        ? "camera_permission_denied"
        : error?.name === "NotFoundError" || error?.name === "OverconstrainedError"
          ? "camera_not_found"
          : error?.message === "getUserMedia unsupported"
            ? "camera_browser_unsupported"
            : error?.message === "Secure context required"
              ? "camera_secure_context_required"
              : error?.message === "Pose library unavailable"
                ? "pose_library_unavailable"
                : "camera_not_found";
    failTrainingPoseSession(messageKey);
  }
}

function stopTrainingPoseSession(options = {}) {
  const { preserveCanvas = false } = options;
  trainingPoseRuntime.sessionToken += 1;

  if (trainingPoseRuntime.rafId) {
    window.cancelAnimationFrame(trainingPoseRuntime.rafId);
    trainingPoseRuntime.rafId = 0;
  }

  if (trainingPoseRuntime.stream) {
    trainingPoseRuntime.stream.getTracks().forEach((track) => track.stop());
    trainingPoseRuntime.stream = null;
  }

  if (trainingPoseVideo) {
    trainingPoseVideo.pause();
    trainingPoseVideo.srcObject = null;
  }

  if (trainingPoseRuntime.pose) {
    trainingPoseRuntime.pose.close();
    trainingPoseRuntime.pose = null;
  }

  trainingPoseRuntime.processingFrame = false;

  if (!preserveCanvas) {
    resetTrainingPoseCanvas();
  }
}

function failTrainingPoseSession(messageKey) {
  stopTrainingPoseSession({ preserveCanvas: true });
  setTrainingPoseState("error");
  setTrainingErrorStatus(messageKey);
  setTrainingFeedbackMessage(messageKey);
  trainingPoseRuntime.passHoldMs = 0;
  updateTrainingPassMeter();
}

function completeTrainingPoseSuccess() {
  trainingPoseRuntime.didPass = true;
  trainingPoseRuntime.passHoldMs = TRAINING_POSE_PASS_SECONDS * 1000;
  setTrainingPoseState("passed");
  setTrainingFeedbackMessage("pose_passed");
  updateTrainingPassMeter();
  stopTrainingPoseSession({ preserveCanvas: true });
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

function clearRewardingTransition() {
  window.clearTimeout(rewardingTransitionTimer);
  rewardingTransitionTimer = 0;
}

function triggerRewardingConfettiBurst() {
  if (!rewardingConfetti) {
    return;
  }

  rewardingConfetti.classList.remove("is-bursting");
  void rewardingConfetti.offsetWidth;
  rewardingConfetti.classList.add("is-bursting");
}

function scheduleRewardingTransition() {
  clearRewardingTransition();
  rewardingTransitionTimer = window.setTimeout(() => {
    setScreen("rewarding");
  }, 720);
}

function resetTrainingScene() {
  if (!trainingScene) {
    return;
  }

  clearRewardingTransition();
  trainingRemainingSeconds = TRAINING_DURATION_SECONDS;
  trainingScene.classList.remove("is-complete");
  resetTrainingMonsters();
  resetTrainingPoseUi();
  updateTrainingScene();
}

function startTrainingTimer() {
  if (!trainingScene || trainingTickTimer) {
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
      if (!trainingPoseRuntime.didPass) {
        setTrainingPoseState("timeout");
        setTrainingFeedbackMessage("time_up_try_again");
        stopTrainingPoseSession({ preserveCanvas: true });
      }
      trainingScene.classList.add("is-complete");
      scheduleRewardingTransition();
      return;
    }

    trainingRemainingSeconds -= 1;
    updateTrainingScene();
  }, 1000);
}

function syncSceneRuntime(screen) {
  closeAllSideTabs();

  if (screen !== "report") {
    resetReportSyncFeedback();
  }

  if (screen === "training") {
    resetTrainingScene();
    startTrainingPoseSession();
    return;
  }

  clearRewardingTransition();
  stopTrainingTimer();
  stopTrainingPoseSession();
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

sideTabStates.forEach((state) => {
  if (!state.node || !state.edge) {
    return;
  }

  const startSideTabDrag = (event, startReveal) => {
    if (getActiveScreen() !== state.screen) {
      return;
    }

    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startReveal = clampQuestSideTabReveal(startReveal);
    state.node.classList.add("is-dragging");
    applySideTabReveal(state.screen, state.startReveal);
  };

  const updateSideTabDrag = (event) => {
    if (state.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - state.startX;
    applySideTabReveal(state.screen, state.startReveal + delta);
  };

  const stopSideTabDrag = (event) => {
    if (state.pointerId !== event.pointerId) {
      return;
    }

    const shouldOpen = state.reveal >= QUEST_SIDE_TAB_OPEN_THRESHOLD;
    setSideTabOpen(state.screen, shouldOpen);
    resetSideTab(state.screen);
  };

  state.edge.addEventListener("pointerdown", (event) => {
    startSideTabDrag(event, 0);
  });

  state.node.addEventListener("pointerdown", (event) => {
    if (!state.isOpen) {
      return;
    }

    startSideTabDrag(event, state.reveal || QUEST_SIDE_TAB_WIDTH);
  });

  window.addEventListener("pointermove", updateSideTabDrag);
  window.addEventListener("pointerup", stopSideTabDrag);
  window.addEventListener("pointercancel", stopSideTabDrag);
});

if (trainingCameraAction) {
  trainingCameraAction.addEventListener("click", () => {
    if (getActiveScreen() !== "training") {
      return;
    }

    startTrainingPoseSession();
  });
}

if (reportSyncButton) {
  reportSyncButton.addEventListener("click", () => {
    resetReportSyncFeedback();
    reportSyncButton.classList.add("is-success");

    if (reportSyncLabel) {
      reportSyncLabel.textContent = "Synced!";
    }

    if (reportSyncToast) {
      reportSyncToast.classList.add("is-visible");
    }

    reportSyncTimer = window.setTimeout(() => {
      if (reportSyncToast) {
        reportSyncToast.classList.remove("is-visible");
      }
    }, 2000);
  });
}

sideTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.remove("is-pop");
    void button.offsetWidth;
    button.classList.add("is-pop");

    window.setTimeout(() => {
      button.classList.remove("is-pop");
    }, 220);
  });
});

clothesTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setClothesTab(button.dataset.clothesTab || "clothes");
  });
});

clothesItemButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setClothesItem(button);
  });
});

movementOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMovement(button.dataset.movementOption || "idle");
  });
});

circlePostTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    openCircleDetail(button);
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCircleDetail(button);
    }
  });
});

circlePostBackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeCircleDetail();
  });
});

circleChatTriggers.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openCircleChat();
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      openCircleChat();
    }
  });
});

circleChatBackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeCircleChat();
  });
});

circlePostStickerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCircleSticker(button);
  });

  button.addEventListener("pointerdown", (event) => {
    startCircleStickerDrag(button, event);
  });

  button.addEventListener("pointermove", (event) => {
    updateCircleStickerDrag(button, event);
  });

  button.addEventListener("pointerup", (event) => {
    endCircleStickerDrag(button, event);
  });

  button.addEventListener("pointercancel", (event) => {
    endCircleStickerDrag(button, event);
  });
});

circleCheerButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    triggerCircleCheer(button);
  });
});

if (currentCircleSticker) {
  setCircleSticker(currentCircleSticker);
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

    if (target === "clothes") {
      setScreen("clothes");
      return;
    }

    if (target === "circle") {
      setScreen("circle");
      return;
    }

    if (target === "training") {
      setScreen("training");
      return;
    }

    if (target === "report") {
      setScreen("report");
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

setClothesTab(currentClothesTab);
renderClothesSelection();
setMovement(currentMovement);

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
setScreen(getInitialScreen(), { immediate: true });
