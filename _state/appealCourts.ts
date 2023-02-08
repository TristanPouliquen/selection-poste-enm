import { atom, selectorFamily, useSetRecoilState } from "recoil";
import { AppealCourt } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

const appealCourtsAtom = atom<AppealCourt[]>({
  key: "appealCourts",
  default: [],
});

const appealCourtSelector = selectorFamily({
  key: "appealCourtSelector",
  get:
    (id) =>
    ({ get }) =>
      get(appealCourtsAtom).find((appealCourt) => appealCourt.id === id),
});

const useAppealCourtsAction = () => {
  const setAppealCourts = useSetRecoilState(appealCourtsAtom);
  const getAll = async () => {
    setAppealCourts(await invoke<AppealCourt[]>("get_appeal_courts"));
  };
  return { getAll };
};

export { appealCourtsAtom, appealCourtSelector, useAppealCourtsAction };
