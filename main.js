/* =========================
   1. 获取页面元素
   ========================= */

const app = document.querySelector("#app");
const audio = document.querySelector("#audio-player");

const themeBtn = document.querySelector("#theme-btn");
const themePanel = document.querySelector("#theme-panel");
const themeCardList = document.querySelector("#theme-card-list");
const themePrevBtn = document.querySelector("#theme-prev-btn");
const themeNextBtn = document.querySelector("#theme-next-btn");

const trackTitle = document.querySelector("#track-title");
const trackArtist = document.querySelector("#track-artist");

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseIcon = document.querySelector("#play-pause-icon");
const randomBtn = document.querySelector("#shuffle-btn");

const volumeBtn = document.querySelector("#volume-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumePanel = document.querySelector("#volume-panel");
const volumeSlider = document.querySelector("#volume-slider");

const timerBtn = document.querySelector("#timer-btn");
const timerPanel = document.querySelector("#timer-panel");
const timerInput = document.querySelector("#timer-input");
const timerPreview = document.querySelector("#timer-preview");
const timerConfirmBtn = document.querySelector("#timer-confirm-btn");
const timerPauseBtn = document.querySelector("#timer-pause-btn");
const timerResetBtn = document.querySelector("#timer-reset-btn");
const floatingTimer = document.querySelector("#floating-timer");

const settingsBtn = document.querySelector("#settings-btn");
const settingsPanel = document.querySelector("#settings-panel");
const closeSettingsBtn = document.querySelector("#close-settings-btn");

const hideToggle = document.querySelector("#hide-toggle");
const clockToggle = document.querySelector("#clock-toggle");
const shortcutToggle = document.querySelector("#shortcut-toggle");
const clockDisplay = document.querySelector("#clock-display");

const fullscreenBtn = document.querySelector("#fullscreen");


/* =========================
   2. 主题资料
   一个主题 = 一个背景 + 一首音乐
   你后面只需要替换 bg 和 music 的路径
   ========================= */

const themes = [
  {
    id: "violet",
    title: "Violet City",
    subtitle: "Night Focus",
    artist: "lofi.study",
    bg: "assets/themes/violet/bg.gif",
    music: "assets/themes/violet/1.mp3",
  },
  {
    id: "train",
    title: "Train Journey",
    subtitle: "City Study",
    artist: "lofi.study",
    bg: "assets/themes/train/bg.gif",
    music: "assets/themes/train/1.mp3",
  },
  {
    id: "country",
    title: "Country Ride",
    subtitle: "Calm Reading",
    artist: "lofi.study",
    bg: "assets/themes/country/bg.gif",
    music: "assets/themes/country/1.mp3",
  },
  {
    id: "rain",
    title: "Rain Window",
    subtitle: "Relax Mode",
    artist: "lofi.study",
    bg: "assets/themes/rain/bg.gif",
    music: "assets/themes/rain/1.mp3",
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
   5. 生成主题卡片
   点击卡片后：同时切换背景和音乐
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
      playPauseIcon.textContent = "Ⅱ";
    });

    themeCardList.appendChild(card);
  });
}


/* =========================
   6. 加载主题
   这里是这版设计最核心的部分：
   主题切换时，同时换背景、音乐、标题和作者
   ========================= */

function loadTheme(index) {
  const theme = themes[index];

  app.style.backgroundImage = `url("${theme.bg}")`;
  audio.src = theme.music;

  trackTitle.textContent = theme.title;
  trackArtist.textContent = theme.subtitle;

  updateActiveThemeCard();
}

function updateActiveThemeCard() {
  const cards = document.querySelectorAll(".theme-card");

  cards.forEach((card, index) => {
    card.classList.toggle("active", index === currentThemeIndex);
  });
}


/* =========================
   7. 主题选择面板
   点击左下角圆形按钮打开
   ========================= */

themeBtn.addEventListener("click", () => {
  togglePanel(themePanel);
});

themePrevBtn.addEventListener("click", () => {
  currentThemeIndex =
    (currentThemeIndex - 1 + themes.length) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  playPauseIcon.textContent = "Ⅱ";
});

themeNextBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  playPauseIcon.textContent = "Ⅱ";
});


/* =========================
   8. 播放 / 暂停
   ========================= */

playPauseBtn.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseIcon.textContent = "Ⅱ";
  } else {
    audio.pause();
    playPauseIcon.textContent = "▶";
  }
}


/* =========================
   9. 上一个 / 下一个主题
   这里不再是单纯换歌，而是换整个主题
   ========================= */

nextBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  playPauseIcon.textContent = "Ⅱ";
});

prevBtn.addEventListener("click", () => {
  currentThemeIndex =
    (currentThemeIndex - 1 + themes.length) % themes.length;

  loadTheme(currentThemeIndex);
  audio.play();
  playPauseIcon.textContent = "Ⅱ";
});


/* =========================
   10. 随机主题
   在四个主题里面随机切换
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
  playPauseIcon.textContent = "Ⅱ";
});


/* =========================
   11. 音量功能
   单击音量键打开音量条
   音量为 0 时，icon 自动变成静音
   双击音量键可以快速静音 / 恢复
   ========================= */

volumeBtn.addEventListener("click", () => {
  togglePanel(volumePanel);
});

volumeSlider.addEventListener("input", () => {
  audio.volume = Number(volumeSlider.value);

  if (audio.volume === 0) {
    volumeIcon.src = "assets/icon/mute.png";
  } else {
    previousVolume = audio.volume;
    volumeIcon.src = "assets/icon/audio.png";
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
    volumeIcon.src = "assets/icon/mute.png";
  } else {
    audio.volume = previousVolume;
    volumeSlider.value = previousVolume;
    volumeIcon.src = "assets/icon/audio.png";
  }
}


/* =========================
   12. 番茄钟功能
   点击 start 后，倒计时显示在右上角
   ========================= */

let timerSeconds = 25 * 60;
let timerInterval = null;

timerBtn.addEventListener("click", () => {
  togglePanel(timerPanel);
});

timerInput.addEventListener("input", () => {
  const minutes = Number(timerInput.value);
  timerPreview.textContent = formatTime(minutes * 60);
});

timerConfirmBtn.addEventListener("click", () => {
  const minutes = Number(timerInput.value);

  if (minutes <= 0) return;

  timerSeconds = minutes * 60;
  floatingTimer.classList.remove("hidden");

  updateFloatingTimer();
  startTimer();
  closeSmallPanels();
});

timerPauseBtn.addEventListener("click", pauseTimer);

timerResetBtn.addEventListener("click", () => {
  pauseTimer();
  timerSeconds = Number(timerInput.value) * 60;
  updateFloatingTimer();
});

function startTimer() {
  pauseTimer();

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateFloatingTimer();

    if (timerSeconds <= 0) {
      pauseTimer();
      floatingTimer.textContent = "done";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateFloatingTimer() {
  floatingTimer.textContent = formatTime(timerSeconds);
}


/* =========================
   13. Settings 设置面板
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

  hideTimer = setTimeout(() => {
    document.body.classList.add("hide-ui");
    const hideSecondsInput = document.querySelector("#hide-seconds-input");
    const hideDelay = Number(hideSecondsInput.value) * 1000;
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
  timerPanel.classList.add("hidden");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(2, "0")}`;
}