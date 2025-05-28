
/*================ PRELOADER FUNCTION ===========*/

// window.addEventListener("load", function () {
//   const loader = document.querySelector(".loader");
//   const preloader = document.getElementById("preloader");

//   loader.addEventListener("animationend", function () {
//     loader.style.opacity = "0";

//     loader.addEventListener("transitionend", function () {
//       preloader.style.display = "none";
//     });
//   });
// });





/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-menu");
    // Add show-icon to show and hide menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll(".dropdown__item");

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector(".dropdown__button");

  // 2. Select each button click
  dropdownButton.addEventListener("click", () => {
    // 7. Select the current show-dropdown class
    const showDropdown = document.querySelector(".show-dropdown");

    // 5. Call the toggleItem function
    toggleItem(item);

    // 8. Remove the show-dropdown class from other items
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown);
    }
  });
});

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
  // 3.1. Select each dropdown content
  const dropdownContainer = item.querySelector(".dropdown__container");

  // 6. If the same item contains the show-dropdown class, remove
  if (item.classList.contains("show-dropdown")) {
    dropdownContainer.removeAttribute("style");
    item.classList.remove("show-dropdown");
  } else {
    // 4. Add the maximum height to the dropdown content and add the show-dropdown class
    dropdownContainer.style.height = dropdownContainer.scrollHeight + "px";
    item.classList.add("show-dropdown");
  }
};

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia("(min-width: 1118px)"),
  dropdownContainer = document.querySelectorAll(".dropdown__container");

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
  // Validate if the media query reaches 1118px
  if (mediaQuery.matches) {
    // Remove the dropdown container height style
    dropdownContainer.forEach((e) => {
      e.removeAttribute("style");
    });

    // Remove the show-dropdown class from dropdown item
    dropdownItems.forEach((e) => {
      e.classList.remove("show-dropdown");
    });
  }
};

addEventListener("resize", removeStyle);

// iframe popup button function
function openPopup() {
  document.getElementById("section--iframe__popup__container").style.display =
    "flex";
}

function closePopup(event) {
  // Close popup only if the user clicks outside the iframe
  const popup = document.getElementById("section--iframe__popup__container");
  if (event.target === popup) {
    popup.style.display = "none";
  }
}


// Search section
// ===== Desktop Search Toggle =====
// ===== Search Toggle (Desktop) =====
const search = document.getElementById("search-icon");
const container = document.querySelector(".search-content");
const input = document.getElementById("search-box");
const close = document.getElementById("close-btn");

search.addEventListener("click", () => {
  search.classList.add("active");
  container.classList.add("active");
  input.classList.add("active");
  close.classList.add("active");
});

close.addEventListener("click", () => {
  search.classList.remove("active");
  container.classList.remove("active");
  input.classList.remove("active");
  close.classList.remove("active");
  input.value = "";
});

// ===== Search Toggle (Mobile/Tablet) =====
const icon = document.getElementById("icon-search");
const box = document.querySelector(".box-2");
const inputBox = document.getElementById("search-input");
const closeBtn = document.getElementById("close");

icon.addEventListener("click", () => {
  icon.classList.add("active");
  box.classList.add("active");
  inputBox.classList.add("active");
  closeBtn.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  icon.classList.remove("active");
  box.classList.remove("active");
  inputBox.classList.remove("active");
  closeBtn.classList.remove("active");
  inputBox.value = "";
});

// ===== Search Navigation =====
const searchBtn = document.getElementById("search-2");

// Sections that live inside index.html — add more here if needed
const singlePageSections = new Set([
  "help",
  "service",
  "faq",
  "frequentlyaskedquestions",
  "frequently-asked-questions",
  "privacy",
  "value",
  "whychoose",
  "whoweare",
  "security",
  "how",
  "what",
  "howitwork",
]);

// Map known aliases to real section IDs for smooth scrolling
const aliasMap = {
  frequentlyaskedquestions: "faq",
  "frequently-asked-questions": "faq",
  help: "help",
  faq: "faq",
  service:"service",
  privacy:"privacy",
  value:"value",
whychooseus: "whychoose",
whoweare:"whoweare",
who:"whoweare",
security:"security",
how:"how",
what:"what",
whatwedo:"what",
howitworks:"howitwork",
howitwork:"howitwork"
};

const sectionPageMap = {
  faq:"index.html",
  "frequently-asked-questions":"index.html",
help:"index.html",
service:"index.html",
privacy:"index.html",
value:"index.html",
  about: "about2.html",
  whoweare: "about2.html",
  whychoose: "about2.html",
  security: "about2.html",
  what: "about2.html",
  howitwork: "about2.html",
  what:"organisation.html",
  what:"organisation.html",
  howitwork:"organisation.html"
};

// Separate pages with full URLs or relative paths
const pageMap = {
  contact: "contactus.html",
  organisation: "organisation.html",
  about:"about2.html"
};

function handleSearch(value) {
  let query = value.trim().toLowerCase().replace(/\s+/g, "");
  if (!query) return;

    const targetUrl = `${query}.html`;

  console.log("Trying to navigate to:", targetUrl);

  // Normalize to canonical section ID if alias found
  if (aliasMap[query]) {
    query = aliasMap[query];
  }

if (singlePageSections.has(query)) {
  const section = document.getElementById(query);
  if (section) {
    const yOffset = -180;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    // Redirect to the page where the section exists
    if (sectionPageMap[query]) {
      const targetPage = sectionPageMap[query];
      window.location.href = `${targetPage}#${query}`;
    } else {
      alert("Section not found on this page.");
    }
  }
} else {
  const targetUrl = pageMap[query] || `${query}.html`;

  fetch(targetUrl, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        window.location.href = targetUrl;
      } else {
        alert("No matching page found.");
      }
    })
    .catch(() => {
      alert("Error searching. Try again later.");
    });
}

}

// Attach event listeners for desktop search box and mobile search box
searchBtn.addEventListener("click", () => handleSearch(input.value));
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch(input.value);
});

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch(inputBox.value);
});


// Slider Animation

document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");

      if (i === index) {
        slide.classList.add("active");
        dots[i].classList.add("active");
      }
    });
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 6000);
  }

  // Add click event for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
      startAutoSlide();
    });
  });

  // Initialize first slide and start auto-slide
  showSlide(currentIndex);
  startAutoSlide();
});




// tab function

const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
const arrowReverseList = document.querySelectorAll(".arrow-box .ri-arrow-left-s-line");
const arrowForwardList = document.querySelectorAll(".arrow-box .ri-arrow-right-s-line");

let tabCounter = 0;

function activateTab(index) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  buttons[index].classList.add("active");
  contents[index].classList.add("active");
  tabCounter = index;
}

buttons.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab(index);
  });
});

arrowReverseList.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    tabCounter = (tabCounter - 1 + contents.length) % contents.length;
    activateTab(tabCounter);
  });
});


arrowForwardList.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    tabCounter = (tabCounter + 1) % contents.length;
    activateTab(tabCounter);
  });
});






// FAQ

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
      // Close any currently open FAQ
      document.querySelectorAll(".faq-item").forEach(faq => {
          if (faq !== item) {
              faq.classList.remove("active");
          }
      });

      // Toggle the clicked FAQ item
      item.classList.toggle("active");
  });
});
















