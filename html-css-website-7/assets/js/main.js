/*==================== NAV MENU TOGGLE ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SKILLS TABS ====================*/
class Skill {
  constructor(name, percentage) {
    this.name = name;
    this.percentage = percentage;
  }
}

const skillsFrontend = [new Skill("HTML", 90), new Skill("css", 80)];
const skillsBackend = [new Skill("PHP", 80), new Skill("Node Js", 70)];

const allSkills = [skillsFrontend, skillsBackend];

const skillBtns = document.getElementById("skills-buttons");

function changeSkillsTab(index) {
  const selectedSkills = allSkills[index];

  if (selectedSkills != null) {
    document.getElementById("skills-list").innerHTML = "";

    for (i = 0; i < selectedSkills.length; i++) {
      document.getElementById("skills-list").innerHTML +=
        " <div class='skills__data'><div class='skills__titles'><h3 class='skills__name'>" +
        selectedSkills[i].name +
        "</h3><span class='skills__number'>" +
        selectedSkills[i].percentage +
        "%</span></div><div class='skills__bar'><span class='skills__percentage' style='width:" +
        selectedSkills[i].percentage +
        "%;'></span></div></div>";
    }
  } else {
    document.getElementById("skills-list").innerHTML = "-";
  }

  //active button handler
  Array.from(skillBtns.children).forEach((btn) => {
    btn.className = btn.className.replace(" button-active", "");
  });

  skillBtns.children[index].className += " button-active";
}

for (let i = 0; i < skillBtns.children.length; i++) {
  skillBtns.children[i].addEventListener("click", () => {
    changeSkillsTab(i);
  });
}

changeSkillsTab(0);

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });

    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== ON SCROLL HEADER AND HUD ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  const hudLines = document.querySelectorAll(".hud__line");

  if (scrollY <= 10) {
    nav.classList.remove("header--skin");

    hudLines.forEach((hudLine) => {
      hudLine.classList.remove("hud__line--inverse");
    });
  } else {
    nav.classList.add("header--skin");

    hudLines.forEach((hudLine) => {
      hudLine.classList.add("hud__line--inverse");
    });
  }

  if (scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*==================== INSTASCROLL FUNCTION ====================*/

function scrollNext() {
  const scrollY = window.pageYOffset;

  for (let i = 0; i < sections.length; i++) {
    let curSection = sections[i];
    const sectionHeight = curSection.offsetHeight;
    const sectionTop = curSection.offsetTop - 50;
    const nextSectionIndex = i + 1;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (nextSectionIndex < sections.length) {
        const nextSectionId = sections[nextSectionIndex].getAttribute("id");
        window.location = "#" + nextSectionId;
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }
}

/*==================== SWITCH THEME ====================*/

const themes = ["default-theme", "green-theme", "pink-theme"];

function loadTheme() {
  let selectedThemeIndex = localStorage.getItem("selected-theme-index");

  document.body.classList.add(themes[selectedThemeIndex]);
}

function changeTheme() {
  for (let i = 0; i < themes.length; i++) {
    if (document.body.classList.contains(themes[i])) {
      document.body.classList.remove(themes[i]);
    }
  }

  let selectedThemeIndex = localStorage.getItem("selected-theme-index");

  if (selectedThemeIndex == null || parseInt(selectedThemeIndex) >= themes.length) {
    selectedThemeIndex = 0;
  }

  let nextThemeIndex = parseInt(selectedThemeIndex) + 1;
  localStorage.setItem("selected-theme-index", nextThemeIndex);

  loadTheme();
}

loadTheme();

/*==================== TYPEWRITER ====================*/

const el = document.getElementById("type");
let txt = el.innerHTML;
el.innerHTML = "";
var i = 0;
function typeWriter() {
  if (i < txt.length) {
    el.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();
