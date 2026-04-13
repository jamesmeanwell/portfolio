document.addEventListener("DOMContentLoaded", () => {
  navComponent.render();
  footerComponent.render();
  themeSwitcher.init();
  dateTimeDisplay.init();
});

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
          <li><a href="${config.basePath}/pages/approach.html" id="approach-link">Approach</a></li>
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
    } else if (path.includes("approach")) {
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
        <p>Portfolio designed and coded by James Meanwell. This work was developed with the assistance of AI tools for drafting and editing. All ideas, interpretations, and final revisions are my own unless otherwise cited.</p>
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

/* EXAMPLE CONTAINER */
document.addEventListener("DOMContentLoaded", function () {
  const exampleContainers = document.querySelectorAll(".example-container");

  exampleContainers.forEach((container) => {
    const exampleSelector = container.querySelector("#example-selector");
    const nextConceptButton = container.querySelector("#example-next-concept");

    const exampleManager = {
      init() {
        this.divs = container.querySelectorAll('div[id^="option-"]');
        this.updateSelectOptions();
        this.bindEvents();
        this.showDiv();
      },
      updateSelectOptions() {
        /* Create a label element */
        const label = document.createElement("label");
        label.textContent = "Choose an option:";
        label.htmlFor = exampleSelector.id;
        label.classList.add("sr-only");
        /* Insert the label into the DOM before the select element */
        exampleSelector.parentNode.insertBefore(label, exampleSelector);
        this.divs.forEach((div) => {
          const option = document.createElement("option");
          option.value = div.id;
          option.textContent = div.dataset.name || div.id;
          exampleSelector.appendChild(option);
        });
      },
      bindEvents() {
        exampleSelector.addEventListener("change", this.showDiv.bind(this));
        nextConceptButton.addEventListener(
          "click",
          this.nextConcept.bind(this),
        );
      },
      showDiv() {
        const selectedValue = exampleSelector.value || this.divs[0].id;
        const exampleCount = container.querySelector(".example-count");
        this.divs.forEach((div) => {
          if (div.id === selectedValue) {
            div.classList.remove("example-hidden");
            div.classList.add("example-visible");
          } else {
            div.classList.add("example-hidden");
            div.classList.remove("example-visible");
          }
        });
        exampleSelector.value = selectedValue;
        const selectedIndex = exampleSelector.selectedIndex + 1;
        const totalOptions = exampleSelector.options.length;
        exampleCount.textContent = `${selectedIndex} of ${totalOptions}`;
      },
      nextConcept() {
        let selectedIndex = exampleSelector.selectedIndex;
        const nextIndex = (selectedIndex + 1) % exampleSelector.options.length;
        exampleSelector.selectedIndex = nextIndex;
        this.showDiv();
      },
    };

    exampleManager.init();
  });
});
