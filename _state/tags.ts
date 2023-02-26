import { atom, selectorFamily, useRecoilState } from "recoil";
import { Tag } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

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

  const getAll = async () => {
    setTags(await invoke<Tag[]>("get_tags"));
  };

  const create = async (newTag: Partial<Tag>) => {
    const tag = await invoke<Tag>("create_tag", { tag: newTag });
    setTags([...tags, tag]);
    return tag;
  };
  return { getAll, create };
};

export { tagsAtom, tagSelector, useTagsAction };
