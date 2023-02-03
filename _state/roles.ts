import { atom } from "recoil";
import { Role } from "@/types/types";

const rolesAtom = atom<Role[]>({
  key: "rolesAtom",
  default: [],
});

export { rolesAtom };
