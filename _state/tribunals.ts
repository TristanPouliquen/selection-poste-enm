import { atom } from "recoil";
import { Tribunal } from "@/types/types";

const tribunalsAtom = atom<Tribunal[]>({
  key: "tribunalsAtom",
  default: [],
});

export { tribunalsAtom };
