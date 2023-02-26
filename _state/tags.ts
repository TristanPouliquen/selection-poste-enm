import { atom, selectorFamily, useRecoilState } from "recoil";
import { Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { positionsAtom } from "@/_state/positions";

const tagsAtom = atom<Tag[]>({
  key: "tagsAtom",
  default: [],
});

const tagSelector = selectorFamily({
  key: "tagSelector",
  get:
    (id) =>
    ({ get }) =>
      get(tagsAtom).find((tag) => tag.id === id),
});

const useTagsAction = () => {
  const [tags, setTags] = useRecoilState(tagsAtom);
  const [positions, setPositions] = useRecoilState(positionsAtom);
  const getAll = async () => {
    setTags(await invoke<Tag[]>("get_tags"));
  };

  const create = async (newTag: Partial<Tag>) => {
    const tag = await invoke<Tag>("create_tag", { tag: newTag });
    setTags([...tags, tag]);
    return tag;
  };

  const update = async (tag: Tag) => {
    const updated = await invoke<Tag>("update_tag", { tag });
    setTags(tags.map((t) => (t.id === updated.id ? updated : t)));
    setPositions(
      positions.map((position) => ({
        ...position,
        tags: (position.tags ?? []).map((t) =>
          t.id === updated.id ? updated : t
        ),
      }))
    );
  };

  const remove = async (tag: Tag) => {
    const result = await invoke<boolean>("delete_tag", { tag });
    if (result) {
      setTags(tags.filter((t) => t.id !== tag.id));
      setPositions(
        positions.map((position) => ({
          ...position,
          tags: (position.tags ?? []).filter((t) => t.id !== tag.id),
        }))
      );
    }
  };
  return { getAll, create, update, remove };
};

export { tagsAtom, tagSelector, useTagsAction };
