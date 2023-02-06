import { atom } from "recoil";
import { Position } from "@/types/types";

const positionsAtom = atom<Position[]>({
  key: "positionsAtom",
  default: [],
});

const currentPositionAtom = atom<Position | undefined>({
  key: "currentPositionAtom",
  default: undefined,
});

export { positionsAtom, currentPositionAtom };
