import { EventEmitter } from "events";

export const authEvents = new EventEmitter();

export const AUTH_EVENTS = {
  USER_REGISTERED: "auth.user_registered",
  SESSION_CREATED: "session.created",
  SESSION_DESTROYED: "session.destroyed",
} as const;