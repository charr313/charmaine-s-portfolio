// document.addEventListener("DOMContentLoaded", function () {
//     const sections = document.querySelectorAll("section");
//     const navLinks = document.querySelectorAll(".navbar-item a");

//     function changeActiveNav() {
//         let fromTop = window.scrollY;

//         sections.forEach((section, index) => {
//             const sectionTop = section.offsetTop - 60;
//             const sectionHeight = section.clientHeight;

//             if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
//                 navLinks.forEach((link) => link.classList.remove("active"));
//                 navLinks[index].classList.add("active");
//             }
//         });
//     }

//     window.addEventListener("scroll", changeActiveNav);
// });
