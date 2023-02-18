import { atom, selectorFamily, useRecoilState } from "recoil";
import { TimeWindow } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";

const timeWindowAtom = atom<TimeWindow[]>({
  key: "time_windows",
  default: [],
});

const timeWindowSelector = selectorFamily({
  key: "time_window_selector",
  get:
    (timeTo: number) =>
    ({ get }) => {
      return get(timeWindowAtom).find((timeWindow) => {
        if (timeWindow.maxTime !== undefined) {
          return timeWindow.minTime <= timeTo && timeWindow.maxTime > timeTo;
        }
        return timeWindow.minTime <= timeTo;
      });
    },
});

const useTimeWindowsActions = () => {
  const [timeWindows, setTimeWindows] = useRecoilState(timeWindowAtom);

  const getAll = async () => {
    const result = await invoke<TimeWindow[]>("get_time_windows");
    console.log(result);
    setTimeWindows(result);
  };

  const update = async (timeWindow: TimeWindow) => {
    const updated = await invoke<TimeWindow>("update_time_window", {
      timeWindow,
    });

    setTimeWindows(
      timeWindows.map((tw) => (tw.id === updated.id ? updated : tw))
    );
  };

  const create = async (timeWindow: Partial<TimeWindow>) => {
    const created = await invoke<TimeWindow>("create_time_window", {
      timeWindow,
    });
    console.log(created);

    setTimeWindows([...timeWindows, created]);
  };

  const remove = async (timeWindow: TimeWindow) => {
    const result = await invoke<boolean>("delete_time_window", { timeWindow });
    if (result) {
      setTimeWindows(timeWindows.filter((tw) => tw.id != timeWindow.id));
    }
  };

  return { getAll, update, create, remove };
};

export { timeWindowAtom, timeWindowSelector, useTimeWindowsActions };
