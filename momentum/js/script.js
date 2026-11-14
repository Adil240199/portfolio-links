// Время и дата
const time = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function updateTime() {
  const now = new Date();
  const format = (n) => String(n).padStart(2, "0");
  time.textContent = `${format(now.getHours())}:${format(
    now.getMinutes()
  )}:${format(now.getSeconds())}`;
}
setInterval(updateTime, 1000);

function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  dateElement.textContent = now.toLocaleDateString("en-US", options);
}
setInterval(updateDate, 1000);

// Приветствие
const greeting = document.querySelector(".greeting");
let Gmorning = "Good morning",
  Gafternoon = "Good afternoon",
  Gevening = "Good evening",
  Gnight = "Good night";

function updateGreeting() {
  const hour = new Date().getHours();
  const text =
    hour < 6
      ? Gnight
      : hour < 12
      ? Gmorning
      : hour < 18
      ? Gafternoon
      : Gevening;
  greeting.textContent = text;
}
setInterval(updateGreeting, 1000);

// Имя
const nameInput = document.querySelector(".name");

window.addEventListener("beforeunload", () =>
  localStorage.setItem("name", nameInput.value)
);
window.addEventListener("load", () => {
  if (localStorage.getItem("name"))
    nameInput.value = localStorage.getItem("name");
});

// Фон
const body = document.body;
let timeOfDay;

