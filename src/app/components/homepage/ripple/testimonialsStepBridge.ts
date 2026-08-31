// Plain mutable ref (not React context) connecting the Testimonials
// homepage section to useRippleNavigation's wheel handler. HomepageNavigator
// passes `children` opaquely, so there's no prop path from page.tsx into
// the ripple hook — this is the smallest surface that bridges the two.
export interface TestimonialsStepController {
  getPairIndex: () => number;
  getPairCount: () => number;
  isAnimating: () => boolean;
  stepForward: () => void;
  stepBackward: () => void;
  enterFromStart: () => void; // snap to pair 0, no tween
  enterFromEnd: () => void; // snap to last pair, no tween
}

export const testimonialsStepRef: {
  current: TestimonialsStepController | null;
} = { current: null };
