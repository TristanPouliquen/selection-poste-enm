import { atom, selectorFamily, useSetRecoilState } from "recoil";
import { Role } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

const rolesAtom = atom<Role[]>({
  key: "rolesAtom",
  default: [],
});

const roleSelector = selectorFamily({
  key: "rolesSelector",
  get:
    (id) =>
    ({ get }) =>
      get(rolesAtom).find((role) => role.id === id),
});

const useRolesAction = () => {
  const setRoles = useSetRecoilState(rolesAtom);
  const getAll = async () => {
    setRoles(await invoke<Role[]>("get_roles"));
  };

  return { getAll };
};

export { rolesAtom, roleSelector, useRolesAction };
