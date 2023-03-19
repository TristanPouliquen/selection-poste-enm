import { Position, Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { atom, selector, selectorFamily, useRecoilState } from "recoil";
import { tagsAtom } from "@/_state/tags";
import { tribunalSelector } from "@/_state/tribunals";
import { roleSelector } from "@/_state/roles";
import { ICriteria } from "@/components/Onboarding";
import { activeAppStateAtom, IAdvancedFilter } from "@/_state/appState";

const filterPosition = (
  position: Position,
  filters: string[],
  advanced: IAdvancedFilter[]
) => {
  const results = filters.map((filter) => {
    switch (filter) {
      case "tooFar":
        if (position.tribunal && position.tribunal.timeWindow) {
          return !position.tribunal.timeWindow.tooFar;
        }
        return true;
      case "taken":
        return !position.taken;
    }
    return true;
  });
  const roleResults = advanced
    .filter((filter) => filter.type === "role")
    .map((filter) => position.roleId === filter.value);
  const groupResults = advanced
    .filter((filter) => filter.type === "group")
    .map((filter) => position.tribunal?.groupId === filter.value);
  const appealCourtResults = advanced
    .filter((filter) => filter.type === "appealCourt")
    .map((filter) => position.tribunal?.appealCourtId === filter.value);
  const tribunalResults = advanced
    .filter((filter) => filter.type === "tribunal")
    .map((filter) => position.tribunalId === filter.value);
  return (
    results.every((v) => v) &&
    (roleResults.length === 0 || roleResults.includes(true)) &&
    (groupResults.length === 0 || groupResults.includes(true)) &&
    (appealCourtResults.length === 0 || appealCourtResults.includes(true)) &&
    (tribunalResults.length === 0 || tribunalResults.includes(true))
  );
};

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
    const activeAppState = get(activeAppStateAtom);
    return [...positions]
      .map(
        (position: Position) => get(positionSelector(position.id)) ?? position
      )
      .filter((position) =>
        filterPosition(
          position,
          activeAppState.filters,
          activeAppState.advanced
        )
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
    const sortDataInput = formatCriteriaForApi(criteria);

    await invoke("rank_positions", { sortDataInput });

    await getAll();
  };

  return {
    getAll,
    update,
    updateRanking,
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
