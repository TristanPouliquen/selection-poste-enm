import { useRecoilValue } from "recoil";
import { useGroupsAction } from "@/_state/groups";
import { useAppealCourtsAction } from "@/_state/appealCourts";
import { useTagsAction } from "@/_state/tags";
import { useRolesAction } from "@/_state/roles";
import { appStateAtom, useAppStateAction } from "@/_state/appState";
import { useTribunalsAction } from "@/_state/tribunals";
import { usePositionsActions } from "@/_state/positions";
import { useState } from "react";

export * from "@/_state/appealCourts";
export * from "@/_state/appState";
export * from "@/_state/groups";
export * from "@/_state/positions";
export * from "@/_state/roles";
export * from "@/_state/tags";
export * from "@/_state/tribunals";

const useInitializeState = () => {
  const [loading, setLoading] = useState(false);
  const { get } = useAppStateAction();
  const appState = useRecoilValue(appStateAtom);
  const { getAll: getAllGroups } = useGroupsAction();
  const { getAll: getAllAppealCourts } = useAppealCourtsAction();
  const { getAll: getAllRoles } = useRolesAction();
  const { getAll: getAllTags } = useTagsAction();
  const { getAll: getAllTribunals } = useTribunalsAction();
  const { getAll: getAllPositions } = usePositionsActions();
  const initializeState = () => {
    setLoading(true);
    Promise.all([
      get(),
      getAllAppealCourts(),
      getAllGroups(),
      getAllTags(),
      getAllRoles(),
      getAllTribunals(),
      getAllPositions(),
    ])
      .then(() => setLoading(false))
      .catch((e) => {
        setLoading(false);
      });
  };

  const isInitialized = loading || appState !== undefined;
  return { isInitialized, initializeState };
};

export { useInitializeState };
