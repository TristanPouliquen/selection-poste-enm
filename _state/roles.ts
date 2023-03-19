import {
  atom,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
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
  const [roles, setRoles] = useRecoilState(rolesAtom);
  const getAll = async () => {
    setRoles(await invoke<Role[]>("get_roles"));
  };

  const update = async (role: Role) => {
    const updated = await invoke<Role>("update_role", { role });
    setRoles(roles.map((r) => (r.id === updated.id ? updated : r)));
  };
  return { update, getAll };
};

export { rolesAtom, roleSelector, useRolesAction };
