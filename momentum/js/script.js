import playList from "./playList.js";

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const nameInput = document.querySelector(".name");
const body = document.body;
const languageSelect = document.querySelector(".block_lang");

const greetings = {
  morning: { en: "Good morning", ru: "Доброе утро" },
  afternoon: { en: "Good afternoon", ru: "Добрый день" },
  evening: { en: "Good evening", ru: "Добрый вечер" },
  night: { en: "Good night", ru: "Доброй ночи" },
};

function getTimeSegment(hour) {
  if (hour < 6) return "night";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

function updateClock() {
  const now = new Date();
  const language = languageSelect.value;
  const locale = language === "ru" ? "ru-RU" : "en-US";

  timeElement.textContent = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  timeElement.dateTime = now.toISOString();
  dateElement.textContent = now.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  dateElement.dateTime = now.toISOString();
  greetingElement.textContent = greetings[getTimeSegment(now.getHours())][language];
}

updateClock();
setInterval(updateClock, 1000);

nameInput.value = localStorage.getItem("name") || "";
nameInput.addEventListener("input", () => localStorage.setItem("name", nameInput.value));

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
let backgroundIndex = Math.floor(Math.random() * 20) + 1;

function setBackground() {
  const segment = getTimeSegment(new Date().getHours());
  const imageNumber = String(backgroundIndex).padStart(2, "0");
  body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${segment}/${imageNumber}.jpg")`;
}

function changeBackground(direction) {
  backgroundIndex = ((backgroundIndex - 1 + direction + 20) % 20) + 1;
  setBackground();
}

slideNext.addEventListener("click", () => changeBackground(1));
slidePrev.addEventListener("click", () => changeBackground(-1));
setBackground();

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const city = document.querySelector(".city");
city.value = localStorage.getItem("city") || city.value;

async function getWeather() {
  const cityName = city.value.trim();

  if (!cityName) {
    weatherError.textContent = "Enter a city to see the weather.";
    [temperature, weatherDescription, wind, humidity].forEach((element) => {
      element.textContent = "";
    });
    return;
  }

  weatherError.textContent = "";

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({
      q: cityName,
      lang: languageSelect.value,
      appid: "8b1fb6eb512a779063ba491381ebe4d6",
      units: "metric",
    });
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
    const data = await response.json();

    if (!data.weather?.[0] || !data.main || !data.wind) {
      throw new Error("Weather response is incomplete.");
    }

    weatherIcon.className = `weather-icon owf owf-${data.weather[0].id}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${data.main.humidity}% humidity`;
  } catch {
    weatherError.textContent = "Weather unavailable. Check the city and try again.";
    [temperature, weatherDescription, wind, humidity].forEach((element) => {
      element.textContent = "";
    });
  }
}

city.addEventListener("change", () => {
  localStorage.setItem("city", city.value);
  getWeather();
});
getWeather();

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuote() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
    const quotes = await response.json();
    const selected = quotes[Math.floor(Math.random() * quotes.length)];
    if (!selected?.text || !selected?.author) {
      throw new Error("Quote data is incomplete.");
    }
    quote.textContent = selected.text;
    author.textContent = selected.author;
  } catch {
    quote.textContent = "A quiet moment to focus.";
    author.textContent = "";
  }
}

getQuote();
changeQuote.addEventListener("click", getQuote);

const audio = document.querySelector(".audio");
const player = document.querySelector(".player");
const playButton = document.querySelector(".play");
const playListElement = document.querySelector(".play-list");
const playerMessage = document.querySelector(".player-message");
const progress = document.querySelector(".progress-block");
let songIndex = 0;

function updatePlayButton() {
  const playing = !audio.paused;
  playButton.classList.toggle("pause", playing);
  playButton.setAttribute("aria-pressed", String(playing));
  playButton.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}

