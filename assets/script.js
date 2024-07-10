document.addEventListener("DOMContentLoaded", (event) => {
  loadComponents();
});

// Components
async function loadComponents() {
  try {
    const navHtml = await fetch("components/nav.html").then((response) =>
      response.text()
    );
    const footerHtml = await fetch("components/footer.html").then((response) =>
      response.text()
    );
    const navComponent = document.getElementById("nav-component");
    const footerComponent = document.getElementById("footer-component");
    if (navComponent) navComponent.innerHTML = navHtml;
    if (footerComponent) footerComponent.innerHTML = footerHtml;
    themeSwitcher.init();
    dateTimeDisplay.init();
  } catch (error) {
    console.error("Error fetching components", error);
  }
}

// Light and Dark Mode Feature
const themeSwitcher = {
  init() {
    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
      this.loadTheme();
      this.bindEvents();
    }
  },
  bindEvents() {
    document
      .querySelector("#theme-toggle")
      .addEventListener("change", (event) => {
        this.setTheme(event.target.value);
      });
  },
  loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "system";
    this.applyTheme(savedTheme);
    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) themeToggle.value = savedTheme;
  },
  setTheme(theme) {
    localStorage.setItem("theme", theme);
    this.applyTheme(theme);
  },
  applyTheme(theme) {
    const bodyClass = document.body.classList;
    bodyClass.remove("light-theme", "dark-theme");
    if (theme === "light") {
      bodyClass.add("light-theme");
    } else if (theme === "dark") {
      bodyClass.add("dark-theme");
    } else {
      // 'system' option, respect user's system preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        bodyClass.add("dark-theme");
      } else {
        bodyClass.add("light-theme");
      }
    }
  },
};

// Footer Date and Time
const dateTimeDisplay = {
  currentTimeElement: null,
  currentDateElement: null,
  optionsTime: {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
    timeZoneName: "long",
  },
  optionsDate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  },

  update: function () {
    const now = new Date();
    const userLocale = navigator.languages
      ? navigator.languages[0]
      : navigator.language;

    if (this.currentTimeElement && this.currentDateElement) {
      this.currentTimeElement.innerText = now.toLocaleTimeString(
        userLocale,
        this.optionsTime
      );
      this.currentDateElement.innerText = now.toLocaleDateString(
        userLocale,
        this.optionsDate
      );
    }
  },
  init: function () {
    this.currentTimeElement = document.getElementById("current-time");
    this.currentDateElement = document.getElementById("current-date");
    if (this.currentTimeElement && this.currentDateElement) {
      this.update();
      setInterval(() => this.update(), 1000);
    }
  },
};
