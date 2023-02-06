import { atom } from "recoil";
import { AppealCourt } from "@/types/types";

const appealCourtsAtom = atom<AppealCourt[]>({
  key: "appealCourts",
  default: [],
});

export { appealCourtsAtom };
