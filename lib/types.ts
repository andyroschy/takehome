export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export type Maybe<T> = { ok: true } | { ok: false; error: T };

// TODO: move to session cookies
export const currentUser = "964338a9-c98f-4da0-af97-43f51f28bfbb";
