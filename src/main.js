import './styles/main.scss';
import './components/Header/Header.scss';
import './components/MobileMenu/MobileMenu.scss';
import './components/Hero/Hero.scss';
import './components/Intro/Intro.scss';
import './components/VotingSystem/VotingSystem.scss';
import './components/VotingSteps/VotingSteps.scss';
import './components/MoscowVoting/MoscowVoting.scss';
import './components/Footer/Footer.scss';
import './styles/_animations.scss';

import { initScrollAnimations } from './scripts/scrollAnimations';
import footer from './components/Footer/Footer.html?raw';
import moscowVoting from './components/MoscowVoting/MoscowVoting.html?raw';
import votingSteps from './components/VotingSteps/VotingSteps.html?raw';
import votingSystem from './components/VotingSystem/VotingSystem.html?raw';
import hero from './components/Hero/Hero.html?raw';
import header from './components/Header/Header.html?raw';
import intro from './components/Intro/Intro.html?raw';
import mobileMenu from './components/MobileMenu/MobileMenu.html?raw';

const app = document.querySelector('#app');
const menu = document.querySelector('#mobile-menu');
const openButton = document.querySelector('.header__menu-button');
const closeButton = document.querySelector('.mobile-menu__close');
const desktopMedia = window.matchMedia('(min-width: 768px)');

function fixAssetPaths() {
  const base = import.meta.env.BASE_URL;

  document.querySelectorAll('img[src^="/"]').forEach((img) => {
    const path = img.getAttribute('src').slice(1);
    img.src = `${base}${path}`;
  });

  document.querySelectorAll('source[srcset^="/"]').forEach((source) => {
    const path = source.getAttribute('srcset').slice(1);
    source.srcset = `${base}${path}`;
  });
}

app.innerHTML = `
  <div class="page-top">
    ${header}
    ${hero}
  </div>

  ${intro}
  ${votingSystem}
  ${votingSteps}
  ${moscowVoting}
  ${footer}
  ${mobileMenu}
`;

fixAssetPaths();

function openMenu() {
  menu.hidden = false;
  openButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}

function closeMenu() {
  menu.hidden = true;
  openButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';

  if (!desktopMedia.matches) {
    openButton.focus();
  }
}

openButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

menu.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    closeMenu();
  }
});

desktopMedia.addEventListener('change', (event) => {
  if (event.matches && !menu.hidden) {
    closeMenu();
  }
});

initScrollAnimations();
