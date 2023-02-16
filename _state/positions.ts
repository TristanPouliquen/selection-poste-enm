import { Position, Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { atom, selector, selectorFamily, useRecoilState } from "recoil";
import { tagsAtom } from "@/_state/tags";
import { tribunalSelector } from "@/_state/tribunals";
import { roleSelector } from "@/_state/roles";

const positionsAtom = atom<Position[]>({
  key: "positionsAtom",
  default: [],
});

const currentPositionIdAtom = atom<number | undefined>({
  key: "currentPositionIdAtom",
  default: undefined,
});

const positionsSelector = selector({
  key: "positionsSelector",
  get: ({ get }) => {
    const positions = get(positionsAtom);
    return [...positions].map(
      (position: Position) => get(positionSelector(position.id)) ?? position
    );
  },
  set: ({ set }, newValue) => set(positionsAtom, newValue),
});

const positionSelector = selectorFamily({
  key: "positionSelector",
  get:
    (id) =>
    ({ get }) => {
      if (id === undefined) {
        return undefined;
      }
      const position = get(positionsAtom).find(
        (position) => position.id === id
      );
      if (position === undefined) {
        return undefined;
      }
      const tribunal = get(tribunalSelector(position.tribunalId));
      const role = get(roleSelector(position.roleId));

      return { ...position, tribunal, role };
    },
});

const usePositionsActions = () => {
  const [positions, setPositions] = useRecoilState(positionsAtom);
  const [tags, setTags] = useRecoilState(tagsAtom);
  const getAll = async () =>
    setPositions(await invoke<Position[]>("get_positions"));

  const update = async (position: Position) => {
    const updatedPosition = await invoke<Position>("update_position", {
      position,
    });
    setPositions(
      positions.map((p) => (p.id === updatedPosition.id ? updatedPosition : p))
    );
  };

  const updateRanking = async (position: Position) =>
    setPositions(await invoke("update_position_ranking", { position }));
  const getTags = async (position: Position) => {
    const tags = await invoke<Tag[]>("get_position_tagss", { position });
    setPositions(
      positions.map((pos) => (position.id === pos.id ? { ...pos, tags } : pos))
    );
  };
  const addTag = async (position: Position, tag: Tag) => {
    await invoke("add_position_tag", { position, tag });
    setPositions(
      positions.map((pos) =>
        pos.id === position.id
          ? { ...pos, tags: [...(pos.tags ?? []), tag] }
          : pos
      )
    );
  };
  const removeTag = async (position: Position, tag: Tag) => {
    const result = await invoke<Tag>("remove_position_tag", { position, tag });
    setPositions(
      positions.map((pos) =>
        pos.id === position.id
          ? { ...pos, tags: (pos.tags ?? []).filter((t) => t.id !== tag.id) }
          : pos
      )
    );
    if (null === result) {
      // Tag has been deleted from database because it was the last occurence
      setTags(tags.filter((t) => t.id !== tag.id));
    }
  };

  return { getAll, update, updateRanking, getTags, addTag, removeTag };
};

export {
  positionsSelector,
  currentPositionIdAtom,
  positionSelector,
  usePositionsActions,
};