function renderPlayList() {
  playListElement.replaceChildren();

  playList.forEach((song, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    item.className = `play-item${index === songIndex ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = song.title;
    button.addEventListener("click", () => selectSong(index, true));
    item.appendChild(button);
    playListElement.appendChild(item);
  });
}

function loadSong(index) {
  songIndex = index;
  audio.src = playList[songIndex].src;
  audio.load();
  playerMessage.textContent = "";
  renderPlayList();
}

async function startPlayback() {
  try {
    await audio.play();
    playerMessage.textContent = "";
  } catch {
    playerMessage.textContent = "Music could not be played. Try again.";
  }
}

function selectSong(index, shouldPlay = false) {
  audio.pause();
  loadSong(index);
  if (shouldPlay) startPlayback();
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    startPlayback();
  } else {
    audio.pause();
  }
});

document.querySelector(".play-next").addEventListener("click", () => {
  selectSong((songIndex + 1) % playList.length, true);
});

document.querySelector(".play-prev").addEventListener("click", () => {
  selectSong((songIndex - 1 + playList.length) % playList.length, true);
});

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);
audio.addEventListener("ended", () => selectSong((songIndex + 1) % playList.length, true));
audio.addEventListener("timeupdate", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progress.value = String((audio.currentTime / audio.duration) * 100);
  }
});
progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  }
});

loadSong(songIndex);

const settingButton = document.querySelector(".setting-icon");
const closeSettingButton = document.querySelector(".close-setting");
const setting = document.querySelector(".setting");
const todoButton = document.querySelector(".todo-toggle");
const closeTodoButton = document.querySelector(".close-todo");
const todoPanel = document.querySelector(".todo_list");
const settingToggles = document.querySelectorAll(".setting-toggle");
const widgetElements = {
  player: [player],
  weather: [document.querySelector(".weather")],
  date: [timeElement, dateElement],
  greeting: [document.querySelector(".greeting-container")],
};
const widgetSettings = {
  player: true,
  weather: true,
  date: true,
  greeting: true,
};

function saveWidgetSettings() {
  localStorage.setItem("widgetSettings", JSON.stringify(widgetSettings));
}

function applyWidgetSettings() {
  const savedSettings = JSON.parse(localStorage.getItem("widgetSettings") || "null");
  Object.assign(widgetSettings, savedSettings || {});

  settingToggles.forEach((toggle) => {
    const target = toggle.dataset.target;
    toggle.checked = widgetSettings[target];
    widgetElements[target].forEach((element) => {
      element.classList.toggle("hide", !widgetSettings[target]);
    });
  });
}

function setPanel(panel, button, isOpen) {
  panel.classList.toggle("visible", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
}

settingButton.addEventListener("click", () => {
  const isOpen = !setting.classList.contains("visible");
  setPanel(setting, settingButton, isOpen);
  if (isOpen) setPanel(todoPanel, todoButton, false);
});

closeSettingButton.addEventListener("click", () => setPanel(setting, settingButton, false));
todoButton.addEventListener("click", () => {
  const isOpen = !todoPanel.classList.contains("visible");
  setPanel(todoPanel, todoButton, isOpen);
  if (isOpen) setPanel(setting, settingButton, false);
});
closeTodoButton.addEventListener("click", () => setPanel(todoPanel, todoButton, false));

settingToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const target = toggle.dataset.target;
    widgetSettings[target] = toggle.checked;
    widgetElements[target].forEach((element) => {
      element.classList.toggle("hide", !toggle.checked);
    });
    saveWidgetSettings();
  });
});

applyWidgetSettings();

const todoForm = document.querySelector(".create_new_todo");
const addMessage = document.querySelector(".message");
const todo = document.querySelector(".todo");
let todoList = JSON.parse(localStorage.getItem("todo") || "[]");

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function renderTodos() {
  todo.replaceChildren();

  if (todoList.length === 0) {
    const empty = document.createElement("li");
    empty.className = "todo-empty";
    empty.textContent = "Your list is clear.";
    todo.appendChild(empty);
    return;
  }

  todoList.forEach((item) => {
    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const actions = document.createElement("div");
    const importantButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    listItem.className = `todo-item${item.checked ? " is-done" : ""}${item.important ? " is-important" : ""}`;
    label.className = "todo-main";
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(item.checked);
    checkbox.dataset.action = "toggle";
    checkbox.dataset.id = item.id;
    text.textContent = item.todo;
    label.append(checkbox, text);

    actions.className = "todo-actions";
    importantButton.type = "button";
    importantButton.className = `todo-important${item.important ? " is-active" : ""}`;
    importantButton.dataset.action = "important";
    importantButton.dataset.id = item.id;
    importantButton.setAttribute("aria-label", item.important ? "Remove importance" : "Mark as important");
    importantButton.setAttribute("aria-pressed", String(Boolean(item.important)));
    importantButton.textContent = item.important ? "★" : "☆";
    deleteButton.type = "button";
    deleteButton.className = "todo-delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = item.id;
    deleteButton.setAttribute("aria-label", "Delete task");
    deleteButton.textContent = "×";
    actions.append(importantButton, deleteButton);
    listItem.append(label, actions);
    todo.appendChild(listItem);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addMessage.value.trim();
  if (!value) {
    addMessage.focus();
    return;
  }

  todoList.unshift({
    id: Date.now().toString(),
    todo: value,
    checked: false,
    important: false,
  });
  saveTodo();
  renderTodos();
  addMessage.value = "";
  addMessage.focus();
});

todo.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-action='toggle']");
  if (!checkbox) return;

  const item = todoList.find((entry) => entry.id === checkbox.dataset.id);
  if (!item) return;
  item.checked = checkbox.checked;
  saveTodo();
  renderTodos();
});

todo.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = todoList.find((entry) => entry.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "important") {
    item.important = !item.important;
  } else if (button.dataset.action === "delete") {
    todoList = todoList.filter((entry) => entry.id !== item.id);
  }

  saveTodo();
  renderTodos();
});

renderTodos();

const allLanguages = ["en", "ru"];
const languageFromHash = window.location.hash.slice(1);
languageSelect.value = allLanguages.includes(languageFromHash) ? languageFromHash : "en";
updateClock();

languageSelect.addEventListener("change", () => {
  const language = allLanguages.includes(languageSelect.value) ? languageSelect.value : "en";
  window.history.replaceState(null, "", `${window.location.pathname}#${language}`);
  updateClock();
  getWeather();
});
