import { Position, Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { atom, selector, selectorFamily, useRecoilState } from "recoil";
import { tagsAtom } from "@/_state/tags";
import { tribunalSelector } from "@/_state/tribunals";
import { roleSelector } from "@/_state/roles";
import { ICriteria } from "@/components/Onboarding";

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
  get: ({ get }): Position[] => {
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
    ({ get }): Position | undefined => {
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

const formatCriteriaForApi = (criteria: ICriteria) => {
  return {
    positive: criteria.positive.map((criterion) => ({
      name: criterion.name,
      value: Array.isArray(criterion.value)
        ? criterion.value.map((item: any) => item.id)
        : criterion.value.value,
    })),
    negative: criteria.negative.map((criterion) => ({
      name: criterion.name,
      value: Array.isArray(criterion.value)
        ? criterion.value.map((item: any) => item.id)
        : criterion.value.value,
    })),
  };
};

const usePositionsActions = () => {
  const [positions, setPositions] = useRecoilState(positionsAtom);
  const [tags, setTags] = useRecoilState(tagsAtom);
  const getAll = async () => {
    const result = await invoke<Position[]>("get_positions");
    setPositions(result);
  };

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
    const tags = await invoke<Tag[]>("get_position_tags", { position });
    setPositions(
      positions.map((pos) => (position.id === pos.id ? { ...pos, tags } : pos))
    );
  };
  const addTag = async (position: Position, tag: Tag) => {
    await invoke("add_position_tag", { position, tag });
    const newPosition = await invoke<Position>("get_position", {
      id: position.id,
    });
    setPositions(
      positions.map((pos) => (pos.id === position.id ? newPosition : pos))
    );
  };
  const removeTag = async (position: Position, tag: Tag) => {
    const result = await invoke<boolean>("remove_position_tag", {
      position,
      tag,
    });
    const newPosition = await invoke<Position>("get_position", {
      id: position.id,
    });
    setPositions(
      positions.map((pos) => (pos.id === position.id ? newPosition : pos))
    );
    if (!result) {
      // Tag has been deleted from database because it was the last occurence
      setTags(tags.filter((t) => t.id !== tag.id));
    }
  };

  const rankPositions = async (criteria: ICriteria) => {
    // TODO Vladimir : remplacer le nom de la commande et du paramètre
    const sortDataInput = formatCriteriaForApi(criteria);
    await invoke("rank_positions", { sortDataInput });

    await getAll();
  };

  return {
    getAll,
    update,
    updateRanking,
    getTags,
    addTag,
    removeTag,
    rankPositions,
  };
};

export {
  positionsAtom,
  positionsSelector,
  currentPositionIdAtom,
  positionSelector,
  usePositionsActions,
};
