export const AI = "O";
export const PLAYER = "X";
export const FIRST_PLAYER = AI;
export const SECOND_PLAYER = PLAYER

export const DRAW = "DRAW";
export type Draw = typeof DRAW;

export type Board = Array<Players | "">;
export type Players = typeof AI | typeof PLAYER;
export type Winner =
    | { winner: Players; pos: { a: number; b: number; c: number } }
    | Draw
    | undefined;
