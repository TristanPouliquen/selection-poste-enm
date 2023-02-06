import { atom } from "recoil";
import { Tag } from "@/types/types";

const tagsAtom = atom<Tag[]>({
  key: "tagsAtom",
  default: [],
});

export { tagsAtom };
