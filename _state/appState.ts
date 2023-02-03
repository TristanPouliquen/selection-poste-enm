import { atom } from "recoil";
import { AppState } from "@/types/types";

const appStateAtom = atom<AppState | undefined>({
  key: "appState",
  default: undefined,
});

export { appStateAtom };
