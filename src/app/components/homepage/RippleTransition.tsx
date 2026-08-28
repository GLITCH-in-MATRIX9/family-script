"use client";

import type { RippleSource } from "./RippleEngine";

/*
 * Kept for compatibility with older homepage experiments.
 *
 * Ripple navigation is now controlled by HomepageNavigator so a wheel/touch
 * gesture triggers one complete section-to-section transition instead of
 * scrubbing the ripple with scroll position.
 */

export interface RippleTransitionProps {
  triggerRef?: React.RefObject<HTMLElement | null>;
  beforeVideoRef?: React.RefObject<HTMLVideoElement | null>;
  beforeImageSrc?: string;
  afterImageSrc?: string;
  before?: RippleSource;
  after?: RippleSource;
  afterTint?: string;
  originX?: number;
  originY?: number;
  strength?: number;
  speed?: number;
}

export default function RippleTransition(_: RippleTransitionProps) {
  return null;
}
