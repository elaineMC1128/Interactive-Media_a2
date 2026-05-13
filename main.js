/* =========================
   Get page elements
   ========================= */

const app = document.querySelector("#app");
const audio = document.querySelector("#audio-player");

const themeBtn = document.querySelector("#theme-btn");
const themeIcon = document.querySelector("#theme-icon");
const themePanel = document.querySelector("#theme-panel");
const themeCardList = document.querySelector("#theme-card-list");
const themePrevBtn = document.querySelector("#theme-prev-btn");
const themeNextBtn = document.querySelector("#theme-next-btn");

const trackTitle = document.querySelector("#track-title");
const trackArtist = document.querySelector("#track-artist");

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const randomBtn = document.querySelector("#shuffle-btn");

const volumeBtn = document.querySelector("#volume-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumePanel = document.querySelector("#volume-panel");
const volumeSlider = document.querySelector("#volume-slider");

const settingsBtn = document.querySelector("#settings-btn");
const settingsPanel = document.querySelector("#settings-panel");
const closeSettingsBtn = document.querySelector("#close-settings-btn");

const hideToggle = document.querySelector("#hide-toggle");
const hideSecondsInput = document.querySelector("#hide-seconds-input");

const clockToggle = document.querySelector("#clock-toggle");
const shortcutToggle = document.querySelector("#shortcut-toggle");
const clockDisplay = document.querySelector("#clock-display");

const fullscreenBtn = document.querySelector("#fullscreen");


/* =========================
   All theme data is stored in the "themes" array. 
   Each theme has an id, title, subtitle, artist, background image, music file, and icon. 
   This structure allows for easy management and expansion of themes in the future.
   ========================= */

const themes = [
  {
    id: "chill",
    title: "Chill",
    subtitle: "Soft Break",
    artist: "lofi.study",
    bg: "assets/theme/chill/bg.gif",
    music: "assets/theme/chill/audio.mp3",
    icon: "assets/theme/chill/icon.png",
  },
  {
    id: "focus",
    title: "Focus",
    subtitle: "Focus Study",
    artist: "lofi.study",
    bg: "assets/theme/focus/bg.gif",
    music: "assets/theme/focus/audio.mp3",
    icon: "assets/theme/focus/icon.png",
  },
  {
    id: "relax",
    title: "Relax",
    subtitle: "Relaxing Mood",
    artist: "lofi.study",
    bg: "assets/theme/relax/bg.gif",
    music: "assets/theme/relax/audio.mp3",
    icon: "assets/theme/relax/icon.png",
  },
  {
    id: "jazzy",
    title: "Jazzy",
    subtitle: "Chill Night",
    artist: "lofi.study",
    bg: "assets/theme/jazzy/bg.gif",
    music: "assets/theme/jazzy/audio.mp3",
    icon: "assets/theme/jazzy/icon.png",
  },
];


/* =========================
   3. 播放状态
   ========================= */

let currentThemeIndex = 0;
let previousVolume = 0.7;

audio.volume = 0.7;


/* =========================
   4. 初始化页面
   ========================= */

renderThemeCards();
loadTheme(currentThemeIndex);


/* =========================
   5. 自动生成主题卡片
   ========================= */

function renderThemeCards() {
  themeCardList.innerHTML = "";

  themes.forEach((theme, index) => {
    const card = document.createElement("button");

    card.className = "theme-card";
    card.style.backgroundImage = `url("${theme.bg}")`;
    card.dataset.index = index;

    card.innerHTML = `
      <h3>${theme.title}</h3>
      <p>${theme.subtitle}</p>
    `;

    card.addEventListener("click", () => {
      currentThemeIndex = index;
      loadTheme(currentThemeIndex);
      closeSmallPanels();

      audio.play();
      setPauseIcon();
    });

    themeCardList.appendChild(card);
  });
}


/* =========================
   6. 加载主题
   一个主题 = 背景 + 音乐 + 标题
   ========================= */

function loadTheme(index) {
  const theme = themes[index];

  app.style.backgroundImage = `url("${theme.bg}")`;
  audio.src = theme.music;

  trackTitle.textContent = theme.title;
  trackArtist.textContent = theme.subtitle;

  themeIcon.src = theme.icon;
  themeIcon.alt = `${theme.title} icon`;

  updateActiveThemeCard();
}

function updateActiveThemeCard() {
  const cards = document.querySelectorAll(".theme-card");

  cards.forEach((card, index) => {
    card.classList.toggle("active", index === currentThemeIndex);
  });
}


/* =========================
   7. 主题面板
   ========================= */

themeBtn.addEventListener("click", () => {
  togglePanel(themePanel);
});

themePrevBtn.addEventListener("click", () => {
  playPreviousTheme();
});

themeNextBtn.addEventListener("click", () => {
  playNextTheme();
});


/* =========================
   8. 播放 / 暂停
   现在是图片 icon，所以改 src，不再用 textContent
   ========================= */

playPauseBtn.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    setPauseIcon();
  } else {
    audio.pause();
    setPlayIcon();
  }
}

