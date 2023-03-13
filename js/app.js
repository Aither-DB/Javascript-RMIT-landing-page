/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * highlights section in viewport upon scrolling,
 * and toggles the navbar.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Determine what the current section is in the viewport. I've done this by first determining the index of current section is in view then returning the index (if none then return null) and also set up an event listener whenever the user scrolls to update this variable currentSection variable.

function getCurrentSection() {

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].getBoundingClientRect();
    const visibleInViewport = (
      section.top >= 0 &&
      section.left >= 0 &&
      section.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      section.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (visibleInViewport) {
      return i;
    }
  }
      return null; // Return null if no sections in view
}

let currentSection = getCurrentSection();
document.addEventListener('scroll', function() {
  currentSection = getCurrentSection();
});

    /**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation menu - Loop through sections, extract the 'data-nav' and 'id' attributes, create new <li> items and append <a> items to each, have <li> contain 'data-nav' text and the link go to '#('id')'. Finally add this to navbar__list.

function addSectionsToNavbar() {
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i].getAttribute('id');
    const sectionName = sections[i].getAttribute('data-nav');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.setAttribute('href', `#${sectionId}`);
    link.textContent = sectionName;
    link.classList.add('menu__link');
    listItem.appendChild(link);
    navbarList.appendChild(listItem);

    // Add event listener for smooth scrolling

    link.addEventListener('click', (clickEvent) => {
      clickEvent.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
}

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build the navigation menu

addSectionsToNavbar();

// Set sections class as active when in viewport and removes them when out of viewport

document.addEventListener('scroll', function() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const visibleInViewport = section.getBoundingClientRect().top <= 50 && section.getBoundingClientRect().bottom >= 50;
    if (visibleInViewport) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
    }
  }
});
