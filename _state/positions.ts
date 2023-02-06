import { atom, useRecoilState } from "recoil";
import { Position, Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api";
import { tagsAtom } from "@/_state/tags";

const positionsAtom = atom<Position[]>({
  key: "positionsAtom",
  default: [],
});

const currentPositionAtom = atom<Position | undefined>({
  key: "currentPositionAtom",
  default: undefined,
});

const usePositionsActions = () => {
  const [positions, setPositions] = useRecoilState(positionsAtom);
  const [tags, setTags] = useRecoilState(tagsAtom);
  const getAll = async () => {
    setPositions(await invoke<Position[]>("get_positions"));
  };
  const update = async (position: Position) => {
    const updatedPosition = await invoke<Position>("update_position", {
      position,
    });
    setPositions(
      positions.map((position) =>
        position.id === updatedPosition.id ? updatedPosition : position
      )
    );
  };
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

  return { getAll, update, getTags, addTag, removeTag };
};

export { positionsAtom, currentPositionAtom, usePositionsActions };