function setPlayIcon() {
  playPauseImg.src = "assets/icon/play.png";
  playPauseImg.alt = "play-btn";
}

function setPauseIcon() {
  playPauseImg.src = "assets/icon/pause.png";
  playPauseImg.alt = "pause-btn";
}


/* =========================
   9. 上一个 / 下一个主题
   ========================= */

nextBtn.addEventListener("click", playNextTheme);
prevBtn.addEventListener("click", playPreviousTheme);

function playNextTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  setPauseIcon();
}

function playPreviousTheme() {
  currentThemeIndex =
    (currentThemeIndex - 1 + themes.length) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  setPauseIcon();
}


/* =========================
   10. 随机主题
   ========================= */

randomBtn.addEventListener("click", () => {
  let randomIndex = Math.floor(Math.random() * themes.length);

  if (themes.length > 1) {
    while (randomIndex === currentThemeIndex) {
      randomIndex = Math.floor(Math.random() * themes.length);
    }
  }

  currentThemeIndex = randomIndex;
  loadTheme(currentThemeIndex);

  audio.play();
  setPauseIcon();
});


/* =========================
   11. 音量功能
   audio.png = 有声音
   no_audio.png = 静音
   ========================= */

volumeBtn.addEventListener("click", () => {
  togglePanel(volumePanel);
});

volumeSlider.addEventListener("input", () => {
  audio.volume = Number(volumeSlider.value);

  if (audio.volume === 0) {
    volumeIcon.src = "assets/icon/no_audio.png";
    volumeIcon.alt = "mute-btn";
  } else {
    previousVolume = audio.volume;
    volumeIcon.src = "assets/icon/audio.png";
    volumeIcon.alt = "audio-btn";
  }
});

volumeBtn.addEventListener("dblclick", () => {
  toggleMute();
});

function toggleMute() {
  if (audio.volume > 0) {
    previousVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;

    volumeIcon.src = "assets/icon/no_audio.png";
    volumeIcon.alt = "mute-btn";
  } else {
    audio.volume = previousVolume;
    volumeSlider.value = previousVolume;

    volumeIcon.src = "assets/icon/audio.png";
    volumeIcon.alt = "audio-btn";
  }
}


/* =========================
   13. Settings 面板
   ========================= */

settingsBtn.addEventListener("click", () => {
  settingsPanel.classList.remove("hidden");
  closeSmallPanels();
});

closeSettingsBtn.addEventListener("click", () => {
  settingsPanel.classList.add("hidden");
});


/* =========================
   14. Settings - 自动隐藏界面
   修复点：hideDelay 必须在 setTimeout 之前算出来
   ========================= */

let hideElementsEnabled = true;
let hideTimer = null;

hideToggle.addEventListener("click", () => {
  hideElementsEnabled = !hideElementsEnabled;
  hideToggle.classList.toggle("active", hideElementsEnabled);

  if (!hideElementsEnabled) {
    document.body.classList.remove("hide-ui");
    clearTimeout(hideTimer);
  }
});

document.addEventListener("mousemove", resetHideTimer);
document.addEventListener("keydown", resetHideTimer);

function resetHideTimer() {
  document.body.classList.remove("hide-ui");

  if (!hideElementsEnabled) return;

  clearTimeout(hideTimer);

  let hideDelay = Number(hideSecondsInput.value) * 1000;

  if (!hideDelay || hideDelay < 1000) {
    hideDelay = 30000;
  }

  hideTimer = setTimeout(() => {
    document.body.classList.add("hide-ui");
  }, hideDelay);
}


/* =========================
   15. Settings - 显示当前时间
   ========================= */

let clockEnabled = false;

clockToggle.addEventListener("click", () => {
  clockEnabled = !clockEnabled;
  clockToggle.classList.toggle("active", clockEnabled);
  clockDisplay.classList.toggle("hidden", !clockEnabled);
});

setInterval(updateClock, 1000);
updateClock();

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  clockDisplay.textContent = `${hours}:${minutes}`;
}


/* =========================
   16. Settings - 快捷键
   Space 播放/暂停，M 静音
   ========================= */

let shortcutsEnabled = true;

shortcutToggle.addEventListener("click", () => {
  shortcutsEnabled = !shortcutsEnabled;
  shortcutToggle.classList.toggle("active", shortcutsEnabled);
});

document.addEventListener("keydown", (event) => {
  if (!shortcutsEnabled) return;

  if (event.code === "Space") {
    event.preventDefault();
    togglePlayPause();
  }

  if (event.key.toLowerCase() === "m") {
    toggleMute();
  }
});


/* =========================
   17. 全屏功能
   ========================= */

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


/* =========================
   18. 工具函数
   ========================= */

function togglePanel(panel) {
  const isHidden = panel.classList.contains("hidden");

  closeSmallPanels();

  if (isHidden) {
    panel.classList.remove("hidden");
  }
}

function closeSmallPanels() {
  themePanel.classList.add("hidden");
  volumePanel.classList.add("hidden");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(2, "0")}`;
}