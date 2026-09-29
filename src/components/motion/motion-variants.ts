import { Variants, Transition } from "framer-motion";

// Spring presets
export const smoothSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const snappySpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

export const gentleSpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 24,
};

export const easeOutQuad = [0.25, 1, 0.5, 1] as const;

// Staggered Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Fade Up Variant
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOutQuad,
    },
  },
};

// Fade In Variant
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

// Scale & Fade Variant
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: easeOutQuad,
    },
  },
};

// Card Hover micro-interaction
export const cardHoverMotion = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.99,
  },
};

// Modal Animation
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};
