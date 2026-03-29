import { gsap } from "gsap";
import { HEADER_ANIM } from "./animations/tokens";

function initHeaders() {
  const headers = document.querySelectorAll('.header');
  if (!headers.length) return;

  headers.forEach(header => {
    // HEADER ANIM.

    // Display config.
    const DISPLAY = {
      artemotif: {
        icon: "artemotif",
        msg: "What on earth am I doing?"
      },
      open_menu: {
        icon: "arrow-up",
        msg: "Open Menu"
      },
    }

    // DOM refs
    const hoverZone = header.querySelector("[data-hover-zone]");
    const iconWrapper = header.querySelector(".header__icon");
    const msgWrapper = header.querySelector(".header__msg");

    if (hoverZone && iconWrapper && msgWrapper) {
      const activeIcon = iconWrapper.querySelector(".active");
      const ghostIcon = iconWrapper.querySelector(".ghost");
      const activeMsg = msgWrapper.querySelector(".active");
      const ghostMsg = msgWrapper.querySelector(".ghost");

      // State variables
      let current = "artemotif";
      let iconTL, msgTL;

      let isAnimating = false;
      let hoverState = "idle";

      // Update icon
      function updateIcon(name) {
        const iconName = DISPLAY[name].icon;
        ghostIcon.innerHTML = `<svg class="icon icon--xl"><use href="#icon-${iconName}"/></svg>`;

        gsap.set(ghostIcon, {
          yPercent: -101,
          opacity: 1
        });

        if (iconTL) iconTL.kill();
        iconTL = gsap.timeline();

        iconTL
        .to(activeIcon, HEADER_ANIM.icon.leave)
        .to(ghostIcon, HEADER_ANIM.icon.enter, "<0.2")
        .add(() => {
          activeIcon.innerHTML = ghostIcon.innerHTML;
          gsap.set(activeIcon, { yPercent: 0 });
          gsap.set(ghostIcon, { opacity: 0 });
        });
      }

      // Update message
      function updateMsg(name) {
        const words = DISPLAY[name].msg.split(" ");
        ghostMsg.innerHTML = words.map(word => `<span class="_word">${word}</span>`).join(" ");

        gsap.set(ghostMsg.children, {
          yPercent: 101,
          opacity: 1
        });

        if (msgTL) msgTL.kill();
        msgTL = gsap.timeline();

        msgTL
        .to(activeMsg.children, HEADER_ANIM.msg.leave)
        .to(ghostMsg.children, HEADER_ANIM.msg.enter, "<0.23")
        .add(() => {
          activeMsg.innerHTML = ghostMsg.innerHTML;
          gsap.set(activeMsg.children, { yPercent: 0 })
          gsap.set(ghostMsg.children, {opacity: 0 });
        });
      }

      // Combined trigger
      function handleEnter() {
        if (isAnimating || hoverState === "entered") return;
        hoverState = "entered";
        runTransition("open_menu");
      }

      function handleLeave() {
        if (isAnimating || hoverState === "left") return;
        hoverState = "left";
        runTransition("artemotif");
      }

      function runTransition(next) {
        isAnimating = true;

        // perform anim
        updateIcon(next);
        updateMsg(next);

        // update logical state after anim
        current = next;

        // unlock after anims finish
        gsap.delayedCall(0.05, () => {
          isAnimating = false;
        });
      }

      // Handlers
      hoverZone.addEventListener("mouseenter", handleEnter);
      hoverZone.addEventListener("mouseleave", handleLeave);

      // Init. animation
      updateIcon("artemotif");
      updateMsg("artemotif");
    };
    
    // TOGGLE MENU
    console.log(header);

    // DOM refs
    const toggleMenuBtn = header.querySelector('.header__toggle');
    const openMenuBtn = header.querySelector('.open__menu');
    const closeMenuBtn = header.querySelector('.close__menu');
    const menu = header.querySelector('.menu');

    if (!menu) return;

    if (toggleMenuBtn) {
      console.log(toggleMenuBtn);
      console.log(openMenuBtn);
      console.log(closeMenuBtn);
      function toggleMenu() {
        const isOpen = header.classList.toggle('is-open');
        toggleMenuBtn.setAttribute('aria-expanded', isOpen);
        menu.setAttribute('aria-hidden', !isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
      }

      toggleMenuBtn.addEventListener('click', toggleMenu);
      
      menu.addEventListener('click', e => {
        if (e.target.closest('a')) {
          header.classList.remove('is-open');
          toggleMenuBtn.setAttribute('aria-expanded', false);
          menu.setAttribute('aria-hidden', true);
          document.body.classList.remove('no-scroll');   
        }
      });
    } else if (openMenuBtn && closeMenuBtn) {
      console.log(openMenuBtn);
      console.log(closeMenuBtn);
      function openMenu() {
        header.classList.add('is-open');
        menu.setAttribute('aria-hidden', false);
        document.body.classList.add('no-scroll', true);
      }

      function closeMenu() {
        header.classList.remove('is-open');
        menu.setAttribute('aria-hidden', true);
        document.body.classList.remove('no-scroll')
      }

      openMenuBtn.addEventListener('click', openMenu);
      closeMenuBtn.addEventListener('click', closeMenu);
      menu.addEventListener('click', e => {
        if (e.target.closest('a')) {
          closeMenu(); 
        }
      });
    }
  });
}

export default initHeaders;