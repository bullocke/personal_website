'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// focalareas variables
const focalareasItem = document.querySelectorAll("[data-focalareas-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// expertise variables
const expertiseItem = document.querySelectorAll("[data-expertise-item]");
const expertiseModalContainer = document.querySelector("[data-expertise-modal-container]");
// const expertiseModalCloseBtn = document.querySelector("[data-expertise-modal-close-btn]");
// const expertiseOverlay = document.querySelector("[data-expertise-overlay]");



const expertiseModalImg = document.querySelector("[data-expertise-modal-img]");
const expertiseModalTitle = document.querySelector("[data-expertise-modal-title]");
const expertiseModalText = document.querySelector("[data-expertise-modal-text]");

// modal toggle function
const focalareasModalFunc = function () {
  modalContainer.classList.toggle("active");

  overlay.classList.toggle("active");
  // focalareasItem.classList.toggle("active");
}

// modal toggle expertise function
const expertiseModalFunc = function () {
  expertiseModalContainer.classList.toggle("active");
  // expertiseOverlay.classList.toggle("active");
}

// Doing it differently for reesarch
// Get the modals
var modalexps = [
  document.getElementById("modalexp1"),
  // document.getElementById("modal2"),
  // document.getElementById("modal3"),
  // document.getElementById("modal4"),
  // document.getElementById("modal5")
];

// Get the buttons that open the modals
// var btns = [
//   document.getElementById("project1"),
//   // document.getElementById("project2"),
//   // document.getElementById("project3"),
//   // document.getElementById("project4"),
//   // document.getElementById("project5")
// ];

// // Get the <span> elements that close the modals
// var spans = document.getElementsByClassName("close");

// // Loop through the buttons array
// for(let i = 0; i < btns.length; i++) {
//   // When the user clicks the button, open the modal 
//   btns[i].onclick = function() {
//     document.body.appendChild(modalexps[i]);  // Move the modal to the body
//     modalexps[i].style.display = "block";
//   }

//   // When the user clicks on <span> (x), close the modal
//   spans[i].onclick = function() {
//     btns[i].appendChild(modalexps[i]);  // Move the modal back to the li
//     modalexps[i].style.display = "none";
//   }
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   for(let i = 0; i < modalexps.length; i++) {
//     if (event.target == modalexps[i]) {
//       btns[i].appendChild(modalexps[i]);  // Move the modal back to the li
//       modalexps[i].style.display = "none";
//     }
//   }
// }



// add click event to all testimonial modal items
for (let i = 0; i < focalareasItem.length; i++) {

  focalareasItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-focalareas-avatar]").src;
    modalImg.alt = this.querySelector("[data-focalareas-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-focalareas-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-focalareas-text]").innerHTML;

    focalareasModalFunc();

  });

}


// add click event to all expertise modal items
for (let i = 0; i < expertiseItem.length; i++) {

  expertiseItem[i].addEventListener("click", function () {

    expertiseModalImg.src = this.querySelector("[data-expertise-avatar]").src;
    expertiseModalImg.alt = this.querySelector("[data-expertise-avatar]").alt;
    expertiseModalTitle.innerHTML = this.querySelector("[data-expertise-title]").innerHTML;
    expertiseModalText.innerHTML = this.querySelector("[data-expertise-text]").innerHTML;

    expertiseModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", focalareasModalFunc);
overlay.addEventListener("click", focalareasModalFunc);

// expertiseModalCloseBtn.addEventListener("click", expertiseModalFunc);
// expertiseOverlay.addEventListener("click", expertiseModalFunc);



// // custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-select-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// Contact map has to be here to make it easier to reload
var contactmap = L.map('mapcontact', {
}).setView([40.7608, -111.8910], 10);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
OpenTopoMap.addTo(contactmap);

var box = L.control({position: 'topright'});

// The first line of the box says 'Salt Lake City' in bold
box.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'box');
    this.update();
    return this._div;
}

// The second line of the box says 'Utah' in normal text
box.update = function (props) {
    this._div.innerHTML = '<h4>Salt Lake City</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Utah');
}

box.addTo(contactmap);


// page navigation variables // here is where i fix something
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {

      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        if (this.innerHTML.toLowerCase() == 'contact') {
          contactmap.invalidateSize();
          OpenTopoMap.redraw();
        }
        // cmap.invalidateSize();
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}