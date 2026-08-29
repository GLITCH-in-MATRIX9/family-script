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
    useRef(true);

  const transitionIdRef =
    useRef(0);

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(false);

  /* ==========================================================
     PLAY
  ========================================================== */

  const playTransition =
    useCallback(
      async (
        options: RippleTransitionOptions,
      ) => {
        const canvas =
          canvasRef.current;

        if (!canvas) {
          console.warn(
            "RippleCanvas is not ready.",
          );

          return;
        }

        transitionIdRef.current += 1;

        const id =
          transitionIdRef.current;

        setIsTransitioning(
          true,
        );

        try {
          await runRippleTransition(
            canvas,
            options,
          );
        } catch (error) {
          console.error(
            "Ripple transition failed:",
            error,
          );
        } finally {
          if (
            mountedRef.current &&
            id ===
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
     CANCEL
  ========================================================== */

  const cancelTransition =
    useCallback(() => {
      transitionIdRef.current += 1;

      canvasRef.current?.cancelTransition();

      setIsTransitioning(
        false,
      );
    }, []);

  /* ==========================================================
     CLEANUP
  ========================================================== */

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      transitionIdRef.current += 1;

      canvasRef.current?.cancelTransition();
    };
  }, []);

  return (
    <RippleContext.Provider
      value={{
        playTransition,
        cancelTransition,
        isTransitioning,
      }}
    >
      {children}

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

export default RippleProvider;