document.addEventListener("DOMContentLoaded", () => {
  navComponent.render();
  footerComponent.render();
  themeSwitcher.init();
  dateTimeDisplay.init();
});

// const navComponent = {
//   render() {
//     const navHtml = `
//       <nav>
//         <ul>
//           <li><a href="/index.html">Home</a></li>
//           <li><a href="/pages/my-approach.html">My Approach</a></li>
//           <li><a href="/pages/work.html">Work</a></li>
//           <li><a href="/pages/education.html">Education</a></li>
//         </ul>
//         <select id="theme-toggle">
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//           <option value="system">OS Default</option>
//         </select>
//       </nav>
//     `;
//     const navElement = document.getElementById("nav-component");
//     if (navElement) navElement.innerHTML = navHtml;
//   },
// };

const config = {
  basePath: window.location.hostname.includes("github.io") ? "/portfolio" : "",
  assetsPath: window.location.hostname.includes("github.io")
    ? "/portfolio/assets"
    : "../assets",
};

const navComponent = {
  render() {
    const navHtml = `
      <nav>
        <ul>
          <li><a href="${config.basePath}/index.html" id="home-link">Home</a></li>
          <li><a href="${config.basePath}/pages/my-approach.html" id="approach-link">My Approach</a></li>
          <li><a href="${config.basePath}/pages/work.html" id="work-link">Work</a></li>
          <li><a href="${config.basePath}/pages/education.html" id="education-link">Education</a></li>
        </ul>
        <select id="theme-toggle">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">OS Default</option>
        </select>
      </nav>
    `;
    const navElement = document.getElementById("nav-component");
    if (navElement) navElement.innerHTML = navHtml;
    this.setActiveLink();
  },
  setActiveLink() {
    const path = window.location.pathname;
    if (path.endsWith("/index.html") || path === `${config.basePath}/`) {
      document.getElementById("home-link").classList.add("active");
    } else if (path.includes("my-approach")) {
      document.getElementById("approach-link").classList.add("active");
    } else if (path.includes("work")) {
      document.getElementById("work-link").classList.add("active");
    } else if (path.includes("education")) {
      document.getElementById("education-link").classList.add("active");
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  navComponent.render();
  footerComponent.render();
  themeSwitcher.init();
  dateTimeDisplay.init();
});

const footerComponent = {
  render() {
    const footerHtml = `
      <div>
        <p id="current-time"></p>
        <p id="current-date"></p>
        <p>Portfolio designed and coded by James Meanwell.</p>
      </div>
    `;
    const footerElement = document.getElementById("footer-component");
    if (footerElement) footerElement.innerHTML = footerHtml;
  },
};

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
    const footerClass = document.querySelector("footer").classList;

    bodyClass.remove("light-theme", "dark-theme");
    footerClass.remove("light-theme", "dark-theme");

    if (theme === "light") {
      bodyClass.add("light-theme");
      footerClass.add("dark-theme"); // Invert the footer
    } else if (theme === "dark") {
      bodyClass.add("dark-theme");
      footerClass.add("light-theme"); // Invert the footer
    } else {
      // 'system' option, respect user's system preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        bodyClass.add("dark-theme");
        footerClass.add("light-theme"); // Invert the footer
      } else {
        bodyClass.add("light-theme");
        footerClass.add("dark-theme"); // Invert the footer
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
        this.optionsTime,
      );
      this.currentDateElement.innerText = now.toLocaleDateString(
        userLocale,
        this.optionsDate,
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
