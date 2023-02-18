import { atom, selectorFamily, useRecoilState } from "recoil";
import { Tribunal } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { appealCourtSelector } from "@/_state/appealCourts";
import { groupSelector } from "@/_state/groups";
import { timeWindowSelector } from "@/_state/timeWindow";

const tribunalsAtom = atom<Tribunal[]>({
  key: "tribunalsAtom",
  default: [],
});

const tribunalSelector = selectorFamily({
  key: "tribunalsSelector",
  get:
    (id) =>
    ({ get }) => {
      const tribunal = get(tribunalsAtom).find(
        (tribunal) => tribunal.id === id
      );
      if (tribunal === undefined) {
        return undefined;
      }
      const appealCourt = get(appealCourtSelector(tribunal.appealCourtId));
      const group = get(groupSelector(tribunal.groupId));
      const timeWindow = tribunal.timeTo
        ? get(timeWindowSelector(tribunal.timeTo))
        : undefined;
      return { ...tribunal, appealCourt, group, timeWindow };
    },
});

const useTribunalsAction = () => {
  const [tribunals, setTribunals] = useRecoilState(tribunalsAtom);
  const getAll = async () => {
    setTribunals(await invoke<Tribunal[]>("get_tribunals"));
  };
  const update = async (tribunal: Tribunal) => {
    const updatedTribunal = await invoke<Tribunal>("update_tribunal", {
      tribunal,
    });
    setTribunals(
      tribunals.map((t) => (t.id === updatedTribunal.id ? updatedTribunal : t))
    );
  };

  return { getAll, update };
};

export { tribunalsAtom, tribunalSelector, useTribunalsAction };
