import { atom, useSetRecoilState } from "recoil";
import { AppState } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

export interface IAdvancedFilter {
  label: string;
  type: "tribunal" | "appealCourt" | "role" | "group";
  value: number;
}
type ActiveAppState = {
  filters: string[];
  advanced: IAdvancedFilter[];
  colorScheme: "default" | "role" | "appealCourt" | "timeTo" | "group";
};

const appStateAtom = atom<AppState | undefined>({
  key: "appState",
  default: undefined,
});

const activeAppStateAtom = atom<ActiveAppState>({
  key: "activeAppState",
  default: {
    filters: [],
    advanced: [],
    colorScheme: "default",
  },
});

const useAppStateAction = () => {
  const setAppState = useSetRecoilState(appStateAtom);

  const get = async () => {
    setAppState(await invoke<AppState>("get_app_state"));
  };

  const update = async (appState: AppState) => {
    setAppState(await invoke<AppState>("update_app_state", { appState }));
  };

  return { get, update };
};

export { activeAppStateAtom, appStateAtom, useAppStateAction };