function getTimeSegment(hour) {
  if (hour < 6) return "night";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

function getRandomNum() {
  return String(Math.floor(Math.random() * 20) + 1).padStart(2, "0");
}

let randomNum = +getRandomNum();
function setBackground(num = randomNum) {
  const hour = new Date().getHours();
  timeOfDay = getTimeSegment(hour);
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${String(
    num
  ).padStart(2, "0")}.jpg')`;
}
setBackground();

document.querySelector(".slide-next").addEventListener("click", () => {
  randomNum = randomNum >= 20 ? 1 : randomNum + 1;
  setBackground(randomNum);
});

document.querySelector(".slide-prev").addEventListener("click", () => {
  randomNum = randomNum <= 1 ? 20 : randomNum - 1;
  setBackground(randomNum);
});

// Погода
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const city = document.querySelector(".city");

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8b1fb6eb512a779063ba491381ebe4d6&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = `weather-icon owf owf-${data.weather[0].id}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherError.textContent = "";
  } catch {
    weatherError.textContent = "Error! Nothing to geocode for ''!";
    [temperature, weatherDescription, wind, humidity].forEach((el) => {
      el.textContent = "";
    });
  }
}

window.addEventListener("load", () => {
  if (localStorage.getItem("city")) city.value = localStorage.getItem("city");
  getWeather();
});
city.addEventListener("change", getWeather);
window.addEventListener("beforeunload", () =>
  localStorage.setItem("city", city.value)
);

// Цитаты
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const res = await fetch("data.json");
  const data = await res.json();
  const random = data[Math.floor(Math.random() * data.length)];
  quote.textContent = random.text;
  author.textContent = random.author;
}
getQuotes();
changeQuote.addEventListener("click", getQuotes);

// Аудиоплеер
const audio = document.querySelector(".audio");
const playItems = document.querySelectorAll(".play-item");
const songs = [
  "assets_sounds_AquaCaelestis",
  "assets_sounds_Ennio Morricone",
  "assets_sounds_River Flows In You",
  "assets_sounds_Summer Wind",
];
let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  playItems.forEach((item, i) => {
    item.style.color = i === index ? "rgb(162, 222, 229)" : "white";
  });
  audio.src = `./assets/sounds/${songs[index]}.mp3`;
}

function playAudio() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    play.classList.add("pause");
  } else {
    audio.pause();
    isPlaying = false;
    play.classList.remove("pause");
  }
}

loadSong(songIndex);

const play = document.querySelector(".play");
play.addEventListener("click", playAudio);

document.querySelector(".play-next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playAudio();
});

document.querySelector(".play-prev").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playAudio();
});

// Прогрессбар
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-block");

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Перевод
const LangGreet = {
  Morning: { ru: "Доброе утро", en: "Good morning" },
  Afternoon: { ru: "Добрый день", en: "Good afternoon" },
  Evening: { ru: "Добрый вечер", en: "Good evening" },
  Night: { en: "Good night", ru: "Доброй ночи" },
};

const blockLang = document.querySelector(".block_lang");
const allLang = ["en", "ru"];

blockLang.addEventListener("change", () => {
  location.href = window.location.pathname + "#" + blockLang.value;
  location.reload();
});

function changeLanguage() {
  let hash = window.location.hash.substr(1);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }
  blockLang.value = hash;
  Gmorning = LangGreet.Morning[hash];
  Gafternoon = LangGreet.Afternoon[hash];
  Gevening = LangGreet.Evening[hash];
  Gnight = LangGreet.Night[hash];
}
changeLanguage();

// Настройки
const settingIcon = document.querySelector(".setting-icon");
const closeSetting = document.querySelector(".close-setting");
const setting = document.querySelector(".setting");
const player = document.querySelector(".player");
const weather = document.querySelector(".weather");
const greetContainer = document.querySelector(".greeting-container");
const settingToggles = document.querySelectorAll(".setting-toggle");

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
  const savedSettings = JSON.parse(
    localStorage.getItem("widgetSettings") || "null"
  );
  Object.assign(widgetSettings, savedSettings || {});

  settingToggles.forEach((toggle) => {
    const target = toggle.dataset.target;
    toggle.checked = widgetSettings[target];

    const elements = {
      player,
      weather,
      date: document.querySelectorAll(".time, .date"),
      greeting: greetContainer,
    }[target];

    if (elements instanceof NodeList) {
      elements.forEach((element) =>
        element.classList.toggle("hide", !widgetSettings[target])
      );
    } else if (elements) {
      elements.classList.toggle("hide", !widgetSettings[target]);
    }
  });
}

function toggleSettingPanel() {
  setting.classList.toggle("visible");
}

settingIcon.addEventListener("click", toggleSettingPanel);
closeSetting.addEventListener("click", toggleSettingPanel);

settingToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const target = toggle.dataset.target;
    widgetSettings[target] = toggle.checked;
    saveWidgetSettings();

    const elements = {
      player,
      weather,
      date: document.querySelectorAll(".time, .date"),
      greeting: greetContainer,
    }[target];

    if (Array.isArray(elements)) {
      elements.forEach((element) =>
        element.classList.toggle("hide", !toggle.checked)
      );
    } else if (elements) {
      elements.classList.toggle("hide", !toggle.checked);
    }
  });
});

applyWidgetSettings();

// ToDo
const addMessage = document.querySelector(".message");
const addButton = document.querySelector(".add");
const todo = document.querySelector(".todo");
const todoListContainer = document.querySelector(".todo_list");
const todoToggle = document.querySelector(".todo-toggle");
let todoList = JSON.parse(localStorage.getItem("todo")) || [];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function displayMessages() {
  todo.innerHTML = todoList
    .map(
      (item) => `
    <li class="todo-item ${item.checked ? "is-done" : ""} ${
        item.important ? "is-important" : ""
      }">
      <label class="todo-main">
        <input type="checkbox" data-action="toggle" data-id="${item.id}" ${
        item.checked ? "checked" : ""
      }>
        <span>${escapeHtml(item.todo)}</span>
      </label>
      <div class="todo-actions">
        <button class="todo-important ${
          item.important ? "is-active" : ""
        }" data-action="important" data-id="${
        item.id
      }" type="button" aria-label="Mark as important">${
        item.important ? "★" : "☆"
      }</button>
        <button class="todo-delete" data-action="delete" data-id="${
          item.id
        }" type="button" aria-label="Delete task">×</button>
      </div>
    </li>
  `
    )
    .join("");
}

function addTodo() {
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

  displayMessages();
  saveTodo();
  addMessage.value = "";
  addMessage.focus();
}

addButton.addEventListener("click", addTodo);
addMessage.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

todo.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-action='toggle']");
  if (!checkbox) return;

  const item = todoList.find((entry) => entry.id === checkbox.dataset.id);
  if (!item) return;

  item.checked = checkbox.checked;
  saveTodo();
  displayMessages();
});

todo.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = todoList.find((entry) => entry.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "important") {
    item.important = !item.important;
  }

  if (button.dataset.action === "delete") {
    todoList = todoList.filter((entry) => entry.id !== item.id);
  }

  saveTodo();
  displayMessages();
});

todoToggle.addEventListener("click", () => {
  todoListContainer.classList.toggle("visible");
});

displayMessages();
