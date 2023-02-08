import { atom, useSetRecoilState } from "recoil";
import { AppState } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

const appStateAtom = atom<AppState | undefined>({
  key: "appState",
  default: undefined,
});

const useAppStateAction = () => {
  const setAppState = useSetRecoilState(appStateAtom);

  const get = async () => {
    setAppState(await invoke<AppState>("get_app_state"));
  };

  const update = async () => {
    setAppState(await invoke<AppState>("update_app_state"));
  };

  return { get, update };
};

export { appStateAtom, useAppStateAction };
