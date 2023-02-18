import { atom, selectorFamily, useRecoilState } from "recoil";
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
  const [appealCourts, setAppealCourts] = useRecoilState(appealCourtsAtom);
  const getAll = async () => {
    setAppealCourts(await invoke<AppealCourt[]>("get_appeal_courts"));
  };

  const update = async (appealCourt: AppealCourt) => {
    const updated = await invoke<AppealCourt>("update_appeal_court", {
      appealCourt,
    });
    setAppealCourts(
      appealCourts.map((ac) => (ac.id == updated.id ? updated : ac))
    );
  };
  return { getAll, update };
};

export { appealCourtsAtom, appealCourtSelector, useAppealCourtsAction };
