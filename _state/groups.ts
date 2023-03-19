import {
  atom,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { Group, Tag } from "@/types/types";
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
  const [groups, setGroups] = useRecoilState(groupsAtom);
  const getAll = async () => {
    setGroups(await invoke<Group[]>("get_groups"));
  };
  const update = async (group: Group) => {
    const updated = await invoke<Group>("update_group", { group });
    setGroups(groups.map((g) => (g.id === updated.id ? updated : g)));
  };
  return { getAll, update };
};

export { groupsAtom, groupSelector, useGroupsAction };
