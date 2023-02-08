import { atom, selectorFamily, useSetRecoilState } from "recoil";
import { Group } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

const groupsAtom = atom<Group[]>({
  key: "groupsAtom",
  default: [],
});

const groupSelector = selectorFamily({
  key: "groupSelector",
  get:
    (id) =>
    ({ get }) =>
      get(groupsAtom).find((group) => group.id === id),
});

const useGroupsAction = () => {
  const setGroups = useSetRecoilState(groupsAtom);
  const getAll = async () => {
    setGroups(await invoke<Group[]>("get_groups"));
  };
  return { getAll };
};

export { groupsAtom, groupSelector, useGroupsAction };
