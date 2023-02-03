import { atom } from "recoil";
import { Group } from "@/types/types";

const groupsAtom = atom<Group[]>({
  key: "groupsAtom",
  default: [],
});

export { groupsAtom };
