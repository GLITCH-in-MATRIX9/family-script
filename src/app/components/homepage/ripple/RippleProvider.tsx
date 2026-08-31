"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import RippleCanvas, {
  type RippleCanvasHandle,
} from "./RippleCanvas";

import {
  runRippleTransition,
  type RippleTransitionOptions,
} from "./RippleTransition";

/* ============================================================
   TYPES
============================================================ */

interface RippleContextValue {
  playTransition: (
    options: RippleTransitionOptions,
  ) => Promise<void>;

  cancelTransition: () => void;

  isTransitioning: boolean;
}

interface RippleProviderProps {
  children: React.ReactNode;
}

/* ============================================================
   CONTEXT
============================================================ */

const RippleContext =
  createContext<RippleContextValue | null>(
    null,
  );

/* ============================================================
   RESTORE DOCUMENT SCROLL
============================================================ */

/*
 * Ripple navigation temporarily locks scrolling while the
 * ripple animation is running.
 *
 * This function is intentionally defensive.
 *
 * If the user navigates away from the homepage while a ripple
 * is running, we NEVER want the scroll lock to leak into the
 * next page.
 */

function restoreDocumentScroll() {
  if (typeof document === "undefined") {
    return;
  }

  document.body.style.removeProperty(
    "overflow",
  );

  document.body.style.removeProperty(
    "touch-action",
  );

  document.documentElement.style.removeProperty(
    "overflow",
  );

  document.documentElement.style.removeProperty(
    "touch-action",
  );
}

/* ============================================================
   PROVIDER
============================================================ */

export function RippleProvider({
  children,
}: RippleProviderProps) {
  const canvasRef =
    useRef<RippleCanvasHandle | null>(
      null,
    );

  const mountedRef =
    useRef(false);

  const transitionIdRef =
    useRef(0);

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(false);

  /* ==========================================================
     PLAY TRANSITION
  ========================================================== */

  const playTransition =
    useCallback(
      async (
        options: RippleTransitionOptions,
      ) => {
        /*
         * Don't start a transition after the provider
         * has already been unmounted.
         */
        if (!mountedRef.current) {
          return;
        }

        const canvas =
          canvasRef.current;

        if (!canvas) {
          console.warn(
            "RippleCanvas is not ready.",
          );

          return;
        }

        /*
         * Every transition receives a unique ID.
         *
         * If another transition starts or the provider
         * unmounts, the old transition becomes invalid.
         */
        transitionIdRef.current += 1;

        const transitionId =
          transitionIdRef.current;

        setIsTransitioning(true);

        try {
          await runRippleTransition(
            canvas,
            options,
          );
        } catch (error) {
          /*
           * A cancelled transition can throw depending on
           * the implementation of RippleTransition.
           *
           * We don't want that to break page navigation.
           */
          console.error(
            "Ripple transition failed:",
            error,
          );
        } finally {
          /*
           * IMPORTANT:
           *
           * Always restore scrolling when the transition
           * finishes.
           */
          restoreDocumentScroll();

          /*
           * Only update React state if this is still the
           * current mounted provider.
           */
          if (
            mountedRef.current &&
            transitionId ===
              transitionIdRef.current
          ) {
            setIsTransitioning(
              false,
            );
          }
        }
      },
      [],
    );

  /* ==========================================================
     CANCEL TRANSITION
  ========================================================== */

  const cancelTransition =
    useCallback(() => {
      /*
       * Invalidate the currently running transition.
       */
      transitionIdRef.current += 1;

      /*
       * Cancel the canvas animation.
       */
      canvasRef.current?.cancelTransition();

      /*
       * Immediately restore normal document scrolling.
       */
      restoreDocumentScroll();

      /*
       * Update transition state.
       */
      if (mountedRef.current) {
        setIsTransitioning(
          false,
        );
      }
    }, []);

  /* ==========================================================
     MOUNT / UNMOUNT
  ========================================================== */

  useEffect(() => {
    mountedRef.current = true;

    /*
     * Defensive cleanup when the provider mounts.
     *
     * This handles the case where another transition left a
     * stale inline style behind during development/HMR.
     */
    restoreDocumentScroll();

    return () => {
      /*
       * Mark provider as unmounted FIRST.
       */
      mountedRef.current = false;

      /*
       * Invalidate all currently running transitions.
       */
      transitionIdRef.current += 1;

      /*
       * Stop the ripple canvas.
       */
      canvasRef.current?.cancelTransition();

      /*
       * CRITICAL:
       *
       * Never allow ripple navigation to leave the document
       * locked when leaving the homepage.
       */
      restoreDocumentScroll();
    };
  }, []);

  /* ==========================================================
     CONTEXT VALUE
  ========================================================== */

  const contextValue: RippleContextValue = {
    playTransition,
    cancelTransition,
    isTransitioning,
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <RippleContext.Provider
      value={contextValue}
    >
      {children}

      {/*
       * The canvas is an overlay only.
       *
       * RippleCanvas itself should have:
       *
       * pointer-events-none
       *
       * so it never blocks normal page interaction.
       */}
      <RippleCanvas
        ref={canvasRef}
      />
    </RippleContext.Provider>
  );
}

/* ============================================================
   HOOK
============================================================ */

export function useRipple() {
  const context =
    useContext(
      RippleContext,
    );

  if (!context) {
    throw new Error(
      "useRipple must be used inside RippleProvider.",
    );
  }

  return context;
}

/* ============================================================
   DEFAULT EXPORT
============================================================ */

export default RippleProvider;