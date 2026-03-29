// Header interactive message config.
export const HEADER_ANIM = {
  icon: {
    leave: {
      duration: 0.3,
      ease: "power2.in",
      yPercent: 101
    },
    enter: {
      duration: 0.5,
      ease: "power2",
      yPercent: 0
    }
  },
  msg: {
    leave: {
      duration: 0.3,
      stagger: {
        amount: 0.03,
        ease: "power1.out"
      },
      ease: "power2.in",
      yPercent: -101
    },
    enter: {
      duration: 0.6,
      stagger: {
        amount: 0.1,
        ease: "power1.out"
      },
      ease: "power2",
      yPercent: 0
    }
  }
};